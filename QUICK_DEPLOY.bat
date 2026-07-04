@echo off
echo ========================================
echo   DEPLOYING TO LIVE SITE...
echo ========================================
echo.

git add .
git commit -m "Quick update - %date% %time%"
git push origin main

echo.
echo ========================================
echo   DEPLOYED! Live in 1-2 minutes
echo ========================================
echo.
echo Visit: https://lakshanaatelier.in
echo.
pause
