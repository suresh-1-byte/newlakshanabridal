# 🔐 CREATE ADMIN USER - STEP BY STEP GUIDE

## METHOD 1: Firebase Console (RECOMMENDED)

### Step 1: Create Authentication User

1. Open Firebase Console: https://console.firebase.google.com
2. Select project: **lakshanaatelier**
3. Click on **Authentication** in left sidebar
4. Click on **Users** tab
5. Click **"Add User"** button

Enter the following:
```
Email: admin@lakshanaatelier.in
Password: (Create a strong password - minimum 6 characters)
```

6. Click **"Add User"**
7. ✅ User created! You'll see it in the users list
8. **IMPORTANT:** Click on the user to see the **User UID**
9. **COPY THIS UID** - You'll need it in the next step

Example UID: `xYz123AbC456DeF789GhI`

---

### Step 2: Create Admin Document in Firestore

1. In Firebase Console, click on **Firestore Database** in left sidebar
2. Click on **Data** tab
3. If no collections exist yet, click **"Start collection"**
   - Collection ID: `admins`
   - Click "Next"

4. If collections already exist:
   - Click "+" button next to "Firestore Database"
   - Select "Start collection"
   - Collection ID: `admins`
   - Click "Next"

5. Add document with these fields:

**Document ID:** Click "Auto-ID" button

**Add fields one by one:**

| Field Name | Type | Value |
|------------|------|-------|
| authId | string | `PASTE_YOUR_USER_UID_HERE` |
| email | string | `admin@lakshanaatelier.in` |
| fullName | string | `Admin Name` |
| phone | string | `+919876543210` |
| role | string | `super_admin` |
| status | string | `active` |
| designation | string | `Administrator` |
| department | string | `Management` |
| dateOfJoining | string | `2026-07-03` |
| permissions | map | (leave empty) |
| createdAt | timestamp | Click timestamp icon → "Set to server timestamp" |
| updatedAt | timestamp | Click timestamp icon → "Set to server timestamp" |

6. Click **"Save"**
7. ✅ Admin document created!

---

### Step 3: Test Admin Login

1. Open: https://lakshanaatelier.in/admin/login
2. Enter:
   - Email: `admin@lakshanaatelier.in`
   - Password: (the password you created in Step 1)
3. Click **"Sign In to Dashboard"**
4. ✅ You should be redirected to the Admin Dashboard!

---

## METHOD 2: Using Node.js Script (ADVANCED)

If you prefer automation, create this script:

### File: `create-admin.js`

```javascript
// Install dependencies first:
// npm install firebase-admin

const admin = require('firebase-admin');

// Initialize Firebase Admin
const serviceAccount = require('./serviceAccountKey.json'); // Download from Firebase Console

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

async function createAdmin() {
  try {
    // Step 1: Create Authentication User
    const userRecord = await admin.auth().createUser({
      email: 'admin@lakshanaatelier.in',
      password: 'YourStrongPassword123!',
      emailVerified: true,
      disabled: false
    });
    
    console.log('✅ Auth User Created!');
    console.log('User UID:', userRecord.uid);
    
    // Step 2: Create Firestore Admin Document
    const adminData = {
      authId: userRecord.uid,
      email: 'admin@lakshanaatelier.in',
      fullName: 'Admin Name',
      phone: '+919876543210',
      role: 'super_admin',
      status: 'active',
      designation: 'Administrator',
      department: 'Management',
      dateOfJoining: '2026-07-03',
      permissions: {},
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    };
    
    await admin.firestore().collection('admins').add(adminData);
    
    console.log('✅ Admin Document Created!');
    console.log('🎉 Admin user setup complete!');
    console.log('\nLogin Credentials:');
    console.log('Email:', 'admin@lakshanaatelier.in');
    console.log('Password:', 'YourStrongPassword123!');
    console.log('\nLogin at: https://lakshanaatelier.in/admin/login');
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

createAdmin();
```

### To run the script:

1. Download service account key from Firebase Console:
   - Go to Project Settings → Service Accounts
   - Click "Generate New Private Key"
   - Save as `serviceAccountKey.json`
   
2. Install dependencies:
```bash
npm install firebase-admin
```

3. Run script:
```bash
node create-admin.js
```

---

## 🔒 SECURITY NOTES

1. **Use a strong password** (mix of uppercase, lowercase, numbers, symbols)
2. **Don't share credentials** publicly
3. **Change default password** after first login
4. **Enable 2FA** in Firebase Console (recommended)
5. **Keep service account key secure** (never commit to Git)

---

## ✅ VERIFICATION CHECKLIST

After creating the admin user:

- [ ] User appears in Firebase Authentication → Users
- [ ] Admin document exists in Firestore → admins collection
- [ ] `authId` in document matches User UID from Authentication
- [ ] `status` field is set to `active`
- [ ] Login works at https://lakshanaatelier.in/admin/login
- [ ] Dashboard loads after login
- [ ] Can access Bookings page
- [ ] Can access Gallery page
- [ ] WhatsApp links work in Bookings
- [ ] Can upload images in Gallery
- [ ] Can export bookings to Excel

---

## 🚨 TROUBLESHOOTING

### Issue: "Invalid Credentials" Error

**Check:**
1. Email is correct: `admin@lakshanaatelier.in`
2. Password is correct (case-sensitive)
3. User exists in Firebase Authentication
4. User is not disabled

### Issue: "Access Denied" After Login

**Check:**
1. Admin document exists in Firestore `admins` collection
2. `authId` field matches Firebase Auth UID
3. `status` field is set to `active` (not `inactive` or `suspended`)
4. Clear browser cache and try again

### Issue: "User Not Found"

**Solution:**
1. Verify user exists in Firebase Console → Authentication
2. Check email spelling
3. Create user again if needed

### Issue: Can't Access Admin Pages After Login

**Check:**
1. Check browser console (F12) for errors
2. Verify admin document `role` is `super_admin` or `admin`
3. Verify `status` is `active`
4. Try logging out and logging in again

---

## 📞 NEED HELP?

If you encounter issues:

1. Check browser console (F12) for error messages
2. Check Firebase Console → Firestore → Data for admin document
3. Check Firebase Console → Authentication for user
4. Verify all fields are spelled correctly
5. Ensure `authId` matches the User UID exactly

---

**Document Version:** 1.0  
**Last Updated:** 2026-07-03
