# Admin User Creation Guide

## 🔐 How to Create Admin Users for Lakshana Bridal Studio

This guide explains how to create admin users who can access the admin dashboard at `/admin/login`.

---

## Prerequisites

✅ Firebase project configured (`lakshanaatelier`)  
✅ Firebase Authentication enabled  
✅ Firestore database created  
✅ Firestore rules deployed (from `firestore.rules`)

---

## Method 1: Using Firebase Console (Recommended)

### Step 1: Create User in Firebase Authentication

1. **Open Firebase Console**: https://console.firebase.google.com/
2. **Select Project**: `lakshanaatelier`
3. **Navigate**: Authentication → Users → **Add User**
4. **Enter Details**:
   - **Email**: `admin@lakshana.in` (or your admin email)
   - **Password**: Create a strong password (minimum 6 characters)
5. **Click**: Add User
6. **Copy**: The User UID (you'll need this for Step 2)

Example User UID: `AbCd1234EfGh5678IjKl`

### Step 2: Create Admin Document in Firestore

1. **Navigate**: Firestore Database → **Start Collection**
2. **Collection ID**: `admins`
3. **Document ID**: Click **Auto-ID** or use custom ID
4. **Add Fields**:

```
authId: "AbCd1234EfGh5678IjKl"  (String - the User UID from Step 1)
email: "admin@lakshana.in"       (String)
fullName: "Lakshana Admin"       (String)
phone: "+919876543210"           (String - optional)
role: "super_admin"              (String)
status: "active"                 (String)
designation: "Super Administrator" (String - optional)
department: "Management"         (String - optional)
createdAt: [Click "timestamp"]   (Timestamp)
updatedAt: [Click "timestamp"]   (Timestamp)
permissions: {}                  (Map - empty for now)
```

5. **Click**: Save

### Step 3: Test Login

1. Navigate to: `http://localhost:8080/admin/login` (or your domain)
2. Enter the email and password you created
3. Click **Sign In**
4. Should redirect to `/admin/dashboard`

✅ **Success!** Your admin user is now created.

---

## Method 2: Using Firebase CLI & Script

### Step 1: Install Firebase CLI

```bash
npm install -g firebase-tools
```

### Step 2: Login to Firebase

```bash
firebase login
```

### Step 3: Create Admin User Script

Create a file `scripts/create-admin.js`:

```javascript
const admin = require('firebase-admin');
const readline = require('readline');

// Initialize Firebase Admin SDK
const serviceAccount = require('./serviceAccountKey.json'); // Download from Firebase Console

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const auth = admin.auth();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function createAdminUser() {
  try {
    // Prompt for email
    const email = await new Promise((resolve) => {
      rl.question('Enter admin email: ', resolve);
    });

    // Prompt for password
    const password = await new Promise((resolve) => {
      rl.question('Enter password (min 6 chars): ', resolve);
    });

    // Prompt for full name
    const fullName = await new Promise((resolve) => {
      rl.question('Enter full name: ', resolve);
    });

    // Prompt for phone
    const phone = await new Promise((resolve) => {
      rl.question('Enter phone (optional): ', resolve);
    });

    console.log('\n🔄 Creating Firebase Auth user...');
    
    // Create user in Firebase Authentication
    const userRecord = await auth.createUser({
      email: email,
      password: password,
      emailVerified: true,
      disabled: false,
    });

    console.log('✅ Firebase Auth user created:', userRecord.uid);

    // Create admin document in Firestore
    console.log('🔄 Creating admin document in Firestore...');
    
    const adminData = {
      authId: userRecord.uid,
      email: email,
      fullName: fullName,
      phone: phone || null,
      role: 'super_admin',
      status: 'active',
      designation: 'Super Administrator',
      department: 'Management',
      permissions: {},
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    const docRef = await db.collection('admins').add(adminData);
    
    console.log('✅ Admin document created:', docRef.id);
    console.log('\n🎉 Admin user created successfully!');
    console.log('📧 Email:', email);
    console.log('🆔 Auth UID:', userRecord.uid);
    console.log('📄 Firestore Doc ID:', docRef.id);
    
  } catch (error) {
    console.error('❌ Error creating admin user:', error);
  } finally {
    rl.close();
    process.exit(0);
  }
}

createAdminUser();
```

### Step 4: Download Service Account Key

1. Firebase Console → Project Settings → Service Accounts
2. Click **Generate New Private Key**
3. Save as `scripts/serviceAccountKey.json`
4. **⚠️ IMPORTANT**: Add this file to `.gitignore`!

### Step 5: Run Script

```bash
cd scripts
node create-admin.js
```

---

## Method 3: Quick Test Admin (Development Only)

For quick testing, you can create a test admin manually:

### Step 1: Firebase Console - Authentication

Create user: `test@lakshana.in` / `test123456`

### Step 2: Firebase Console - Firestore

Create document in `admins` collection:

```json
{
  "authId": "USER_UID_FROM_STEP_1",
  "email": "test@lakshana.in",
  "fullName": "Test Admin",
  "role": "admin",
  "status": "active",
  "createdAt": [Timestamp],
  "updatedAt": [Timestamp]
}
```

**⚠️ Delete this test account after testing!**

---

## Admin Roles

The system supports different admin roles with varying permissions:

- **super_admin**: Full access to everything
- **admin**: Full access to content management
- **manager**: Can manage bookings and customers
- **receptionist**: Can view and update bookings
- **makeup_artist**: Can view assigned bookings
- **trainer**: Can manage academy content
- **editor**: Can manage gallery and content

Currently, the system checks `status === 'active'` for access.  
Role-based permissions will be implemented in future updates.

---

## Troubleshooting

### Issue: "API Failed" when logging in

**Solution**:
1. Verify user exists in Firebase Authentication
2. Verify admin document exists in Firestore `admins` collection
3. Ensure `authId` in Firestore matches the Auth UID
4. Ensure `status: 'active'` in Firestore document
5. Check browser console for specific error messages

### Issue: Admin document not found after login

**Solution**:
1. The code automatically links Auth UID to Firestore if `authId` is missing
2. Ensure admin document has correct `email` field matching Auth email
3. Check Firestore rules allow authenticated reads to `admins` collection

### Issue: Can't create user in Firebase

**Solution**:
1. Enable Email/Password provider in Firebase Console
2. Ensure password is at least 6 characters
3. Check Firebase project quota (free tier has limits)

---

## Security Best Practices

✅ Use strong passwords (12+ characters, mixed case, numbers, symbols)  
✅ Enable 2FA for Firebase Console access  
✅ Never commit service account keys to Git  
✅ Use environment-specific admin accounts (dev vs prod)  
✅ Regularly audit admin user list  
✅ Remove test/temporary admin accounts  
✅ Monitor Firebase Authentication logs for suspicious activity

---

## Firebase Rules for Admins

Current Firestore rules allow:

```javascript
match /admins/{adminId} {
  allow read: if request.auth != null;
  allow write: if request.auth != null;
}
```

**⚠️ Note**: These rules should be tightened in production to ensure only super_admins can create/edit other admins.

Recommended production rules:

```javascript
match /admins/{adminId} {
  allow read: if request.auth != null;
  allow create: if request.auth != null && 
                   get(/databases/$(database)/documents/admins/$(request.auth.uid)).data.role == 'super_admin';
  allow update, delete: if request.auth != null && 
                           (get(/databases/$(database)/documents/admins/$(request.auth.uid)).data.role == 'super_admin' 
                            || request.auth.uid == adminId);
}
```

---

## Next Steps

After creating admin users:

1. ✅ Test login at `/admin/login`
2. ✅ Verify dashboard access at `/admin/dashboard`
3. ✅ Test bookings management at `/admin/bookings`
4. ✅ Test gallery management at `/admin/gallery`
5. ✅ Create additional admin users as needed

---

**Document Created**: 2026-07-03  
**Last Updated**: 2026-07-03  
**Status**: ✅ Production Ready
