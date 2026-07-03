import { Routes, Route } from 'react-router-dom';
import { FirebaseAuthProvider } from './contexts/FirebaseAuthContext';
import HomePage from './pages/HomePage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminBookings from './pages/AdminBookings';
import AdminGallery from './pages/AdminGallery';
import TestBooking from './pages/TestBooking';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <FirebaseAuthProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/admin/bookings" element={
          <ProtectedRoute>
            <AdminBookings />
          </ProtectedRoute>
        } />
        <Route path="/admin/gallery" element={
          <ProtectedRoute>
            <AdminGallery />
          </ProtectedRoute>
        } />
        <Route path="/test-booking" element={<TestBooking />} />
      </Routes>
    </FirebaseAuthProvider>
  );
}

export default App;
