# 🔥 FIX VERCEL ENVIRONMENT VARIABLES NOW

## ⚠️ THE REAL PROBLEM

The new Firebase API key is in your code, but **NOT in Vercel's environment variables**. 

Vercel needs to be told about the new API key separately!

---

## ✅ SOLUTION: Update Vercel Environment Variables

### Step 1: Go to Vercel Dashboard

1. **Open**: https://vercel.com/dashboard
2. **Find your project**: Click on "lakshanaatelier" or "newlakshanabridal"
3. **Click**: Settings (top navigation)

### Step 2: Update Environment Variables

1. Click **"Environment Variables"** in the left sidebar
2. Find **`VITE_FIREBASE_API_KEY`**
3. Click **"Edit"** or **"..."** → **"Edit"**
4. Replace the old value with the NEW API key:

```
AIzaSyALZO4_0__nNeHNbO0s9WYiJeXgPBpq_94
```

5. Make sure it's set for **"Production"**, **"Preview"**, and **"Development"**
6. Click **"Save"**

### Step 3: Redeploy

After saving:
1. Go to **"Deployments"** tab
2. Click the **"..."** menu on the latest deployment
3. Click **"Redeploy"**
4. Wait 1-2 minutes

---

## 🎯 EXACT STEPS WITH SCREENSHOTS

### 1. Vercel Dashboard
- URL: https://vercel.com/dashboard
- Login if needed
- Click your project

### 2. Settings → Environment Variables
- Left sidebar → Environment Variables
- Find: `VITE_FIREBASE_API_KEY`

### 3. Edit Variable
- Click Edit button
- **OLD Value**: `AIzaSyCgdbZk6MU5gdCbyeUUX33TkQkycbZo6BM`
- **NEW Value**: `AIzaSyALZO4_0__nNeHNbO0s9WYiJeXgPBpq_94`

### 4. Save and Redeploy
- Click Save
- Go to Deployments tab
- Redeploy latest deployment

---

## 📋 ALL ENVIRONMENT VARIABLES (FOR REFERENCE)

Make sure these are all set in Vercel:

```
VITE_FIREBASE_API_KEY=AIzaSyALZO4_0__nNeHNbO0s9WYiJeXgPBpq_94
VITE_FIREBASE_AUTH_DOMAIN=lakshanaatelier.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=lakshanaatelier
VITE_FIREBASE_STORAGE_BUCKET=lakshanaatelier.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=905891434766
VITE_FIREBASE_APP_ID=1:905891434766:web:3faf870cd5d2af53a6075f
```

---

## 🚀 AFTER REDEPLOYING

1. **Wait 2 minutes** for deployment to complete
2. **Clear browser cache** (Ctrl + Shift + Delete)
3. **Go to**: https://lakshanaatelier.in/admin/login
4. **Login with**:
   - Email: `sureshhkathirvel601@gmail.com`
   - Password: `Adminkaks12@`

---

## ✨ THIS WILL FIX IT!

The API key is correct in your code, but Vercel uses its own environment variables that override the code. Once you update them in Vercel dashboard and redeploy, everything will work!

---

**Go to Vercel Dashboard NOW: https://vercel.com/dashboard**
