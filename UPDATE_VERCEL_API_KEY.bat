@echo off
echo ========================================
echo   UPDATE VERCEL ENVIRONMENT VARIABLES
echo ========================================
echo.

echo This will update the Firebase API key in Vercel
echo.

echo Step 1: Checking if Vercel CLI is installed...
where vercel >nul 2>&1
if errorlevel 1 (
    echo.
    echo ⚠️ Vercel CLI not found!
    echo.
    echo Please install it first by running:
    echo npm install -g vercel
    echo.
    echo OR update manually in Vercel Dashboard:
    echo https://vercel.com/dashboard
    echo.
    pause
    exit /b 1
)

echo ✓ Vercel CLI found
echo.

echo Step 2: Setting new Firebase API key...
echo.

vercel env add VITE_FIREBASE_API_KEY production
echo AIzaSyALZO4_0__nNeHNbO0s9WYiJeXgPBpq_94

echo.
echo Step 3: Triggering redeploy...
vercel --prod

echo.
echo ========================================
echo   UPDATE COMPLETE!
echo ========================================
echo.
echo Your site will be live with the new API key in 1-2 minutes
echo.
echo Login at: https://lakshanaatelier.in/admin/login
echo Email: sureshhkathirvel601@gmail.com
echo Password: Adminkaks12@
echo.
pause
