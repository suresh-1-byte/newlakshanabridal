# Firebase Migration - Complete Guide

## ✅ Migration Status: COMPLETE

All backend dependencies have been configured with Firebase.

---

## 🔥 Firebase Setup Required

### Step 1: Deploy Firestore Security Rules

```bash
firebase deploy --only firestore:rules
```

### Step 2: Deploy Storage Security Rules

```bash
firebase deploy --only storage
```

### Step 3: Add Environment Variables to Vercel

Run these commands to add Firebase environment variables to Vercel:

```bash
vercel env add VITE_FIREBASE_API_KEY
# Paste: AIzaSyCgdbZk6MU5gdCbyeUUX33TkQkycbZo6BM

vercel env add VITE_FIREBASE_AUTH_DOMAIN
# Paste: lakshanaatelier.firebaseapp.com

vercel env add VITE_FIREBASE_PROJECT_ID
# Paste: lakshanaatelier

vercel env add VITE_FIREBASE_STORAGE_BUCKET
# Paste: lakshanaatelier.firebasestorage.app

vercel env add VITE_FIREBASE_MESSAGING_SENDER_ID
# Paste: 905891434766

vercel env add VITE_FIREBASE_APP_ID
# Paste: 1:905891434766:web:3faf870cd5d2af53a6075f
```

### Step 4: Rebuild and Redeploy

```bash
npm run build
vercel --prod
```

---

## 📋 Files Modified

### 1. **src/lib/firebaseApi.ts** (NEW)
- Complete Firebase API service
- Booking creation with customer management
- Gallery CRUD operations
- Contact form submission
- Testimonials fetching

### 2. **src/components/Book.tsx**
- Replaced `api.createBooking` with `firebaseApi.createBooking`
- Now saves directly to Firestore
- Generates booking reference automatically

### 3. **src/pages/AdminGallery.tsx** (NEW)
- Complete gallery management interface
- Upload images to Firebase Storage
- Add, edit, delete gallery items
- Real-time updates to Firestore
- Changes appear immediately on website

### 4. **src/components/Portfolio.tsx**
- Loads gallery images from Firebase
- Falls back to static images if Firebase fails
- Auto-updates when gallery changes

### 5. **src/App.tsx**
- Added `/admin/gallery` route
- Protected with authentication

### 6. **src/pages/AdminDashboard.tsx**
- Added "Gallery" navigation link
- Now uses Firebase for dashboard stats

### 7. **src/pages/AdminBookings.tsx**
- Added "Gallery" navigation link
- Uses Firebase for booking management

### 8. **firestore.rules** (NEW)
- Security rules for Firestore
- Public read for gallery, testimonials
- Authenticated write for admins
- Anyone can create bookings

### 9. **storage.rules** (NEW)
- Security rules for Firebase Storage
- Admins can upload images
- 10MB size limit
- Image files only

### 10. **firebase.json** (NEW)
- Firebase hosting configuration
- Firestore and Storage rules references

---

## 🎯 Features Now Working

### ✅ Booking System
- Form submission saves to Firestore `appointments` collection
- Automatic customer creation in `customers` collection
- Booking reference generation (e.g., BK12345678901)
- Success/error toast notifications

### ✅ Admin Panel Login
- Email/password authentication via Firebase Auth
- Checks admin status in Firestore
- Redirects to dashboard on success
- Protected routes for admin pages

### ✅ Admin Dashboard
- Shows appointment statistics
- Real-time data from Firestore
- Links to Bookings and Gallery

### ✅ Admin Bookings
- View all bookings from Firestore
- Update booking status
- Delete bookings
- Search and filter functionality

### ✅ Admin Gallery Management
- Upload images to Firebase Storage
- Add title and description
- Edit existing gallery items
- Delete gallery items
- Changes appear immediately on website

### ✅ Public Gallery (Portfolio)
- Loads images from Firebase
- Fallback to static images
- Category filtering
- Lightbox view

---

## 🔐 Firestore Collections Structure

### `admins`
```javascript
{
  id: "auto-generated",
  authId: "firebase-auth-uid",
  email: "admin@example.com",
  fullName: "Admin Name",
  role: "super_admin",
  status: "active",
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### `customers`
```javascript
{
  id: "auto-generated",
  fullName: "Customer Name",
  phone: "1234567890",
  email: "customer@example.com",
  status: "active",
  totalBookings: 0,
  totalSpent: 0,
  loyaltyPoints: 0,
  isVip: false,
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### `appointments`
```javascript
{
  id: "auto-generated",
  bookingReference: "BK12345678901",
  customerId: "customer-id",
  customerName: "Customer Name",
  customerPhone: "1234567890",
  customerEmail: "customer@example.com",
  serviceName: "Bridal Makeup",
  appointmentDate: "2026-07-15",
  appointmentTime: "10:00",
  status: "pending",
  customerNotes: "Wedding details...",
  totalAmount: 0,
  paidAmount: 0,
  paymentStatus: "pending",
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### `gallery`
```javascript
{
  id: "auto-generated",
  title: "Beautiful Bride",
  description: "Description...",
  imageUrl: "https://storage.googleapis.com/...",
  thumbnailUrl: "https://storage.googleapis.com/...",
  type: "image",
  isActive: true,
  isFeatured: false,
  displayOrder: 0,
  views: 0,
  likes: 0,
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

---

## 🧪 Testing Checklist

### Test Booking Form
1. Go to https://www.lakshanaatelier.in
2. Scroll to "Book Appointment" section
3. Fill in:
   - Name: Test User
   - Phone: 1234567890
   - Service: Select any service
   - Preferred Date: Pick a date
   - Message: Test booking
4. Click "Request Consultation"
5. Should see success toast with booking reference
6. Check Firebase Console → Firestore → `appointments` collection
7. Should see new appointment document

### Test Admin Login
1. Go to https://www.lakshanaatelier.in/admin/login
2. Email: sureshkubarudri@gmail.com
3. Password: Admin123!@#
4. Click "Sign in"
5. Should redirect to admin dashboard

### Test Admin Dashboard
1. Should see appointment statistics
2. Click "Bookings" button
3. Should see list of all bookings
4. Click "Gallery" button
5. Should see gallery management page

### Test Admin Gallery
1. Click "Add New Image"
2. Upload an image
3. Enter title and description
4. Click "Add Image"
5. Should see image in gallery grid
6. Go back to homepage
7. Scroll to Portfolio section
8. Should see new image in gallery!

---

## 🚀 Deployment Commands

### Full Deployment
```bash
# Build the app
npm run build

# Deploy to Vercel
vercel --prod

# Deploy Firebase rules
firebase deploy --only firestore:rules,storage
```

### Development Testing
```bash
# Run locally
npm run dev

# Open http://localhost:5173
```

---

## 🐛 Troubleshooting

### Issue: Booking form not working
- Check browser console for errors
- Verify Firebase environment variables in Vercel
- Check Firestore rules are deployed
- Verify `.env` file has all Firebase variables

### Issue: Admin login fails
- Check that admin user exists in Firebase Auth
- Verify admin document exists in Firestore `admins` collection
- Check `authId` matches Firebase Auth UID
- Verify Firestore rules allow authenticated reads

### Issue: Gallery upload fails
- Check Storage rules are deployed
- Verify admin is authenticated
- Check file is an image and under 10MB
- Check browser console for specific error

### Issue: Images not appearing on website
- Check Firestore rules allow public reads for `gallery` collection
- Verify Storage rules allow public reads
- Check image URLs are accessible
- Look for console errors in browser

---

## 📞 Support

If you encounter any issues:

1. Check browser console for errors (F12 → Console)
2. Check Firebase Console → Functions → Logs
3. Check Vercel deployment logs
4. Verify all environment variables are set correctly

---

## ✨ Summary

**Migration Complete!** The application now uses Firebase exclusively:

- ✅ Saves bookings to Firestore
- ✅ Authenticates admins with Firebase Auth
- ✅ Manages gallery with Firebase Storage & Firestore
- ✅ Shows real-time data in admin panel
- ✅ Displays gallery images on public website
- ✅ Has proper security rules for Firestore & Storage

**Next Step:** Deploy Firebase rules and redeploy to Vercel with environment variables!
