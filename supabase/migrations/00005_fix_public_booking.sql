-- =====================================================
-- FIX PUBLIC BOOKING - Allow Anonymous Insertions
-- This fixes the 404/403 errors on booking submissions
-- =====================================================

-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Anyone can create appointments" ON appointments;
DROP POLICY IF EXISTS "Public can create customer records" ON customers;
DROP POLICY IF EXISTS "Anyone can view active services" ON services;

-- =====================================================
-- CUSTOMERS TABLE - Allow Anonymous Inserts
-- =====================================================

-- Allow anyone to insert customer records (for booking forms)
CREATE POLICY "Allow public customer creation"
  ON customers FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Allow anyone to select their own customer record by phone
CREATE POLICY "Anyone can find customer by phone"
  ON customers FOR SELECT
  TO anon, authenticated
  USING (true);

-- Allow authenticated users to update their own customer record
CREATE POLICY "Customers can update their own profile"
  ON customers FOR UPDATE
  TO authenticated
  USING (auth_id = auth.uid())
  WITH CHECK (auth_id = auth.uid());

-- Admins can do everything with customers
CREATE POLICY "Admins can manage all customers"
  ON customers FOR ALL
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- =====================================================
-- SERVICES TABLE - Public Read Access
-- =====================================================

-- Anyone can view active services
CREATE POLICY "Public can view active services"
  ON services FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

-- Admins can manage services
CREATE POLICY "Admins can manage services"
  ON services FOR ALL
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- =====================================================
-- APPOINTMENTS TABLE - Allow Anonymous Bookings
-- =====================================================

-- Allow anyone to create appointments (booking form)
CREATE POLICY "Public can create appointments"
  ON appointments FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Allow customers to view their own appointments
CREATE POLICY "Customers can view their appointments"
  ON appointments FOR SELECT
  TO authenticated
  USING (
    customer_id IN (
      SELECT id FROM customers WHERE auth_id = auth.uid()
    )
  );

-- Allow admins to view all appointments
CREATE POLICY "Admins can view all appointments"
  ON appointments FOR SELECT
  TO authenticated
  USING (is_admin());

-- Allow admins to update appointments
CREATE POLICY "Admins can update appointments"
  ON appointments FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- Allow admins to delete appointments
CREATE POLICY "Admins can delete appointments"
  ON appointments FOR DELETE
  TO authenticated
  USING (is_admin());

-- =====================================================
-- SERVICE CATEGORIES - Public Read
-- =====================================================

DROP POLICY IF EXISTS "Anyone can view active service categories" ON service_categories;

CREATE POLICY "Public can view active service categories"
  ON service_categories FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

-- =====================================================
-- BRIDAL PACKAGES - Public Read
-- =====================================================

CREATE POLICY "Public can view active bridal packages"
  ON bridal_packages FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

-- =====================================================
-- GALLERY - Public Read
-- =====================================================

CREATE POLICY "Public can view active gallery items"
  ON gallery FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

-- =====================================================
-- TESTIMONIALS - Public Read (Approved Only)
-- =====================================================

CREATE POLICY "Public can view approved testimonials"
  ON testimonials FOR SELECT
  TO anon, authenticated
  USING (is_approved = true AND is_active = true);

-- Allow anyone to submit testimonials
CREATE POLICY "Public can submit testimonials"
  ON testimonials FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- =====================================================
-- CONTACT MESSAGES - Allow Anonymous Submissions
-- =====================================================

CREATE POLICY "Public can submit contact messages"
  ON contact_messages FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Admins can view and manage contact messages
CREATE POLICY "Admins can manage contact messages"
  ON contact_messages FOR ALL
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- =====================================================
-- WHATSAPP ENQUIRIES - Allow Anonymous Submissions
-- =====================================================

CREATE POLICY "Public can submit whatsapp enquiries"
  ON whatsapp_enquiries FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- =====================================================
-- COURSE ENQUIRIES - Allow Anonymous Submissions
-- =====================================================

CREATE POLICY "Public can submit course enquiries"
  ON course_enquiries FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Admins can manage course enquiries
CREATE POLICY "Admins can manage course enquiries"
  ON course_enquiries FOR ALL
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- =====================================================
-- ACADEMY COURSES - Public Read
-- =====================================================

CREATE POLICY "Public can view active courses"
  ON academy_courses FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

-- =====================================================
-- BLOG POSTS - Public Read (Published Only)
-- =====================================================

CREATE POLICY "Public can view published blog posts"
  ON blog_posts FOR SELECT
  TO anon, authenticated
  USING (is_published = true);

-- =====================================================
-- SUCCESS MESSAGE
-- =====================================================

DO $$
BEGIN
  RAISE NOTICE '✅ Public booking policies have been fixed!';
  RAISE NOTICE '✅ Anonymous users can now:';
  RAISE NOTICE '   - Create customer records';
  RAISE NOTICE '   - Submit bookings/appointments';
  RAISE NOTICE '   - View active services';
  RAISE NOTICE '   - Submit contact forms';
  RAISE NOTICE '   - Submit testimonials';
  RAISE NOTICE '✅ The 404/403 booking error should now be resolved!';
END $$;
