@echo off
cls
echo.
echo ========================================
echo   LAKSHANA BRIDAL STUDIO DEPLOYMENT
echo ========================================
echo.
echo This will deploy your site to Vercel.
echo A browser window will open for authentication.
echo.
echo Press any key to continue...
pause >nul

cd /d "d:\lakshana mam\lakshana-luxe-glow-main"

echo.
echo Deploying to Vercel...
echo.

call vercel --prod ^
  -e VITE_FIREBASE_API_KEY=AIzaSyCgdbZk6MU5gdCbyeUUX33TkQkycbZo6BM ^
  -e VITE_FIREBASE_AUTH_DOMAIN=lakshanaatelier.firebaseapp.com ^
  -e VITE_FIREBASE_PROJECT_ID=lakshanaatelier ^
  -e VITE_FIREBASE_STORAGE_BUCKET=lakshanaatelier.firebasestorage.app ^
  -e VITE_FIREBASE_MESSAGING_SENDER_ID=905891434766 ^
  -e VITE_FIREBASE_APP_ID=1:905891434766:web:3faf870cd5d2af53a6075f

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo    DEPLOYMENT SUCCESSFUL!
    echo ========================================
    echo.
    echo Your site is now LIVE on Vercel!
    echo Check the URL above to visit your site.
    echo.
    echo Vercel will also create a GitHub repository
    echo automatically from this deployment.
    echo.
) else (
    echo.
    echo ========================================
    echo    DEPLOYMENT FAILED
    echo ========================================
    echo.
    echo Please check the error message above.
    echo.
)

echo.
echo Press any key to exit...
pause >nul
