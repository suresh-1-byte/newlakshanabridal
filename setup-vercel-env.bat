@echo off
echo.
echo ========================================
echo   ADDING FIREBASE ENV TO VERCEL
echo ========================================
echo.

echo Step 1: VITE_FIREBASE_API_KEY
echo When prompted, paste: AIzaSyCgdbZk6MU5gdCbyeUUX33TkQkycbZo6BM
call vercel env add VITE_FIREBASE_API_KEY production preview development

echo.
echo Step 2: VITE_FIREBASE_AUTH_DOMAIN
echo When prompted, paste: lakshanaatelier.firebaseapp.com
call vercel env add VITE_FIREBASE_AUTH_DOMAIN production preview development

echo.
echo Step 3: VITE_FIREBASE_PROJECT_ID
echo When prompted, paste: lakshanaatelier
call vercel env add VITE_FIREBASE_PROJECT_ID production preview development

echo.
echo Step 4: VITE_FIREBASE_STORAGE_BUCKET
echo When prompted, paste: lakshanaatelier.firebasestorage.app
call vercel env add VITE_FIREBASE_STORAGE_BUCKET production preview development

echo.
echo Step 5: VITE_FIREBASE_MESSAGING_SENDER_ID
echo When prompted, paste: 905891434766
call vercel env add VITE_FIREBASE_MESSAGING_SENDER_ID production preview development

echo.
echo Step 6: VITE_FIREBASE_APP_ID
echo When prompted, paste: 1:905891434766:web:3faf870cd5d2af53a6075f
call vercel env add VITE_FIREBASE_APP_ID production preview development

echo.
echo ========================================
echo   DONE! Now redeploy with: vercel --prod
echo ========================================
pause
