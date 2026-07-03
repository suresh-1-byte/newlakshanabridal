@echo off
echo ========================================
echo LAKSHANA BRIDAL STUDIO
echo Complete Deployment Script
echo ========================================
echo.

echo Step 1: Installing dependencies...
call npm install
if errorlevel 1 (
    echo ERROR: npm install failed
    pause
    exit /b 1
)
echo ✓ Dependencies installed
echo.

echo Step 2: Building project...
call npm run build
if errorlevel 1 (
    echo ERROR: Build failed
    pause
    exit /b 1
)
echo ✓ Build successful
echo.

echo Step 3: Deploying Firebase Rules and Indexes...
call firebase deploy --only firestore:rules,firestore:indexes,storage:rules
if errorlevel 1 (
    echo ERROR: Firebase rules deployment failed
    echo Make sure you are logged in: firebase login
    pause
    exit /b 1
)
echo ✓ Firebase rules deployed
echo.

echo Step 4: Deploying to Vercel...
call git add .
call git commit -m "Production deployment"
call git push origin main
if errorlevel 1 (
    echo WARNING: Git push may have failed
    echo Check if there are changes to commit
)
echo ✓ Code pushed to GitHub
echo.

echo ========================================
echo ✅ DEPLOYMENT COMPLETE!
echo ========================================
echo.
echo Website: https://lakshanaatelier.in
echo Admin: https://lakshanaatelier.in/admin/login
echo.
echo Next steps:
echo 1. Create admin user (see CREATE_ADMIN_USER.md)
echo 2. Wait for Vercel deployment to finish
echo 3. Wait for Firebase indexes to build (5-10 mins)
echo 4. Test booking form on website
echo 5. Test admin login and dashboard
echo.
pause
