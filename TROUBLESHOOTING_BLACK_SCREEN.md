# 🐛 TROUBLESHOOTING: Black Screen Issue

## Problem
Website shows black screen at `http://localhost:8080/`

---

## ✅ VERIFIED WORKING:
- [x] Dev server running successfully
- [x] Build successful (npm run build)
- [x] All dependencies installed
- [x] No TypeScript errors
- [x] Firebase configured correctly
- [x] React Router configured correctly

---

## 🔍 DEBUGGING STEPS:

### **Step 1: Check Browser Console**

1. Open the website: `http://localhost:8080/`
2. Press `F12` to open Developer Tools
3. Click on "Console" tab
4. Look for errors (red text)

**Expected logs:**
```
🔍 Firebase Config Debug: {...}
🔥 Firebase initialized: {...}
🏠 HomePage rendering...
```

**If you see errors, note them down!**

---

### **Step 2: Check Network Tab**

1. In Developer Tools, click "Network" tab
2. Reload the page (`Ctrl+R`)
3. Check if `main.tsx` loads (should be 200 OK)
4. Check if `styles.css` loads (should be 200 OK)

---

### **Step 3: Check Elements Tab**

1. In Developer Tools, click "Elements" tab
2. Look for `<div id="root">`
3. Check if it has content inside

**If it's empty:** React is not mounting
**If it has content:** CSS issue

---

## 🔧 QUICK FIXES:

### **Fix 1: Hard Refresh**
```
Ctrl + Shift + R  (Windows/Linux)
Cmd + Shift + R   (Mac)
```

### **Fix 2: Clear Cache**
1. Press `F12`
2. Right-click on refresh button
3. Click "Empty Cache and Hard Reload"

###  **Fix 3: Check Firewall/Antivirus**
- Temporarily disable firewall
- Check if `localhost:8080` is blocked

### **Fix 4: Try Different Port**
Edit `vite.config.ts`:
```ts
server: {
  port: 3000,  // Change from 8080 to 3000
  host: true,
}
```
Then visit: `http://localhost:3000`

### **Fix 5: Try Different Browser**
- Chrome
- Edge
- Firefox

---

## 🎯 MOST COMMON CAUSES:

### **1. Loader Component Not Hiding**
The Loader component might be stuck visible.

**Check:** `src/components/Loader.tsx`
**Fix:** The loader should auto-hide after animations

### **2. SmoothScroll Blocking**
Lenis smooth scroll might be causing issues.

**Quick Test:** Comment out `<SmoothScroll />` in HomePage.tsx

### **3. CSS Not Loading**
Tailwind CSS might not be compiling.

**Check:** Look for `/assets/index.css` in Network tab

### **4. Font Loading**
Google Fonts might be blocked.

**Check:** Console for font loading errors

---

## 📋 WHAT TO CHECK IN CONSOLE:

### **✅ Good Messages (No Error):**
```
🔍 Firebase Config Debug: {hasApiKey: true, ...}
🔥 Firebase initialized: {projectId: "lakshanaatelier", ...}
🏠 HomePage rendering...
VITE v7.3.3  ready in 513 ms
```

### **❌ Bad Messages (Errors):**

**If you see:**
```
Failed to load module script
```
**Solution:** Hard refresh (Ctrl+Shift+R)

**If you see:**
```
Firebase: Error (auth/...)
```
**Solution:** Check `.env` file

**If you see:**
```
Cannot find module
```
**Solution:** `npm install` again

**If you see:**
```
Uncaught ReferenceError
```
**Solution:** Check imports in components

---

## 🚀 NUCLEAR OPTION (If Nothing Works):

```bash
# 1. Stop dev server (Ctrl+C)

# 2. Clean everything
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json
Remove-Item -Recurse -Force dist
Remove-Item -Recurse -Force .vite

# 3. Reinstall
npm install

# 4. Rebuild
npm run build

# 5. Start dev server
npm run dev

# 6. Visit http://localhost:8080
```

---

## 📸 SEND SCREENSHOT:

If still not working, send a screenshot showing:
1. Browser console (F12)
2. Network tab
3. The black screen

---

## 💡 ADDITIONAL TIPS:

1. **Check .env file exists:**
   ```bash
   cat .env
   ```
   Should show Firebase config

2. **Check if port 8080 is in use:**
   ```bash
   netstat -ano | findstr :8080
   ```

3. **Try incognito mode:**
   - Chrome: Ctrl+Shift+N
   - Clears all cache/extensions

4. **Disable browser extensions:**
   - Ad blockers might interfere

---

## ✅ EXPECTED RESULT:

You should see:
- Gold and black luxury website
- Lakshana Bridal Studio branding
- Hero section with bride image
- Smooth animations
- Navigation menu

---

## 📞 STILL NOT WORKING?

**Check these files have no errors:**
1. `src/main.tsx` - Entry point
2. `src/App.tsx` - Router setup
3. `src/pages/HomePage.tsx` - Home page
4. `src/components/Loader.tsx` - Loading screen
5. `src/styles.css` - Styles

**Run diagnostics:**
```bash
npm run lint      # Check for code errors
npm run build     # Check if build works
```

---

**Dev Server Status:** ✅ Running on http://localhost:8080  
**Build Status:** ✅ Successful  
**Expected Behavior:** Should show luxury bridal website

**If you're seeing black screen, follow the steps above!**
