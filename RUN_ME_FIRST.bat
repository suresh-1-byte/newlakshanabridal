@echo off
color 0A
cls

echo.
echo    ╔════════════════════════════════════════════════════════════╗
echo    ║                                                            ║
echo    ║           LAKSHANA ATELIER - COMPLETE FIX                  ║
echo    ║                                                            ║
echo    ║     Password Toggle + Firebase Error Resolution            ║
echo    ║                                                            ║
echo    ╚════════════════════════════════════════════════════════════╝
echo.
echo.

echo    What will this script do?
echo    ═════════════════════════════════════════════════════════════
echo.
echo    ✅ Check your Node.js installation
echo    ✅ Display your Firebase configuration
echo    ✅ Clear all build caches
echo    ✅ Install/update dependencies
echo    ✅ Start development server
echo    ✅ Show what to test
echo.
echo    ═════════════════════════════════════════════════════════════
echo.

pause

cls

echo.
echo    [1/6] Checking Node.js installation...
echo    ═════════════════════════════════════════════════════════════
echo.

where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo    ❌ ERROR: Node.js is not installed!
    echo.
    echo    Please install Node.js from: https://nodejs.org/
    echo    Download the LTS version (recommended)
    echo.
    pause
    exit /b 1
)

node --version
echo    ✅ Node.js found!
echo.

timeout /t 2 >nul

cls

echo.
echo    [2/6] Checking Firebase Configuration...
echo    ═════════════════════════════════════════════════════════════
echo.

if not exist .env (
    echo    ❌ ERROR: .env file not found!
    echo.
    echo    Please make sure .env file exists in the project folder
    echo.
    pause
    exit /b 1
)

echo    Current Firebase Config:
echo    ─────────────────────────────────────────────────────────────
type .env | findstr "VITE_FIREBASE_API_KEY"
type .env | findstr "VITE_FIREBASE_PROJECT_ID"
type .env | findstr "VITE_FIREBASE_AUTH_DOMAIN"
echo    ─────────────────────────────────────────────────────────────
echo    ✅ Firebase configuration found!
echo.

timeout /t 3 >nul

cls

echo.
echo    [3/6] Cleaning build cache...
echo    ═════════════════════════════════════════════════════════════
echo.

if exist dist (
    echo    Removing dist folder...
    rmdir /s /q dist
    echo    ✅ dist folder removed
)

if exist node_modules\.vite (
    echo    Removing Vite cache...
    rmdir /s /q node_modules\.vite
    echo    ✅ Vite cache cleared
)

echo.
echo    ✅ Build cache cleaned successfully!
echo.

timeout /t 2 >nul

cls

echo.
echo    [4/6] Checking dependencies...
echo    ═════════════════════════════════════════════════════════════
echo.

if not exist node_modules (
    echo    Installing dependencies... (this may take a few minutes)
    echo.
    call npm install
    echo.
    echo    ✅ Dependencies installed!
) else (
    echo    ✅ Dependencies already installed
)

echo.

timeout /t 2 >nul

cls

echo.
echo    [5/6] Building application...
echo    ═════════════════════════════════════════════════════════════
echo.

echo    Building with fresh configuration...
echo.

call npm run build
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo    ⚠️ Build encountered errors, but will try to run dev server anyway
    echo.
    timeout /t 3 >nul
) else (
    echo.
    echo    ✅ Build successful!
    echo.
    timeout /t 2 >nul
)

cls

echo.
echo    [6/6] Starting Development Server...
echo    ═════════════════════════════════════════════════════════════
echo.
echo.
echo    ╔════════════════════════════════════════════════════════════╗
echo    ║                                                            ║
echo    ║                    🎉 READY TO TEST 🎉                     ║
echo    ║                                                            ║
echo    ╚════════════════════════════════════════════════════════════╝
echo.
echo.
echo    Your website will open at:
echo    ┌────────────────────────────────────────────────────────────┐
echo    │  http://localhost:5173/admin/login                         │
echo    └────────────────────────────────────────────────────────────┘
echo.
echo.
echo    ═══════════════════════════════════════════════════════════
echo    📋 WHAT TO TEST:
echo    ═══════════════════════════════════════════════════════════
echo.
echo    ✅ TEST 1: PASSWORD TOGGLE
echo       ────────────────────────────────────────────────────
echo       1. Look for the EYE ICON (👁️) on password field
echo       2. It should appear on the RIGHT side of the field
echo       3. Click it to show/hide your password
echo       4. Icon should change color to gold when hovering
echo.
echo    ✅ TEST 2: FIREBASE CONNECTION
echo       ────────────────────────────────────────────────────
echo       1. Open browser console (Press F12)
echo       2. Look for "Firebase Config Debug" message
echo       3. Try logging in with:
echo          • Email: sureshkathirvel801@gmail.com
echo          • Password: Admin123!@#
echo.
echo    ✅ TEST 3: NO ERRORS
echo       ────────────────────────────────────────────────────
echo       1. Check console for red errors
echo       2. Should NOT see "api-key-not-valid" error
echo       3. If you see "user-not-found", that's OK!
echo          (Just means you need to create admin user)
echo.
echo    ═══════════════════════════════════════════════════════════
echo.
echo.
echo    📚 HELPFUL GUIDES:
echo    ═══════════════════════════════════════════════════════════
echo.
echo    • VISUAL_FIX_GUIDE.txt
echo      → Visual diagrams showing how features should look
echo.
echo    • PASSWORD_TOGGLE_AND_FIREBASE_FIX_SUMMARY.md
echo      → Complete documentation with troubleshooting
echo.
echo    • FIREBASE_ERROR_SOLUTION.md
echo      → Step-by-step Firebase setup guide
echo.
echo    ═══════════════════════════════════════════════════════════
echo.
echo.
echo    Press Ctrl+C to stop the server
echo.
echo    Starting server now...
echo.

timeout /t 3 >nul

call npm run dev

pause
