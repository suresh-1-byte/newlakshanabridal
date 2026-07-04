import { Routes, Route } from 'react-router-dom';
import { FirebaseAuthProvider } from './contexts/FirebaseAuthContext';
import { Toaster } from './components/ui/sonner';
import HomePage from './pages/HomePage';
import AdminLogin from './pages/AdminLogin';
import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/AdminDashboard';
import AdminBookings from './pages/AdminBookings';
import AdminGallery from './pages/AdminGallery';
import BookingHistory from './pages/admin/BookingHistory';
import CustomerManagement from './pages/admin/CustomerManagement';
import Settings from './pages/admin/Settings';
import TestBooking from './pages/TestBooking';
import ProtectedRoute from './components/ProtectedRoute';

// Import admin CSS
import './styles/admin.css';

function App() {
  return (
    <FirebaseAuthProvider>
      <Toaster />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/test-booking" element={<TestBooking />} />
        
        {/* Admin Routes with New Layout */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="bookings" element={<AdminBookings />} />
          <Route path="booking-history" element={<BookingHistory />} />
          <Route path="customers" element={<CustomerManagement />} />
          <Route path="gallery" element={<AdminGallery />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </FirebaseAuthProvider>
  );
}

export default App;
