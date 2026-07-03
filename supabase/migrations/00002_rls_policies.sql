-- =====================================================
-- ROW LEVEL SECURITY POLICIES
-- Production-Ready Security Configuration
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE bridal_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointment_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE academy_courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE whatsapp_enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE website_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE about_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE error_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE policies ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE files ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- HELPER FUNCTIONS
-- =====================================================

-- Check if user is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admins 
    WHERE auth_id = auth.uid() 
    AND status = 'active'
    AND role IN ('super_admin', 'admin', 'manager')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Check if user is staff
CREATE OR REPLACE FUNCTION is_staff()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admins 
    WHERE auth_id = auth.uid() 
    AND status = 'active'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Check if user is customer
CREATE OR REPLACE FUNCTION is_customer()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM customers 
    WHERE auth_id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Get current user's customer id
CREATE OR REPLACE FUNCTION get_customer_id()
RETURNS UUID AS $$
BEGIN
  RETURN (SELECT id FROM customers WHERE auth_id = auth.uid());
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- PUBLIC READ POLICIES (No authentication required)
-- =====================================================

-- Service Categories (Public Read)
CREATE POLICY "Anyone can view active service categories"
  ON service_categories FOR SELECT
  USING (is_active = true);

-- Services (Public Read)
CREATE POLICY "Anyone can view active services"
  ON services FOR SELECT
  USING (is_active = true);

-- Bridal Packages (Public Read)
CREATE POLICY "Anyone can view active packages"
  ON bridal_packages FOR SELECT
  USING (is_active = true);

-- Gallery (Public Read)
CREATE POLICY "Anyone can view active gallery"
  ON gallery FOR SELECT
  USING (is_active = true);

-- Portfolio (Public Read)
CREATE POLICY "Anyone can view active portfolio"
  ON portfolio FOR SELECT
  USING (is_active = true);

-- Testimonials (Public Read)
CREATE POLICY "Anyone can view approved testimonials"
  ON testimonials FOR SELECT
  USING (is_approved = true AND is_active = true);

-- Website Settings (Public Read)
CREATE POLICY "Anyone can view website settings"
  ON website_settings FOR SELECT
  USING (true);

-- Hero Sections (Public Read)
CREATE POLICY "Anyone can view active hero sections"
  ON hero_sections FOR SELECT
  USING (is_active = true);

-- About Content (Public Read)
CREATE POLICY "Anyone can view about content"
  ON about_content FOR SELECT
  USING (true);

-- Team Members (Public Read)
CREATE POLICY "Anyone can view active team members"
  ON team_members FOR SELECT
  USING (is_active = true);

-- Blog Categories (Public Read)
CREATE POLICY "Anyone can view active blog categories"
  ON blog_categories FOR SELECT
  USING (is_active = true);

-- Blog Posts (Public Read)
CREATE POLICY "Anyone can view published blog posts"
  ON blog_posts FOR SELECT
  USING (is_published = true);

-- Offers (Public Read)
CREATE POLICY "Anyone can view active offers"
  ON offers FOR SELECT
  USING (
    is_active = true 
    AND start_date <= CURRENT_DATE 
    AND end_date >= CURRENT_DATE
  );

-- FAQs (Public Read)
CREATE POLICY "Anyone can view active FAQs"
  ON faqs FOR SELECT
  USING (is_active = true);

-- Policies (Public Read)
CREATE POLICY "Anyone can view policies"
  ON policies FOR SELECT
  USING (true);

-- Academy Courses (Public Read)
CREATE POLICY "Anyone can view active courses"
  ON academy_courses FOR SELECT
  USING (is_active = true);

-- =====================================================
-- PUBLIC INSERT POLICIES (Forms)
-- =====================================================

-- Contact Messages (Public Insert)
CREATE POLICY "Anyone can create contact messages"
  ON contact_messages FOR INSERT
  WITH CHECK (true);

-- WhatsApp Enquiries (Public Insert)
CREATE POLICY "Anyone can create WhatsApp enquiries"
  ON whatsapp_enquiries FOR INSERT
  WITH CHECK (true);

-- Course Enquiries (Public Insert)
CREATE POLICY "Anyone can create course enquiries"
  ON course_enquiries FOR INSERT
  WITH CHECK (true);

-- Newsletter Subscribers (Public Insert)
CREATE POLICY "Anyone can subscribe to newsletter"
  ON newsletter_subscribers FOR INSERT
  WITH CHECK (true);

-- Customers (Public Insert - Registration)
CREATE POLICY "Anyone can register as customer"
  ON customers FOR INSERT
  WITH CHECK (true);

-- =====================================================
-- CUSTOMER POLICIES
-- =====================================================

-- Customers (Own Profile)
CREATE POLICY "Customers can view own profile"
  ON customers FOR SELECT
  USING (auth_id = auth.uid());

CREATE POLICY "Customers can update own profile"
  ON customers FOR UPDATE
  USING (auth_id = auth.uid())
  WITH CHECK (auth_id = auth.uid());

-- Appointments (Customer)
CREATE POLICY "Customers can view own appointments"
  ON appointments FOR SELECT
  USING (customer_id = get_customer_id());

CREATE POLICY "Customers can create appointments"
  ON appointments FOR INSERT
  WITH CHECK (customer_id = get_customer_id());

CREATE POLICY "Customers can cancel own appointments"
  ON appointments FOR UPDATE
  USING (
    customer_id = get_customer_id() 
    AND status NOT IN ('completed', 'cancelled')
  )
  WITH CHECK (
    customer_id = get_customer_id() 
    AND status = 'cancelled'
  );

-- Testimonials (Customer)
CREATE POLICY "Customers can create testimonials"
  ON testimonials FOR INSERT
  WITH CHECK (customer_id = get_customer_id());

-- =====================================================
-- STAFF POLICIES (Receptionist, Artists, etc.)
-- =====================================================

-- Staff can view active services
CREATE POLICY "Staff can view all services"
  ON services FOR SELECT
  USING (is_staff());

-- Staff can view appointments
CREATE POLICY "Staff can view appointments"
  ON appointments FOR SELECT
  USING (is_staff());

-- Staff can update appointment status
CREATE POLICY "Staff can update appointment status"
  ON appointments FOR UPDATE
  USING (is_staff())
  WITH CHECK (is_staff());

-- Staff can view customers
CREATE POLICY "Staff can view customers"
  ON customers FOR SELECT
  USING (is_staff());

-- Staff can view contact messages
CREATE POLICY "Staff can view contact messages"
  ON contact_messages FOR SELECT
  USING (is_staff());

-- =====================================================
-- ADMIN POLICIES (Full Access)
-- =====================================================

-- Admins Table
CREATE POLICY "Admins can view all admins"
  ON admins FOR SELECT
  USING (is_admin());

CREATE POLICY "Super admins can manage admins"
  ON admins FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM admins 
      WHERE auth_id = auth.uid() 
      AND role = 'super_admin'
    )
  );

-- Service Categories (Admin)
CREATE POLICY "Admins can manage service categories"
  ON service_categories FOR ALL
  USING (is_admin());

-- Services (Admin)
CREATE POLICY "Admins can manage services"
  ON services FOR ALL
  USING (is_admin());

-- Bridal Packages (Admin)
CREATE POLICY "Admins can manage packages"
  ON bridal_packages FOR ALL
  USING (is_admin());

-- Appointments (Admin Full Access)
CREATE POLICY "Admins can manage all appointments"
  ON appointments FOR ALL
  USING (is_admin());

-- Appointment History (Admin)
CREATE POLICY "Admins can view appointment history"
  ON appointment_history FOR SELECT
  USING (is_admin());

CREATE POLICY "System can insert appointment history"
  ON appointment_history FOR INSERT
  WITH CHECK (true);

-- Gallery (Admin)
CREATE POLICY "Admins can manage gallery"
  ON gallery FOR ALL
  USING (is_admin());

-- Portfolio (Admin)
CREATE POLICY "Admins can manage portfolio"
  ON portfolio FOR ALL
  USING (is_admin());

-- Testimonials (Admin)
CREATE POLICY "Admins can manage testimonials"
  ON testimonials FOR ALL
  USING (is_admin());

-- Contact Messages (Admin)
CREATE POLICY "Admins can manage contact messages"
  ON contact_messages FOR ALL
  USING (is_admin());

-- Website Settings (Admin)
CREATE POLICY "Admins can manage website settings"
  ON website_settings FOR ALL
  USING (is_admin());

-- Hero Sections (Admin)
CREATE POLICY "Admins can manage hero sections"
  ON hero_sections FOR ALL
  USING (is_admin());

-- About Content (Admin)
CREATE POLICY "Admins can manage about content"
  ON about_content FOR ALL
  USING (is_admin());

-- Team Members (Admin)
CREATE POLICY "Admins can manage team members"
  ON team_members FOR ALL
  USING (is_admin());

-- Blog Categories (Admin)
CREATE POLICY "Admins can manage blog categories"
  ON blog_categories FOR ALL
  USING (is_admin());

-- Blog Posts (Admin)
CREATE POLICY "Admins can manage blog posts"
  ON blog_posts FOR ALL
  USING (is_admin());

-- Offers (Admin)
CREATE POLICY "Admins can manage offers"
  ON offers FOR ALL
  USING (is_admin());

-- Coupons (Admin)
CREATE POLICY "Admins can manage coupons"
  ON coupons FOR ALL
  USING (is_admin());

-- Notifications (Admin)
CREATE POLICY "Admins can view own notifications"
  ON notifications FOR SELECT
  USING (user_id IN (SELECT id FROM admins WHERE auth_id = auth.uid()));

CREATE POLICY "System can create notifications"
  ON notifications FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can update own notifications"
  ON notifications FOR UPDATE
  USING (user_id IN (SELECT id FROM admins WHERE auth_id = auth.uid()));

-- SEO Pages (Admin)
CREATE POLICY "Admins can manage SEO pages"
  ON seo_pages FOR ALL
  USING (is_admin());

-- Analytics (Admin)
CREATE POLICY "Admins can view analytics"
  ON analytics FOR SELECT
  USING (is_admin());

CREATE POLICY "System can insert analytics"
  ON analytics FOR INSERT
  WITH CHECK (true);

-- Activity Logs (Admin View Only)
CREATE POLICY "Admins can view activity logs"
  ON activity_logs FOR SELECT
  USING (is_admin());

CREATE POLICY "System can insert activity logs"
  ON activity_logs FOR INSERT
  WITH CHECK (true);

-- Error Logs (Admin)
CREATE POLICY "Admins can view error logs"
  ON error_logs FOR SELECT
  USING (is_admin());

CREATE POLICY "System can insert error logs"
  ON error_logs FOR INSERT
  WITH CHECK (true);

-- FAQs (Admin)
CREATE POLICY "Admins can manage FAQs"
  ON faqs FOR ALL
  USING (is_admin());

-- Policies (Admin)
CREATE POLICY "Admins can manage policies"
  ON policies FOR ALL
  USING (is_admin());

-- Newsletter Subscribers (Admin)
CREATE POLICY "Admins can view subscribers"
  ON newsletter_subscribers FOR SELECT
  USING (is_admin());

CREATE POLICY "Admins can delete subscribers"
  ON newsletter_subscribers FOR DELETE
  USING (is_admin());

-- Email Templates (Admin)
CREATE POLICY "Admins can manage email templates"
  ON email_templates FOR ALL
  USING (is_admin());

-- Files (Admin)
CREATE POLICY "Admins can manage files"
  ON files FOR ALL
  USING (is_admin());

-- Academy Courses (Admin)
CREATE POLICY "Admins can manage courses"
  ON academy_courses FOR ALL
  USING (is_admin());

-- Course Enquiries (Admin)
CREATE POLICY "Admins can manage course enquiries"
  ON course_enquiries FOR ALL
  USING (is_admin());

-- Students (Admin)
CREATE POLICY "Admins can manage students"
  ON students FOR ALL
  USING (is_admin());

-- Customers (Admin)
CREATE POLICY "Admins can manage customers"
  ON customers FOR ALL
  USING (is_admin());

-- WhatsApp Enquiries (Admin)
CREATE POLICY "Admins can manage WhatsApp enquiries"
  ON whatsapp_enquiries FOR ALL
  USING (is_admin());

-- Gallery Categories (Admin)
CREATE POLICY "Admins can manage gallery categories"
  ON gallery_categories FOR ALL
  USING (is_admin());

-- =====================================================
-- RLS POLICIES COMPLETE
-- =====================================================
