# ⚡ QUICK REFERENCE CARD

Keep this handy while working on your project.

---

## 🔑 Project Details

```
Project Name: Lakshana Bridal Studio
Supabase Project ID: lhqwuycqjzsmkvwllvzx
Supabase URL: https://lhqwuycqjzsmkvwllvzx.supabase.co
Local URL: http://localhost:8080
```

---

## 🔗 Essential Links

| Link | URL |
|------|-----|
| Dashboard | https://supabase.com/dashboard/project/lhqwuycqjzsmkvwllvzx |
| Get Anon Key | https://supabase.com/dashboard/project/lhqwuycqjzsmkvwllvzx/settings/api |
| Table Editor | https://supabase.com/dashboard/project/lhqwuycqjzsmkvwllvzx/editor |
| SQL Editor | https://supabase.com/dashboard/project/lhqwuycqjzsmkvwllvzx/sql/new |
| Storage | https://supabase.com/dashboard/project/lhqwuycqjzsmkvwllvzx/storage/buckets |
| Logs | https://supabase.com/dashboard/project/lhqwuycqjzsmkvwllvzx/logs/explorer |

---

## ⚡ Common Commands

```bash
# Start development
npm run dev

# Build for production
npm run build

# Preview production
npm run preview

# Install dependencies
npm install

# Clear cache
rm -rf node_modules/.vite
```

---

## 📂 Key Files

```
.env                          → Environment variables (anon key here)
src/lib/supabase.ts          → Supabase client & TypeScript types
src/lib/api.ts               → API functions (all database operations)
src/components/Book.tsx      → Booking form component
src/components/Testimonials.tsx → Testimonials display

supabase/migrations/
  00001_complete_schema.sql  → Database tables (40+)
  00002_rls_policies.sql     → Security policies (100+)
  00003_triggers_functions.sql → Automation (15+ triggers)
  00004_seed_data.sql        → Sample data
```

---

## 🗄️ Main Database Tables

```sql
-- Core Tables
customers              → Customer information
appointments           → Booking requests
services              → Services offered
service_categories    → Service categories
bridal_packages       → Bridal packages
testimonials          → Customer testimonials
contact_messages      → Contact form submissions

-- Academy
academy_courses       → Academy courses
academy_enquiries     → Course enquiries
academy_students      → Enrolled students

-- Content
gallery               → Gallery images/videos
gallery_categories    → Gallery categories
blog_posts            → Blog articles
blog_categories       → Blog categories
faqs                  → Frequently asked questions

-- Admin
admins                → Staff/admin users
notifications         → Admin notifications
activity_logs         → All activities tracked
website_settings      → Website configuration

-- Marketing
offers                → Special offers
coupons               → Discount coupons
newsletter_subscribers → Newsletter list
whatsapp_enquiries    → WhatsApp leads
```

---

## 🔐 Environment Variables

```env
# Supabase (Required)
VITE_SUPABASE_URL=https://lhqwuycqjzsmkvwllvzx.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# App Settings
VITE_APP_NAME=Lakshana Bridal Studio
VITE_APP_URL=http://localhost:8080
NODE_ENV=development

# Optional (Future)
RESEND_API_KEY=
WHATSAPP_API_KEY=
RAZORPAY_KEY_ID=
GOOGLE_ANALYTICS_ID=
```

---

## 🔄 API Functions Available

```typescript
// Bookings
api.createBooking(data)      → Create new booking

// Contact
api.createContact(data)       → Submit contact form

// Academy
api.createEnrollment(data)    → Submit academy enquiry

// Content
api.getTestimonials()         → Fetch testimonials
api.getGallery(category?)     → Fetch gallery items
api.getServices(category?)    → Fetch services
api.getBridalPackages()       → Fetch packages
api.getBlogPosts(category?)   → Fetch blog posts

// WhatsApp
api.createWhatsAppEnquiry(data) → Submit WhatsApp enquiry
```

---

## 🧪 Testing Checklist

```
✅ Setup Phase
[ ] Got anon key from Supabase
[ ] Updated .env file
[ ] Ran all 4 migrations
[ ] Verified tables exist

✅ Booking Form
[ ] Form displays correctly
[ ] Can select service
[ ] Can pick date
[ ] Submit works
[ ] Success message shows
[ ] Data in appointments table
[ ] Customer created in customers table

✅ Testimonials
[ ] Testimonials display
[ ] Auto-rotation works
[ ] Data from testimonials table

✅ Console
[ ] No errors in browser console
[ ] No errors in terminal
```

---

## 🐛 Common Issues & Fixes

### Issue: "Invalid API key"
**Fix**: Get anon key from API settings and update `.env`

### Issue: "relation does not exist"
**Fix**: Run migrations in SQL Editor (all 4 files)

### Issue: Form not submitting
**Fix**: 
1. Check browser console (F12)
2. Verify anon key in `.env`
3. Restart dev server

### Issue: No testimonials showing
**Fix**: 
1. Run Migration 4 (seed data)
2. Check testimonials table has data
3. Check `is_approved = true`

### Issue: Duplicate customers
**Fix**: Should not happen - API checks phone number first

---

## 📊 Database Schema Notes

### Automatic Features
- ✅ Booking references auto-generated (LBS20240715001)
- ✅ Timestamps auto-updated on all tables
- ✅ Customer statistics auto-calculated
- ✅ Admin notifications auto-created
- ✅ Activity logs auto-recorded
- ✅ Appointment history auto-tracked

### Security Features
- ✅ Row Level Security enabled on all tables
- ✅ Public can read active services/testimonials
- ✅ Public can insert bookings/contacts
- ✅ Customers can only see own data
- ✅ Staff role-based permissions
- ✅ Admins have full access

---

## 🔍 Debugging Tips

### Check Browser Console
```
Press F12 → Console tab
Look for red error messages
Check network tab for failed requests
```

### Check Supabase Logs
```
Dashboard → Logs → Query Performance
See all database operations
Check for errors
```

### Check Database Data
```
Dashboard → Table Editor
Select any table
View rows and verify data
```

### Verify RLS Policies
```
Dashboard → Table Editor
Select table → Policies tab
Check policies are enabled
```

---

## 📱 Contact Information (Update These)

```
Phone: +91 98765 43210
Email: hello@lakshanabridal.com
Address: 12, Anna Nagar Main Road, Mogappair, Chennai 600037
Instagram: @lakshana.bridal
WhatsApp: +91 98765 43210
```

Update these in:
- `src/components/Contact.tsx`
- `src/components/Footer.tsx`
- `src/components/Navbar.tsx`

---

## 🎨 Customization Quick Guide

### Change Colors
File: `tailwind.config.ts`
```typescript
colors: {
  primary: '#d4af37',  // Gold color
  dark: '#0d0d0d',     // Dark background
  light: '#f8f5f0',    // Light text
}
```

### Change Content
Files to edit:
- `src/components/Hero.tsx` → Hero section
- `src/components/About.tsx` → About section
- `src/components/Services.tsx` → Services
- `src/components/Contact.tsx` → Contact info

### Add Images
1. Add to `src/assets/` folder
2. Import in component
3. Use in `<img src={} />` tag

---

## 🚀 Deployment Checklist

```
[ ] All features tested locally
[ ] Real data added to database
[ ] Images optimized
[ ] Environment variables set on hosting
[ ] Domain purchased
[ ] DNS configured
[ ] SSL certificate active
[ ] Analytics added
[ ] SEO metadata updated
[ ] Social media links updated
[ ] Contact information updated
[ ] Test on mobile devices
[ ] Test on different browsers
[ ] Create database backup
[ ] Monitor error logs
```

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| START_HERE.md | Overview & getting started |
| SETUP_INSTRUCTIONS.md | Step-by-step setup |
| CHECKLIST.md | Detailed verification checklist |
| INTEGRATION_COMPLETE.md | What's integrated |
| BACKEND_COMPLETE.md | Full feature documentation |
| COMPLETE_SETUP_GUIDE.md | Comprehensive guide |
| QUICK_START.md | 5-minute quick start |
| QUICK_REFERENCE.md | This file |

---

## 🎯 Priority Tasks

### Right Now (5 minutes)
1. Get anon key from Supabase
2. Update `.env` file
3. Run migrations

### Today
1. Test booking form
2. Verify database data
3. Customize contact info

### This Week
1. Add real services
2. Add testimonials
3. Upload gallery images
4. Customize content

### This Month
1. Build admin panel
2. Add payments
3. Deploy to production
4. Connect domain

---

## 💡 Pro Tips

**Performance**
- Images are lazy loaded
- Code is optimized for production
- Use WebP format for images

**Security**
- Never commit `.env` to git
- Never expose service_role key
- Always use anon key in frontend

**Database**
- Create backups regularly
- Test queries in SQL Editor first
- Monitor usage in dashboard

**Development**
- Use TypeScript types
- Check console for errors
- Test on mobile devices

---

## ⚡ Power User Shortcuts

```bash
# Quick restart
Ctrl+C → npm run dev

# View all tables
Supabase Dashboard → Table Editor

# Run SQL quickly
Dashboard → SQL Editor → New query

# Check logs
Dashboard → Logs → Real-time

# View API usage
Dashboard → Settings → API
```

---

## 🎉 You're All Set!

Everything you need is in this reference card.

**Bookmark this file for quick access!**

---

**Last Updated**: Setup Complete
**Version**: 1.0 (Production Ready)
