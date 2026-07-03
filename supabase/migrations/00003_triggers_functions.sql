-- =====================================================
-- DATABASE TRIGGERS & FUNCTIONS
-- Automation & Business Logic
-- =====================================================

-- =====================================================
-- 1. UPDATED_AT TRIGGER FUNCTION
-- =====================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to all tables with updated_at
CREATE TRIGGER update_admins_updated_at BEFORE UPDATE ON admins
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_customers_updated_at BEFORE UPDATE ON customers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_service_categories_updated_at BEFORE UPDATE ON service_categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bridal_packages_updated_at BEFORE UPDATE ON bridal_packages
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_appointments_updated_at BEFORE UPDATE ON appointments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON testimonials
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- 2. APPOINTMENT TRIGGERS
-- =====================================================

-- Generate Booking Reference
CREATE OR REPLACE FUNCTION generate_booking_reference()
RETURNS TRIGGER AS $$
BEGIN
  NEW.booking_reference = 'LBS' || TO_CHAR(NOW(), 'YYYYMMDD') || LPAD(nextval('booking_ref_seq')::TEXT, 4, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE SEQUENCE IF NOT EXISTS booking_ref_seq;

CREATE TRIGGER set_booking_reference BEFORE INSERT ON appointments
  FOR EACH ROW EXECUTE FUNCTION generate_booking_reference();

-- Track Appointment Changes
CREATE OR REPLACE FUNCTION log_appointment_changes()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'UPDATE' THEN
    INSERT INTO appointment_history (
      appointment_id,
      action,
      old_value,
      new_value,
      created_at
    ) VALUES (
      NEW.id,
      'updated',
      row_to_json(OLD),
      row_to_json(NEW),
      NOW()
    );
  ELSIF TG_OP = 'INSERT' THEN
    INSERT INTO appointment_history (
      appointment_id,
      action,
      new_value,
      created_at
    ) VALUES (
      NEW.id,
      'created',
      row_to_json(NEW),
      NOW()
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER track_appointment_changes AFTER INSERT OR UPDATE ON appointments
  FOR EACH ROW EXECUTE FUNCTION log_appointment_changes();

-- Update Customer Statistics
CREATE OR REPLACE FUNCTION update_customer_stats()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE customers 
    SET 
      total_bookings = total_bookings + 1,
      total_spent = total_spent + NEW.paid_amount
    WHERE id = NEW.customer_id;
  ELSIF TG_OP = 'UPDATE' THEN
    UPDATE customers 
    SET 
      total_spent = total_spent - OLD.paid_amount + NEW.paid_amount
    WHERE id = NEW.customer_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_customer_booking_stats AFTER INSERT OR UPDATE ON appointments
  FOR EACH ROW EXECUTE FUNCTION update_customer_stats();

-- =====================================================
-- 3. NOTIFICATION TRIGGERS
-- =====================================================

-- Send notification on new appointment
CREATE OR REPLACE FUNCTION notify_new_appointment()
RETURNS TRIGGER AS $$
DECLARE
  admin_ids UUID[];
BEGIN
  -- Get all active admin/manager IDs
  SELECT ARRAY_AGG(id) INTO admin_ids
  FROM admins 
  WHERE status = 'active' 
  AND role IN ('super_admin', 'admin', 'manager');
  
  -- Create notification for each admin
  INSERT INTO notifications (user_id, title, message, type, link)
  SELECT 
    unnest(admin_ids),
    'New Appointment Booked',
    'New appointment from ' || (SELECT full_name FROM customers WHERE id = NEW.customer_id),
    'appointment',
    '/admin/appointments/' || NEW.id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER notify_appointment_created AFTER INSERT ON appointments
  FOR EACH ROW EXECUTE FUNCTION notify_new_appointment();

-- Send notification on new contact message
CREATE OR REPLACE FUNCTION notify_new_contact()
RETURNS TRIGGER AS $$
DECLARE
  admin_ids UUID[];
BEGIN
  SELECT ARRAY_AGG(id) INTO admin_ids
  FROM admins 
  WHERE status = 'active' 
  AND role IN ('super_admin', 'admin', 'manager');
  
  INSERT INTO notifications (user_id, title, message, type, link)
  SELECT 
    unnest(admin_ids),
    'New Contact Message',
    'New message from ' || NEW.name,
    'contact',
    '/admin/contacts/' || NEW.id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER notify_contact_created AFTER INSERT ON contact_messages
  FOR EACH ROW EXECUTE FUNCTION notify_new_contact();

-- =====================================================
-- 4. ANALYTICS TRIGGERS
-- =====================================================

-- Update daily analytics
CREATE OR REPLACE FUNCTION update_daily_analytics()
RETURNS TRIGGER AS $$
DECLARE
  today DATE := CURRENT_DATE;
BEGIN
  -- Insert or update today's analytics
  INSERT INTO analytics (
    date,
    total_bookings,
    total_revenue,
    new_customers
  )
  VALUES (
    today,
    1,
    NEW.total_amount,
    0
  )
  ON CONFLICT (date) DO UPDATE SET
    total_bookings = analytics.total_bookings + 1,
    total_revenue = analytics.total_revenue + EXCLUDED.total_revenue;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_analytics_on_appointment AFTER INSERT ON appointments
  FOR EACH ROW EXECUTE FUNCTION update_daily_analytics();

-- =====================================================
-- 5. ACTIVITY LOG TRIGGERS
-- =====================================================

-- Log admin activities
CREATE OR REPLACE FUNCTION log_admin_activity()
RETURNS TRIGGER AS $$
DECLARE
  current_admin_id UUID;
BEGIN
  SELECT id INTO current_admin_id FROM admins WHERE auth_id = auth.uid();
  
  INSERT INTO activity_logs (
    user_id,
    action,
    entity_type,
    entity_id,
    old_values,
    new_values
  ) VALUES (
    current_admin_id,
    TG_OP,
    TG_TABLE_NAME,
    COALESCE(NEW.id, OLD.id),
    CASE WHEN TG_OP = 'DELETE' THEN row_to_json(OLD) ELSE NULL END,
    CASE WHEN TG_OP != 'DELETE' THEN row_to_json(NEW) ELSE NULL END
  );
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Apply activity logging to important tables
CREATE TRIGGER log_service_activity AFTER INSERT OR UPDATE OR DELETE ON services
  FOR EACH ROW EXECUTE FUNCTION log_admin_activity();

CREATE TRIGGER log_appointment_activity AFTER INSERT OR UPDATE OR DELETE ON appointments
  FOR EACH ROW EXECUTE FUNCTION log_admin_activity();

CREATE TRIGGER log_customer_activity AFTER INSERT OR UPDATE OR DELETE ON customers
  FOR EACH ROW EXECUTE FUNCTION log_admin_activity();

-- =====================================================
-- 6. VALIDATION FUNCTIONS
-- =====================================================

-- Validate appointment time slot availability
CREATE OR REPLACE FUNCTION check_appointment_slot()
RETURNS TRIGGER AS $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM appointments
    WHERE appointment_date = NEW.appointment_date
    AND appointment_time = NEW.appointment_time
    AND staff_id = NEW.staff_id
    AND status NOT IN ('cancelled', 'no_show')
    AND id != COALESCE(NEW.id, '00000000-0000-0000-0000-000000000000'::UUID)
  ) THEN
    RAISE EXCEPTION 'Time slot already booked for this staff member';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER validate_appointment_slot BEFORE INSERT OR UPDATE ON appointments
  FOR EACH ROW EXECUTE FUNCTION check_appointment_slot();

-- =====================================================
-- 7. UTILITY FUNCTIONS
-- =====================================================

-- Get available time slots for a date
CREATE OR REPLACE FUNCTION get_available_slots(
  p_date DATE,
  p_staff_id UUID DEFAULT NULL
)
RETURNS TABLE (
  time_slot TIME,
  is_available BOOLEAN
) AS $$
BEGIN
  RETURN QUERY
  WITH time_slots AS (
    SELECT generate_series(
      '09:00'::TIME,
      '18:00'::TIME,
      '30 minutes'::INTERVAL
    )::TIME AS slot
  ),
  booked_slots AS (
    SELECT appointment_time
    FROM appointments
    WHERE appointment_date = p_date
    AND (p_staff_id IS NULL OR staff_id = p_staff_id)
    AND status NOT IN ('cancelled', 'no_show')
  )
  SELECT 
    ts.slot AS time_slot,
    NOT EXISTS (
      SELECT 1 FROM booked_slots bs WHERE bs.appointment_time = ts.slot
    ) AS is_available
  FROM time_slots ts
  ORDER BY ts.slot;
END;
$$ LANGUAGE plpgsql;

-- Get customer booking history
CREATE OR REPLACE FUNCTION get_customer_history(p_customer_id UUID)
RETURNS TABLE (
  appointment_id UUID,
  service_name TEXT,
  appointment_date DATE,
  status appointment_status,
  amount DECIMAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    a.id,
    s.name,
    a.appointment_date,
    a.status,
    a.total_amount
  FROM appointments a
  LEFT JOIN services s ON a.service_id = s.id
  WHERE a.customer_id = p_customer_id
  ORDER BY a.appointment_date DESC;
END;
$$ LANGUAGE plpgsql;

-- Calculate monthly revenue
CREATE OR REPLACE FUNCTION get_monthly_revenue(p_year INTEGER, p_month INTEGER)
RETURNS DECIMAL AS $$
DECLARE
  revenue DECIMAL;
BEGIN
  SELECT COALESCE(SUM(paid_amount), 0) INTO revenue
  FROM appointments
  WHERE EXTRACT(YEAR FROM appointment_date) = p_year
  AND EXTRACT(MONTH FROM appointment_date) = p_month
  AND status = 'completed';
  
  RETURN revenue;
END;
$$ LANGUAGE plpgsql;

-- Get popular services
CREATE OR REPLACE FUNCTION get_popular_services(p_limit INTEGER DEFAULT 5)
RETURNS TABLE (
  service_id UUID,
  service_name TEXT,
  booking_count BIGINT,
  total_revenue DECIMAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    s.id,
    s.name,
    COUNT(a.id)::BIGINT AS booking_count,
    COALESCE(SUM(a.total_amount), 0) AS total_revenue
  FROM services s
  LEFT JOIN appointments a ON s.id = a.service_id
  WHERE a.status = 'completed'
  GROUP BY s.id, s.name
  ORDER BY booking_count DESC
  LIMIT p_limit;
END;
$$ LANGUAGE plpgsql;

-- Get dashboard statistics
CREATE OR REPLACE FUNCTION get_dashboard_stats()
RETURNS JSON AS $$
DECLARE
  result JSON;
BEGIN
  SELECT json_build_object(
    'total_customers', (SELECT COUNT(*) FROM customers WHERE status = 'active'),
    'today_appointments', (SELECT COUNT(*) FROM appointments WHERE appointment_date = CURRENT_DATE),
    'pending_appointments', (SELECT COUNT(*) FROM appointments WHERE status = 'pending'),
    'monthly_revenue', (SELECT get_monthly_revenue(EXTRACT(YEAR FROM CURRENT_DATE)::INTEGER, EXTRACT(MONTH FROM CURRENT_DATE)::INTEGER)),
    'new_customers_this_month', (
      SELECT COUNT(*) FROM customers 
      WHERE EXTRACT(YEAR FROM created_at) = EXTRACT(YEAR FROM CURRENT_DATE)
      AND EXTRACT(MONTH FROM created_at) = EXTRACT(MONTH FROM CURRENT_DATE)
    ),
    'total_services', (SELECT COUNT(*) FROM services WHERE is_active = true),
    'unread_messages', (SELECT COUNT(*) FROM contact_messages WHERE status = 'new'),
    'active_offers', (
      SELECT COUNT(*) FROM offers 
      WHERE is_active = true 
      AND start_date <= CURRENT_DATE 
      AND end_date >= CURRENT_DATE
    )
  ) INTO result;
  
  RETURN result;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- 8. SEARCH FUNCTIONS
-- =====================================================

-- Search customers
CREATE OR REPLACE FUNCTION search_customers(p_query TEXT)
RETURNS TABLE (
  id UUID,
  full_name TEXT,
  email TEXT,
  phone TEXT,
  total_bookings INTEGER
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    c.id,
    c.full_name,
    c.email,
    c.phone,
    c.total_bookings
  FROM customers c
  WHERE 
    c.full_name ILIKE '%' || p_query || '%'
    OR c.email ILIKE '%' || p_query || '%'
    OR c.phone ILIKE '%' || p_query || '%'
  ORDER BY c.full_name
  LIMIT 20;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- TRIGGERS & FUNCTIONS COMPLETE
-- =====================================================
