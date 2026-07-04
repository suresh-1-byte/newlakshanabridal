# 🔴 URGENT: FIX ADMIN LOGIN ERROR

## 🚨 **THE PROBLEM**

When you try to login at https://lakshanaatelier.in/admin/login, you get:

```
Firebase Error (auth/api-key-not-valid-please-pass-a-valid-api-key)
```

## 🔍 **ROOT CAUSE**

Your Vercel deployment is **missing Firebase environment variables**. The variables are empty:

```
VITE_FIREBASE_API_KEY=""           ← EMPTY!
VITE_FIREBASE_AUTH_DOMAIN=""      ← EMPTY!
VITE_FIREBASE_PROJECT_ID=""       ← EMPTY!
```

Without these, Firebase cannot initialize, so login fails.

---

## ✅ **THE SOLUTION (5 Minutes)**

You need to add Firebase configuration to Vercel.

---

## 🎯 **METHOD 1: Vercel Dashboard (RECOMMENDED)**

### Step 1: Open Vercel Dashboard
1. Go to: **https://vercel.com/login**
2. Login with your account
3. Find and click your project: **lakshana-luxe-glow-main**

### Step 2: Open Environment Variables
1. Click **"Settings"** tab (top navigation)
2. Click **"Environment Variables"** in left sidebar
3. You should see a page to add variables

### Step 3: Add Firebase Variables

Click **"Add New"** button and add these **6 variables** one by one:

#### Variable 1:
```
Name: VITE_FIREBASE_API_KEY
Value: AIzaSyCgdbZk6MU5gdCbyeUUX33TkQkycbZo6BM
Environments: ✅ Production ✅ Preview ✅ Development
```
Click **"Save"**

#### Variable 2:
```
Name: VITE_FIREBASE_AUTH_DOMAIN
Value: lakshanaatelier.firebaseapp.com
Environments: ✅ Production ✅ Preview ✅ Development
```
Click **"Save"**

#### Variable 3:
```
Name: VITE_FIREBASE_PROJECT_ID
Value: lakshanaatelier
Environments: ✅ Production ✅ Preview ✅ Development
```
Click **"Save"**

#### Variable 4:
```
Name: VITE_FIREBASE_STORAGE_BUCKET
Value: lakshanaatelier.firebasestorage.app
Environments: ✅ Production ✅ Preview ✅ Development
```
Click **"Save"**

#### Variable 5:
```
Name: VITE_FIREBASE_MESSAGING_SENDER_ID
Value: 905891434766
Environments: ✅ Production ✅ Preview ✅ Development
```
Click **"Save"**

#### Variable 6:
```
Name: VITE_FIREBASE_APP_ID
Value: 1:905891434766:web:3faf870cd5d2af53a6075f
Environments: ✅ Production ✅ Preview ✅ Development
```
Click **"Save"**

### Step 4: Redeploy Your Site
1. Click **"Deployments"** tab (top navigation)
2. Find the latest deployment (first row)
3. Click the **"..."** (three dots) menu on the right
4. Click **"Redeploy"**
5. Confirm by clicking **"Redeploy"** again
6. Wait 2-3 minutes for deployment to complete

### Step 5: Test Admin Login
1. Open: **https://lakshanaatelier.in/admin/login**
2. Clear browser cache: **Ctrl + Shift + Delete** → Clear everything
3. Refresh page: **Ctrl + Shift + R**
4. Try login:
   ```
   Email: admin@lakshanaatelier.in
   Password: Admin123!@#password
   ```
5. ✅ **Should work now!**

---

## 📸 **VISUAL GUIDE: Where to Add Variables**

### What You'll See in Vercel:

```
┌──────────────────────────────────────────────────────┐
│  lakshana-luxe-glow-main                             │
├──────────────────────────────────────────────────────┤
│  ☰ Overview                                          │
│  ⚙️ Settings                  ← Click here           │
│     • General                                        │
│     • Domains                                        │
│     • Environment Variables   ← Then click here     │
│     • Git                                            │
│  📊 Deployments                                      │
└──────────────────────────────────────────────────────┘
```

### Environment Variables Page:

```
┌─────────────────────────────────────────────────────┐
│  Environment Variables                              │
├─────────────────────────────────────────────────────┤
│                                                     │
│  [ + Add New ]  ← Click this button                │
│                                                     │
│  ┌───────────────────────────────────────────────┐ │
│  │ Name:  [VITE_FIREBASE_API_KEY           ]    │ │
│  │ Value: [AIzaSy...                       ]    │ │
│  │                                              │ │
│  │ Environments:                                │ │
│  │ ☑ Production  ☑ Preview  ☑ Development     │ │
│  │                                              │ │
│  │ [Cancel]  [Save]                             │ │
│  └───────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────┘
```

---

## 🔄 **METHOD 2: Automated Script**

If you prefer command line:

1. Open Command Prompt in this folder
2. Run: `FIX_VERCEL_ENV.bat`
3. Follow the prompts
4. Redeploy on Vercel Dashboard

---

## 🧪 **VERIFY IT'S FIXED**

### Check 1: Environment Variables Added
1. Go to Vercel → Settings → Environment Variables
2. You should see **6 variables** starting with `VITE_FIREBASE_`
3. All should have values (not empty)

### Check 2: Deployment Successful
1. Go to Vercel → Deployments
2. Latest deployment should show **"Ready"** status (green checkmark)
3. No errors in build logs

### Check 3: Website Works
1. Open: https://lakshanaatelier.in
2. Press F12 (open console)
3. Look for Firebase initialization message
4. Should see: ✅ "Firebase initialization: SUCCESS"
5. Should NOT see: ❌ "api-key-not-valid" error

### Check 4: Admin Login Works
1. Go to: https://lakshanaatelier.in/admin/login
2. Enter credentials:
   ```
   Email: admin@lakshanaatelier.in
   Password: Admin123!@#password
   ```
3. Click "Sign In to Dashboard"
4. ✅ Should redirect to admin dashboard
5. ✅ No Firebase errors

---

## 🔐 **ADMIN LOGIN CREDENTIALS**

Once fixed, use these credentials:

**Email:** `admin@lakshanaatelier.in`

**Password:** `Admin123!@#password`

*(Note: There are multiple possible passwords in the documentation. Try these in order:)*
1. `Admin123!@#password`
2. `Admin123!@#`
3. Check with the person who created the Firebase admin user

---

## ❓ **TROUBLESHOOTING**

### Problem: "Can't find my Vercel project"

**Solution:**
1. Make sure you're logged into the correct Vercel account
2. Check team account if you have multiple
3. Project name: **lakshana-luxe-glow-main** or **lakshanaatelier**

---

### Problem: "Don't see Environment Variables in Settings"

**Solution:**
1. Make sure you clicked on the correct project
2. Settings tab should be at the top
3. Scroll down in left sidebar to find "Environment Variables"
4. If still not visible, your account may need permissions

---

### Problem: "Variables added but still getting error"

**Solution:**
1. Make sure you clicked **"Save"** for each variable
2. Make sure you selected all 3 environments (Production, Preview, Development)
3. Make sure you **redeployed** the site after adding variables
4. Clear browser cache completely
5. Try in incognito/private window

---

### Problem: "Redeploy not working"

**Solution:**
1. Go to Deployments tab
2. Click "..." on latest deployment
3. Click "Redeploy"
4. If that fails, make a small change to any file and push to GitHub
5. Vercel will auto-deploy

---

### Problem: "Admin password not working"

**Solution:**

Try these passwords in order:
1. `Admin123!@#password`
2. `Admin123!@#`
3. `admin123`

If none work:
1. Go to Firebase Console: https://console.firebase.google.com
2. Click Authentication → Users
3. Find: admin@lakshanaatelier.in
4. Click "Reset password"
5. Check your email for reset link
6. Set new password

---

## 📋 **CHECKLIST**

Complete these steps:

- [ ] Opened Vercel Dashboard
- [ ] Found project: lakshana-luxe-glow-main
- [ ] Clicked Settings → Environment Variables
- [ ] Added VITE_FIREBASE_API_KEY
- [ ] Added VITE_FIREBASE_AUTH_DOMAIN
- [ ] Added VITE_FIREBASE_PROJECT_ID
- [ ] Added VITE_FIREBASE_STORAGE_BUCKET
- [ ] Added VITE_FIREBASE_MESSAGING_SENDER_ID
- [ ] Added VITE_FIREBASE_APP_ID
- [ ] Selected all 3 environments for each
- [ ] Clicked "Save" for each variable
- [ ] Went to Deployments tab
- [ ] Clicked "Redeploy" on latest deployment
- [ ] Waited 2-3 minutes for deployment
- [ ] Cleared browser cache
- [ ] Tested admin login
- [ ] ✅ Login works!

---

## 🎯 **NEXT STEPS AFTER LOGIN WORKS**

Once you can login successfully:

1. **Create Firestore Indexes** (Still required!)
   - Open: `📌_START_HERE_COMPLETE_SOLUTION.md`
   - Follow the index creation steps
   - This fixes the gallery and testimonials

2. **Change Admin Password**
   - Click your profile in admin panel
   - Change to a secure password
   - Save it somewhere safe

3. **Test All Features**
   - Gallery management
   - Bookings
   - Image upload
   - All CRUD operations

---

## 📞 **NEED HELP?**

If you're stuck:

1. **Take screenshots:**
   - Vercel environment variables page
   - Admin login error (if any)
   - Browser console (F12)

2. **Check these:**
   - Are all 6 variables added?
   - Are values correct (not empty)?
   - Did you redeploy after adding?
   - Did you clear browser cache?

3. **Alternative:**
   - Ask team member with Vercel access
   - Check Vercel documentation
   - Contact Vercel support

---

## ⏱️ **TIME ESTIMATE**

- Add environment variables: **5 minutes**
- Redeploy: **2-3 minutes**
- Test: **2 minutes**
- **Total: ~10 minutes**

---

## 🎉 **SUCCESS!**

When fixed, you'll be able to:
- ✅ Login to admin panel
- ✅ Access admin dashboard
- ✅ Manage bookings
- ✅ Upload images
- ✅ All admin features work

---

**🚀 START NOW: Go to Vercel Dashboard and add those 6 environment variables!**

**Link:** https://vercel.com/login

---

**Created:** 2026-07-04
**Project:** Lakshana Bridal Studio
**Issue:** Firebase API key not valid
**Solution:** Add environment variables to Vercel
**Time Required:** 10 minutes
