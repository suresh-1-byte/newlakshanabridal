@echo off
echo ========================================
echo    FIXING VERCEL ENVIRONMENT VARIABLES
echo ========================================
echo.
echo This will add Firebase config to Vercel
echo.
pause

:: Check if vercel CLI is installed
where vercel >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Installing Vercel CLI...
    call npm install -g vercel
)

echo.
echo Adding Firebase environment variables to Vercel...
echo.

:: Add environment variables
call vercel env add VITE_FIREBASE_API_KEY production
echo AIzaSyCgdbZk6MU5gdCbyeUUX33TkQkycbZo6BM

call vercel env add VITE_FIREBASE_AUTH_DOMAIN production
echo lakshanaatelier.firebaseapp.com

call vercel env add VITE_FIREBASE_PROJECT_ID production
echo lakshanaatelier

call vercel env add VITE_FIREBASE_STORAGE_BUCKET production
echo lakshanaatelier.firebasestorage.app

call vercel env add VITE_FIREBASE_MESSAGING_SENDER_ID production
echo 905891434766

call vercel env add VITE_FIREBASE_APP_ID production
echo 1:905891434766:web:3faf870cd5d2af53a6075f

echo.
echo ========================================
echo    ENVIRONMENT VARIABLES ADDED!
echo ========================================
echo.
echo NEXT STEPS:
echo 1. Go to: https://vercel.com/dashboard
echo 2. Select your project
echo 3. Click "Deployments"
echo 4. Click "Redeploy" on latest deployment
echo 5. Wait 2-3 minutes
echo 6. Test: https://lakshanaatelier.in/admin/login
echo.
echo ADMIN PASSWORD: Admin123!@#password
echo.
pause
