@echo off
echo ========================================
echo URGENT: FIXING FIREBASE ERRORS
echo ========================================
echo.

echo Step 1: Deploying Firebase Rules and Indexes...
echo.
echo If you haven't logged in to Firebase yet, this will open a browser window.
echo.

call firebase login
if errorlevel 1 (
    echo.
    echo ERROR: Firebase login failed
    echo Please open a browser and login to Firebase manually
    echo Then run this script again
    pause
    exit /b 1
)

echo.
echo Step 2: Deploying Firestore Rules, Indexes, and Storage Rules...
call firebase deploy --only firestore:rules,firestore:indexes,storage:rules --project lakshanaatelier
if errorlevel 1 (
    echo.
    echo ERROR: Deployment failed
    echo Check the error message above
    pause
    exit /b 1
)

echo.
echo ========================================
echo ✅ DEPLOYMENT COMPLETE!
echo ========================================
echo.
echo Firebase Rules: ✅ Deployed
echo Firebase Indexes: ✅ Creating (wait 5-10 minutes)
echo Storage Rules: ✅ Deployed
echo.
echo Next Steps:
echo 1. Wait 5-10 minutes for indexes to build
echo 2. Check Firebase Console for index status
echo 3. Refresh your website
echo 4. Test booking form
echo 5. Check if gallery and testimonials load
echo.
echo Firebase Console: https://console.firebase.google.com/project/lakshanaatelier
echo.
pause
