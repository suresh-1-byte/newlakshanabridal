# ⚡ QUICK START - 5 Minutes to Running Backend

## 🎯 Goal
Get your complete backend running in 5 minutes!

---

## ✅ STEP 1: Get Your Supabase Anon Key (30 seconds)

1. Open: https://supabase.com/dashboard/project/lhqwuycqjzsmkvwllvzx/settings/api

2. Copy the **anon public** key (the long string starting with `eyJ...`)

3. Update `.env` file:
   ```env
   VITE_SUPABASE_ANON_KEY=paste-your-key-here
   ```

---

## ✅ STEP 2: Run Database Migrations (3 minutes)

### 2.1 Open SQL Editor
https://supabase.com/dashboard/project/lhqwuycqjzsmkvwllvzx/sql/new

### 2.2 Run Each Migration

**Migration 1 - Schema** (1 min)
1. Open file: `supabase/migrations/00001_complete_schema.sql`
2. Copy ALL content
3. Paste in SQL Editor
4. Click **RUN**
5. Wait for "Success"

**Migration 2 - Security** (30 sec)
1. Open file: `supabase/migrations/00002_rls_policies.sql`
2. Copy ALL content
3. Paste in SQL Editor
4. Click **RUN**

**Migration 3 - Automation** (30 sec)
1. Open file: `supabase/migrations/00003_triggers_functions.sql`
2. Copy ALL content
3. Paste in SQL Editor
4. Click **RUN**

**Migration 4 - Sample Data** (1 min)
1. Open file: `supabase/migrations/00004_seed_data.sql`
2. Copy ALL content
3. Paste in SQL Editor
4. Click **RUN**

---

## ✅ STEP 3: Verify Setup (30 seconds)

1. Go to Table Editor: 
   https://supabase.com/dashboard/project/lhqwuycqjzsmkvwllvzx/editor

2. Check tables exist:
   - ✅ `services` (should have 7 rows)
   - ✅ `testimonials` (should have 4 rows)
   - ✅ `appointments` (empty for now)

---

## ✅ STEP 4: Test It! (1 minute)

### Start Frontend:
```bash
npm run dev
```

### Test Booking Form:
1. Open: http://localhost:8080
2. Scroll to booking section
3. Fill and submit form
4. Check Supabase → Table Editor → `appointments`
5. Your booking should appear!

---

## 🎉 DONE!

Your backend is now live with:
- ✅ 40+ tables
- ✅ Complete security
- ✅ Automatic triggers
- ✅ Sample data

---

## 🆘 Issues?

**Migration Error?**
- Make sure you ran them in order (1 → 2 → 3 → 4)
- Check for SQL syntax errors in red

**No Data in Tables?**
- Re-run Migration 4 (seed data)

**Form Not Submitting?**
- Check `.env` has correct anon key
- Check browser console for errors
- Verify frontend is using Supabase client

---

## 📚 Full Documentation

For complete documentation, see:
- **COMPLETE_SETUP_GUIDE.md** - Detailed setup
- **BACKEND_COMPLETE.md** - Full feature list

---

**Ready to build amazing features!** 🚀
