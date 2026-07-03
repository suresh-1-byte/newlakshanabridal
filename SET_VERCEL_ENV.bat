@echo off
echo Setting Vercel Environment Variables...
echo.

cd /d "%~dp0"

echo Setting VITE_FIREBASE_API_KEY...
vercel env add VITE_FIREBASE_API_KEY production preview development --yes < nul
echo AIzaSyCgdbZk6MU5gdCbyeUUX33TkQkycbZo6BM

echo.
echo Setting VITE_FIREBASE_AUTH_DOMAIN...
vercel env add VITE_FIREBASE_AUTH_DOMAIN production preview development --yes < nul
echo lakshanaatelier.firebaseapp.com

echo.
echo Setting VITE_FIREBASE_PROJECT_ID...
vercel env add VITE_FIREBASE_PROJECT_ID production preview development --yes < nul
echo lakshanaatelier

echo.
echo Setting VITE_FIREBASE_STORAGE_BUCKET...
vercel env add VITE_FIREBASE_STORAGE_BUCKET production preview development --yes < nul
echo lakshanaatelier.firebasestorage.app

echo.
echo Setting VITE_FIREBASE_MESSAGING_SENDER_ID...
vercel env add VITE_FIREBASE_MESSAGING_SENDER_ID production preview development --yes < nul
echo 905891434766

echo.
echo Setting VITE_FIREBASE_APP_ID...
vercel env add VITE_FIREBASE_APP_ID production preview development --yes < nul
echo 1:905891434766:web:3faf870cd5d2af53a6075f

echo.
echo Done! Now redeploying...
vercel --prod --yes

pause
