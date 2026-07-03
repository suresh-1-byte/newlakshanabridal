-- =====================================================
-- TEMPORARILY DISABLE APPOINTMENT HISTORY TRIGGER
-- This will allow bookings to work while we debug
-- =====================================================

DO $$
BEGIN
  RAISE NOTICE '🛑 Disabling appointment history trigger...';
END $$;

-- Simply drop the trigger - we can recreate it later
DROP TRIGGER IF EXISTS track_appointment_changes ON appointments CASCADE;

-- Drop the function
DROP FUNCTION IF EXISTS log_appointment_changes() CASCADE;

DO $$
BEGIN
  RAISE NOTICE '';
  RAISE NOTICE '✅ Trigger disabled successfully!';
  RAISE NOTICE '';
  RAISE NOTICE '🎯 What this does:';
  RAISE NOTICE '   - Removes the trigger causing ON CONFLICT error';
  RAISE NOTICE '   - Appointments can now be created without issues';
  RAISE NOTICE '   - History logging is temporarily disabled';
  RAISE NOTICE '';
  RAISE NOTICE '🧪 Test Now:';
  RAISE NOTICE '   1. Go to: http://localhost:8080/test-booking';
  RAISE NOTICE '   2. Refresh page (F5)';
  RAISE NOTICE '   3. Click "Submit Test Booking"';
  RAISE NOTICE '   4. Should work perfectly!';
  RAISE NOTICE '';
END $$;
