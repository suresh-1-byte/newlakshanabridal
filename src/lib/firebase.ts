import { initializeApp } from 'firebase/app'
import { getAuth, connectAuthEmulator } from 'firebase/auth'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'
import { getStorage, connectStorageEmulator } from 'firebase/storage'

// Firebase configuration with hardcoded fallbacks
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCgdbZk6MU5gdCbyeUUX33TkQkycbZo6BM",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "lakshanaatelier.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "lakshanaatelier",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "lakshanaatelier.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "905891434766",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:905891434766:web:3faf870cd5d2af53a6075f",
}

// Validate configuration
const isConfigValid = firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.authDomain

let app: any = null
let auth: any = null
let db: any = null
let storage: any = null
let initError: string | null = null

try {
  if (!isConfigValid) {
    throw new Error('Firebase configuration is incomplete. Missing required fields.')
  }

  // Debug: Log configuration
  console.log('🔍 Firebase Config:', {
    hasApiKey: !!firebaseConfig.apiKey,
    apiKeyPrefix: firebaseConfig.apiKey?.substring(0, 10) + '...',
    projectId: firebaseConfig.projectId,
    authDomain: firebaseConfig.authDomain,
    envLoaded: {
      VITE_FIREBASE_API_KEY: !!import.meta.env.VITE_FIREBASE_API_KEY,
      VITE_FIREBASE_PROJECT_ID: !!import.meta.env.VITE_FIREBASE_PROJECT_ID,
    }
  })

  // Initialize Firebase
  app = initializeApp(firebaseConfig)
  auth = getAuth(app)
  db = getFirestore(app)
  storage = getStorage(app)

  // Connect to emulators in development (optional)
  if (import.meta.env.DEV && import.meta.env.VITE_USE_FIREBASE_EMULATOR === 'true') {
    try {
      connectAuthEmulator(auth, 'http://localhost:9099')
      connectFirestoreEmulator(db, 'localhost', 8080)
      connectStorageEmulator(storage, 'localhost', 9199)
      console.log('🔧 Connected to Firebase Emulators')
    } catch (emulatorError) {
      console.warn('⚠️ Could not connect to emulators:', emulatorError)
    }
  }

  console.log('✅ Firebase initialization: SUCCESS')
  console.log('🔥 Firebase initialized:', {
    projectId: firebaseConfig.projectId,
    authDomain: firebaseConfig.authDomain,
  })
} catch (error: any) {
  console.error('❌ Firebase initialization: FAILED')
  console.error('❌ Error:', error)
  initError = error.message || 'Unknown Firebase initialization error'
  
  // Create fallback objects to prevent app crashes
  console.warn('⚠️ Creating fallback Firebase objects to prevent app crash')
}

// Export with error checking
export { app, auth, db, storage, initError }

// Export helper to check if Firebase is ready
export const isFirebaseReady = (): boolean => {
  return app !== null && auth !== null && db !== null && initError === null
}

// =====================================================
// TYPESCRIPT TYPE DEFINITIONS
// =====================================================

export type UserRole = 'super_admin' | 'admin' | 'manager' | 'receptionist' | 'makeup_artist' | 'trainer' | 'editor' | 'customer'
export type UserStatus = 'active' | 'inactive' | 'suspended' | 'pending'
export type AppointmentStatus = 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'rescheduled' | 'no_show'

export interface Admin {
  id: string
  authId?: string
  email: string
  fullName: string
  phone?: string
  role: UserRole
  status: UserStatus
  profileImage?: string
  designation?: string
  department?: string
  dateOfJoining?: string
  salary?: number
  permissions?: Record<string, any>
  lastLogin?: Date
  createdAt: Date
  updatedAt: Date
}

export interface Customer {
  id: string
  authId?: string
  fullName: string
  email?: string
  phone: string
  alternatePhone?: string
  gender?: 'female' | 'male' | 'other'
  dateOfBirth?: string
  anniversaryDate?: string
  address?: string
  city?: string
  state?: string
  pincode?: string
  notes?: string
  source?: string
  referralCode?: string
  totalBookings: number
  totalSpent: number
  loyaltyPoints: number
  isVip: boolean
  tags?: string[]
  profileImage?: string
  status: UserStatus
  createdAt: Date
  updatedAt: Date
}

export interface Service {
  id: string
  categoryId?: string
  name: string
  slug: string
  description?: string
  shortDescription?: string
  durationMinutes: number
  price: number
  offerPrice?: number
  image?: string
  images?: string[]
  isPopular: boolean
  isFeatured: boolean
  isActive: boolean
  displayOrder: number
  requirements?: string
  whatIncluded?: string[]
  whatNotIncluded?: string[]
  terms?: string
  tags?: string[]
  createdAt: Date
  updatedAt: Date
}

export interface Appointment {
  id: string
  bookingReference: string
  customerId: string
  serviceId?: string
  packageId?: string
  staffId?: string
  appointmentDate: string
  appointmentTime: string
  endTime?: string
  durationMinutes?: number
  status: AppointmentStatus
  notes?: string
  customerNotes?: string
  adminNotes?: string
  totalAmount: number
  discountAmount: number
  paidAmount: number
  paymentStatus: string
  paymentMethod?: string
  cancellationReason?: string
  cancelledBy?: string
  cancelledAt?: Date
  reminderSent: boolean
  confirmationSent: boolean
  feedbackReceived: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Testimonial {
  id: string
  customerId?: string
  customerName: string
  customerEmail?: string
  customerImage?: string
  designation?: string
  rating: number
  review: string
  serviceType?: string
  isApproved: boolean
  approvedBy?: string
  approvedAt?: Date
  isActive: boolean
  isFeatured: boolean
  displayOrder: number
  source: string
  createdAt: Date
  updatedAt: Date
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  phone: string
  subject?: string
  message: string
  serviceInterested?: string
  status: 'new' | 'read' | 'replied' | 'closed'
  assignedTo?: string
  reply?: string
  repliedBy?: string
  repliedAt?: Date
  notes?: string
  ipAddress?: string
  userAgent?: string
  createdAt: Date
  updatedAt: Date
}
