import { 
  collection, 
  doc, 
  addDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore'
import { db } from './firebase'
import type { Customer, Appointment, Service } from './firebase'

interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  errors?: any[]
}

// Helper function to generate booking reference
function generateBookingReference(): string {
  const date = new Date()
  const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '')
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0')
  return `LBS${dateStr}${random}`
}

// Helper to convert Firestore timestamp to Date
function timestampToDate(timestamp: any): Date {
  if (timestamp instanceof Timestamp) {
    return timestamp.toDate()
  }
  return timestamp
}

export const firebaseApi = {
  // =====================================================
  // BOOKINGS / APPOINTMENTS
  // =====================================================
  createBooking: async (data: {
    name: FormDataEntryValue | null
    phone: FormDataEntryValue | null
    email?: FormDataEntryValue | null
    service: FormDataEntryValue | null
    preferredDate: FormDataEntryValue | null
    message: FormDataEntryValue | null
  }): Promise<ApiResponse<any>> => {
    try {
      const name = data.name as string
      const phone = data.phone as string
      const email = data.email as string | undefined
      const serviceName = data.service as string
      const preferredDate = data.preferredDate as string
      const message = data.message as string

      // Step 1: Create or get customer
      const customersRef = collection(db, 'customers')
      const customerQuery = query(customersRef, where('phone', '==', phone), limit(1))
      const customerSnapshot = await getDocs(customerQuery)

      let customerId: string
      if (!customerSnapshot.empty) {
        customerId = customerSnapshot.docs[0].id
        console.log('Customer exists:', customerId)
      } else {
        // Create new customer
        const customerData: Omit<Customer, 'id'> = {
          fullName: name,
          phone: phone,
          email: email || undefined,
          status: 'active',
          totalBookings: 0,
          totalSpent: 0,
          loyaltyPoints: 0,
          isVip: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        }

        const newCustomerRef = await addDoc(customersRef, customerData)
        customerId = newCustomerRef.id
        console.log('Customer created:', customerId)
      }

      // Step 2: Get service ID by name
      let serviceId: string | undefined
      if (serviceName) {
        const servicesRef = collection(db, 'services')
        const serviceQuery = query(
          servicesRef,
          where('name', '==', serviceName),
          where('isActive', '==', true),
          limit(1)
        )
        const serviceSnapshot = await getDocs(serviceQuery)

        if (!serviceSnapshot.empty) {
          serviceId = serviceSnapshot.docs[0].id
          console.log('Service found:', serviceId)
        }
      }

      // Step 3: Create appointment
      const bookingReference = generateBookingReference()
      const appointmentData: Omit<Appointment, 'id'> = {
        bookingReference,
        customerId,
        serviceId,
        appointmentDate: preferredDate || new Date().toISOString().split('T')[0],
        appointmentTime: '10:00:00', // Default time
        status: 'pending',
        customerNotes: message || undefined,
        totalAmount: 0,
        discountAmount: 0,
        paidAmount: 0,
        paymentStatus: 'pending',
        reminderSent: false,
        confirmationSent: false,
        feedbackReceived: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      const appointmentsRef = collection(db, 'appointments')
      const newAppointment = await addDoc(appointmentsRef, appointmentData)

      console.log('Appointment created:', newAppointment.id)

      return {
        success: true,
        data: { id: newAppointment.id, bookingReference },
        message: `Booking confirmed! Reference: ${bookingReference}. We'll contact you within 24 hours.`,
      }
    } catch (error: any) {
      console.error('Booking error:', error)
      return {
        success: false,
        message: error.message || 'Failed to create booking. Please try again.',
        errors: [error],
      }
    }
  },

  // =====================================================
  // CONTACT MESSAGES
  // =====================================================
  createContact: async (data: {
    name: string
    email: string
    phone: string
    subject?: string
    message: string
    serviceInterested?: string
  }): Promise<ApiResponse<any>> => {
    try {
      const contactData = {
        ...data,
        status: 'new' as const,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      const contactsRef = collection(db, 'contact_messages')
      const newContact = await addDoc(contactsRef, contactData)

      return {
        success: true,
        data: { id: newContact.id },
        message: 'Thank you for reaching out! We will respond within 24 hours.',
      }
    } catch (error: any) {
      console.error('Contact error:', error)
      return {
        success: false,
        message: error.message || 'Failed to submit contact form. Please try again.',
        errors: [error],
      }
    }
  },

  // =====================================================
  // SERVICES
  // =====================================================
  getServices: async (categorySlug?: string): Promise<ApiResponse<Service[]>> => {
    try {
      const servicesRef = collection(db, 'services')
      let servicesQuery = query(
        servicesRef,
        where('isActive', '==', true),
        orderBy('displayOrder', 'asc')
      )

      const servicesSnapshot = await getDocs(servicesQuery)
      const services = servicesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: timestampToDate(doc.data().createdAt),
        updatedAt: timestampToDate(doc.data().updatedAt),
      })) as Service[]

      return {
        success: true,
        data: services,
      }
    } catch (error: any) {
      console.error('Services error:', error)
      return {
        success: false,
        message: error.message || 'Failed to load services.',
        data: [],
        errors: [error],
      }
    }
  },

  // =====================================================
  // TESTIMONIALS
  // =====================================================
  getTestimonials: async (): Promise<ApiResponse<any[]>> => {
    try {
      const testimonialsRef = collection(db, 'testimonials')
      const testimonialsQuery = query(
        testimonialsRef,
        where('isApproved', '==', true),
        where('isActive', '==', true),
        orderBy('displayOrder', 'asc'),
        limit(10)
      )

      const testimonialsSnapshot = await getDocs(testimonialsQuery)
      const testimonials = testimonialsSnapshot.docs.map(doc => {
        const data = doc.data()
        return {
          _id: doc.id,
          quote: data.review,
          name: data.customerName,
          role: data.designation || data.serviceType || 'Bride',
          rating: data.rating,
        }
      })

      return {
        success: true,
        data: testimonials,
      }
    } catch (error: any) {
      console.error('Testimonials error:', error)
      return {
        success: false,
        message: error.message || 'Failed to load testimonials.',
        data: [],
        errors: [error],
      }
    }
  },

  // =====================================================
  // APPOINTMENTS - Admin Operations
  // =====================================================
  getAppointments: async (filters?: {
    status?: string
    customerId?: string
    startDate?: string
    endDate?: string
  }): Promise<ApiResponse<Appointment[]>> => {
    try {
      const appointmentsRef = collection(db, 'appointments')
      let appointmentsQuery = query(appointmentsRef, orderBy('createdAt', 'desc'))

      if (filters?.status) {
        appointmentsQuery = query(appointmentsQuery, where('status', '==', filters.status))
      }
      if (filters?.customerId) {
        appointmentsQuery = query(appointmentsQuery, where('customerId', '==', filters.customerId))
      }

      const appointmentsSnapshot = await getDocs(appointmentsQuery)
      const appointments = appointmentsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: timestampToDate(doc.data().createdAt),
        updatedAt: timestampToDate(doc.data().updatedAt),
      })) as Appointment[]

      return {
        success: true,
        data: appointments,
      }
    } catch (error: any) {
      console.error('Get appointments error:', error)
      return {
        success: false,
        message: error.message || 'Failed to load appointments.',
        data: [],
        errors: [error],
      }
    }
  },

  updateAppointment: async (id: string, data: Partial<Appointment>): Promise<ApiResponse<void>> => {
    try {
      const appointmentRef = doc(db, 'appointments', id)
      await updateDoc(appointmentRef, {
        ...data,
        updatedAt: new Date(),
      })

      return {
        success: true,
        message: 'Appointment updated successfully',
      }
    } catch (error: any) {
      console.error('Update appointment error:', error)
      return {
        success: false,
        message: error.message || 'Failed to update appointment.',
        errors: [error],
      }
    }
  },

  deleteAppointment: async (id: string): Promise<ApiResponse<void>> => {
    try {
      const appointmentRef = doc(db, 'appointments', id)
      await deleteDoc(appointmentRef)

      return {
        success: true,
        message: 'Appointment deleted successfully',
      }
    } catch (error: any) {
      console.error('Delete appointment error:', error)
      return {
        success: false,
        message: error.message || 'Failed to delete appointment.',
        errors: [error],
      }
    }
  },
}
