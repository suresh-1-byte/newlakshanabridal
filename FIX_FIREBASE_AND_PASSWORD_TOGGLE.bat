@echo off
echo ========================================
echo FIREBASE API KEY FIX + PASSWORD TOGGLE
echo ========================================
echo.

:: Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo [STEP 1] Verifying Firebase Configuration...
echo.

:: Display current Firebase config from .env
echo Current Firebase Config in .env:
type .env | findstr "VITE_FIREBASE"
echo.

echo [STEP 2] Testing if environment variables are loading...
echo.

:: Create a test script to check env vars
echo import.meta.env.VITE_FIREBASE_API_KEY = "%VITE_FIREBASE_API_KEY%" > test-env.txt
echo.

echo [STEP 3] Cleaning build cache...
echo.
if exist dist rmdir /s /q dist
if exist node_modules\.vite rmdir /s /q node_modules\.vite
echo Cache cleared!
echo.

echo [STEP 4] Installing dependencies (if needed)...
echo.
call npm install
echo.

echo [STEP 5] Building application with environment variables...
echo.
call npm run build
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Build failed!
    pause
    exit /b 1
)
echo Build successful!
echo.

echo [STEP 6] Starting development server...
echo.
echo ==========================================
echo Your website will open at:
echo http://localhost:5173/admin/login
echo ==========================================
echo.
echo WHAT TO TEST:
echo 1. Password field should have an EYE ICON on the right
echo 2. Click the eye icon to show/hide password
echo 3. Try logging in with:
echo    Email: sureshkathirvel801@gmail.com
echo    Password: Admin123!@#
echo.
echo If you see "Firebase: Error (auth/api-key-not-valid)" it means:
echo - Firebase project doesn't exist yet, OR
echo - API key in .env is incorrect
echo.
echo Press Ctrl+C to stop the server
echo ==========================================
echo.

call npm run dev

pause
