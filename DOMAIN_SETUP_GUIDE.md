# 🌐 CONNECT DOMAIN: lakshanaatelier.in to Vercel

## ✅ DEPLOYMENT STATUS
- ✅ Site deployed to Vercel
- ✅ URL: lakshana-bridal-studio.vercel.app
- ✅ Firebase configured
- ⏳ Custom domain pending

---

## 📋 COMPLETE DOMAIN SETUP (5 MINUTES)

### STEP 1: ADD DOMAIN IN VERCEL (2 minutes)

1. **Go to:** https://vercel.com/suresh-i-byte/lakshana-bridal-studio/settings/domains
2. **Enter domain:** `lakshanaatelier.in`
3. **Click "Add"**
4. **Enter www domain:** `www.lakshanaatelier.in`
5. **Click "Add"**

Vercel will show you DNS records to add.

---

### STEP 2: CONFIGURE DNS IN GODADDY (2 minutes)

**Go to GoDaddy DNS Management:**
https://dcc.godaddy.com/manage/lakshanaatelier.in/dns

**Add these 2 records:**

#### RECORD 1: Root Domain
```
Type: A
Name: @
Value: 76.76.21.21
TTL: 600 seconds (or 1 Hour)
```

#### RECORD 2: WWW Subdomain
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 600 seconds (or 1 Hour)
```

**How to add in GoDaddy:**
1. Click "Add New Record" button
2. Select "A" from Type dropdown
3. Name: @ (leave empty or type @)
4. Value: 76.76.21.21
5. Click "Save"
6. Click "Add New Record" again
7. Select "CNAME" from Type dropdown
8. Name: www
9. Value: cname.vercel-dns.com
10. Click "Save"

---

### STEP 3: VERIFY (1 minute)

1. Go back to Vercel Domains page
2. Wait 2-5 minutes for DNS propagation
3. Click "Refresh" button
4. Status will change from "No Deployment" to "Production" ✅

---

## 🎯 QUICK LINKS

- **Vercel Project:** https://vercel.com/suresh-i-byte/lakshana-bridal-studio
- **Vercel Domains:** https://vercel.com/suresh-i-byte/lakshana-bridal-studio/settings/domains
- **GoDaddy DNS:** https://dcc.godaddy.com/manage/lakshanaatelier.in/dns

---

## ✅ FINAL RESULT

After DNS propagation (5-30 minutes):
- ✅ https://lakshanaatelier.in → Your site
- ✅ https://www.lakshanaatelier.in → Your site
- ✅ Automatic HTTPS/SSL certificate
- ✅ Automatic deployments on code push

---

## 🆘 TROUBLESHOOTING

**Domain shows "Invalid Configuration":**
- Check DNS records are exactly as shown above
- Wait 10-30 minutes for DNS propagation
- Click "Refresh" in Vercel

**SSL Certificate pending:**
- This is automatic after DNS is configured
- Usually takes 1-5 minutes
- No action needed

---

## 📞 SUPPORT

If you need help:
1. Vercel Support: https://vercel.com/support
2. GoDaddy Support: https://www.godaddy.com/help

---

**Created:** July 3, 2026
**Status:** Pending DNS Configuration
