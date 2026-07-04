# 🔐 Admin Login Credentials & Setup

## 🚨 Current Issue

The login page is showing an error: **"Firebase: Error (auth/user-key-not-valid--please-pass-a-valid-api-key)"**

This error occurs when:
1. The Firebase API key is invalid or revoked
2. No admin user exists in the Firebase Authentication
3. Firebase project settings need to be updated

---

## ✅ Solution: Create Admin User

### Step 1: Open the Admin Creation Tool

1. **Double-click** this file: `CREATE_ADMIN_USER_FIREBASE.html`
2. It will open in your browser
3. Fill in the form:
   - **Email**: Your admin email (e.g., `admin@lakshana.com` or `sureshhkathirvel601@gmail.com`)
   - **Password**: A secure password (minimum 6 characters)
   - **Full Name**: Your name
   - **Phone**: Your phone number

4. Click **"Create Admin User"**

### Step 2: Save Your Credentials

After creation, you'll see:
```
✅ Login Credentials:
📧 Email: [your email]
🔑 Password: [your password]
👤 Role: Super Admin
```

**SAVE THESE CREDENTIALS SECURELY!**

---

## 🌐 Login URL

Once admin user is created, login here:

**Live Site**: https://lakshanaatelier.in/admin/login

**Local Development**: http://localhost:5173/admin/login

---

## 🔧 Verify Firebase Configuration

Your Firebase project details:
- **Project ID**: lakshanaatelier
- **API Key**: AIzaSyCgdbZk6MU5gdCbyeUUX33TkQkycbZo6BM
- **Auth Domain**: lakshanaatelier.firebaseapp.com

### Check Firebase Console:

1. Go to: https://console.firebase.google.com/
2. Select project: **lakshanaatelier**
3. Go to **Authentication** → **Users**
4. Verify admin user exists
5. Go to **Firestore Database** → **admins** collection
6. Verify admin document exists

---

## 🆘 Troubleshooting

### If "API key invalid" error persists:

1. **Check if API key is restricted**:
   - Go to: https://console.cloud.google.com/apis/credentials
   - Select your project
   - Find the API key
   - Remove any restrictions or allow your domain

2. **Generate new API key**:
   - Firebase Console → Project Settings → General
   - Under "Your apps" → Web app → Config
   - Copy the new API key
   - Update `.env` file with new key

3. **Verify Firebase Authentication is enabled**:
   - Firebase Console → Authentication → Sign-in method
   - Enable **Email/Password** provider

### If login still fails:

1. Open browser console (F12) → Console tab
2. Look for detailed error messages
3. Check Network tab for failed requests
4. Verify environment variables are loaded

---

## 📝 Current Test Credentials

If you've already created a user, try these:

**Email**: `sureshhkathirvel601@gmail.com`
**Password**: `Admin123@`

or

**Email**: `admin@lakshana.com`
**Password**: `Admin123@`

---

## 🔄 Reset Password (if needed)

If you forgot the password:

1. Go to Firebase Console → Authentication → Users
2. Find the user
3. Click the 3 dots → Reset password
4. A password reset email will be sent

---

## ✅ Checklist

- [ ] Open `CREATE_ADMIN_USER_FIREBASE.html`
- [ ] Create admin user with your email
- [ ] Save the credentials shown
- [ ] Go to https://lakshanaatelier.in/admin/login
- [ ] Login with your credentials
- [ ] You should see the admin dashboard

---

## 📞 Need Help?

If you're still having issues:
1. Check Firebase Console for any errors
2. Verify the API key is not restricted
3. Make sure Email/Password authentication is enabled
4. Try creating user directly in Firebase Console
