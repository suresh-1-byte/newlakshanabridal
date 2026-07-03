# 🔗 CONNECT NEW GITHUB REPOSITORY TO VERCEL

Your code is now in the new GitHub repository: **newlakshanabridal**

URL: https://github.com/suresh-1-byte/newlakshanabridal

---

## ✅ **STEP 1: Disconnect Old Repository (If Needed)**

1. Go to Vercel Project Settings:
   ```
   https://vercel.com/sureshs-projects-1c6ee3cb/lakshana-luxe-glow-main/settings/git
   ```

2. Look for "Disconnect" button for the old repository

3. Click "Disconnect" (if present)

---

## ✅ **STEP 2: Connect New Repository**

### **Option A: Reconnect in Same Project** (RECOMMENDED)

1. Go to: https://vercel.com/sureshs-projects-1c6ee3cb/lakshana-luxe-glow-main/settings/git

2. Look for **"Connect Git Repository"** button

3. Click it

4. Select **GitHub**

5. Find and select **"newlakshanabridal"** repository

6. Click **"Connect"**

7. Vercel will automatically trigger a new deployment

---

### **Option B: Create New Vercel Project** (Alternative)

1. Go to: https://vercel.com/new

2. Click **"Import Project"**

3. Select **"Import Git Repository"**

4. Choose **GitHub**

5. Find **"suresh-1-byte/newlakshanabridal"**

6. Click **"Import"**

7. **Configure Project**:
   - **Project Name**: `lakshana-bridal-studio`
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

8. **Add Environment Variables** (IMPORTANT!):
   ```
   VITE_FIREBASE_API_KEY=AIzaSyCgdbZk6MU5gdCbyeUUX33TkQkycbZo6BM
   VITE_FIREBASE_AUTH_DOMAIN=lakshanaatelier.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=lakshanaatelier
   VITE_FIREBASE_STORAGE_BUCKET=lakshanaatelier.firebasestorage.app
   VITE_FIREBASE_MESSAGING_SENDER_ID=905891434766
   VITE_FIREBASE_APP_ID=1:905891434766:web:3faf870cd5d2af53a6075f
   ```

9. Click **"Deploy"**

10. **Once deployed, add your custom domain**:
    - Go to Settings → Domains
    - Add: `lakshanaatelier.in`
    - Follow DNS instructions

---

## 🎯 **WHICH OPTION SHOULD YOU CHOOSE?**

**Option A** (Reconnect in same project):
- ✅ Keeps existing environment variables
- ✅ Keeps custom domain (lakshanaatelier.in)
- ✅ Faster setup
- ⚠️ Might not be available if old repo is still connected

**Option B** (Create new project):
- ✅ Fresh start, no Git blocking issues
- ✅ Clean deployment history
- ❌ Need to re-add environment variables
- ❌ Need to re-add custom domain

---

## 📋 **RECOMMENDED: TRY OPTION A FIRST**

1. Open: https://vercel.com/sureshs-projects-1c6ee3cb/lakshana-luxe-glow-main/settings/git

2. Look for options to:
   - "Disconnect" old repository
   - "Connect" new repository

3. If you can connect the new repo, great!

4. If not, use **Option B** to create a fresh Vercel project

---

## ✅ **AFTER CONNECTING:**

1. Vercel will automatically deploy from the new repository

2. **No more Git blocking issues!** (Fresh repo with clean commit history)

3. Wait 2-3 minutes for deployment

4. Test your website: https://lakshanaatelier.in

5. Press F12 and check for: **"✅ Firebase initialization: SUCCESS"**

---

**NEXT STEP**: Go to Vercel Git settings and try to connect the new repository!

https://vercel.com/sureshs-projects-1c6ee3cb/lakshana-luxe-glow-main/settings/git
