# 🔥 FIREBASE MIGRATION GUIDE

## ✅ WHAT I'VE DONE SO FAR

I've created the complete Firebase infrastructure for your project:

### ✅ Files Created:
1. **`src/lib/firebase.ts`** - Firebase initialization & configuration
2. **`src/lib/firebaseApi.ts`** - Complete API layer (bookings, contacts, services, etc.)
3. **`src/contexts/FirebaseAuthContext.tsx`** - Authentication context for admin login
4. **`.env.firebase`** - Environment variables template

### ✅ Features Implemented:
- ✅ Firebase Authentication (for admin login)
- ✅ Firestore Database (for all data storage)
- ✅ Booking system (create appointments, manage customers)
- ✅ Contact form submissions
- ✅ Services management
- ✅ Testimonials
- ✅ Admin authentication & authorization
- ✅ Complete TypeScript types

---

## 🚀 WHAT YOU NEED TO DO NOW

### **STEP 1: Create Firebase Project** (5 minutes)

1. **Go to Firebase Console:**
   ```
   https://console.firebase.google.com/
   ```

2. **Click "Add Project"**

3. **Enter project name:**
   ```
   lakshana-atelier
   ```

4. **Disable Google Analytics** (optional - you can enable later)

5. **Click "Create Project"** and wait ~30 seconds

---

### **STEP 2: Enable Authentication** (2 minutes)

1. In your Firebase project, click **"Authentication"** in the left sidebar

2. Click **"Get Started"**

3. Click on **"Email/Password"** provider

4. **Enable** the toggle

5. Click **"Save"**

---

### **STEP 3: Create Firestore Database** (2 minutes)

1. Click **"Firestore Database"** in the left sidebar

2. Click **"Create Database"**

3. Choose **"Start in production mode"**

4. Select location: **asia-south1 (Mumbai)** or closest to you

5. Click **"Enable"**

---

### **STEP 4: Get Firebase Config** (3 minutes)

1. Click the **gear icon** (⚙️) next to "Project Overview"

2. Click **"Project Settings"**

3. Scroll down to **"Your apps"** section

4. Click the **Web icon** (`</>`)

5. Register app:
   - **App nickname:** `lakshana-atelier-web`
   - **Don't check** "Firebase Hosting"
   - Click **"Register app"**

6. **Copy the firebaseConfig object:**
   ```javascript
   const firebaseConfig = {
     apiKey: "AIza...",
     authDomain: "lakshana-atelier.firebaseapp.com",
     projectId: "lakshana-atelier",
     storageBucket: "lakshana-atelier.appspot.com",
     messagingSenderId: "1234567890",
     appId: "1:1234567890:web:abc123"
   };
   ```

---

### **STEP 5: Update Environment Variables** (2 minutes)

1. **Open `.env.firebase` file** (I created this for you)

2. **Replace the values** with your Firebase config:
   ```env
   VITE_FIREBASE_API_KEY=AIza...
   VITE_FIREBASE_AUTH_DOMAIN=lakshana-atelier.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=lakshana-atelier
   VITE_FIREBASE_STORAGE_BUCKET=lakshana-atelier.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=1234567890
   VITE_FIREBASE_APP_ID=1:1234567890:web:abc123
   ```

3. **Rename the file:**
   ```bash
   Rename: .env.firebase → .env
   ```
   (Replace your old .env file)

---

### **STEP 6: Set Up Firestore Security Rules** (3 minutes)

1. Go to **Firestore Database** in Firebase Console

2. Click **"Rules"** tab

3. **Replace all rules** with this:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Allow anyone to read services
    match /services/{serviceId} {
      allow read: if resource.data.isActive == true;
      allow write: if request.auth != null && get(/databases/$(database)/documents/admins/$(request.auth.uid)).data.role in ['super_admin', 'admin'];
    }
    
    // Allow anyone to create customers
    match /customers/{customerId} {
      allow create: if true;
      allow read: if request.auth != null;
      allow update, delete: if request.auth != null && get(/databases/$(database)/documents/admins/$(request.auth.uid)).data.role in ['super_admin', 'admin'];
    }
    
    // Allow anyone to create appointments (bookings)
    match /appointments/{appointmentId} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
    
    // Allow anyone to submit contact messages
    match /contact_messages/{messageId} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
    
    // Testimonials - read if approved, admin can write
    match /testimonials/{testimonialId} {
      allow read: if resource.data.isApproved == true && resource.data.isActive == true;
      allow write: if request.auth != null && get(/databases/$(database)/documents/admins/$(request.auth.uid)).data.role in ['super_admin', 'admin'];
    }
    
    // Admins - only authenticated users can read their own profile
    match /admins/{adminId} {
      allow read: if request.auth != null && (
        request.auth.uid == adminId || 
        request.auth.uid == resource.data.authId
      );
      allow write: if request.auth != null && get(/databases/$(database)/documents/admins/$(request.auth.uid)).data.role == 'super_admin';
    }
    
    // Service Categories - public read
    match /service_categories/{categoryId} {
      allow read: if resource.data.isActive == true;
      allow write: if request.auth != null && get(/databases/$(database)/documents/admins/$(request.auth.uid)).data.role in ['super_admin', 'admin'];
    }
    
    // Gallery - public read
    match /gallery/{galleryId} {
      allow read: if resource.data.isActive == true;
      allow write: if request.auth != null;
    }
    
    // Blog Posts - public read if published
    match /blog_posts/{postId} {
      allow read: if resource.data.isPublished == true;
      allow write: if request.auth != null;
    }
  }
}
```

4. Click **"Publish"**

---

### **STEP 7: Create Admin User** (3 minutes)

1. Go to **Authentication** in Firebase Console

2. Click **"Users"** tab

3. Click **"Add User"**

4. Enter:
   - **Email:** `sureshkubarudri@gmail.com`
   - **Password:** `Admin123!@#password`

5. Click **"Add User"**

6. **Copy the User UID** (it looks like: `abc123def456...`)

7. Go to **Firestore Database**

8. Click **"Start Collection"**

9. Collection ID: `admins`

10. Click **"Next"**

11. **Document ID:** Use the User UID you copied

12. **Add fields:**
    - `authId` (string): Paste the User UID
    - `email` (string): `sureshkubarudri@gmail.com`
    - `fullName` (string): `Super Admin`
    - `role` (string): `super_admin`
    - `status` (string): `active`
    - `createdAt` (timestamp): Click "Set to current time"
    - `updatedAt` (timestamp): Click "Set to current time"

13. Click **"Save"**

---

## 🔄 NEXT: UPDATE YOUR CODE

Now I need to update your existing components to use Firebase instead of Supabase.

**Tell me when you've completed Steps 1-7 above, and I'll continue with the code migration!**

---

## 📊 MIGRATION PROGRESS

- [x] Phase 1: Firebase setup files created
- [x] Phase 2: API layer implemented
- [x] Phase 3: Auth context created
- [ ] Phase 4: Update Book component (waiting for your Firebase setup)
- [ ] Phase 5: Update Admin login (waiting for your Firebase setup)
- [ ] Phase 6: Update Admin panel components (waiting for your Firebase setup)
- [ ] Phase 7: Testing & verification

---

## ⏱️ ESTIMATED TIME

- Firebase setup (Steps 1-7): **20 minutes**
- Code migration (my work): **30 minutes**
- Testing: **10 minutes**

**Total:** ~1 hour

---

## 🆘 NEED HELP?

If you get stuck on any step:
1. Take a screenshot
2. Tell me which step
3. I'll guide you through it

---

**Start with Step 1 and let me know when you're done!** 🚀
