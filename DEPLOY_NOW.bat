@echo off
echo ========================================
echo DEPLOYING LAKSHANA BRIDAL STUDIO
echo ========================================
echo.

REM Check if npm is installed
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: npm is not installed!
    echo Please install Node.js from https://nodejs.org
    pause
    exit /b 1
)

echo [1/4] Installing Vercel CLI...
call npm install -g vercel

echo.
echo [2/4] Building the project...
call npm run build

echo.
echo [3/4] Deploying to Vercel...
echo You will be asked to login to Vercel
echo.
call vercel --prod

echo.
echo ========================================
echo DEPLOYMENT COMPLETE!
echo ========================================
echo.
echo Your site is now live on Vercel!
echo.
pause
