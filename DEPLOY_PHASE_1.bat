@echo off
echo.
echo ========================================
echo  LAKSHANA ADMIN PHASE 1 DEPLOYMENT
echo ========================================
echo.
echo This will deploy Phase 1 of the Premium Admin System to production.
echo.
echo What's being deployed:
echo   - Premium Admin Layout (Sidebar + TopBar)
echo   - Enhanced Dashboard with StatsCards
echo   - Booking History Page
echo   - Customer Management Page
echo   - Settings Page
echo   - All reusable components
echo.
echo Current Features PRESERVED:
echo   - All existing booking functionality
echo   - Gallery management
echo   - Real-time Firebase updates
echo   - Excel export
echo   - WhatsApp integration
echo.
pause
echo.
echo [1/4] Adding files to git...
git add .

echo.
echo [2/4] Committing changes...
git commit -m "feat: Premium Admin System Phase 1 Complete - Layout, Navigation, Enhanced Dashboard, New Pages (Booking History, Customers, Settings)"

echo.
echo [3/4] Pushing to GitHub...
git push origin main

echo.
echo [4/4] Deployment initiated!
echo.
echo ========================================
echo  DEPLOYMENT COMPLETE!
echo ========================================
echo.
echo Vercel is now building and deploying...
echo.
echo Live in ~2-3 minutes at:
echo   https://lakshanaatelier.in
echo.
echo Admin Panel:
echo   https://lakshanaatelier.in/admin/login
echo.
echo Login Credentials:
echo   Email: admin@lakshana.com
echo   Password: Lakshana2026@
echo.
echo ========================================
echo.
pause
