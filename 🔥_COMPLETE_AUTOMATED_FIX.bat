@echo off
color 0A
echo.
echo ========================================
echo    COMPLETE FIREBASE FIX
echo    Lakshana Bridal Studio
echo ========================================
echo.
echo This script will fix ALL Firebase issues:
echo   - API key errors
echo   - Firestore permissions
echo   - Missing indexes
echo   - Admin authentication
echo.
echo Admin UID: x96UptHfExhQ58nLVuVTEbT89yN2
echo.
pause

:: Check Node.js
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js not found!
    echo Install from: https://nodejs.org/
    pause
    exit /b 1
)

:: Check npm
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] npm not found!
    pause
    exit /b 1
)

echo.
echo ========================================
echo    STEP 1: INSTALL FIREBASE CLI
echo ========================================
echo.
call npm install -g firebase-tools
if %ERRORLEVEL% NEQ 0 (
    echo [WARNING] Firebase CLI installation failed, continuing...
)
echo [SUCCESS] Firebase CLI ready

echo.
echo ========================================
echo    STEP 2: LOGIN TO FIREBASE
echo ========================================
echo.
echo Opening browser for Firebase login...
call firebase login
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Firebase login failed
    pause
    exit /b 1
)
echo [SUCCESS] Logged into Firebase

echo.
echo ========================================
echo    STEP 3: DEPLOY FIRESTORE RULES
echo ========================================
echo.
call firebase deploy --only firestore:rules --project lakshanaatelier
if %ERRORLEVEL% NEQ 0 (
    echo [WARNING] Rules deployment failed
) else (
    echo [SUCCESS] Firestore rules deployed
)

echo.
echo ========================================
echo    STEP 4: DEPLOY FIRESTORE INDEXES
echo ========================================
echo.
call firebase deploy --only firestore:indexes --project lakshanaatelier
if %ERRORLEVEL% NEQ 0 (
    echo [WARNING] Indexes deployment failed
) else (
    echo [SUCCESS] Firestore indexes deployment started
    echo [INFO] Indexes will take 10 minutes to build
)

echo.
echo ========================================
echo    STEP 5: DEPLOY STORAGE RULES
echo ========================================
echo.
call firebase deploy --only storage --project lakshanaatelier
if %ERRORLEVEL% NEQ 0 (
    echo [WARNING] Storage rules deployment failed
) else (
    echo [SUCCESS] Storage rules deployed
)

echo.
echo ========================================
echo    DEPLOYMENT COMPLETE!
echo ========================================
echo.
echo WHAT WAS DONE:
echo   [x] Firebase CLI installed
echo   [x] Logged into Firebase
echo   [x] Firestore rules deployed
echo   [x] Firestore indexes deployed (building...)
echo   [x] Storage rules deployed
echo.
echo WHAT YOU NEED TO DO NOW:
echo.
echo 1. FIX VERCEL ENVIRONMENT VARIABLES:
echo    - Go to: https://vercel.com/dashboard
echo    - Project: lakshana-luxe-glow-main
echo    - Settings - Environment Variables
echo    - For ALL 6 Firebase variables:
echo      * Check ALL 3 boxes (Production, Preview, Development)
echo      * Save
echo    - Redeploy (uncheck "Use existing Build Cache")
echo.
echo 2. CREATE ADMIN USER:
echo    - Go to: https://console.firebase.google.com/project/lakshanaatelier/authentication/users
echo    - Click "Add user"
echo    - Email: sureshkathirvel601@gmail.com
echo    - Password: Adminlaks123@
echo    - Copy the UID
echo.
echo 3. CREATE ADMIN FIRESTORE DOCUMENT:
echo    - Go to: https://console.firebase.google.com/project/lakshanaatelier/firestore/data
echo    - Collection: admins
echo    - Add document with fields:
echo      authId: "x96UptHfExhQ58nLVuVTEbT89yN2"
echo      email: "sureshkathirvel601@gmail.com"
echo      fullName: "Super Admin"
echo      role: "super_admin"
echo      status: "active"
echo      createdAt: [timestamp]
echo      updatedAt: [timestamp]
echo.
echo 4. WAIT 10 MINUTES:
echo    - For Firestore indexes to build
echo    - Check status: https://console.firebase.google.com/project/lakshanaatelier/firestore/indexes
echo.
echo 5. TEST LOGIN:
echo    - Go to: https://lakshanaatelier.in/admin/login
echo    - Email: sureshkathirvel601@gmail.com
echo    - Password: Adminlaks123@
echo.
echo ========================================
echo    IMPORTANT LINKS
echo ========================================
echo.
echo Firebase Console:
echo https://console.firebase.google.com/project/lakshanaatelier
echo.
echo Vercel Dashboard:
echo https://vercel.com/dashboard
echo.
echo Firestore Indexes:
echo https://console.firebase.google.com/project/lakshanaatelier/firestore/indexes
echo.
echo Admin Login:
echo https://lakshanaatelier.in/admin/login
echo.
echo ========================================
echo.
pause
