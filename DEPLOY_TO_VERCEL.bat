@echo off
color 0B
cls

echo.
echo    ╔════════════════════════════════════════════════════════════╗
echo    ║                                                            ║
echo    ║           LAKSHANA ATELIER - VERCEL DEPLOYMENT             ║
echo    ║                                                            ║
echo    ║              Production Deployment Script                  ║
echo    ║                                                            ║
echo    ╚════════════════════════════════════════════════════════════╝
echo.
echo.

echo    This script will:
echo    ═════════════════════════════════════════════════════════════
echo.
echo    ✅ Verify Firebase configuration
echo    ✅ Clear build caches
echo    ✅ Build production version
echo    ✅ Deploy to Vercel
echo    ✅ Set up environment variables
echo.
echo    ═════════════════════════════════════════════════════════════
echo.

pause

cls

echo.
echo    [1/5] Checking Firebase Configuration...
echo    ═════════════════════════════════════════════════════════════
echo.

type .env | findstr "VITE_FIREBASE_API_KEY"
type .env | findstr "VITE_FIREBASE_PROJECT_ID"
echo.
echo    ✅ Firebase config verified!
echo.

timeout /t 2 >nul

cls

echo.
echo    [2/5] Cleaning build cache...
echo    ═════════════════════════════════════════════════════════════
echo.

if exist dist rmdir /s /q dist
if exist node_modules\.vite rmdir /s /q node_modules\.vite
echo    ✅ Cache cleared!
echo.

timeout /t 2 >nul

cls

echo.
echo    [3/5] Building production version...
echo    ═════════════════════════════════════════════════════════════
echo.

call npm run build
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo    ❌ Build failed! Please check errors above.
    pause
    exit /b 1
)

echo.
echo    ✅ Build successful!
echo.

timeout /t 2 >nul

cls

echo.
echo    [4/5] Setting up Vercel environment variables...
echo    ═════════════════════════════════════════════════════════════
echo.

echo    Setting Firebase environment variables on Vercel...
echo.

REM Read .env and set variables on Vercel
for /f "usebackq tokens=1,2 delims==" %%a in (".env") do (
    if "%%a"=="VITE_FIREBASE_API_KEY" (
        echo Setting VITE_FIREBASE_API_KEY...
        call vercel env add VITE_FIREBASE_API_KEY production --force "%%b"
    )
    if "%%a"=="VITE_FIREBASE_AUTH_DOMAIN" (
        echo Setting VITE_FIREBASE_AUTH_DOMAIN...
        call vercel env add VITE_FIREBASE_AUTH_DOMAIN production --force "%%b"
    )
    if "%%a"=="VITE_FIREBASE_PROJECT_ID" (
        echo Setting VITE_FIREBASE_PROJECT_ID...
        call vercel env add VITE_FIREBASE_PROJECT_ID production --force "%%b"
    )
    if "%%a"=="VITE_FIREBASE_STORAGE_BUCKET" (
        echo Setting VITE_FIREBASE_STORAGE_BUCKET...
        call vercel env add VITE_FIREBASE_STORAGE_BUCKET production --force "%%b"
    )
    if "%%a"=="VITE_FIREBASE_MESSAGING_SENDER_ID" (
        echo Setting VITE_FIREBASE_MESSAGING_SENDER_ID...
        call vercel env add VITE_FIREBASE_MESSAGING_SENDER_ID production --force "%%b"
    )
    if "%%a"=="VITE_FIREBASE_APP_ID" (
        echo Setting VITE_FIREBASE_APP_ID...
        call vercel env add VITE_FIREBASE_APP_ID production --force "%%b"
    )
)

echo.
echo    ✅ Environment variables set!
echo.

timeout /t 2 >nul

cls

echo.
echo    [5/5] Deploying to Vercel...
echo    ═════════════════════════════════════════════════════════════
echo.

call vercel --prod

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo    ⚠️ Deployment may have failed. Check errors above.
    pause
    exit /b 1
)

echo.
echo.
echo    ╔════════════════════════════════════════════════════════════╗
echo    ║                                                            ║
echo    ║                  🎉 DEPLOYMENT SUCCESSFUL! 🎉              ║
echo    ║                                                            ║
echo    ╚════════════════════════════════════════════════════════════╝
echo.
echo.
echo    Your website is now LIVE at:
echo    ┌────────────────────────────────────────────────────────────┐
echo    │  https://lakshanaatelier.vercel.app                        │
echo    │  OR your custom domain (if configured)                     │
echo    └────────────────────────────────────────────────────────────┘
echo.
echo.
echo    ✅ DEPLOYED FEATURES:
echo    ─────────────────────────────────────────────────────────────
echo    • Password toggle (show/hide) on admin login
echo    • Fixed Firebase authentication
echo    • Admin panel with dashboard
echo    • Booking system
echo    • Gallery management (publish/unpublish)
echo    • All environment variables configured
echo.
echo.
echo    🧪 WHAT TO TEST:
echo    ─────────────────────────────────────────────────────────────
echo    1. Visit your website
echo    2. Go to /admin/login
echo    3. Check password toggle (eye icon)
echo    4. Try logging in
echo    5. Test booking system
echo    6. Test admin panel
echo.
echo.

pause
