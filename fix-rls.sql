-- Fix RLS policies for public booking access

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can create appointments" ON appointments;
DROP POLICY IF EXISTS "Anyone can create customers" ON customers;
DROP POLICY IF EXISTS "Anyone can view active services" ON services;
DROP POLICY IF EXISTS "Public can insert appointments" ON appointments;
DROP POLICY IF EXISTS "Public can insert customers" ON customers;

-- Allow public (authenticated AND anonymous) to insert appointments
CREATE POLICY "Public can insert appointments"
ON appointments
FOR INSERT
TO public
WITH CHECK (true);

-- Allow public to insert customers
CREATE POLICY "Public can insert customers"
ON customers
FOR INSERT
TO public
WITH CHECK (true);

-- Allow public to select services
CREATE POLICY "Public can select services"
ON services
FOR SELECT
TO public
USING (is_active = true);

-- Allow public to select service categories
CREATE POLICY "Public can select service_categories"
ON service_categories
FOR SELECT
TO public
USING (is_active = true);

-- Verify the policies
SELECT schemaname, tablename, policyname, cmd, qual 
FROM pg_policies 
WHERE tablename IN ('appointments', 'customers', 'services', 'service_categories')
ORDER BY tablename, policyname;
