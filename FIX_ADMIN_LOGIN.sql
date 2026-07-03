-- =====================================================
-- COMPLETE ADMIN LOGIN FIX
-- Run this in Supabase SQL Editor to fix admin login
-- =====================================================

-- Step 1: Check current admin records
DO $$
DECLARE
  admin_rec RECORD;
BEGIN
  RAISE NOTICE '============================================';
  RAISE NOTICE 'CURRENT ADMIN RECORDS:';
  RAISE NOTICE '============================================';
  
  FOR admin_rec IN 
    SELECT id, auth_id, email, full_name, role, status 
    FROM admins 
    ORDER BY created_at DESC
  LOOP
    RAISE NOTICE 'ID: % | Email: % | Auth ID: % | Status: %', 
      admin_rec.id, admin_rec.email, admin_rec.auth_id, admin_rec.status;
  END LOOP;
END $$;

-- Step 2: Fix RLS policies for admins table
DROP POLICY IF EXISTS "Users can view their own admin profile" ON admins;
DROP POLICY IF EXISTS "Admins can view all profiles" ON admins;
DROP POLICY IF EXISTS "Super admins can manage admins" ON admins;
DROP POLICY IF EXISTS "Anyone can view their own admin profile" ON admins;
DROP POLICY IF EXISTS "Admins can view their own profile" ON admins;

-- Allow authenticated users to view their own admin profile by auth_id
CREATE POLICY "authenticated_users_view_own_admin"
  ON admins FOR SELECT
  TO authenticated
  USING (auth_id = auth.uid());

-- Allow authenticated users to view admins by email (for initial login)
CREATE POLICY "authenticated_users_view_admin_by_email"
  ON admins FOR SELECT
  TO authenticated
  USING (email = (SELECT email FROM auth.users WHERE id = auth.uid()));

-- Allow authenticated users to update their own admin auth_id (for linking)
CREATE POLICY "authenticated_users_update_own_auth_id"
  ON admins FOR UPDATE
  TO authenticated
  USING (email = (SELECT email FROM auth.users WHERE id = auth.uid()))
  WITH CHECK (email = (SELECT email FROM auth.users WHERE id = auth.uid()));

-- Allow super admins to do everything
CREATE POLICY "super_admins_full_access"
  ON admins FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admins 
      WHERE auth_id = auth.uid() 
      AND status = 'active'
      AND role = 'super_admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admins 
      WHERE auth_id = auth.uid() 
      AND status = 'active'
      AND role = 'super_admin'
    )
  );

-- Step 3: Ensure admin user exists for sureshkubarudri@gmail.com
DO $$
DECLARE
  existing_admin_id UUID;
  admin_email TEXT := 'sureshkubarudri@gmail.com';
BEGIN
  -- Check if admin exists
  SELECT id INTO existing_admin_id 
  FROM admins 
  WHERE email = admin_email;
  
  IF existing_admin_id IS NULL THEN
    RAISE NOTICE '⚠️ Admin user not found, creating...';
    
    -- Insert admin record (auth_id will be updated on first login)
    INSERT INTO admins (
      email,
      full_name,
      role,
      status,
      designation,
      department
    ) VALUES (
      admin_email,
      'Super Admin',
      'super_admin',
      'active',
      'System Administrator',
      'Management'
    );
    
    RAISE NOTICE '✅ Admin user created for: %', admin_email;
  ELSE
    RAISE NOTICE '✅ Admin user exists: %', admin_email;
    
    -- Ensure the admin is active
    UPDATE admins 
    SET status = 'active',
        role = 'super_admin'
    WHERE email = admin_email;
    
    RAISE NOTICE '✅ Admin status verified as active';
  END IF;
END $$;

-- Step 4: Display final admin records
SELECT 
  '✅ FINAL ADMIN RECORDS' as info;

SELECT 
  id,
  auth_id,
  email,
  full_name,
  role,
  status,
  CASE 
    WHEN auth_id IS NULL THEN '⚠️ Will be linked on first login'
    ELSE '✅ Linked to auth'
  END as auth_status
FROM admins
ORDER BY created_at DESC;

-- Success message
DO $$
BEGIN
  RAISE NOTICE '';
  RAISE NOTICE '============================================';
  RAISE NOTICE '✅ ADMIN LOGIN FIX COMPLETE!';
  RAISE NOTICE '============================================';
  RAISE NOTICE '';
  RAISE NOTICE '📋 What was fixed:';
  RAISE NOTICE '   ✅ RLS policies updated to allow login';
  RAISE NOTICE '   ✅ Admin user verified/created';
  RAISE NOTICE '   ✅ Auto-linking enabled for first login';
  RAISE NOTICE '';
  RAISE NOTICE '🔐 Admin Credentials:';
  RAISE NOTICE '   Email: sureshkubarudri@gmail.com';
  RAISE NOTICE '   Password: Admin123!@#password';
  RAISE NOTICE '';
  RAISE NOTICE '🚀 Next Steps:';
  RAISE NOTICE '   1. Refresh the admin login page';
  RAISE NOTICE '   2. Enter the credentials above';
  RAISE NOTICE '   3. Click "Sign in"';
  RAISE NOTICE '   4. You should be redirected to dashboard';
  RAISE NOTICE '';
  RAISE NOTICE '💡 How it works now:';
  RAISE NOTICE '   - When you sign in, Supabase Auth verifies your password';
  RAISE NOTICE '   - The app looks up your admin record by email';
  RAISE NOTICE '   - It automatically links your auth_id to your admin record';
  RAISE NOTICE '   - You are redirected to the admin dashboard';
  RAISE NOTICE '';
  RAISE NOTICE '============================================';
END $$;
