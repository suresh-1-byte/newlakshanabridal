@echo off
echo ========================================
echo PUSHING CODE TO GITHUB
echo ========================================
echo.
echo A browser window will open for GitHub authentication.
echo Please login and authorize Git Credential Manager.
echo This only needs to be done ONCE!
echo.
pause

cd /d "d:\lakshana mam\lakshana-luxe-glow-main"

echo.
echo Pushing code to GitHub...
git push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo SUCCESS! Code pushed to GitHub!
    echo ========================================
    echo.
    echo View your code at:
    echo https://github.com/suresh-i-byte/lakshana-bridal-studio
    echo.
) else (
    echo.
    echo ========================================
    echo ERROR: Push failed!
    echo ========================================
    echo.
)

pause
