@echo off
cd /d "d:\lakshana mam\lakshana-luxe-glow-main"

echo ========================================
echo DEPLOYING TO VERCEL - DIRECT METHOD
echo ========================================
echo.
echo A browser will open for authentication.
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
echo DEPLOYMENT COMPLETE!
echo ========================================
pause
