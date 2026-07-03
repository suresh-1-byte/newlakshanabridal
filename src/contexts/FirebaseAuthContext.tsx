import { createContext, useContext, useEffect, useState } from 'react'
import {
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from 'firebase/auth'
import { doc, getDoc, collection, query, where, getDocs, limit, updateDoc } from 'firebase/firestore'
import { auth, db } from '../lib/firebase'
import type { Admin } from '../lib/firebase'

interface AuthContextType {
  user: FirebaseUser | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signOut: () => Promise<void>
  isAdmin: boolean
  adminData: Admin | null
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signIn: async () => ({ error: null }),
  signOut: async () => {},
  isAdmin: false,
  adminData: null,
})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within FirebaseAuthProvider')
  }
  return context
}

export function FirebaseAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<FirebaseUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [adminData, setAdminData] = useState<Admin | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser)
      if (firebaseUser) {
        await loadAdminData(firebaseUser.uid, firebaseUser.email || '')
      } else {
        setAdminData(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const loadAdminData = async (authId: string, email: string) => {
    try {
      console.log('🔍 Loading admin data for authId:', authId)

      // Try to find admin by authId first
      const adminsRef = collection(db, 'admins')
      const adminByAuthIdQuery = query(adminsRef, where('authId', '==', authId), limit(1))
      const adminByAuthIdSnapshot = await getDocs(adminByAuthIdQuery)

      if (!adminByAuthIdSnapshot.empty) {
        const adminDoc = adminByAuthIdSnapshot.docs[0]
        const data = adminDoc.data() as Omit<Admin, 'id'>
        setAdminData({
          id: adminDoc.id,
          ...data,
          createdAt: data.createdAt instanceof Date ? data.createdAt : new Date(data.createdAt),
          updatedAt: data.updatedAt instanceof Date ? data.updatedAt : new Date(data.updatedAt),
        })
        console.log('✅ Admin data loaded by authId:', adminDoc.id)
        return
      }

      // If not found by authId, try to find by email
      console.log('🔄 Trying to find admin by email:', email)
      const adminByEmailQuery = query(adminsRef, where('email', '==', email), limit(1))
      const adminByEmailSnapshot = await getDocs(adminByEmailQuery)

      if (!adminByEmailSnapshot.empty) {
        const adminDoc = adminByEmailSnapshot.docs[0]
        console.log('✅ Found admin by email, updating authId...')

        // Update the admin record with the correct authId
        await updateDoc(doc(db, 'admins', adminDoc.id), {
          authId: authId,
          updatedAt: new Date(),
        })

        const data = adminDoc.data() as Omit<Admin, 'id'>
        setAdminData({
          id: adminDoc.id,
          ...data,
          authId: authId,
          createdAt: data.createdAt instanceof Date ? data.createdAt : new Date(data.createdAt),
          updatedAt: new Date(),
        })
        console.log('✅ Admin authId updated and data loaded')
        return
      }

      console.log('❌ No admin found for this user')
    } catch (error) {
      console.error('❌ Exception loading admin data:', error)
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      console.log('🔐 Attempting Firebase sign in for:', email)

      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      console.log('✅ Firebase sign in successful, user ID:', userCredential.user.uid)

      await loadAdminData(userCredential.user.uid, email)

      return { error: null }
    } catch (error: any) {
      console.error('❌ Firebase sign in error:', error)
      return { error: { message: error.message || 'An unexpected error occurred' } }
    }
  }

  const signOut = async () => {
    await firebaseSignOut(auth)
    setAdminData(null)
  }

  const isAdmin = !!adminData && adminData.status === 'active'

  const value = {
    user,
    loading,
    signIn,
    signOut,
    isAdmin,
    adminData,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
