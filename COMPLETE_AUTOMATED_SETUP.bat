@echo off
setlocal enabledelayedexpansion
color 0A

echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║                                                                ║
echo ║     🔥 LAKSHANA ATELIER - COMPLETE AUTOMATED SETUP 🔥         ║
echo ║                                                                ║
echo ║     Email: sureshkathirvel801@gmail.com                       ║
echo ║     Password: Admin123!@#                                     ║
echo ║                                                                ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.

echo.
echo ┌────────────────────────────────────────────────────────────────┐
echo │  STEP 1: ADDING FIREBASE ENV VARIABLES TO VERCEL              │
echo └────────────────────────────────────────────────────────────────┘
echo.
echo ⚠️  IMPORTANT: When each prompt appears, paste the value and press ENTER
echo.

echo [1/6] Adding VITE_FIREBASE_API_KEY...
echo Value: AIzaSyCgdbZk6MU5gdCbyeUUX33TkQkycbZo6BM
vercel env add VITE_FIREBASE_API_KEY production preview development

echo.
echo [2/6] Adding VITE_FIREBASE_AUTH_DOMAIN...
echo Value: lakshanaatelier.firebaseapp.com
vercel env add VITE_FIREBASE_AUTH_DOMAIN production preview development

echo.
echo [3/6] Adding VITE_FIREBASE_PROJECT_ID...
echo Value: lakshanaatelier
vercel env add VITE_FIREBASE_PROJECT_ID production preview development

echo.
echo [4/6] Adding VITE_FIREBASE_STORAGE_BUCKET...
echo Value: lakshanaatelier.firebasestorage.app
vercel env add VITE_FIREBASE_STORAGE_BUCKET production preview development

echo.
echo [5/6] Adding VITE_FIREBASE_MESSAGING_SENDER_ID...
echo Value: 905891434766
vercel env add VITE_FIREBASE_MESSAGING_SENDER_ID production preview development

echo.
echo [6/6] Adding VITE_FIREBASE_APP_ID...
echo Value: 1:905891434766:web:3faf870cd5d2af53a6075f
vercel env add VITE_FIREBASE_APP_ID production preview development

echo.
echo ✅ All environment variables added to Vercel!
echo.
timeout /t 3 /nobreak >nul

echo.
echo ┌────────────────────────────────────────────────────────────────┐
echo │  STEP 2: REDEPLOYING TO VERCEL WITH NEW ENV VARIABLES         │
echo └────────────────────────────────────────────────────────────────┘
echo.
echo 🚀 Starting deployment...
echo.

vercel --prod

echo.
echo ✅ Deployment complete!
echo.
timeout /t 3 /nobreak >nul

echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║                                                                ║
echo ║  ⚠️  MANUAL STEP REQUIRED - FIREBASE CONSOLE                  ║
echo ║                                                                ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.
echo You need to complete 3 manual steps in Firebase Console:
echo.
echo 📋 STEP A: Create Admin User
echo    1. Go to: https://console.firebase.google.com/project/lakshanaatelier/authentication/users
echo    2. Click "Add user"
echo    3. Email: sureshkathirvel801@gmail.com
echo    4. Password: Admin123!@#
echo    5. Click "Add user"
echo.
echo 📋 STEP B: Create Admin Document in Firestore
echo    1. Go to: https://console.firebase.google.com/project/lakshanaatelier/firestore/data
echo    2. Click on "admins" collection (create if doesn't exist)
echo    3. Click "Add document"
echo    4. Document ID: Use the User UID from step A (copy from Authentication user)
echo    5. Add these fields:
echo       - email (string): sureshkathirvel801@gmail.com
echo       - fullName (string): Super Admin
echo       - role (string): super_admin
echo       - status (string): active
echo       - createdAt (timestamp): Click "Insert timestamp"
echo    6. Click "Save"
echo.
echo 📋 STEP C: Deploy Firebase Security Rules
echo    Read the file: DEPLOY_RULES_NOW.txt for detailed instructions
echo.
echo Press any key to open the detailed manual setup guide...
pause >nul

echo.
echo Opening FIREBASE_MANUAL_SETUP.html in your browser...
start FIREBASE_MANUAL_SETUP.html

echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║                                                                ║
echo ║  ✅ AUTOMATED SETUP COMPLETE!                                  ║
echo ║                                                                ║
echo ║  Next: Follow the manual steps in the browser guide           ║
echo ║                                                                ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.
echo Press any key to exit...
pause >nul
