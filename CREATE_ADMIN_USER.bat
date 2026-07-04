@echo off
echo ========================================
echo    CREATE FIREBASE ADMIN USER
echo ========================================
echo.
echo This script will guide you to create the admin user
echo.
echo ADMIN CREDENTIALS:
echo   Email: sureshkathirvel601@gmail.com
echo   Password: Adminlaks123@
echo.
pause

echo.
echo ========================================
echo    STEP 1: ENABLE EMAIL/PASSWORD AUTH
echo ========================================
echo.
echo 1. Open: https://console.firebase.google.com/project/lakshanaatelier/authentication/providers
echo 2. Click on "Email/Password"
echo 3. Enable BOTH toggles:
echo    - Email/Password
echo    - Email link (passwordless sign-in)
echo 4. Click "Save"
echo.
echo Press any key after you've enabled Email/Password authentication...
pause >nul

echo.
echo ========================================
echo    STEP 2: CREATE ADMIN USER
echo ========================================
echo.
echo 1. Open: https://console.firebase.google.com/project/lakshanaatelier/authentication/users
echo 2. Click "Add user" button
echo 3. Enter:
echo    Email: sureshkathirvel601@gmail.com
echo    Password: Adminlaks123@
echo 4. Click "Add user"
echo 5. COPY THE USER UID (looks like: x96UptHfExhQ58nLVuVTEbT89yN2)
echo.
echo Press any key after you've created the user and copied the UID...
pause >nul

echo.
echo ========================================
echo    STEP 3: CREATE FIRESTORE DOCUMENT
echo ========================================
echo.
echo 1. Open: https://console.firebase.google.com/project/lakshanaatelier/firestore/data
echo 2. Click on "admins" collection (or create it if it doesn't exist)
echo 3. Click "Add document"
echo 4. Use "Auto-ID" for document ID
echo 5. Add these fields:
echo.
echo    Field: authId
echo    Type: string
echo    Value: [PASTE THE USER UID YOU COPIED]
echo.
echo    Field: email
echo    Type: string
echo    Value: sureshkathirvel601@gmail.com
echo.
echo    Field: fullName
echo    Type: string
echo    Value: Super Admin
echo.
echo    Field: role
echo    Type: string
echo    Value: super_admin
echo.
echo    Field: status
echo    Type: string
echo    Value: active
echo.
echo    Field: createdAt
echo    Type: timestamp
echo    Value: [Click "Set to current time"]
echo.
echo    Field: updatedAt
echo    Type: timestamp
echo    Value: [Click "Set to current time"]
echo.
echo 6. Click "Save"
echo.
echo Press any key after you've created the Firestore document...
pause >nul

echo.
echo ========================================
echo    VERIFICATION
echo ========================================
echo.
echo Let's verify everything is set up correctly:
echo.
echo 1. Firebase Authentication user exists: sureshkathirvel601@gmail.com
echo 2. Firestore document exists in admins collection
echo 3. authId matches Firebase Auth UID
echo 4. status is "active"
echo 5. role is "super_admin"
echo.
echo If all checks pass, you're ready to test login!
echo.
echo ========================================
echo    NEXT STEPS
echo ========================================
echo.
echo 1. Make sure Vercel environment variables are set correctly
echo 2. Redeploy your website on Vercel
echo 3. Clear browser cache
echo 4. Go to: https://lakshanaatelier.in/admin/login
echo 5. Login with:
echo    Email: sureshkathirvel601@gmail.com
echo    Password: Adminlaks123@
echo.
echo ========================================
echo    ADMIN USER SETUP COMPLETE!
echo ========================================
echo.
pause
