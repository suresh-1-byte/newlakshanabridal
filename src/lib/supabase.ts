import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

console.log('🔧 Supabase Config:', {
  url: supabaseUrl,
  keyLength: supabaseAnonKey?.length,
  keyStart: supabaseAnonKey?.substring(0, 20)
})

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// =====================================================
// TYPESCRIPT TYPE DEFINITIONS
// =====================================================

export type UserRole = 'super_admin' | 'admin' | 'manager' | 'receptionist' | 'makeup_artist' | 'trainer' | 'editor' | 'customer'
export type UserStatus = 'active' | 'inactive' | 'suspended' | 'pending'
export type AppointmentStatus = 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'rescheduled' | 'no_show'

export interface Admin {
  id: string
  auth_id?: string
  email: string
  full_name: string
  phone?: string
  role: UserRole
  status: UserStatus
  profile_image?: string
  designation?: string
  department?: string
  date_of_joining?: string
  salary?: number
  permissions?: Record<string, any>
  last_login?: string
  created_at: string
  updated_at: string
}

export interface Customer {
  id: string
  auth_id?: string
  full_name: string
  email?: string
  phone: string
  alternate_phone?: string
  gender?: 'female' | 'male' | 'other'
  date_of_birth?: string
  anniversary_date?: string
  address?: string
  city?: string
  state?: string
  pincode?: string
  notes?: string
  source?: string
  referral_code?: string
  total_bookings: number
  total_spent: number
  loyalty_points: number
  is_vip: boolean
  tags?: string[]
  profile_image?: string
  status: UserStatus
  created_at: string
  updated_at: string
}

export interface ServiceCategory {
  id: string
  name: string
  slug: string
  description?: string
  icon?: string
  image?: string
  display_order: number
  is_active: boolean
  meta_title?: string
  meta_description?: string
  created_at: string
  updated_at: string
}

export interface Service {
  id: string
  category_id?: string
  name: string
  slug: string
  description?: string
  short_description?: string
  duration_minutes: number
  price: number
  offer_price?: number
  image?: string
  images?: string[]
  is_popular: boolean
  is_featured: boolean
  is_active: boolean
  display_order: number
  requirements?: string
  what_included?: string[]
  what_not_included?: string[]
  terms?: string
  meta_title?: string
  meta_description?: string
  tags?: string[]
  created_at: string
  updated_at: string
}

export interface BridalPackage {
  id: string
  name: string
  slug: string
  description?: string
  price: number
  offer_price?: number
  duration_days?: number
  image?: string
  images?: string[]
  services_included?: string[]
  highlights?: string[]
  is_popular: boolean
  is_active: boolean
  display_order: number
  meta_title?: string
  meta_description?: string
  created_at: string
  updated_at: string
}

export interface Appointment {
  id: string
  booking_reference: string
  customer_id: string
  service_id?: string
  package_id?: string
  staff_id?: string
  appointment_date: string
  appointment_time: string
  end_time?: string
  duration_minutes?: number
  status: AppointmentStatus
  notes?: string
  customer_notes?: string
  admin_notes?: string
  total_amount: number
  discount_amount: number
  paid_amount: number
  payment_status: string
  payment_method?: string
  cancellation_reason?: string
  cancelled_by?: string
  cancelled_at?: string
  reminder_sent: boolean
  confirmation_sent: boolean
  feedback_received: boolean
  created_at: string
  updated_at: string
}

export interface Testimonial {
  id: string
  customer_id?: string
  customer_name: string
  customer_email?: string
  customer_image?: string
  designation?: string
  rating: number
  review: string
  service_type?: string
  is_approved: boolean
  approved_by?: string
  approved_at?: string
  is_active: boolean
  is_featured: boolean
  display_order: number
  source: string
  created_at: string
  updated_at: string
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  phone: string
  subject?: string
  message: string
  service_interested?: string
  status: 'new' | 'read' | 'replied' | 'closed'
  assigned_to?: string
  reply?: string
  replied_by?: string
  replied_at?: string
  notes?: string
  ip_address?: string
  user_agent?: string
  created_at: string
  updated_at: string
}

export interface Gallery {
  id: string
  category_id?: string
  title: string
  description?: string
  image_url: string
  thumbnail_url?: string
  type: 'image' | 'video'
  is_featured: boolean
  is_active: boolean
  display_order: number
  views: number
  likes: number
  tags?: string[]
  created_at: string
  updated_at: string
}

export interface BlogPost {
  id: string
  category_id?: string
  title: string
  slug: string
  excerpt?: string
  content: string
  cover_image?: string
  author_id?: string
  author_name?: string
  is_published: boolean
  published_at?: string
  views: number
  reading_time?: number
  tags?: string[]
  meta_title?: string
  meta_description?: string
  created_at: string
  updated_at: string
}

// Helper type for creating new records (without auto-generated fields)
export type NewAppointment = Omit<Appointment, 'id' | 'booking_reference' | 'created_at' | 'updated_at'>
export type NewCustomer = Omit<Customer, 'id' | 'total_bookings' | 'total_spent' | 'loyalty_points' | 'created_at' | 'updated_at'>
export type NewTestimonial = Omit<Testimonial, 'id' | 'is_approved' | 'approved_by' | 'approved_at' | 'created_at' | 'updated_at'>
export type NewContactMessage = Omit<ContactMessage, 'id' | 'status' | 'created_at' | 'updated_at'>
