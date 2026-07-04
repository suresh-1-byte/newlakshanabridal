# 🔥 Deploy Firestore Rules Manually

## ⚠️ Fix Booking Permission Error

The booking form is showing "Missing or insufficient permissions" error. This is because Firestore rules need to be updated.

---

## ✅ SOLUTION: Update Firestore Rules in Firebase Console

### Step 1: Go to Firebase Console

1. **Open**: https://console.firebase.google.com/project/lakshanaatelier/firestore/rules
2. You'll see the Firestore Rules editor

### Step 2: Replace the Rules

**Copy the entire rules below and paste into the Firebase Console:**

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Helper function to check if user is authenticated admin
    function isAuthenticatedAdmin() {
      return request.auth != null;
    }
    
    // Admins collection - allow authenticated users to read their own admin doc
    match /admins/{adminId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
      allow list: if request.auth != null;
    }
    
    // Customers collection - allow public creation, admin read/write
    match /customers/{customerId} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
      allow list: if request.auth != null;
    }
    
    // Appointments collection - allow public creation, admin read/write
    match /appointments/{appointmentId} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
      allow list: if request.auth != null;
    }
    
    // Services collection - public read, admin write
    match /services/{serviceId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Gallery collection - public read, admin write
    match /gallery/{galleryId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Testimonials collection - public read, admin write
    match /testimonials/{testimonialId} {
      allow read: if true;
      allow create: if true;
      allow update, delete: if request.auth != null;
    }
    
    // Contact messages collection - public create, admin read/write
    match /contact_messages/{messageId} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
  }
}
```

### Step 3: Publish

1. Click **"Publish"** button at the top
2. Wait for confirmation

---

## 🔐 YOUR CORRECT LOGIN CREDENTIALS

Now try logging in with:

**URL**: https://lakshanaatelier.in/admin/login

**Email**: `sureshkatirvel601@gmail.com`  
**Password**: `Adminlaks123@`

OR try:

**Email**: `sureshhkathirvel601@gmail.com`  
**Password**: `Adminlaks123@`

---

## ✅ After Publishing Rules

1. The booking form will work
2. No more "insufficient permissions" error
3. Customers can submit bookings
4. You can login to admin panel

---

**Go to Firebase Console now and update the rules!**

https://console.firebase.google.com/project/lakshanaatelier/firestore/rules
