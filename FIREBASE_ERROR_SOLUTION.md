# 🔥 Firebase API Key Error - Complete Solution

## ❌ Current Error
```
Firebase: Error (auth/api-key-not-valid.-please-pass-a-valid-api-key.)
```

## 🎯 Root Cause Analysis

The error occurs because:
1. **Firebase project might not be created yet**, OR
2. **API key is incorrect or revoked**, OR
3. **Environment variables are not loading properly**

---

## ✅ SOLUTION: Complete Firebase Setup

### Step 1: Create Firebase Project (If Not Done)

1. **Go to Firebase Console:**
   - Visit: https://console.firebase.google.com/
   - Sign in with: `sureshkathirvel801@gmail.com`

2. **Create New Project:**
   ```
   Project Name: lakshanaatelier
   Enable Google Analytics: Optional (can skip)
   ```

3. **Wait for project creation** (takes 1-2 minutes)

---

### Step 2: Get Firebase Web App Configuration

1. **In Firebase Console, click "Add app" → Web (</> icon)**

2. **Register your app:**
   ```
   App nickname: Lakshana Atelier Web
   ☑ Also set up Firebase Hosting (optional)
   ```

3. **Copy the Firebase Config:**
   ```javascript
   const firebaseConfig = {
     apiKey: "AIzaSy...",              // ← Copy this
     authDomain: "lakshanaatelier.firebaseapp.com",
     projectId: "lakshanaatelier",
     storageBucket: "lakshanaatelier.appspot.com",
     messagingSenderId: "123456789",
     appId: "1:123456789:web:abc123"
   };
   ```

---

### Step 3: Update .env File

1. **Open:** `lakshana-luxe-glow-main/.env`

2. **Replace the Firebase section with your new config:**
   ```env
   # Firebase Configuration
   VITE_FIREBASE_API_KEY=YOUR_NEW_API_KEY_HERE
   VITE_FIREBASE_AUTH_DOMAIN=lakshanaatelier.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=lakshanaatelier
   VITE_FIREBASE_STORAGE_BUCKET=lakshanaatelier.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=YOUR_SENDER_ID
   VITE_FIREBASE_APP_ID=YOUR_APP_ID
   ```

3. **Save the file**

---

### Step 4: Enable Firebase Authentication

1. **In Firebase Console, go to:**
   ```
   Build → Authentication → Get Started
   ```

2. **Enable Email/Password sign-in:**
   - Click "Sign-in method" tab
   - Click "Email/Password"
   - Enable the first option (Email/Password)
   - Save

---

### Step 5: Create Admin User

1. **Go to: Authentication → Users tab**

2. **Click "Add user" button**

3. **Enter admin credentials:**
   ```
   Email: sureshkathirvel801@gmail.com
   Password: Admin123!@#
   ```

4. **Click "Add user"**

5. **IMPORTANT: Copy the User UID** (e.g., `Abc123XyZ...`)

---

### Step 6: Create Firestore Database

1. **Go to: Build → Firestore Database**

2. **Click "Create database"**

3. **Choose mode:**
   - Start in: **Production mode**
   - Location: Choose nearest (asia-south1 for India)

4. **Create collections:**

   **Collection: `admins`**
   ```
   Document ID: [Use the User UID from Step 5]
   Fields:
   {
     "email": "sureshkathirvel801@gmail.com",
     "fullName": "Admin User",
     "role": "super_admin",
     "status": "active",
     "createdAt": [Use Firestore timestamp],
     "updatedAt": [Use Firestore timestamp]
   }
   ```

---

### Step 7: Set Firestore Security Rules

1. **Go to: Firestore Database → Rules tab**

2. **Replace with:**
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       // Allow authenticated users to read/write their own data
       match /admins/{adminId} {
         allow read, write: if request.auth != null && request.auth.uid == adminId;
       }
       
       // Bookings - authenticated users can create, admins can read/write
       match /bookings/{bookingId} {
         allow create: if true;
         allow read, update, delete: if request.auth != null;
       }
       
       // Gallery - public read, admin write
       match /gallery/{imageId} {
         allow read: if true;
         allow write: if request.auth != null;
       }
       
       // Testimonials - public read, admin write
       match /testimonials/{testimonialId} {
         allow read: if true;
         allow write: if request.auth != null;
       }
       
       // Services - public read, admin write
       match /services/{serviceId} {
         allow read: if true;
         allow write: if request.auth != null;
       }
     }
   }
   ```

3. **Click "Publish"**

---

### Step 8: Enable Firebase Storage

1. **Go to: Build → Storage**

2. **Click "Get started"**

3. **Choose production mode** → Next → Done

4. **Set Storage Rules:**
   ```javascript
   rules_version = '2';
   service firebase.storage {
     match /b/{bucket}/o {
       match /gallery/{imageId} {
         allow read: if true;
         allow write: if request.auth != null;
       }
       
       match /testimonials/{imageId} {
         allow read: if true;
         allow write: if request.auth != null;
       }
       
       match /services/{imageId} {
         allow read: if true;
         allow write: if request.auth != null;
       }
     }
   }
   ```

---

### Step 9: Test the Setup

1. **Run the fix script:**
   ```batch
   FIX_FIREBASE_AND_PASSWORD_TOGGLE.bat
   ```

2. **Open browser:**
   ```
   http://localhost:5173/admin/login
   ```

3. **Verify Password Toggle:**
   - ✅ Eye icon should appear on the right of password field
   - ✅ Click to toggle visibility

4. **Test Login:**
   ```
   Email: sureshkathirvel801@gmail.com
   Password: Admin123!@#
   ```

5. **Expected Result:**
   - ✅ No Firebase error
   - ✅ Successfully logged in
   - ✅ Redirected to admin dashboard

---

## 🐛 Troubleshooting

### Issue: Password toggle not showing

**Solution 1: Hard refresh browser**
```
Windows: Ctrl + Shift + R
Mac: Cmd + Shift + R
```

**Solution 2: Clear cache and rebuild**
```batch
# Delete these folders:
dist
node_modules\.vite

# Then run:
npm run dev
```

---

### Issue: Still getting API key error after update

**Solution 1: Verify .env file is saved**
- Make sure you saved the file after editing
- Check that there are no extra spaces in the API key

**Solution 2: Restart dev server**
```batch
# Stop the server (Ctrl+C)
# Start again:
npm run dev
```

**Solution 3: Check Firebase project status**
- Go to Firebase Console
- Verify project is "Active" (not deleted/suspended)

---

### Issue: Login says "Invalid credentials"

**Solution: Verify admin user exists**
1. Go to Firebase Console → Authentication → Users
2. Check if `sureshkathirvel801@gmail.com` exists
3. If not, add it again (Step 5 above)

---

## 📚 Quick Reference

### ✅ Password Toggle Feature
**Location:** Admin Login Page (`/admin/login`)

**How it works:**
- Eye icon (👁️) appears on the right side of password field
- Click to toggle between:
  - 🔒 Hidden: `••••••••`
  - 👁️ Visible: `Admin123!@#`
- Champagne gold color on hover
- Smooth transitions

**Files modified:**
- `src/pages/AdminLogin.tsx` (lines 12, 165-176)

---

### 🔥 Firebase Setup Checklist

- [ ] Firebase project created
- [ ] Web app registered in Firebase
- [ ] .env file updated with new API key
- [ ] Email/Password authentication enabled
- [ ] Admin user created in Authentication
- [ ] Firestore database created
- [ ] Admin document added to `admins` collection
- [ ] Firestore security rules set
- [ ] Firebase Storage enabled
- [ ] Storage security rules set
- [ ] Dev server restarted
- [ ] Browser cache cleared
- [ ] Login tested successfully

---

## 🎉 Success Indicators

When everything is working correctly, you should see:

1. ✅ **No console errors** about Firebase API key
2. ✅ **Eye icon visible** on password field
3. ✅ **Password toggles** between hidden/visible
4. ✅ **Login succeeds** with correct credentials
5. ✅ **Redirects to dashboard** after login
6. ✅ **Bookings appear** in admin panel when customers book

---

## 📞 Support

If you still face issues:
1. Check browser console (F12) for detailed error messages
2. Verify Firebase project settings in Firebase Console
3. Ensure .env file has correct values (no typos, no extra spaces)
4. Try creating a completely new Firebase project and start fresh

---

**Last Updated:** January 2026
**Firebase SDK Version:** 12.15.0
