@echo off
echo ========================================
echo   LAKSHANA - Auto Deploy to Live
echo ========================================
echo.

echo [1/4] Adding all changes to git...
git add .
if errorlevel 1 (
    echo ERROR: Failed to add files to git
    pause
    exit /b 1
)
echo ✓ Files added successfully
echo.

echo [2/4] Creating commit...
set /p commit_message="Enter commit message (or press Enter for default): "
if "%commit_message%"=="" set commit_message=Update: Auto deployment

git commit -m "%commit_message%"
if errorlevel 1 (
    echo NOTE: Nothing to commit or commit failed
    echo Checking if we need to push existing commits...
)
echo ✓ Commit created
echo.

echo [3/4] Pushing to GitHub...
git push origin main
if errorlevel 1 (
    echo ERROR: Failed to push to GitHub
    echo Make sure you have internet connection and GitHub access
    pause
    exit /b 1
)
echo ✓ Pushed to GitHub successfully
echo.

echo [4/4] Vercel will automatically deploy...
echo ✓ Your changes are being deployed to live site!
echo.
echo ========================================
echo   Deployment initiated successfully!
echo ========================================
echo.
echo Your site will be live in 1-2 minutes at:
echo https://lakshanaatelier.in
echo.
echo Check deployment status at: https://vercel.com/dashboard
echo.
pause
