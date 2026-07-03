@echo off
echo ========================================
echo COMPLETE GITHUB + VERCEL DEPLOYMENT
echo ========================================
echo.

cd /d "d:\lakshana mam\lakshana-luxe-glow-main"

echo [STEP 1] Checking GitHub CLI...
where gh >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo GitHub CLI not found. Installing...
    winget install --id GitHub.cli -e
    if %ERRORLEVEL% NEQ 0 (
        echo.
        echo ERROR: Could not install GitHub CLI.
        echo Please install manually from: https://cli.github.com/
        echo.
        echo Alternative: We'll use GitHub Desktop instead.
        pause
        goto SKIP_GH_CLI
    )
)

echo.
echo [STEP 2] Logging into GitHub CLI...
gh auth login

echo.
echo [STEP 3] Creating GitHub repository...
gh repo create lakshana-bridal-studio --public --source=. --remote=origin --push

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ✅ Code pushed to GitHub successfully!
    goto DEPLOY_VERCEL
)

:SKIP_GH_CLI
echo.
echo ========================================
echo MANUAL GITHUB PUSH REQUIRED
echo ========================================
echo.
echo Please use GitHub Desktop to:
echo 1. Add this repository
echo 2. Publish to GitHub
echo.
echo OR visit: https://github.com/new
echo Repository name: lakshana-bridal-studio
echo.
pause

:DEPLOY_VERCEL
echo.
echo ========================================
echo [STEP 4] DEPLOYING TO VERCEL
echo ========================================
echo.

vercel --prod ^
  -e VITE_FIREBASE_API_KEY=AIzaSyCgdbZk6MU5gdCbyeUUX33TkQkycbZo6BM ^
  -e VITE_FIREBASE_AUTH_DOMAIN=lakshanaatelier.firebaseapp.com ^
  -e VITE_FIREBASE_PROJECT_ID=lakshanaatelier ^
  -e VITE_FIREBASE_STORAGE_BUCKET=lakshanaatelier.firebasestorage.app ^
  -e VITE_FIREBASE_MESSAGING_SENDER_ID=905891434766 ^
  -e VITE_FIREBASE_APP_ID=1:905891434766:web:3faf870cd5d2af53a6075f

echo.
echo ========================================
echo ✅ DEPLOYMENT COMPLETE!
echo ========================================
echo.
echo Your site is now live on Vercel!
echo Check the URL above.
echo.
pause
