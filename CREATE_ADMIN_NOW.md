# 🔐 CREATE ADMIN USER - DO THIS NOW

Your admin login shows: `Firebase: Error (auth/api-key-not-valid)`

This means either:
1. Admin user doesn't exist in Firebase
2. OR Firebase API key needs to be refreshed

## ✅ **FIX IT NOW - 3 STEPS:**

---

### **STEP 1: Go to Firebase Console**

Already open? Good! If not:
- Go to: https://console.firebase.google.com
- Sign in with: sureshkathirvel601@gmail.com
- Find and click: **lakshanaatelier** project

---

### **STEP 2: Create Admin User in Authentication**

1. **In left sidebar** → Click **"Authentication"**
2. **Click "Users" tab** at the top
3. **Click "Add User"** button

4. **Fill in:**
   ```
   Email: sureshkathirvel601@gmail.com
   Password: Admin123!@#
   ```
   (You can change this later)

5. **Click "Add User"**
6. **COPY THE USER UID** - You'll need this!
   - It looks like: `xYz123AbC456DeF789`
   - Save it somewhere

---

### **STEP 3: Create Admin Document in Firestore**

1. **In left sidebar** → Click **"Firestore Database"**
2. **Click "Data" tab** at the top
3. **Click "Start collection"** (or "+ Start collection")

4. **Create collection:**
   ```
   Collection ID: admins
   ```
   Click "Next"

5. **Add document fields** (one by one):

   Click "Auto-ID" for Document ID, then add these fields:

   | Field Name | Type | Value |
   |------------|------|-------|
   | authId | string | PASTE_THE_UID_YOU_COPIED |
   | email | string | sureshkathirvel601@gmail.com |
   | fullName | string | Admin |
   | phone | string | +919876543210 |
   | role | string | super_admin |
   | status | string | active |
   | createdAt | timestamp | (Click timestamp icon → "Set to server timestamp") |
   | updatedAt | timestamp | (Click timestamp icon → "Set to server timestamp") |

6. **Click "Save"**

---

### **STEP 4: Test Admin Login**

1. Go to: https://lakshanaatelier.in/admin/login
2. Enter:
   - Email: `sureshkathirvel601@gmail.com`
   - Password: `Admin123!@#`
3. Click "Sign In to Dashboard"
4. ✅ **Should work now!**

---

## 🚨 **IF ADMIN LOGIN STILL SHOWS API KEY ERROR:**

The Firebase API key might be wrong. Let's get the correct one:

### **Get Correct Firebase Config:**

1. **In Firebase Console** → Click **gear icon** (⚙️) top left
2. Click **"Project settings"**
3. Scroll down to **"Your apps"** section
4. Find the **Web app** (should be there)
5. You'll see the Firebase config:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_ACTUAL_API_KEY",  // ← COPY THIS
  authDomain: "lakshanaatelier.firebaseapp.com",
  projectId: "lakshanaatelier",
  storageBucket: "lakshanaatelier.firebasestorage.app",
  messagingSenderId: "905891434766",
  appId: "1:905891434766:web:..."
};
```

6. **Copy the REAL API Key**
7. **Tell me** and I'll update your code

---

## 🎯 **QUICK SUMMARY:**

**What you need to do:**
1. ✅ Login to Firebase Console with sureshkathirvel601@gmail.com
2. ✅ Create user in Authentication (email + password)
3. ✅ Copy the User UID
4. ✅ Create admin document in Firestore with that UID
5. ✅ Try logging in to admin panel

**Time:** 5 minutes total

**Difficulty:** Easy (just clicking and copying)

---

## 📋 **CHECKLIST:**

- [ ] Firebase Console open
- [ ] Logged in with correct account
- [ ] lakshanaatelier project selected
- [ ] User created in Authentication
- [ ] User UID copied
- [ ] Admin document created in Firestore
- [ ] authId matches User UID
- [ ] status is "active"
- [ ] Tested admin login
- [ ] Dashboard loads

---

**After this, your admin login will work!** 🎉

Then we'll create the indexes to fix gallery and testimonials.
