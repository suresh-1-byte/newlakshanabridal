# ✅ SETUP CHECKLIST

Use this checklist to make sure everything is set up correctly.

---

## 🔧 BEFORE STARTING

- [ ] Frontend is working (website loads at http://localhost:8080)
- [ ] Supabase account is created
- [ ] Project ID: `lhqwuycqjzsmkvwllvzx` exists

---

## 📝 STEP 1: ENVIRONMENT SETUP

### Get Anon Key
- [ ] Opened: https://supabase.com/dashboard/project/lhqwuycqjzsmkvwllvzx/settings/api
- [ ] Found "anon public" key section
- [ ] Copied the key (starts with `eyJ...`)
- [ ] Opened `.env` file in project
- [ ] Replaced `VITE_SUPABASE_ANON_KEY` value with copied key
- [ ] Saved `.env` file

---

## 🗄️ STEP 2: DATABASE MIGRATIONS

### Migration 1 - Schema (40+ Tables)
- [ ] Opened: https://supabase.com/dashboard/project/lhqwuycqjzsmkvwllvzx/sql/new
- [ ] Opened file: `supabase/migrations/00001_complete_schema.sql`
- [ ] Copied ALL content
- [ ] Pasted in Supabase SQL Editor
- [ ] Clicked "RUN" button
- [ ] Saw "Success" message
- [ ] No errors appeared

### Migration 2 - Security (100+ RLS Policies)
- [ ] Cleared SQL Editor
- [ ] Opened file: `supabase/migrations/00002_rls_policies.sql`
- [ ] Copied ALL content
- [ ] Pasted in Supabase SQL Editor
- [ ] Clicked "RUN" button
- [ ] Saw "Success" message
- [ ] No errors appeared

### Migration 3 - Automation (15+ Triggers)
- [ ] Cleared SQL Editor
- [ ] Opened file: `supabase/migrations/00003_triggers_functions.sql`
- [ ] Copied ALL content
- [ ] Pasted in Supabase SQL Editor
- [ ] Clicked "RUN" button
- [ ] Saw "Success" message
- [ ] No errors appeared

### Migration 4 - Sample Data
- [ ] Cleared SQL Editor
- [ ] Opened file: `supabase/migrations/00004_seed_data.sql`
- [ ] Copied ALL content
- [ ] Pasted in Supabase SQL Editor
- [ ] Clicked "RUN" button
- [ ] Saw "Success" message
- [ ] No errors appeared

---

## 🔍 STEP 3: VERIFY DATABASE

### Check Tables Exist
- [ ] Opened: https://supabase.com/dashboard/project/lhqwuycqjzsmkvwllvzx/editor
- [ ] See `service_categories` table (7 rows)
- [ ] See `services` table (7 rows)
- [ ] See `bridal_packages` table (3 rows)
- [ ] See `testimonials` table (4 rows)
- [ ] See `academy_courses` table (2 rows)
- [ ] See `customers` table (0 rows - empty)
- [ ] See `appointments` table (0 rows - empty)
- [ ] See `contact_messages` table (0 rows - empty)
- [ ] See `gallery` table
- [ ] See `gallery_categories` table (6 rows)

### Check Security Policies
- [ ] Click any table (e.g., `services`)
- [ ] Click "Policies" tab
- [ ] See policies listed (SELECT, INSERT, etc.)

---

## 🚀 STEP 4: START FRONTEND

### Run Development Server
- [ ] Opened terminal in project folder
- [ ] Ran: `npm run dev`
- [ ] Saw "Local: http://localhost:8080"
- [ ] No errors in terminal
- [ ] Opened browser to: http://localhost:8080
- [ ] Website loaded successfully

---

## 🧪 STEP 5: TEST BOOKING FORM

### Submit Test Booking
- [ ] Scrolled to booking section on website
- [ ] Filled "Full Name": `Test User`
- [ ] Filled "Phone": `9876543210`
- [ ] Selected a service from dropdown
- [ ] Selected a date from calendar
- [ ] Filled "Message": `Test booking message`
- [ ] Clicked "Request Consultation" button
- [ ] Saw success message with booking reference
- [ ] Success message format: "Booking confirmed! Reference: LBS..."
- [ ] No error messages appeared

### Verify in Database
- [ ] Opened: https://supabase.com/dashboard/project/lhqwuycqjzsmkvwllvzx/editor
- [ ] Clicked `appointments` table
- [ ] See 1 new row with test booking
- [ ] Booking has reference like: `LBS20240715001`
- [ ] Status is "pending"
- [ ] Customer ID is filled

### Check Customer Created
- [ ] In Table Editor, clicked `customers` table
- [ ] See 1 new customer row
- [ ] Customer name matches: `Test User`
- [ ] Customer phone matches: `9876543210`

---

## 🎨 STEP 6: TEST TESTIMONIALS

### View Testimonials Section
- [ ] Scrolled to testimonials section
- [ ] See testimonials displaying
- [ ] Testimonials auto-rotate every ~6 seconds
- [ ] See customer name
- [ ] See customer role/designation
- [ ] See quote text
- [ ] See navigation dots at bottom
- [ ] Can click dots to change testimonial

### Verify in Database
- [ ] Opened: https://supabase.com/dashboard/project/lhqwuycqjzsmkvwllvzx/editor
- [ ] Clicked `testimonials` table
- [ ] See 4 testimonials with `is_approved = true`
- [ ] See `is_active = true`
- [ ] Testimonials on website match database

---

## 🔄 STEP 7: TEST CUSTOMER REUSE

### Submit Second Booking (Same Phone)
- [ ] Filled booking form again
- [ ] Used SAME phone number: `9876543210`
- [ ] Used different name: `Test User 2`
- [ ] Clicked submit
- [ ] Saw success message with new booking reference

### Verify No Duplicate Customer
- [ ] Opened `customers` table in Table Editor
- [ ] Still see only 1 customer (not 2)
- [ ] Customer name might be updated to latest

### Verify New Appointment Created
- [ ] Opened `appointments` table
- [ ] See 2 appointments now
- [ ] Both have SAME customer_id
- [ ] Different booking_reference for each

---

## ✅ STEP 8: FINAL VERIFICATION

### Check Console for Errors
- [ ] Opened browser console (Press F12)
- [ ] Clicked "Console" tab
- [ ] No red error messages
- [ ] No Supabase connection errors
- [ ] No 401 unauthorized errors

### Check Network Requests
- [ ] In browser console, clicked "Network" tab
- [ ] Submitted booking form
- [ ] See requests to `supabase.co`
- [ ] Requests return 200 or 201 status
- [ ] No 400, 401, 403, or 500 errors

### Check Terminal Output
- [ ] Checked terminal where `npm run dev` is running
- [ ] No error messages
- [ ] Server still running
- [ ] No crashes

---

## 🎉 SUCCESS CRITERIA

**You're done when ALL of these are true:**

✅ Environment
- [ ] `.env` has real anon key from Supabase

✅ Database
- [ ] All 4 migrations ran successfully
- [ ] 40+ tables exist in Table Editor
- [ ] Sample data is loaded (7 services, 4 testimonials, etc.)

✅ Frontend
- [ ] Website loads without errors
- [ ] Testimonials display and auto-rotate
- [ ] Forms are visible and styled correctly

✅ Backend Integration
- [ ] Booking form submits successfully
- [ ] Success message shows with booking reference
- [ ] Data appears in `appointments` table
- [ ] Customers are created in `customers` table
- [ ] No errors in browser console
- [ ] No errors in terminal

---

## 🆘 TROUBLESHOOTING

### ❌ Migration Failed
**Problem**: Error when running SQL migration
**Solution**:
1. Copy the error message
2. Check if previous migrations ran first (must be in order 1→2→3→4)
3. Check for typos in SQL
4. Try running migration again

### ❌ Anon Key Invalid
**Problem**: Error: "Invalid API key"
**Solution**:
1. Go to: https://supabase.com/dashboard/project/lhqwuycqjzsmkvwllvzx/settings/api
2. Copy the "anon public" key again (long string starting with eyJ)
3. Make sure you copied the FULL key
4. Update `.env` file
5. Restart dev server: `npm run dev`

### ❌ Form Not Submitting
**Problem**: Click submit, nothing happens
**Solution**:
1. Open browser console (F12)
2. Look for error messages
3. Check if `.env` has anon key
4. Check if migrations ran successfully
5. Check if dev server is running

### ❌ No Data in Tables
**Problem**: Tables exist but no sample data
**Solution**:
1. Run Migration 4 again (`00004_seed_data.sql`)
2. Check for errors in SQL Editor
3. Refresh Table Editor page

### ❌ Testimonials Not Showing
**Problem**: Testimonials section is empty
**Solution**:
1. Check browser console for errors
2. Verify Migration 4 ran (seed data)
3. Check `testimonials` table has data
4. Check testimonials have `is_approved = true` and `is_active = true`

---

## 📊 EXPECTED RESULTS

After completing all steps, you should have:

| Item | Expected State |
|------|----------------|
| Tables | 40+ tables created |
| Sample Services | 7 rows in `services` table |
| Sample Testimonials | 4 rows in `testimonials` table |
| Sample Packages | 3 rows in `bridal_packages` table |
| Sample Courses | 2 rows in `academy_courses` table |
| Test Appointments | 2 rows in `appointments` table |
| Test Customers | 1 row in `customers` table |
| Frontend Status | Running on http://localhost:8080 |
| Booking Form | Working, submits to database |
| Testimonials | Displaying and rotating |
| Console Errors | None |
| Terminal Errors | None |

---

## 🎯 YOU'RE DONE WHEN...

✅ All checkboxes above are checked
✅ Booking form works
✅ Data appears in database
✅ Testimonials display
✅ No errors in console
✅ No errors in terminal

**If yes to all = CONGRATULATIONS! 🎉**

Your luxury bridal studio website is now fully functional with:
- Complete backend (40+ tables)
- Security (100+ policies)
- Automation (15+ triggers)
- Frontend integration
- Sample data
- Working forms

---

## 📚 NEXT STEPS

Now that everything works, you can:

1. **Build Admin Dashboard** - Manage bookings, customers, content
2. **Add More Features** - Blog, gallery management, CMS
3. **Deploy to Production** - Host on Netlify/Vercel
4. **Add Payments** - Integrate Razorpay/Stripe
5. **Add Notifications** - Email and WhatsApp
6. **Add Analytics** - Track visitors and conversions

See `BACKEND_COMPLETE.md` for full feature list!

---

**Happy Building!** 🚀
