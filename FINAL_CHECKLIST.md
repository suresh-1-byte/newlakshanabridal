# ✅ FINAL SETUP CHECKLIST

## 🎯 Current Status

### ✅ COMPLETED:
- Frontend website is fully built and working
- Supabase project created (lhqwuycqjzsmkvwllvzx)
- Database schema created (40+ tables via migrations)
- JWT anon key obtained and configured in `.env`
- Dev server running on http://localhost:8080
- TypeScript types defined
- API layer integrated with Supabase

### ⚠️ ISSUE:
- Booking form not submitting successfully
- Getting 400/401 errors from Supabase
- Likely RLS (Row Level Security) policy issue

---

## 🔧 SOLUTION: Fix RLS Policies

### **Step 1: Go to Supabase SQL Editor**
https://supabase.com/dashboard/project/lhqwuycqjzsmkvwllvzx/sql/new

### **Step 2: Run this SQL:**

```sql
-- Disable RLS temporarily to test
ALTER TABLE customers DISABLE ROW LEVEL SECURITY;
ALTER TABLE appointments DISABLE ROW LEVEL SECURITY;
ALTER TABLE services DISABLE ROW LEVEL SECURITY;

-- Or create proper public policies
DROP POLICY IF EXISTS "Public can insert customers" ON customers;
DROP POLICY IF EXISTS "Public can insert appointments" ON appointments;
DROP POLICY IF EXISTS "Public can select services" ON services;

CREATE POLICY "Public can insert customers"
ON customers
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Public can insert appointments"
ON appointments
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Public can select services"
ON services
FOR SELECT
USING (true);

-- Re-enable RLS
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
```

### **Step 3: Test the booking form again**

---

## 📋 VERIFICATION STEPS

### 1. Check Environment Variables
```bash
# In project folder
cat .env | grep SUPABASE
```

Should show:
```
VITE_SUPABASE_URL=https://lhqwuycqjzsmkvwllvzx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 2. Check Dev Server
- Should be running on port 8080
- Check terminal for any errors

### 3. Check Browser Console
- Press F12
- Look for Supabase Config message showing correct key

### 4. Check Supabase Tables
- Go to Table Editor
- Verify these tables exist:
  - customers
  - appointments
  - services
  - testimonials

---

## 🎯 ALTERNATIVE: Disable RLS for Testing

If the policies are too complex, temporarily disable RLS:

```sql
ALTER TABLE customers DISABLE ROW LEVEL SECURITY;
ALTER TABLE appointments DISABLE ROW LEVEL SECURITY;
ALTER TABLE services DISABLE ROW LEVEL SECURITY;
```

This will allow all operations without restrictions **FOR TESTING ONLY**.

Once booking works, you can re-enable RLS and add proper policies.

---

## 📞 KEY INFORMATION

- **Supabase Project ID**: lhqwuycqjzsmkvwllvzx
- **Project URL**: https://lhqwuycqjzsmkvwllvzx.supabase.co
- **Dashboard**: https://supabase.com/dashboard/project/lhqwuycqjzsmkvwllvzx
- **Local URL**: http://localhost:8080

---

## 🆘 IF STILL NOT WORKING

1. **Check Supabase Logs**:
   - Dashboard → Logs → Query Performance
   - Look for failed INSERT queries

2. **Check Table Structure**:
   - Verify `customers` table has: full_name, phone, email, status
   - Verify `appointments` table has: customer_id, service_id, appointment_date, status

3. **Test Direct Insert**:
   ```sql
   -- In SQL Editor, try inserting directly
   INSERT INTO customers (full_name, phone, status)
   VALUES ('Test User', '9876543210', 'active');
   ```

If this fails, there's a schema issue.
If this works, it's an RLS policy issue.

---

## ✅ SUCCESS CRITERIA

When everything works, you should:
1. Fill booking form
2. Click "Request Consultation"
3. See green success message
4. See booking reference like "LBS20260107001"
5. Check Supabase → appointments table → see your booking

---

**Next Step**: Run the SQL above to fix RLS policies, then test the booking form!
