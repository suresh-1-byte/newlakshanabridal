import { initializeApp } from 'firebase/app'
import { getAuth, connectAuthEmulator } from 'firebase/auth'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'
import { getStorage, connectStorageEmulator } from 'firebase/storage'

// Firebase configuration
// TODO: Replace with your Firebase project config
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "YOUR_API_KEY",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "YOUR_PROJECT_ID",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "YOUR_MESSAGING_SENDER_ID",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "YOUR_APP_ID",
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)

// Initialize services
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

// Connect to emulators in development (optional)
if (import.meta.env.DEV && import.meta.env.VITE_USE_FIREBASE_EMULATOR === 'true') {
  connectAuthEmulator(auth, 'http://localhost:9099')
  connectFirestoreEmulator(db, 'localhost', 8080)
  connectStorageEmulator(storage, 'localhost', 9199)
}

console.log('🔥 Firebase initialized:', {
  projectId: firebaseConfig.projectId,
  authDomain: firebaseConfig.authDomain,
})

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
