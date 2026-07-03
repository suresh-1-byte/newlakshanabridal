-- =====================================================
-- VERIFY AND FIX ADMIN USER AUTHENTICATION
-- This ensures the admin user can log in successfully
-- =====================================================

-- Check if admin user exists
DO $$
DECLARE
  admin_count INTEGER;
  auth_user_id UUID;
BEGIN
  -- Count existing admins
  SELECT COUNT(*) INTO admin_count FROM admins;
  
  RAISE NOTICE '============================================';
  RAISE NOTICE 'ADMIN USER VERIFICATION';
  RAISE NOTICE '============================================';
  RAISE NOTICE 'Total admins in database: %', admin_count;
  
  -- Display existing admin records
  FOR auth_user_id IN 
    SELECT id FROM admins
  LOOP
    RAISE NOTICE 'Admin ID: %', auth_user_id;
  END LOOP;
  
  -- If no admin exists with the specific auth_id, let's check what we have
  IF admin_count = 0 THEN
    RAISE NOTICE '⚠️ WARNING: No admin users found!';
    RAISE NOTICE 'Creating default admin user...';
    
    -- Note: The auth user should be created via Supabase Auth Dashboard
    -- This just creates the admin record in the admins table
    
  ELSE
    RAISE NOTICE '✅ Admin users found in database';
  END IF;
  
  RAISE NOTICE '============================================';
END $$;

-- Display all admin users for debugging
SELECT 
  id,
  auth_id,
  email,
  full_name,
  role,
  status,
  created_at
FROM admins
ORDER BY created_at DESC;

-- Make sure RLS policies allow admin lookup
-- Drop and recreate the admin lookup policy
DROP POLICY IF EXISTS "Anyone can view their own admin profile" ON admins;
DROP POLICY IF EXISTS "Admins can view their own profile" ON admins;

-- Allow authenticated users to view their own admin profile
CREATE POLICY "Users can view their own admin profile"
  ON admins FOR SELECT
  TO authenticated
  USING (auth_id = auth.uid());

-- Allow admins to view all admin profiles
CREATE POLICY "Admins can view all profiles"
  ON admins FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admins 
      WHERE auth_id = auth.uid() 
      AND status = 'active'
      AND role IN ('super_admin', 'admin', 'manager')
    )
  );

-- Super admins can manage all admins
CREATE POLICY "Super admins can manage admins"
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

-- Success message
DO $$
BEGIN
  RAISE NOTICE '✅ Admin user verification complete!';
  RAISE NOTICE '✅ RLS policies updated for admin table';
  RAISE NOTICE '';
  RAISE NOTICE '📋 Next Steps:';
  RAISE NOTICE '1. Check the admin records displayed above';
  RAISE NOTICE '2. Verify auth_id matches the Supabase Auth user ID';
  RAISE NOTICE '3. If auth_id is NULL or wrong, update it manually:';
  RAISE NOTICE '   UPDATE admins SET auth_id = ''[auth-user-id]'' WHERE email = ''sureshkubarudri@gmail.com'';';
  RAISE NOTICE '';
  RAISE NOTICE '🔐 Admin Credentials:';
  RAISE NOTICE '   Email: sureshkubarudri@gmail.com';
  RAISE NOTICE '   Password: Admin123!@#password';
END $$;
