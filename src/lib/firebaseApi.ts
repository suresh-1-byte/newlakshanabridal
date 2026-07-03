import { db, isFirebaseReady, initError } from './firebase';
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  orderBy,
  limit,
  updateDoc,
  deleteDoc,
  Timestamp,
  serverTimestamp
} from 'firebase/firestore';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: any[];
}

// Helper to check Firebase initialization
function checkFirebaseReady(): { ready: boolean; error?: string } {
  if (!isFirebaseReady()) {
    return {
      ready: false,
      error: initError || 'Firebase is not initialized. Please check your configuration.'
    };
  }
  return { ready: true };
}

// Generate booking reference
function generateBookingReference(): string {
  const timestamp = Date.now().toString().slice(-8);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `BK${timestamp}${random}`;
}

export const firebaseApi = {
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
      // Check Firebase initialization
      const firebaseCheck = checkFirebaseReady();
      if (!firebaseCheck.ready) {
        console.error('❌ Firebase not ready:', firebaseCheck.error);
        return {
          success: false,
          message: 'Service temporarily unavailable. Please try again later.',
          errors: [{ message: firebaseCheck.error }],
        };
      }

      console.log('📝 Creating booking with data:', data);

      // Step 1: Create or get customer
      const customerData = {
        fullName: data.name as string,
        phone: data.phone as string,
        email: data.email ? (data.email as string) : null,
        status: 'active',
        totalBookings: 0,
        totalSpent: 0,
        loyaltyPoints: 0,
        isVip: false,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      // Check if customer exists
      let customerId: string;
      const customersRef = collection(db, 'customers');
      const customerQuery = query(customersRef, where('phone', '==', customerData.phone));
      const customerSnapshot = await getDocs(customerQuery);

      if (!customerSnapshot.empty) {
        customerId = customerSnapshot.docs[0].id;
        console.log('✅ Existing customer found:', customerId);
      } else {
        // Create new customer
        const newCustomerRef = await addDoc(customersRef, customerData);
        customerId = newCustomerRef.id;
        console.log('✅ New customer created:', customerId);
      }

      // Step 2: Create appointment
      const bookingReference = generateBookingReference();
      const appointmentDate = data.preferredDate 
        ? new Date(data.preferredDate as string).toISOString().split('T')[0]
        : new Date().toISOString().split('T')[0];

      const appointmentData = {
        bookingReference: bookingReference,
        customerId: customerId,
        customerName: data.name as string,
        customerPhone: data.phone as string,
        customerEmail: data.email ? (data.email as string) : null,
        serviceName: data.service as string,
        appointmentDate: appointmentDate,
        appointmentTime: '10:00',
        status: 'pending',
        customerNotes: (data.message as string) || null,
        totalAmount: 0,
        discountAmount: 0,
        paidAmount: 0,
        paymentStatus: 'pending',
        reminderSent: false,
        confirmationSent: false,
        feedbackReceived: false,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      const appointmentsRef = collection(db, 'appointments');
      const appointmentRef = await addDoc(appointmentsRef, appointmentData);

      console.log('✅ Appointment created:', appointmentRef.id);

      return {
        success: true,
        data: { id: appointmentRef.id, bookingReference },
        message: `Booking confirmed! Reference: ${bookingReference}. We'll contact you within 24 hours.`,
      };
    } catch (error: any) {
      console.error('❌ Booking error:', error);
      return {
        success: false,
        message: error.message || 'Failed to create booking. Please try again.',
        errors: [error],
      };
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
    serviceInterested?: string;
  }): Promise<ApiResponse<any>> => {
    try {
      const contactData = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        subject: data.subject || null,
        message: data.message,
        serviceInterested: data.serviceInterested || null,
        status: 'new',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      const contactsRef = collection(db, 'contact_messages');
      const contactRef = await addDoc(contactsRef, contactData);

      return {
        success: true,
        data: { id: contactRef.id },
        message: 'Thank you for reaching out! We will respond within 24 hours.',
      };
    } catch (error: any) {
      console.error('Contact error:', error);
      return {
        success: false,
        message: error.message || 'Failed to submit contact form. Please try again.',
        errors: [error],
      };
    }
  },

  // =====================================================
  // TESTIMONIALS
  // =====================================================
  getTestimonials: async (): Promise<ApiResponse<any[]>> => {
    try {
      const testimonialsRef = collection(db, 'testimonials');
      const q = query(
        testimonialsRef,
        where('isApproved', '==', true),
        where('isActive', '==', true),
        orderBy('displayOrder', 'asc'),
        limit(10)
      );

      const snapshot = await getDocs(q);
      const testimonials = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          _id: doc.id,
          quote: data.review,
          name: data.customerName,
          role: data.designation || data.serviceType || 'Bride',
          rating: data.rating,
        };
      });

      return {
        success: true,
        data: testimonials,
      };
    } catch (error: any) {
      console.error('Testimonials error:', error);
      return {
        success: false,
        message: error.message || 'Failed to load testimonials.',
        data: [],
        errors: [error],
      };
    }
  },

  // =====================================================
  // GALLERY
  // =====================================================
  getGallery: async (): Promise<ApiResponse<any[]>> => {
    try {
      const galleryRef = collection(db, 'gallery');
      const q = query(
        galleryRef,
        where('isActive', '==', true),
        orderBy('displayOrder', 'asc')
      );

      const snapshot = await getDocs(q);
      const gallery = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      return {
        success: true,
        data: gallery,
      };
    } catch (error: any) {
      console.error('Gallery error:', error);
      return {
        success: false,
        message: error.message || 'Failed to load gallery.',
        data: [],
        errors: [error],
      };
    }
  },

  // Add gallery item
  addGalleryItem: async (data: {
    title: string;
    description?: string;
    imageUrl: string;
    thumbnailUrl?: string;
    type: 'image' | 'video';
    categoryId?: string;
    tags?: string[];
  }): Promise<ApiResponse<any>> => {
    try {
      const galleryData = {
        title: data.title,
        description: data.description || null,
        imageUrl: data.imageUrl,
        thumbnailUrl: data.thumbnailUrl || data.imageUrl,
        type: data.type,
        categoryId: data.categoryId || null,
        tags: data.tags || [],
        isActive: true,
        isFeatured: false,
        displayOrder: 0,
        views: 0,
        likes: 0,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      const galleryRef = collection(db, 'gallery');
      const docRef = await addDoc(galleryRef, galleryData);

      return {
        success: true,
        data: { id: docRef.id },
        message: 'Gallery item added successfully!',
      };
    } catch (error: any) {
      console.error('Add gallery error:', error);
      return {
        success: false,
        message: error.message || 'Failed to add gallery item.',
        errors: [error],
      };
    }
  },

  // Update gallery item
  updateGalleryItem: async (id: string, data: Partial<any>): Promise<ApiResponse<any>> => {
    try {
      const galleryRef = doc(db, 'gallery', id);
      await updateDoc(galleryRef, {
        ...data,
        updatedAt: serverTimestamp()
      });

      return {
        success: true,
        message: 'Gallery item updated successfully!',
      };
    } catch (error: any) {
      console.error('Update gallery error:', error);
      return {
        success: false,
        message: error.message || 'Failed to update gallery item.',
        errors: [error],
      };
    }
  },

  // Delete gallery item
  deleteGalleryItem: async (id: string): Promise<ApiResponse<any>> => {
    try {
      const galleryRef = doc(db, 'gallery', id);
      await deleteDoc(galleryRef);

      return {
        success: true,
        message: 'Gallery item deleted successfully!',
      };
    } catch (error: any) {
      console.error('Delete gallery error:', error);
      return {
        success: false,
        message: error.message || 'Failed to delete gallery item.',
        errors: [error],
      };
    }
  },

  // =====================================================
  // SERVICES
  // =====================================================
  getServices: async (): Promise<ApiResponse<any[]>> => {
    try {
      const servicesRef = collection(db, 'services');
      const q = query(
        servicesRef,
        where('isActive', '==', true),
        orderBy('displayOrder', 'asc')
      );

      const snapshot = await getDocs(q);
      const services = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      return {
        success: true,
        data: services,
      };
    } catch (error: any) {
      console.error('Services error:', error);
      return {
        success: false,
        message: error.message || 'Failed to load services.',
        data: [],
        errors: [error],
      };
    }
  },
};

export default firebaseApi;
