@echo off
cls
echo ============================================
echo LAKSHANA ATELIER - QUICK FIX TEST
echo ============================================
echo.

echo [1/3] Checking Firebase credentials in .env...
echo.
type .env | findstr "VITE_FIREBASE_API_KEY"
echo.

echo [2/3] Clearing build cache...
if exist dist rmdir /s /q dist 2>nul
if exist node_modules\.vite rmdir /s /q node_modules\.vite 2>nul
echo Cache cleared!
echo.

echo [3/3] Starting development server...
echo.
echo ============================================
echo WHAT TO CHECK:
echo ============================================
echo.
echo 1. Open: http://localhost:5173/admin/login
echo.
echo 2. CHECK PASSWORD TOGGLE:
echo    - Look for EYE ICON (👁️) on password field
echo    - Click it to show/hide password
echo.
echo 3. TRY LOGGING IN:
echo    Email: sureshkathirvel801@gmail.com
echo    Password: Admin123!@#
echo.
echo 4. CHECK FOR ERRORS:
echo    - Open browser console (F12)
echo    - Look for Firebase errors
echo.
echo ============================================
echo.
echo Starting server now...
echo Press Ctrl+C to stop
echo.

npm run dev
