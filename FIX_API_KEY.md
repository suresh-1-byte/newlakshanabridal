# 🔑 Fix Firebase API Key Issue

## The Problem
Error: `auth/user-key-not-valid--please-pass-a-valid-api-key`

This means the Firebase API key is either:
1. ❌ Restricted and blocking your website
2. ❌ Invalid or revoked
3. ❌ Not properly configured

---

## ✅ SOLUTION 1: Remove API Key Restrictions (Recommended)

### Step 1: Go to Google Cloud Console
1. Open: https://console.cloud.google.com/apis/credentials
2. **Login** with your Google account
3. **Select Project**: `lakshanaatelier`

### Step 2: Find Your API Key
1. Look for the API key: `AIzaSyCgdbZk6MU5gdCbyeUUX33TkQkycbZo6BM`
2. Click on it to edit

### Step 3: Remove Restrictions
1. Scroll to **"Application restrictions"**
2. Select: **"None"** (no restrictions)
3. Scroll to **"API restrictions"**
4. Select: **"Don't restrict key"**
5. Click **"Save"**

### Step 4: Wait & Test
1. Wait 1-2 minutes for changes to apply
2. Try creating admin user again

---

## ✅ SOLUTION 2: Enable Required APIs

### Go to Firebase Console
1. Open: https://console.firebase.google.com/
2. Select project: **lakshanaatelier**
3. Go to: **Authentication** → **Sign-in method**
4. Make sure **Email/Password** is **ENABLED** ✅

### Enable Identity Toolkit API
1. Go to: https://console.cloud.google.com/apis/library
2. Search for: **"Identity Toolkit API"**
3. Click **"ENABLE"** if not already enabled

---

## ✅ SOLUTION 3: Generate New API Key

If the above doesn't work, create a new API key:

### Step 1: Go to Firebase Console
1. Open: https://console.firebase.google.com/
2. Select: **lakshanaatelier**
3. Click ⚙️ (Settings) → **Project settings**

### Step 2: Get New Web App Config
1. Scroll to **"Your apps"**
2. Find the Web app (globe icon 🌐)
3. Click **"Config"** or **"SDK setup and configuration"**
4. Copy the new `firebaseConfig` object

### Step 3: Update .env File
Replace the values in `.env` with new config:
```
VITE_FIREBASE_API_KEY=<new_api_key>
VITE_FIREBASE_AUTH_DOMAIN=<auth_domain>
VITE_FIREBASE_PROJECT_ID=<project_id>
VITE_FIREBASE_STORAGE_BUCKET=<storage_bucket>
VITE_FIREBASE_MESSAGING_SENDER_ID=<sender_id>
VITE_FIREBASE_APP_ID=<app_id>
```

### Step 4: Restart & Test
1. Close all browser tabs
2. Restart local dev server if running
3. Try again

---

## ✅ SOLUTION 4: Use Firebase Console Directly

**Skip the HTML tool and create user directly in Firebase:**

### Step 1: Go to Firebase Console
1. Open: https://console.firebase.google.com/
2. Select: **lakshanaatelier**

### Step 2: Add User
1. Click **Authentication** (left sidebar)
2. Click **Users** tab
3. Click **"Add user"** button
4. Enter:
   - Email: `sureshhkathirvel601@gmail.com`
   - Password: `Admin123@`
5. Click **"Add user"**

### Step 3: Add Admin Document in Firestore
1. Click **Firestore Database** (left sidebar)
2. Click **"+ Start collection"** (if first time) or find **"admins"** collection
3. Collection ID: `admins`
4. Click **"Next"**
5. Document ID: Copy the UID from the user you just created in Authentication
6. Add these fields:

```
Field Name          | Type    | Value
--------------------|---------|---------------------------
authId              | string  | (paste the user UID)
email               | string  | sureshhkathirvel601@gmail.com
fullName            | string  | Suresh
phone               | string  | +91 9876543210
role                | string  | super_admin
status              | string  | active
designation         | string  | Super Administrator
department          | string  | Management
createdAt           | timestamp | (click "Set to current time")
updatedAt           | timestamp | (click "Set to current time")
lastLogin           | null    | null
```

7. Click **"Save"**

### Step 4: Login
Now try logging in at:
- https://lakshanaatelier.in/admin/login
- Email: `sureshhkathirvel601@gmail.com`
- Password: `Admin123@`

---

## 🎯 Which Solution Should You Try?

**Try them in this order:**

1. ✅ **Solution 1** (Remove restrictions) - Takes 2 minutes
2. ✅ **Solution 2** (Enable APIs) - Takes 1 minute  
3. ✅ **Solution 4** (Use Firebase Console) - Most reliable, takes 5 minutes
4. ✅ **Solution 3** (New API key) - Last resort

---

## 📞 Need Help?

If you're stuck on any step:
1. Take a screenshot of where you're stuck
2. Check if you have access to the Firebase Console
3. Verify you're logged into the correct Google account

---

## ✨ After Fixing

Once the API key is fixed or user is created:
- ✅ You can login at: https://lakshanaatelier.in/admin/login
- ✅ The HTML tools will work properly
- ✅ The admin panel will be fully functional
