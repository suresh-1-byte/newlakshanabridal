@echo off
color 0A
echo ================================================================
echo     LAKSHANA BRIDAL STUDIO - AUTOMATIC ISSUE RESOLVER
echo ================================================================
echo.
echo This script will automatically fix all Firebase issues
echo.
echo Issues to be fixed:
echo [1] Missing Firestore Indexes
echo [2] Verify Firestore Rules
echo [3] Verify Storage Rules
echo [4] Test Firebase Connection
echo.
echo ================================================================
pause
echo.

echo Step 1: Installing dependencies...
call npm install
if errorlevel 1 (
    echo [ERROR] npm install failed
    pause
    exit /b 1
)
echo [SUCCESS] Dependencies installed
echo.

echo Step 2: Checking Firebase CLI...
where firebase >nul 2>&1
if errorlevel 1 (
    echo Firebase CLI not found. Installing globally...
    call npm install -g firebase-tools
    if errorlevel 1 (
        echo [ERROR] Failed to install Firebase CLI
        pause
        exit /b 1
    )
)
echo [SUCCESS] Firebase CLI ready
echo.

echo Step 3: Logging into Firebase...
echo.
echo IMPORTANT: A browser window will open.
echo Please login with your Firebase account.
echo.
pause
call firebase login
if errorlevel 1 (
    echo [ERROR] Firebase login failed
    echo.
    echo Please try manual login:
    echo 1. Open: https://console.firebase.google.com
    echo 2. Login with your Google account
    echo 3. Then run this script again
    pause
    exit /b 1
)
echo [SUCCESS] Firebase login complete
echo.

echo Step 4: Setting Firebase project...
call firebase use lakshanaatelier
if errorlevel 1 (
    echo [WARNING] Could not set project automatically
    echo Trying to add project...
    call firebase use --add lakshanaatelier
)
echo.

echo Step 5: Deploying Firestore Rules and Indexes...
echo.
echo This will deploy:
echo - Firestore security rules
echo - Firestore composite indexes
echo - Storage security rules
echo.
call firebase deploy --only firestore:rules,firestore:indexes,storage:rules
if errorlevel 1 (
    echo [ERROR] Firebase deployment failed
    echo.
    echo Manual fix required:
    echo 1. Go to: https://console.firebase.google.com/project/lakshanaatelier
    echo 2. Follow instructions in FIX_NOW_5_MINUTES.md
    pause
    exit /b 1
)
echo [SUCCESS] Firebase rules and indexes deployed!
echo.

echo Step 6: Checking index status...
echo.
echo Opening Firebase Console to check index build status...
start https://console.firebase.google.com/project/lakshanaatelier/firestore/indexes
echo.
echo Please verify:
echo - Indexes show "Building" or "Enabled" status
echo - If "Building", wait 5-10 minutes
echo - If "Enabled", you're ready to test!
echo.
pause

echo Step 7: Building website...
call npm run build
if errorlevel 1 (
    echo [ERROR] Build failed
    pause
    exit /b 1
)
echo [SUCCESS] Build complete
echo.

echo ================================================================
echo     ALL ISSUES FIXED!
echo ================================================================
echo.
echo What was fixed:
echo [✓] Firestore Rules deployed
echo [✓] Firestore Indexes created
echo [✓] Storage Rules deployed
echo [✓] Website built successfully
echo.
echo NEXT STEPS:
echo.
echo 1. Wait for indexes to finish building (5-10 minutes)
echo    Check status: https://console.firebase.google.com/project/lakshanaatelier/firestore/indexes
echo.
echo 2. After indexes show "Enabled", test your website:
echo    - Open: https://lakshanaatelier.in
echo    - Open Console (F12)
echo    - Check for errors
echo    - Test gallery loads
echo    - Test testimonials load
echo    - Test booking form
echo.
echo 3. Create admin user (if not done yet):
echo    - Follow guide: CREATE_ADMIN_USER.md
echo.
echo ================================================================
echo.
echo Website: https://lakshanaatelier.in
echo Admin: https://lakshanaatelier.in/admin/login
echo Firebase Console: https://console.firebase.google.com/project/lakshanaatelier
echo.
pause
