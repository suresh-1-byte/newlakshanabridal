# 🚀 How to Update Your Live Website

## ✨ Super Quick Method (Recommended)

### Just Double-Click: `QUICK_DEPLOY.bat`

1. Make your changes in the code
2. Double-click **QUICK_DEPLOY.bat**
3. Wait 1-2 minutes
4. Your site is LIVE! ✅

That's it! The script automatically:
- Saves all your changes
- Pushes to GitHub
- Triggers Vercel deployment

---

## 📋 Manual Method (If you prefer)

If you want to do it manually:

### Step 1: Save and commit changes
```bash
git add .
git commit -m "Your update message"
```

### Step 2: Push to GitHub
```bash
git push origin main
```

### Step 3: Wait for automatic deployment
Vercel will automatically detect the push and deploy (1-2 minutes)

---

## 🔄 How Automatic Deployment Works

Your site is connected:
- **GitHub**: https://github.com/suresh-1-byte/newlakshanabridal
- **Vercel**: Automatically deploys when you push to GitHub
- **Live Site**: https://lakshanaatelier.in

**Every time you push to GitHub → Vercel automatically updates your live site!**

---

## ✅ What We Updated Today

1. ✅ Added Login button to navigation bar
2. ✅ Added Toaster for booking form notifications
3. ✅ Changed admin login button text to "Sign In"

---

## 🆘 Troubleshooting

### If deployment fails:

1. **Check Vercel Dashboard**: https://vercel.com/dashboard
2. **Check build logs** for any errors
3. **Common issues**:
   - Missing environment variables (check `.env` file)
   - Build errors (run `npm run build` locally first)
   - TypeScript errors (check console)

### If git push fails:

1. Make sure you have internet connection
2. Check if you're logged into GitHub
3. Try: `git pull origin main` first, then push again

---

## 💡 Pro Tips

1. **Always test locally first**: Run `npm run dev` before deploying
2. **Check for errors**: Open browser console (F12) to check for errors
3. **Use meaningful commit messages**: Instead of "update", use "Added login button to navbar"

---

## 🔗 Useful Links

- **Live Site**: https://lakshanaatelier.in
- **Vercel Dashboard**: https://vercel.com/dashboard
- **GitHub Repository**: https://github.com/suresh-1-byte/newlakshanabridal

---

## 📞 Need Help?

If something doesn't work:
1. Check the Vercel deployment logs
2. Check your browser console for errors
3. Make sure all environment variables are set in Vercel dashboard
