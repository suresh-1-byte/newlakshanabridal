@echo off
echo ========================================
echo LAKSHANA ATELIER - DEPLOYMENT SCRIPT
echo Domain: lakshanaatelier.in
echo ========================================
echo.

echo [1/5] Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)
echo Dependencies installed successfully!
echo.

echo [2/5] Running production build...
call npm run build
if %errorlevel% neq 0 (
    echo ERROR: Build failed
    pause
    exit /b 1
)
echo Build completed successfully!
echo.

echo [3/5] Testing production build...
echo.
echo The preview server will start shortly.
echo Press Ctrl+C to stop the preview and continue deployment.
echo.
timeout /t 3
call npm run preview
echo.

echo [4/5] Deployment Options:
echo.
echo OPTION 1: Deploy to Vercel (Recommended)
echo ----------------------------------------
echo 1. Install Vercel CLI: npm install -g vercel
echo 2. Login: vercel login
echo 3. Deploy: vercel --prod
echo.
echo OPTION 2: Deploy to Netlify
echo ----------------------------
echo 1. Install Netlify CLI: npm install -g netlify-cli
echo 2. Login: netlify login
echo 3. Deploy: netlify deploy --prod
echo.

echo [5/5] Post-Deployment Steps:
echo.
echo Your application is now deployed to Vercel!
echo.
echo Next Steps:
echo ======================================
echo 1. Visit your deployment URL
echo 2. Test the booking form
echo 3. Test admin login
echo 4. Verify Firebase connectivity
echo.
echo Configure DNS in GoDaddy:
echo ========================
echo 1. Login to: https://dcc.godaddy.com
echo 2. Go to: DNS Management for lakshanaatelier.in
echo 3. Follow instructions in DEPLOYMENT_GUIDE.md
echo.
echo Set Environment Variables:
echo =========================
echo Copy values from .env.production to your deployment platform
echo (Vercel or Netlify Dashboard)
echo.
echo ========================================
echo Deployment preparation complete!
echo See DEPLOYMENT_GUIDE.md for detailed instructions
echo ========================================
pause
