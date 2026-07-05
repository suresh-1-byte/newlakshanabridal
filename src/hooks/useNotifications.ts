import { useEffect, useState, useRef } from 'react';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { toast } from 'sonner';

export interface Notification {
  id: string;
  type: 'booking' | 'enquiry';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const lastBookingCount = useRef<number>(0);
  const lastEnquiryCount = useRef<number>(0);
  const initialized = useRef(false);

  useEffect(() => {
    // Listen for new bookings
    const bookingsRef = collection(db, 'appointments');
    const bookingsQuery = query(bookingsRef, orderBy('createdAt', 'desc'), limit(10));
    
    const unsubscribeBookings = onSnapshot(bookingsQuery, (snapshot) => {
      const currentCount = snapshot.docs.length;
      
      // Skip first load
      if (!initialized.current) {
        lastBookingCount.current = currentCount;
        return;
      }
      
      // Check for new bookings
      if (currentCount > lastBookingCount.current) {
        const newBookings = snapshot.docs.slice(0, currentCount - lastBookingCount.current);
        
        newBookings.forEach((doc) => {
          const data = doc.data();
          const notification: Notification = {
            id: `booking-${doc.id}`,
            type: 'booking',
            title: '🎉 New Booking Received!',
            message: `${data.customerName} booked ${data.serviceName}`,
            timestamp: data.createdAt?.toDate() || new Date(),
            read: false,
          };
          
          // Show toast
          toast.success(notification.title, {
            description: notification.message,
            duration: 5000,
          });
          
          // Play sound
          playNotificationSound();
          
          // Add to notifications list
          setNotifications((prev) => [notification, ...prev]);
          setUnreadCount((prev) => prev + 1);
        });
      }
      
      lastBookingCount.current = currentCount;
    });

    // Listen for new enquiries
    const enquiriesRef = collection(db, 'contact_messages');
    const enquiriesQuery = query(enquiriesRef, orderBy('createdAt', 'desc'), limit(10));
    
    const unsubscribeEnquiries = onSnapshot(enquiriesQuery, (snapshot) => {
      const currentCount = snapshot.docs.length;
      
      // Skip first load
      if (!initialized.current) {
        lastEnquiryCount.current = currentCount;
        initialized.current = true;
        return;
      }
      
      // Check for new enquiries
      if (currentCount > lastEnquiryCount.current) {
        const newEnquiries = snapshot.docs.slice(0, currentCount - lastEnquiryCount.current);
        
        newEnquiries.forEach((doc) => {
          const data = doc.data();
          const notification: Notification = {
            id: `enquiry-${doc.id}`,
            type: 'enquiry',
            title: '📧 New Enquiry Received!',
            message: `${data.name} sent an enquiry`,
            timestamp: data.createdAt?.toDate() || new Date(),
            read: false,
          };
          
          // Show toast
          toast.info(notification.title, {
            description: notification.message,
            duration: 5000,
          });
          
          // Play sound
          playNotificationSound();
          
          // Add to notifications list
          setNotifications((prev) => [notification, ...prev]);
          setUnreadCount((prev) => prev + 1);
        });
      }
      
      lastEnquiryCount.current = currentCount;
    });

    return () => {
      unsubscribeBookings();
      unsubscribeEnquiries();
    };
  }, []);

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
    setUnreadCount((prev) => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notif) => ({ ...notif, read: true }))
    );
    setUnreadCount(0);
  };

  const clearNotifications = () => {
    setNotifications([]);
    setUnreadCount(0);
  };

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    clearNotifications,
  };
}

// Play notification sound
function playNotificationSound() {
  try {
    // Create audio context
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Pleasant notification sound (two tones)
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.2);

    // Second tone
    setTimeout(() => {
      const oscillator2 = audioContext.createOscillator();
      const gainNode2 = audioContext.createGain();

      oscillator2.connect(gainNode2);
      gainNode2.connect(audioContext.destination);

      oscillator2.frequency.value = 1000;
      oscillator2.type = 'sine';
      
      gainNode2.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);

      oscillator2.start(audioContext.currentTime);
      oscillator2.stop(audioContext.currentTime + 0.2);
    }, 100);
  } catch (error) {
    console.error('Error playing notification sound:', error);
  }
}
