# Firebase Initialization Test

## Quick Test Guide

### Step 1: Start Development Server

```bash
npm run dev
```

### Step 2: Open Browser Console

1. Open http://localhost:8080
2. Press F12 to open Developer Tools
3. Go to Console tab

### Step 3: Check Console Output

#### ✅ Expected Success Output:

```
🔍 Firebase Config: {hasApiKey: true, apiKeyPrefix: 'AIzaSyCgdb...', projectId: 'lakshanaatelier', ...}
✅ Firebase initialization: SUCCESS
🔥 Firebase initialized: {projectId: 'lakshanaatelier', authDomain: 'lakshanaatelier.firebaseapp.com'}
```

#### ❌ If You See Error:

```
❌ Firebase initialization: FAILED
❌ Error: [error message]
```

**Troubleshooting**:
1. Check `.env` file exists in project root
2. Verify all Firebase environment variables are set
3. Check Firebase project settings in Firebase Console
4. Verify internet connection (Firebase needs to connect)

---

## Test Booking Form

### Step 1: Navigate to Booking Section

1. Scroll down to the "Book" section
2. Or click on booking link in navigation

### Step 2: Fill Form

- **Full Name**: Test Customer
- **Phone**: +919876543210
- **Email**: test@example.com (optional)
- **Service**: Select "Bridal Makeup"
- **Preferred Date**: Select any future date
- **Message**: "This is a test booking"

### Step 3: Submit

Click "Request Consultation" button

#### ✅ Expected Success:

- Green toast notification appears
- Message: "Booking confirmed! Reference: BK[numbers]"
- Form resets to empty

#### ❌ If Error Occurs:

Check console for error messages:
- Firebase not ready
- Network error
- Firestore permission denied

---

## Test Admin Login

### Step 1: Create Admin User First

Follow `ADMIN_USER_CREATION_GUIDE.md` to create an admin user

### Step 2: Navigate to Admin Login

Visit: http://localhost:8080/admin/login

### Step 3: Enter Credentials

- **Email**: Your admin email
- **Password**: Your admin password

### Step 4: Click Sign In

#### ✅ Expected Success:

- Redirects to `/admin/dashboard`
- Dashboard shows booking statistics
- Navigation bar visible

#### ❌ If "API Failed":

1. Check Firebase Authentication is enabled
2. Verify admin user exists in Firestore `admins` collection
3. Check `authId` matches between Auth and Firestore
4. Check console for specific error

---

## Test Real-Time Updates

### Step 1: Open Two Browser Windows

**Window 1**: Admin Dashboard at `/admin/bookings`  
**Window 2**: Customer booking form at `/#book`

### Step 2: Submit Booking in Window 2

Fill and submit booking form

### Step 3: Check Window 1

#### ✅ Expected Behavior:

- New booking appears **instantly** in admin dashboard
- No page refresh needed
- Green "● Real-time updates" indicator visible

---

## Test Excel Export

### Step 1: Login to Admin Dashboard

Navigate to `/admin/bookings`

### Step 2: Click "Export to Excel"

Green button in top-right corner

#### ✅ Expected Behavior:

- Excel file downloads automatically
- Filename: `Lakshana_Bookings_YYYY-MM-DD.xlsx`
- Opens in Excel/Sheets
- Contains all booking data with proper columns

---

## Firebase Console Verification

### Check Firestore Data

1. Open https://console.firebase.google.com/
2. Select project: `lakshanaatelier`
3. Go to Firestore Database
4. Check collections:
   - `appointments` - Should have booking documents
   - `customers` - Should have customer documents
   - `admins` - Should have admin documents

### Check Authentication

1. Go to Authentication → Users
2. Should see admin users listed
3. Verify email and UID

---

## Production Test (After Deployment)

### Step 1: Visit Production URL

https://lakshanaatelier.in

### Step 2: Open Browser Console (F12)

Check for:
- ✅ `Firebase initialization: SUCCESS`
- ❌ NO errors

### Step 3: Test All Features

□ Homepage loads  
□ Booking form works  
□ Admin login works  
□ Dashboard shows data  
□ Real-time updates work  
□ Excel export works  

---

## Common Issues & Solutions

### Issue: "Firebase not initialized"

**Solution**:
- Check `.env` file exists
- Verify environment variables are set
- Restart development server

### Issue: "Permission denied" on booking

**Solution**:
- Check `firestore.rules` allows public writes to `appointments`
- Deploy rules: `firebase deploy --only firestore:rules`

### Issue: Admin login fails

**Solution**:
- Verify admin document exists in Firestore
- Check `authId` matches Firebase Auth UID
- Ensure `status: 'active'` in admin document

### Issue: Real-time updates not working

**Solution**:
- Check Firestore rules allow authenticated reads
- Verify `onSnapshot` listener is properly set up
- Check browser console for connection errors

---

## Performance Testing

### Check Bundle Size

```bash
npm run build
```

Expected:
- Total bundle: ~1.46 MB
- CSS: ~108 KB
- Build time: ~5-6 seconds

### Check Lighthouse Score

1. Open Chrome DevTools
2. Go to Lighthouse tab
3. Run audit

Expected scores:
- Performance: 85+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 95+

---

**Document Created**: 2026-07-03  
**Status**: ✅ Ready for Testing
