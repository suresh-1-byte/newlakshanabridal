@echo off
echo ================================================
echo   TESTING WEBSITE WITHOUT CACHE
echo ================================================
echo.
echo Opening your website in incognito mode...
echo This will show you the REAL deployed version!
echo.
echo The Login button WILL BE GONE in this window.
echo.
pause

REM Open in Chrome Incognito
start chrome --incognito https://lakshanaatelier.in

echo.
echo ================================================
echo   INCOGNITO WINDOW OPENED!
echo ================================================
echo.
echo Check the website in the incognito window.
echo The LOGIN button should be GONE!
echo.
echo If it's still there in incognito mode, 
echo then there's a different issue.
echo.
pause
