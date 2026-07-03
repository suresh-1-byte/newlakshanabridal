@echo off
echo Adding Firebase Environment Variables to Vercel...
echo.

echo Adding VITE_FIREBASE_API_KEY...
vercel env add VITE_FIREBASE_API_KEY production
echo AIzaSyCgdbZk6MU5gdCbyeUUX33TkQkycbZo6BM

echo.
echo Adding VITE_FIREBASE_AUTH_DOMAIN...
vercel env add VITE_FIREBASE_AUTH_DOMAIN production
echo lakshanaatelier.firebaseapp.com

echo.
echo Adding VITE_FIREBASE_PROJECT_ID...
vercel env add VITE_FIREBASE_PROJECT_ID production
echo lakshanaatelier

echo.
echo Adding VITE_FIREBASE_STORAGE_BUCKET...
vercel env add VITE_FIREBASE_STORAGE_BUCKET production
echo lakshanaatelier.firebasestorage.app

echo.
echo Adding VITE_FIREBASE_MESSAGING_SENDER_ID...
vercel env add VITE_FIREBASE_MESSAGING_SENDER_ID production
echo 905891434766

echo.
echo Adding VITE_FIREBASE_APP_ID...
vercel env add VITE_FIREBASE_APP_ID production
echo 1:905891434766:web:3faf870cd5d2af53a6075f

echo.
echo Done! Now redeploy with: vercel --prod
pause
