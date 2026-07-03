# 🔐 CREATE ADMIN USER IN FIREBASE

## Your Admin Credentials
```
Email:    sureshkathirvel801@gmail.com
Password: Admin123!@#
```

---

## 📋 METHOD 1: Create Admin User via Firebase Console (EASIEST)

### Step 1: Open Firebase Authentication (1 minute)

1. Open this link in your browser:
   ```
   https://console.firebase.google.com/project/lakshanaatelier/authentication/users
   ```

2. Click the **"Add user"** button (top right corner)

### Step 2: Add User Details (1 minute)

3. In the popup dialog, enter:
   - **Email:** `sureshkathirvel801@gmail.com`
   - **Password:** `Admin123!@#`

4. Click **"Add user"** button

5. ✅ **IMPORTANT:** Copy the **User UID** that appears
   - It will look like: `abc123xyz456def789ghi`
   - You'll need this for the next step!

### Step 3: Create Admin Document in Firestore (2 minutes)

6. Open Firestore Database:
   ```
   https://console.firebase.google.com/project/lakshanaatelier/firestore/data
   ```

7. Look for the **"admins"** collection in the left sidebar
   - If it doesn't exist, click **"Start collection"**
   - Collection ID: `admins`
   - Click "Next"

8. Click **"Add document"**

9. For **Document ID**, paste the **User UID** you copied in step 5

10. Add these fields (click "Add field" button for each):

| Field Name | Type      | Value                                |
|------------|-----------|--------------------------------------|
| email      | string    | sureshkathirvel801@gmail.com        |
| fullName   | string    | Super Admin                          |
| role       | string    | super_admin                          |
| status     | string    | active                               |
| createdAt  | timestamp | Click "Insert timestamp" button      |

11. Click **"Save"**

### Step 4: Test Login (1 minute)

12. Open admin login page:
    ```
    https://www.lakshanaatelier.in/admin/login
    ```

13. Enter credentials:
    - Email: `sureshkathirvel801@gmail.com`
    - Password: `Admin123!@#`

14. Click **"Sign In to Dashboard"**

15. ✅ **SUCCESS!** You should see the luxury admin dashboard!

---

## 📋 METHOD 2: Using Firebase CLI (For Advanced Users)

If you have Firebase CLI installed, you can use these commands:

### Install Firebase CLI (if not installed)
```bash
npm install -g firebase-tools
```

### Login to Firebase
```bash
firebase login
```

### Create Admin User (JavaScript)
```javascript
// Run this in Node.js after setting up Firebase Admin SDK
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

async function createAdminUser() {
  try {
    // Create user in Firebase Authentication
    const userRecord = await admin.auth().createUser({
      email: 'sureshkathirvel801@gmail.com',
      password: 'Admin123!@#',
      emailVerified: true,
      disabled: false
    });

    console.log('User created:', userRecord.uid);

    // Create admin document in Firestore
    await admin.firestore().collection('admins').doc(userRecord.uid).set({
      email: 'sureshkathirvel801@gmail.com',
      fullName: 'Super Admin',
      role: 'super_admin',
      status: 'active',
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    console.log('Admin document created successfully!');
  } catch (error) {
    console.error('Error creating admin user:', error);
  }
}

createAdminUser();
```

---

## ✅ Verification Checklist

After creating the admin user:

- [ ] User exists in Firebase Authentication
- [ ] User UID copied
- [ ] Admin document created in Firestore `admins` collection
- [ ] Document ID matches User UID
- [ ] All 5 fields added (email, fullName, role, status, createdAt)
- [ ] Status field = "active"
- [ ] Login page opens without errors
- [ ] Login with credentials successful
- [ ] Admin dashboard displays correctly

---

## 🔧 Troubleshooting

### Problem: "Email already in use"
**Solution:** User already exists. Use password reset or delete old user first.

### Problem: "Cannot read property 'uid'"
**Solution:** Make sure you copied the User UID correctly.

### Problem: Login fails with "Invalid credentials"
**Solution:** 
1. Check email spelling: `sureshkathirvel801@gmail.com`
2. Check password: `Admin123!@#` (case sensitive!)
3. Make sure status field is "active"

### Problem: "User not authorized"
**Solution:**
1. Check admin document exists in Firestore
2. Check document ID matches User UID from Authentication
3. Check role field is "super_admin"
4. Check status field is "active"

---

## 🎯 Quick Reference

**Email:** sureshkathirvel801@gmail.com  
**Password:** Admin123!@#  

**Firebase Authentication URL:**
https://console.firebase.google.com/project/lakshanaatelier/authentication/users

**Firestore Database URL:**
https://console.firebase.google.com/project/lakshanaatelier/firestore/data

**Admin Login URL:**
https://www.lakshanaatelier.in/admin/login

---

## 📊 Admin Document Structure

```json
{
  "email": "sureshkathirvel801@gmail.com",
  "fullName": "Super Admin",
  "role": "super_admin",
  "status": "active",
  "createdAt": "2026-07-03T15:30:00.000Z"
}
```

**IMPORTANT:** The document ID MUST be the User UID from Authentication!

---

## 🎉 What Happens After Setup

Once admin user is created and you login:

✅ Access to admin dashboard  
✅ View all bookings in real-time  
✅ Manage gallery images  
✅ Update booking status  
✅ Track revenue and stats  
✅ Upload/delete portfolio images  
✅ Full admin control  

---

**© 2026 Lakshana Bridal Studio**  
Secure admin access for your luxury business 👑
