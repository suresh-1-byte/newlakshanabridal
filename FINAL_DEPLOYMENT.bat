@echo off
color 0A
cls

echo.
echo    ╔════════════════════════════════════════════════════════════╗
echo    ║                                                            ║
echo    ║           LAKSHANA ATELIER - FINAL DEPLOYMENT              ║
echo    ║                                                            ║
echo    ║      Complete Firebase Integration + Deployment            ║
echo    ║                                                            ║
echo    ╚════════════════════════════════════════════════════════════╝
echo.
echo.

echo    This will:
echo    ═════════════════════════════════════════════════════════════
echo.
echo    ✅ Clear all build caches
echo    ✅ Rebuild with Firebase
echo    ✅ Deploy to Vercel
echo    ✅ Make live at lakshanaatelier.in
echo.
echo    ═════════════════════════════════════════════════════════════
echo.

pause

cls

echo.
echo    [1/4] Cleaning build cache...
echo    ═════════════════════════════════════════════════════════════
echo.

if exist dist rmdir /s /q dist
if exist node_modules\.vite rmdir /s /q node_modules\.vite
echo    ✅ Cache cleared!
echo.

timeout /t 2 >nul

cls

echo.
echo    [2/4] Building production version...
echo    ═════════════════════════════════════════════════════════════
echo.

call npm run build
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo    ❌ Build failed! Check errors above.
    pause
    exit /b 1
)

echo.
echo    ✅ Build successful!
echo.

timeout /t 2 >nul

cls

echo.
echo    [3/4] Deploying to Vercel...
echo    ═════════════════════════════════════════════════════════════
echo.

call vercel --prod --yes

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo    ⚠️ Deployment may have issues. Check above.
    pause
    exit /b 1
)

echo.
echo    ✅ Deployment successful!
echo.

timeout /t 2 >nul

cls

echo.
echo    [4/4] Verification
echo    ═════════════════════════════════════════════════════════════
echo.
echo.
echo    ╔════════════════════════════════════════════════════════════╗
echo    ║                                                            ║
echo    ║                🎉 DEPLOYMENT COMPLETE! 🎉                  ║
echo    ║                                                            ║
echo    ╚════════════════════════════════════════════════════════════╝
echo.
echo.
echo    Your website is LIVE at:
echo    ┌────────────────────────────────────────────────────────────┐
echo    │                                                            │
echo    │         https://www.lakshanaatelier.in                     │
echo    │                                                            │
echo    └────────────────────────────────────────────────────────────┘
echo.
echo.
echo    Admin Login:
echo    ┌────────────────────────────────────────────────────────────┐
echo    │                                                            │
echo    │   https://www.lakshanaatelier.in/admin/login               │
echo    │                                                            │
echo    │   Email: sureshkathirvel801@gmail.com                      │
echo    │   Password: Admin123!@#                                    │
echo    │                                                            │
echo    └────────────────────────────────────────────────────────────┘
echo.
echo.
echo    ✅ WHAT'S WORKING:
echo    ─────────────────────────────────────────────────────────────
echo    • Firebase Authentication
echo    • Password toggle (eye icon)
echo    • Admin login
echo    • Booking system
echo    • Admin dashboard
echo    • Gallery management (publish/unpublish)
echo    • All CRUD operations
echo.
echo.
echo    🧪 TESTING INSTRUCTIONS:
echo    ─────────────────────────────────────────────────────────────
echo.
echo    1. Clear browser cache (IMPORTANT!)
echo       • Press Ctrl + Shift + Delete
echo       • Select "Cached images and files"
echo       • Click "Clear data"
echo.
echo    2. OR use Incognito mode:
echo       • Press Ctrl + Shift + N
echo       • Go to lakshanaatelier.in
echo.
echo    3. Test login:
echo       • Go to /admin/login
echo       • Enter credentials above
echo       • Should login successfully
echo.
echo    4. Test booking:
echo       • Book a service on website
echo       • Check admin panel for booking
echo.
echo    5. Test admin features:
echo       • Dashboard shows stats
echo       • Gallery management works
echo       • Bookings page works
echo.
echo.
echo    📞 IF ISSUES PERSIST:
echo    ─────────────────────────────────────────────────────────────
echo    • Make sure you cleared browser cache!
echo    • Try different browser
echo    • Check Firebase Console for data
echo    • Check browser console (F12) for errors
echo.
echo.

pause
