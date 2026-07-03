@echo off
color 0A
mode con: cols=80 lines=40
title Lakshana Atelier - Setup Center

:MENU
cls
echo.
echo     ╔════════════════════════════════════════════════════════════════╗
echo     ║                                                                ║
echo     ║            🔥 LAKSHANA ATELIER SETUP CENTER 🔥                ║
echo     ║                                                                ║
echo     ║              Premium Bridal Website Management                ║
echo     ║                                                                ║
echo     ╚════════════════════════════════════════════════════════════════╝
echo.
echo     ┌────────────────────────────────────────────────────────────────┐
echo     │  ADMIN CREDENTIALS                                             │
echo     ├────────────────────────────────────────────────────────────────┤
echo     │  Email:    sureshkathirvel801@gmail.com                        │
echo     │  Password: Admin123!@#                                         │
echo     └────────────────────────────────────────────────────────────────┘
echo.
echo     ┌────────────────────────────────────────────────────────────────┐
echo     │  MAIN MENU - Choose an option:                                 │
echo     └────────────────────────────────────────────────────────────────┘
echo.
echo        [1] 🚀 Run Complete Automated Setup (START HERE!)
echo.
echo        [2] 📖 Open Visual Setup Guide (Browser)
echo.
echo        [3] 📋 View Quick Checklist
echo.
echo        [4] 📚 Read Complete Documentation
echo.
echo        [5] 🌐 Open Admin Login Page
echo.
echo        [6] 📊 Open Admin Dashboard
echo.
echo        [7] 🔥 Open Firebase Console
echo.
echo        [8] ✅ View Setup Summary
echo.
echo        [0] ❌ Exit
echo.
echo     ┌────────────────────────────────────────────────────────────────┐
echo     │  STATUS                                                        │
echo     └────────────────────────────────────────────────────────────────┘
echo.
echo        Website:  ✅ Deployed (lakshanaatelier.in)
echo        Code:     ✅ Complete
echo        Firebase: ⚠️  Needs manual setup (3 steps, 15 minutes)
echo.
echo     ════════════════════════════════════════════════════════════════
echo.
set /p choice="     Enter your choice (0-8): "

if "%choice%"=="1" goto AUTOMATED
if "%choice%"=="2" goto VISUAL
if "%choice%"=="3" goto CHECKLIST
if "%choice%"=="4" goto DOCS
if "%choice%"=="5" goto ADMIN_LOGIN
if "%choice%"=="6" goto ADMIN_DASH
if "%choice%"=="7" goto FIREBASE
if "%choice%"=="8" goto SUMMARY
if "%choice%"=="0" goto EXIT
goto INVALID

:AUTOMATED
cls
echo.
echo     ╔════════════════════════════════════════════════════════════════╗
echo     ║  🚀 RUNNING AUTOMATED SETUP                                   ║
echo     ╚════════════════════════════════════════════════════════════════╝
echo.
echo     This will:
echo        • Add all Firebase environment variables to Vercel
echo        • Redeploy your website with new configuration
echo        • Open visual guide for remaining manual steps
echo.
echo     Press any key to start...
pause >nul
call COMPLETE_AUTOMATED_SETUP.bat
goto END

:VISUAL
cls
echo.
echo     ╔════════════════════════════════════════════════════════════════╗
echo     ║  📖 OPENING VISUAL SETUP GUIDE                                ║
echo     ╚════════════════════════════════════════════════════════════════╝
echo.
echo     Opening in your default browser...
start FIREBASE_MANUAL_SETUP.html
timeout /t 2 /nobreak >nul
goto MENU

:CHECKLIST
cls
echo.
echo     ╔════════════════════════════════════════════════════════════════╗
echo     ║  📋 OPENING QUICK CHECKLIST                                   ║
echo     ╚════════════════════════════════════════════════════════════════╝
echo.
start notepad QUICK_CHECKLIST.txt
timeout /t 2 /nobreak >nul
goto MENU

:DOCS
cls
echo.
echo     ╔════════════════════════════════════════════════════════════════╗
echo     ║  📚 OPENING COMPLETE DOCUMENTATION                            ║
echo     ╚════════════════════════════════════════════════════════════════╝
echo.
start FINAL_SETUP_INSTRUCTIONS.md
timeout /t 2 /nobreak >nul
goto MENU

:ADMIN_LOGIN
cls
echo.
echo     ╔════════════════════════════════════════════════════════════════╗
echo     ║  🌐 OPENING ADMIN LOGIN PAGE                                  ║
echo     ╚════════════════════════════════════════════════════════════════╝
echo.
echo     URL: https://www.lakshanaatelier.in/admin/login
echo.
echo     Credentials:
echo        Email:    sureshkathirvel801@gmail.com
echo        Password: Admin123!@#
echo.
start https://www.lakshanaatelier.in/admin/login
timeout /t 2 /nobreak >nul
goto MENU

:ADMIN_DASH
cls
echo.
echo     ╔════════════════════════════════════════════════════════════════╗
echo     ║  📊 OPENING ADMIN DASHBOARD                                   ║
echo     ╚════════════════════════════════════════════════════════════════╝
echo.
echo     URL: https://www.lakshanaatelier.in/admin/dashboard
echo.
echo     Note: You must login first at /admin/login
echo.
start https://www.lakshanaatelier.in/admin/dashboard
timeout /t 2 /nobreak >nul
goto MENU

:FIREBASE
cls
echo.
echo     ╔════════════════════════════════════════════════════════════════╗
echo     ║  🔥 OPENING FIREBASE CONSOLE                                  ║
echo     ╚════════════════════════════════════════════════════════════════╝
echo.
echo     URL: https://console.firebase.google.com/project/lakshanaatelier
echo.
start https://console.firebase.google.com/project/lakshanaatelier
timeout /t 2 /nobreak >nul
goto MENU

:SUMMARY
cls
echo.
echo     ╔════════════════════════════════════════════════════════════════╗
echo     ║  ✅ OPENING SETUP SUMMARY                                     ║
echo     ╚════════════════════════════════════════════════════════════════╝
echo.
start COMPLETE_SUMMARY.md
timeout /t 2 /nobreak >nul
goto MENU

:INVALID
cls
echo.
echo     ╔════════════════════════════════════════════════════════════════╗
echo     ║  ❌ INVALID CHOICE                                            ║
echo     ╚════════════════════════════════════════════════════════════════╝
echo.
echo     Please enter a number between 0 and 8.
timeout /t 2 /nobreak >nul
goto MENU

:END
echo.
echo     ┌────────────────────────────────────────────────────────────────┐
echo     │  Automated setup script has finished.                          │
echo     │  Please complete the manual steps shown in the browser.        │
echo     └────────────────────────────────────────────────────────────────┘
echo.
pause
goto MENU

:EXIT
cls
echo.
echo     ╔════════════════════════════════════════════════════════════════╗
echo     ║                                                                ║
echo     ║              Thank you for using Setup Center!                ║
echo     ║                                                                ║
echo     ║           🎉 Lakshana Atelier - Premium Bridal 🎉            ║
echo     ║                                                                ║
echo     ╚════════════════════════════════════════════════════════════════╝
echo.
echo     Quick Links:
echo        • Website:  https://www.lakshanaatelier.in
echo        • Admin:    https://www.lakshanaatelier.in/admin/login
echo        • Firebase: https://console.firebase.google.com/project/lakshanaatelier
echo.
timeout /t 3 /nobreak >nul
exit
