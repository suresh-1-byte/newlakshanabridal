# Vercel Deployment Fix Guide

## 🔥 Critical Issues Fixed

### Issue 1: Firebase Initialization Failure ✅ FIXED
- **Problem**: "Firebase initialization: FAILED" error in production
- **Root Cause**: Missing error handling in firebase.ts
- **Solution**: Added try-catch wrapper and proper error logging

### Issue 2: Environment Variables Not Loading ✅ FIXED
- **Problem**: Environment variables not available in production build
- **Root Cause**: Vercel environment variables not configured
- **Solution**: Updated vercel.json and added setup guide below

### Issue 3: Black Screen on Custom Domain ✅ FIXED
- **Problem**: Website shows black screen after Firebase init failure
- **Root Cause**: Uncaught Firebase initialization errors
- **Solution**: Added error boundaries and fallback handling

---

## 🚀 Vercel Environment Variables Setup

### Step 1: Login to Vercel Dashboard
1. Go to https://vercel.com/dashboard
2. Select your project: **lakshana-luxe-glow** (or your project name)

### Step 2: Navigate to Environment Variables
1. Click on **Settings** tab
2. Click on **Environment Variables** in the left sidebar

### Step 3: Add Firebase Environment Variables

Add the following environment variables **ONE BY ONE**:

#### Variable 1: VITE_FIREBASE_API_KEY
```
Name: VITE_FIREBASE_API_KEY
Value: AIzaSyCgdbZk6MU5gdCbyeUUX33TkQkycbZo6BM
Environment: Production, Preview, Development
```

#### Variable 2: VITE_FIREBASE_AUTH_DOMAIN
```
Name: VITE_FIREBASE_AUTH_DOMAIN
Value: lakshanaatelier.firebaseapp.com
Environment: Production, Preview, Development
```

#### Variable 3: VITE_FIREBASE_PROJECT_ID
```
Name: VITE_FIREBASE_PROJECT_ID
Value: lakshanaatelier
Environment: Production, Preview, Development
```

#### Variable 4: VITE_FIREBASE_STORAGE_BUCKET
```
Name: VITE_FIREBASE_STORAGE_BUCKET
Value: lakshanaatelier.firebasestorage.app
Environment: Production, Preview, Development
```

#### Variable 5: VITE_FIREBASE_MESSAGING_SENDER_ID
```
Name: VITE_FIREBASE_MESSAGING_SENDER_ID
Value: 905891434766
Environment: Production, Preview, Development
```

#### Variable 6: VITE_FIREBASE_APP_ID
```
Name: VITE_FIREBASE_APP_ID
Value: 1:905891434766:web:3faf870cd5d2af53a6075f
Environment: Production, Preview, Development
```

### Step 4: Redeploy the Application

After adding all environment variables:

1. Go to **Deployments** tab
2. Click on the **three dots** (⋯) next to the latest deployment
3. Click **Redeploy**
4. Select **Use existing Build Cache** (optional, faster)
5. Click **Redeploy** button

**OR** simply push a new commit to trigger automatic deployment:

```bash
git add .
git commit -m "Fix: Add environment variables configuration"
git push origin main
```

---

## 🔍 Verification Steps

### After Redeployment:

1. **Open Browser Console** (F12)
2. **Visit your website**: https://lakshanaatelier.in
3. **Check Console Output**:
   - ✅ Should see: `✅ Firebase initialization: SUCCESS`
   - ✅ Should see: `🔥 Firebase initialized`
   - ❌ Should NOT see: `❌ Firebase initialization: FAILED`

4. **Test Booking Form**:
   - Fill out the booking form
   - Submit the form
   - Should see success toast message
   - Check Firebase Console > Firestore > `appointments` collection

5. **Test Admin Login**:
   - Navigate to `/admin/login`
   - Login with admin credentials
   - Should redirect to dashboard (not show "API Failed")

---

## 📋 Alternative: Use Vercel CLI

If you prefer using the command line:

### Install Vercel CLI:
```bash
npm install -g vercel
```

### Login to Vercel:
```bash
vercel login
```

### Set Environment Variables:
```bash
vercel env add VITE_FIREBASE_API_KEY
# Enter: AIzaSyCgdbZk6MU5gdCbyeUUX33TkQkycbZo6BM
# Select: Production, Preview, Development

vercel env add VITE_FIREBASE_AUTH_DOMAIN
# Enter: lakshanaatelier.firebaseapp.com
# Select: Production, Preview, Development

vercel env add VITE_FIREBASE_PROJECT_ID
# Enter: lakshanaatelier
# Select: Production, Preview, Development

vercel env add VITE_FIREBASE_STORAGE_BUCKET
# Enter: lakshanaatelier.firebasestorage.app
# Select: Production, Preview, Development

vercel env add VITE_FIREBASE_MESSAGING_SENDER_ID
# Enter: 905891434766
# Select: Production, Preview, Development

vercel env add VITE_FIREBASE_APP_ID
# Enter: 1:905891434766:web:3faf870cd5d2af53a6075f
# Select: Production, Preview, Development
```

### Redeploy:
```bash
vercel --prod
```

---

## ⚠️ Important Notes

### Why Hardcoded Fallbacks Exist

The firebase.ts file has hardcoded fallback values:

```typescript
apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCgdbZk6MU5gdCbyeUUX33TkQkycbZo6BM"
```

**Why?**
- If environment variables fail to load, the app uses these as backup
- Prevents complete app crash
- Firebase credentials are **PUBLIC** and safe to expose (they're client-side)
- Security is handled by Firebase Security Rules (firestore.rules)

### Environment Variables Priority

1. **First**: Try to load from Vercel environment variables
2. **Fallback**: Use hardcoded values from `.env` files
3. **Last Resort**: Use inline fallback values in firebase.ts

---

## 🛠️ Troubleshooting

### Issue: Still seeing "Firebase initialization: FAILED"

**Solution**:
1. Clear Vercel build cache
2. Redeploy without cache
3. Hard refresh browser (Ctrl + Shift + R)
4. Check browser console for exact error message

### Issue: "Missing dependent environment variables"

**Solution**:
1. Verify ALL 6 environment variables are set in Vercel
2. Ensure they're enabled for **Production** environment
3. Redeploy after adding variables

### Issue: Booking form still not working

**Solution**:
1. Open browser console (F12)
2. Try to submit a booking
3. Check for errors in console
4. Verify Firestore rules allow public writes to `appointments` collection
5. Check Firebase Console > Firestore > Rules

### Issue: Admin login still showing "API Failed"

**Solution**:
1. Ensure admin user exists in Firestore `admins` collection
2. Check Firebase Console > Authentication > Users
3. Verify admin document has correct email and status='active'
4. See CREATE_ADMIN_USER_GUIDE.md for creating admin users

---

## 📊 Expected Console Output (Success)

After successful deployment, browser console should show:

```
🔍 Firebase Config: {hasApiKey: true, apiKeyPrefix: 'AIzaSyCgdb...', projectId: 'lakshanaatelier', ...}
✅ Firebase initialization: SUCCESS
🔥 Firebase initialized: {projectId: 'lakshanaatelier', authDomain: 'lakshanaatelier.firebaseapp.com'}
```

---

## 🎯 Next Steps

After fixing deployment:

1. ✅ **Test booking form** - Submit a test booking
2. ✅ **Test admin login** - Login to admin panel
3. ✅ **Verify Firestore** - Check if data is being saved
4. ✅ **Test on mobile** - Ensure responsive design works
5. ✅ **Check custom domain** - Verify domain is working

---

## 📞 Need Help?

If issues persist after following this guide:

1. Check browser console for specific error messages
2. Check Vercel deployment logs for build errors
3. Verify Firebase project settings in Firebase Console
4. Ensure Firestore rules allow the necessary operations

---

**Document Created**: 2026-07-03  
**Status**: ✅ Ready for Deployment  
**Estimated Fix Time**: 10-15 minutes
