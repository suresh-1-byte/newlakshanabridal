import { supabase } from './supabase'

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: any[];
}

export const api = {
  // =====================================================
  // BOOKINGS / APPOINTMENTS
  // =====================================================
  createBooking: async (data: {
    name: FormDataEntryValue | null;
    phone: FormDataEntryValue | null;
    email?: FormDataEntryValue | null;
    service: FormDataEntryValue | null;
    preferredDate: FormDataEntryValue | null;
    message: FormDataEntryValue | null;
  }): Promise<ApiResponse<any>> => {
    try {
      // Step 1: Create or get customer
      const customerData = {
        full_name: data.name as string,
        phone: data.phone as string,
        email: data.email ? (data.email as string) : null,
        status: 'active' as const,
      }

      // Check if customer exists
      let customerId: string
      const { data: existingCustomer } = await supabase
        .from('customers')
        .select('id')
        .eq('phone', customerData.phone)
        .single()

      if (existingCustomer) {
        customerId = existingCustomer.id
      } else {
        // Create new customer
        const { data: newCustomer, error: customerError } = await supabase
          .from('customers')
          .insert([customerData])
          .select('id')
          .single()

        if (customerError) throw customerError
        customerId = newCustomer.id
      }

      // Step 2: Get service ID by name
      let serviceId: string | null = null
      if (data.service) {
        const { data: serviceData } = await supabase
          .from('services')
          .select('id, price, duration_minutes')
          .eq('name', data.service as string)
          .eq('is_active', true)
          .single()

        if (serviceData) {
          serviceId = serviceData.id
        }
      }

      // Step 3: Create appointment
      const appointmentData = {
        customer_id: customerId,
        service_id: serviceId,
        appointment_date: data.preferredDate 
          ? new Date(data.preferredDate as string).toISOString().split('T')[0]
          : new Date().toISOString().split('T')[0],
        appointment_time: '10:00:00', // Default time - can be enhanced later
        status: 'pending' as const,
        customer_notes: data.message as string || null,
        total_amount: 0, // Will be updated by staff
        discount_amount: 0,
        paid_amount: 0,
        payment_status: 'pending',
      }

      const { data: appointment, error: appointmentError } = await supabase
        .from('appointments')
        .insert([appointmentData])
        .select('*, booking_reference')
        .single()

      if (appointmentError) throw appointmentError

      return {
        success: true,
        data: appointment,
        message: `Booking confirmed! Reference: ${appointment.booking_reference}. We'll contact you within 24 hours.`,
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
    name: string;
    email: string;
    phone: string;
    subject?: string;
    message: string;
    service_interested?: string;
  }): Promise<ApiResponse<any>> => {
    try {
      const { data: contact, error } = await supabase
        .from('contact_messages')
        .insert([{
          name: data.name,
          email: data.email,
          phone: data.phone,
          subject: data.subject || null,
          message: data.message,
          service_interested: data.service_interested || null,
          status: 'new' as const,
        }])
        .select()
        .single()

      if (error) throw error

      return {
        success: true,
        data: contact,
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
  // ACADEMY ENROLLMENT
  // =====================================================
  createEnrollment: async (data: {
    name: string;
    email: string;
    phone: string;
    course: string;
    message?: string;
  }): Promise<ApiResponse<any>> => {
    try {
      // Get course ID by name
      const { data: courseData } = await supabase
        .from('academy_courses')
        .select('id')
        .eq('name', data.course)
        .eq('is_active', true)
        .single()

      const { data: enrollment, error } = await supabase
        .from('academy_enquiries')
        .insert([{
          full_name: data.name,
          email: data.email,
          phone: data.phone,
          course_id: courseData?.id || null,
          message: data.message || null,
          status: 'new' as const,
        }])
        .select()
        .single()

      if (error) throw error

      return {
        success: true,
        data: enrollment,
        message: 'Enrollment request received! Our team will contact you soon.',
      }
    } catch (error: any) {
      console.error('Enrollment error:', error)
      return {
        success: false,
        message: error.message || 'Failed to submit enrollment. Please try again.',
        errors: [error],
      }
    }
  },

  // =====================================================
  // TESTIMONIALS
  // =====================================================
  getTestimonials: async (): Promise<ApiResponse<any[]>> => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('is_approved', true)
        .eq('is_active', true)
        .order('display_order', { ascending: true })
        .order('created_at', { ascending: false })
        .limit(10)

      if (error) throw error

      // Transform data to match frontend format
      const testimonials = data?.map(t => ({
        _id: t.id,
        quote: t.review,
        name: t.customer_name,
        role: t.designation || t.service_type || 'Bride',
        rating: t.rating,
      })) || []

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
  // GALLERY
  // =====================================================
  getGallery: async (category?: string): Promise<ApiResponse<any[]>> => {
    try {
      let query = supabase
        .from('gallery')
        .select(`
          *,
          category:gallery_categories(name, slug)
        `)
        .eq('is_active', true)
        .order('display_order', { ascending: true })
        .order('created_at', { ascending: false })

      if (category) {
        // Get category ID first
        const { data: categoryData } = await supabase
          .from('gallery_categories')
          .select('id')
          .eq('slug', category)
          .single()

        if (categoryData) {
          query = query.eq('category_id', categoryData.id)
        }
      }

      const { data, error } = await query

      if (error) throw error

      return {
        success: true,
        data: data || [],
      }
    } catch (error: any) {
      console.error('Gallery error:', error)
      return {
        success: false,
        message: error.message || 'Failed to load gallery.',
        data: [],
        errors: [error],
      }
    }
  },

  // =====================================================
  // SERVICES
  // =====================================================
  getServices: async (categorySlug?: string): Promise<ApiResponse<any[]>> => {
    try {
      let query = supabase
        .from('services')
        .select(`
          *,
          category:service_categories(name, slug)
        `)
        .eq('is_active', true)
        .order('display_order', { ascending: true })

      if (categorySlug) {
        const { data: categoryData } = await supabase
          .from('service_categories')
          .select('id')
          .eq('slug', categorySlug)
          .single()

        if (categoryData) {
          query = query.eq('category_id', categoryData.id)
        }
      }

      const { data, error } = await query

      if (error) throw error

      return {
        success: true,
        data: data || [],
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
  // BRIDAL PACKAGES
  // =====================================================
  getBridalPackages: async (): Promise<ApiResponse<any[]>> => {
    try {
      const { data, error } = await supabase
        .from('bridal_packages')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true })

      if (error) throw error

      return {
        success: true,
        data: data || [],
      }
    } catch (error: any) {
      console.error('Bridal packages error:', error)
      return {
        success: false,
        message: error.message || 'Failed to load bridal packages.',
        data: [],
        errors: [error],
      }
    }
  },

  // =====================================================
  // BLOG POSTS
  // =====================================================
  getBlogPosts: async (categorySlug?: string, limit = 10): Promise<ApiResponse<any[]>> => {
    try {
      let query = supabase
        .from('blog_posts')
        .select(`
          *,
          category:blog_categories(name, slug)
        `)
        .eq('is_published', true)
        .order('published_at', { ascending: false })
        .limit(limit)

      if (categorySlug) {
        const { data: categoryData } = await supabase
          .from('blog_categories')
          .select('id')
          .eq('slug', categorySlug)
          .single()

        if (categoryData) {
          query = query.eq('category_id', categoryData.id)
        }
      }

      const { data, error } = await query

      if (error) throw error

      return {
        success: true,
        data: data || [],
      }
    } catch (error: any) {
      console.error('Blog posts error:', error)
      return {
        success: false,
        message: error.message || 'Failed to load blog posts.',
        data: [],
        errors: [error],
      }
    }
  },

  // =====================================================
  // WHATSAPP ENQUIRIES
  // =====================================================
  createWhatsAppEnquiry: async (data: {
    name: string;
    phone: string;
    message: string;
  }): Promise<ApiResponse<any>> => {
    try {
      const { data: enquiry, error } = await supabase
        .from('whatsapp_enquiries')
        .insert([{
          name: data.name,
          phone: data.phone,
          message: data.message,
          status: 'new' as const,
        }])
        .select()
        .single()

      if (error) throw error

      return {
        success: true,
        data: enquiry,
        message: 'WhatsApp enquiry received!',
      }
    } catch (error: any) {
      console.error('WhatsApp enquiry error:', error)
      return {
        success: false,
        message: error.message || 'Failed to submit enquiry.',
        errors: [error],
      }
    }
  },
}
