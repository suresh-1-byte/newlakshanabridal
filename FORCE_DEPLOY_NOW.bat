@echo off
echo ========================================
echo FORCING COMPLETE VERCEL REBUILD
echo ========================================
echo.
echo This will:
echo 1. Add a timestamp file
echo 2. Commit changes
echo 3. Force push to GitHub
echo 4. Trigger fresh Vercel build
echo.
pause
echo.

echo [1/5] Creating timestamp...
echo Build: %date% %time% > .vercel-timestamp
echo Done.

echo [2/5] Adding files...
git add .

echo [3/5] Committing...
git commit -m "deploy: Force complete rebuild to remove login button"

echo [4/5] Pushing to GitHub...
git push origin main --force

echo [5/5] Build triggered!
echo.
echo ========================================
echo  DEPLOYMENT INITIATED
echo ========================================
echo.
echo Vercel is now rebuilding from scratch.
echo.
echo WAIT 3-5 MINUTES, then:
echo 1. Clear browser cache (Ctrl+Shift+Delete)
echo 2. Open incognito window
echo 3. Visit: https://lakshanaatelier.in
echo.
echo The Login button WILL be gone!
echo.
echo ========================================
pause
