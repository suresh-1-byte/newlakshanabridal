import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { User, Session } from '@supabase/supabase-js'

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signOut: () => Promise<void>
  isAdmin: boolean
  adminData: any | null
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  signIn: async () => ({ error: null }),
  signOut: async () => {},
  isAdmin: false,
  adminData: null,
})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [adminData, setAdminData] = useState<any | null>(null)

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      if (session?.user) {
        loadAdminData(session.user.id)
      }
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      if (session?.user) {
        loadAdminData(session.user.id)
      } else {
        setAdminData(null)
      }
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const loadAdminData = async (authId: string) => {
    try {
      console.log('🔍 Loading admin data for auth_id:', authId)
      
      const { data, error } = await supabase
        .from('admins')
        .select('*')
        .eq('auth_id', authId)
        .single()

      if (error) {
        console.error('❌ Error loading admin data:', error)
        console.error('Error details:', {
          code: error.code,
          message: error.message,
          details: error.details,
          hint: error.hint
        })
        
        // If no admin found by auth_id, try to find by email
        const { data: { user } } = await supabase.auth.getUser()
        if (user?.email) {
          console.log('🔄 Trying to find admin by email:', user.email)
          const { data: adminByEmail, error: emailError } = await supabase
            .from('admins')
            .select('*')
            .eq('email', user.email)
            .single()
          
          if (adminByEmail && !emailError) {
            console.log('✅ Found admin by email, updating auth_id...')
            // Update the admin record with the correct auth_id
            const { error: updateError } = await supabase
              .from('admins')
              .update({ auth_id: authId })
              .eq('id', adminByEmail.id)
            
            if (!updateError) {
              console.log('✅ Admin auth_id updated successfully')
              setAdminData({ ...adminByEmail, auth_id: authId })
              return
            }
          }
        }
        return
      }

      console.log('✅ Admin data loaded:', data)
      setAdminData(data)
    } catch (error) {
      console.error('❌ Exception loading admin data:', error)
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      console.log('🔐 Attempting sign in for:', email)
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        console.error('❌ Sign in error:', error)
        return { error }
      }

      console.log('✅ Sign in successful, user ID:', data.user?.id)

      if (data.user) {
        await loadAdminData(data.user.id)
      }

      return { error: null }
    } catch (error: any) {
      console.error('❌ Sign in exception:', error)
      return { error: { message: error.message || 'An unexpected error occurred' } }
    }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    setAdminData(null)
  }

  const isAdmin = !!adminData && adminData.status === 'active'

  const value = {
    user,
    session,
    loading,
    signIn,
    signOut,
    isAdmin,
    adminData,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
