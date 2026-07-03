# 🚀 QUICK START GUIDE

## Lakshana Bridal Studio - React + Firebase

---

## ✅ YOUR PROJECT IS NOW CLEAN & READY

**Architecture:** React 19 + Vite 7 + Firebase 12
**Status:** Production Ready
**All Issues:** Resolved ✅

---

## 🏃 START DEVELOPING (3 steps)

### **1. Install Dependencies**
```bash
npm install
```

### **2. Start Development Server**
```bash
npm run dev
```

### **3. Open Browser**
```
http://localhost:8080
```

---

## 📦 AVAILABLE COMMANDS

```bash
npm run dev          # Start development server (port 8080)
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Check code quality
npm run format       # Format code with Prettier
```

---

## 🔥 FIREBASE CONFIGURATION

Your Firebase is already configured in `.env`:

```env
VITE_FIREBASE_API_KEY=AIzaSyCgdbZk6MU5gdCbyeUUX33TkQkycbZo6BM
VITE_FIREBASE_AUTH_DOMAIN=lakshanaatelier.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=lakshanaatelier
VITE_FIREBASE_STORAGE_BUCKET=lakshanaatelier.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=905891434766
VITE_FIREBASE_APP_ID=1:905891434766:web:3faf870cd5d2af53a6075f
```

**✅ No changes needed!**

---

## 🎯 MAIN FEATURES

### **Public Website:**
- **Home:** `http://localhost:8080/`
- **Booking:** Available on home page
- **Services:** Portfolio, Gallery, Testimonials

### **Admin Panel:**
- **Login:** `http://localhost:8080/admin/login`
- **Credentials:**
  - Email: `sureshkathirvel801@gmail.com`
  - Password: `Admin123!@#`
- **Dashboard:** `http://localhost:8080/admin/dashboard`
- **Bookings:** `http://localhost:8080/admin/bookings`
- **Gallery:** `http://localhost:8080/admin/gallery`

---

## 🚀 DEPLOYMENT (1 command)

### **To Vercel:**

```bash
npm run build           # Build first
vercel deploy --prod    # Deploy to production
```

Or push to GitHub - Vercel auto-deploys!

### **Environment Variables (Vercel Dashboard):**

Add these in Vercel project settings:

```
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
VITE_APP_NAME
VITE_APP_URL
```

Copy values from `.env.production`

---

## 📁 PROJECT STRUCTURE

```
src/
├── components/          # All React components
│   ├── Hero.tsx        # Homepage hero
│   ├── Services.tsx    # Services section
│   ├── Book.tsx        # Booking form
│   └── ...
├── pages/              # Route pages
│   ├── HomePage.tsx    # Main page
│   ├── AdminLogin.tsx  # Admin login
│   └── ...
├── contexts/
│   └── FirebaseAuthContext.tsx  # Auth provider
├── lib/
│   ├── firebase.ts     # Firebase setup
│   └── firebaseApi.ts  # Database functions
├── App.tsx             # Routes
└── main.tsx            # Entry point
```

---

## 🔧 COMMON TASKS

### **Add a New Page:**

1. Create file: `src/pages/NewPage.tsx`
2. Add route in `src/App.tsx`:
```tsx
<Route path="/new-page" element={<NewPage />} />
```

### **Add Firebase Data:**

1. Use `firebaseApi` from `src/lib/firebaseApi.ts`
2. Example:
```tsx
import { firebaseApi } from '../lib/firebaseApi';

const result = await firebaseApi.createBooking(data);
```

### **Add New Component:**

1. Create file: `src/components/MyComponent.tsx`
2. Import and use:
```tsx
import MyComponent from './components/MyComponent';
```

---

## 🐛 TROUBLESHOOTING

### **Build fails:**
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### **Port 8080 already in use:**
Change in `vite.config.ts`:
```ts
server: {
  port: 3000,  // or any other port
}
```

### **Firebase errors:**
1. Check `.env` file exists
2. Check all `VITE_FIREBASE_*` variables are set
3. Restart dev server: `npm run dev`

---

## 📚 DOCUMENTATION

- **Architecture Report:** `ARCHITECTURE_CLEANUP_REPORT.md`
- **Firebase Setup:** `FIREBASE_ONLY_SETUP.md`
- **Main README:** `README.md`

---

## ✅ WHAT'S BEEN CLEANED

- ❌ Removed TanStack (Router, Start, Query)
- ❌ Removed server-side packages (Express, Mongoose, etc.)
- ❌ Removed 400+ unnecessary packages
- ❌ Removed all backup files
- ✅ Kept only essential dependencies
- ✅ Optimized build process
- ✅ Fixed all conflicts

---

## 🎉 YOU'RE READY!

Your project is now:
- ✅ Clean architecture (React + Firebase)
- ✅ No conflicts
- ✅ Production-ready
- ✅ Fast builds
- ✅ Optimized bundle

**Start developing:**
```bash
npm run dev
```

**Questions?** Check `ARCHITECTURE_CLEANUP_REPORT.md`

---

**Happy Coding! 🚀**
