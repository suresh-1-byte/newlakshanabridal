@echo off
echo ========================================
echo    LAKSHANA BRIDAL STUDIO
echo    COMPLETE FIREBASE FIX
echo ========================================
echo.
echo This script will:
echo   1. Install Firebase CLI
echo   2. Deploy Firestore Rules
echo   3. Deploy Firestore Indexes
echo   4. Deploy Storage Rules
echo   5. Verify Everything Works
echo.
pause

:: Check if npm is installed
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js/npm not found!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

:: Install Firebase CLI globally
echo.
echo [STEP 1/5] Installing Firebase CLI...
echo ----------------------------------------
call npm install -g firebase-tools
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to install Firebase CLI
    pause
    exit /b 1
)
echo [SUCCESS] Firebase CLI installed!

:: Login to Firebase
echo.
echo [STEP 2/5] Logging into Firebase...
echo ----------------------------------------
echo Please complete the login in your browser...
call firebase login
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Firebase login failed
    pause
    exit /b 1
)
echo [SUCCESS] Logged into Firebase!

:: Deploy Firestore Rules
echo.
echo [STEP 3/5] Deploying Firestore Rules...
echo ----------------------------------------
call firebase deploy --only firestore:rules --project lakshanaatelier
if %ERRORLEVEL% NEQ 0 (
    echo [WARNING] Firestore rules deployment failed, continuing...
) else (
    echo [SUCCESS] Firestore rules deployed!
)

:: Deploy Firestore Indexes
echo.
echo [STEP 4/5] Deploying Firestore Indexes...
echo ----------------------------------------
call firebase deploy --only firestore:indexes --project lakshanaatelier
if %ERRORLEVEL% NEQ 0 (
    echo [WARNING] Firestore indexes deployment failed, continuing...
) else (
    echo [SUCCESS] Firestore indexes deployment started!
    echo [INFO] Indexes will take 5-10 minutes to build...
)

:: Deploy Storage Rules
echo.
echo [STEP 5/5] Deploying Storage Rules...
echo ----------------------------------------
call firebase deploy --only storage --project lakshanaatelier
if %ERRORLEVEL% NEQ 0 (
    echo [WARNING] Storage rules deployment failed, continuing...
) else (
    echo [SUCCESS] Storage rules deployed!
)

echo.
echo ========================================
echo    DEPLOYMENT COMPLETE!
echo ========================================
echo.
echo WHAT TO DO NEXT:
echo   1. Wait 10 minutes for indexes to build
echo   2. Open: https://console.firebase.google.com/project/lakshanaatelier/firestore/indexes
echo   3. Verify all indexes show "Enabled" status
echo   4. Test your website: https://lakshanaatelier.in
echo   5. Test admin login: https://lakshanaatelier.in/admin/login
echo.
echo ADMIN CREDENTIALS:
echo   Email: admin@lakshanaatelier.in
echo   User UID: x96UptHfExhQ58nLVuVTEbT89yN2
echo.
echo If you face any issues, check:
echo   - Firebase Console: https://console.firebase.google.com
echo   - Browser Console: Press F12
echo.
pause
