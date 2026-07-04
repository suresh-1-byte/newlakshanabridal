@echo off
echo ========================================
echo    DEPLOY FIRESTORE INDEXES
echo ========================================
echo.
echo This will deploy all 4 Firestore indexes automatically
echo.
pause

:: Check if Firebase CLI is installed
where firebase >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Installing Firebase CLI...
    call npm install -g firebase-tools
    if %ERRORLEVEL% NEQ 0 (
        echo [ERROR] Failed to install Firebase CLI
        pause
        exit /b 1
    )
)

echo.
echo [STEP 1/3] Logging into Firebase...
echo ----------------------------------------
call firebase login
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Firebase login failed
    pause
    exit /b 1
)

echo.
echo [STEP 2/3] Deploying Firestore indexes...
echo ----------------------------------------
call firebase deploy --only firestore:indexes --project lakshanaatelier
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Index deployment failed
    pause
    exit /b 1
)

echo.
echo [STEP 3/3] Deploying Firestore rules...
echo ----------------------------------------
call firebase deploy --only firestore:rules --project lakshanaatelier
if %ERRORLEVEL% NEQ 0 (
    echo [WARNING] Rules deployment failed
)

echo.
echo ========================================
echo    DEPLOYMENT COMPLETE!
echo ========================================
echo.
echo WHAT TO DO NEXT:
echo   1. Wait 10 minutes for indexes to build
echo   2. Check status: https://console.firebase.google.com/project/lakshanaatelier/firestore/indexes
echo   3. Test your website: https://lakshanaatelier.in
echo   4. Test admin login: https://lakshanaatelier.in/admin/login
echo.
echo ADMIN LOGIN:
echo   Email: admin@lakshanaatelier.in
echo   Password: Admin123!@#password
echo.
pause
