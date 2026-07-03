import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/FirebaseAuthContext";
import { db } from "../lib/firebase";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { motion } from "framer-motion";
import { 
  Calendar, 
  Users, 
  DollarSign, 
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  LogOut,
  Home,
  Crown,
  Sparkles,
  Image as ImageIcon,
  TrendingUp
} from "lucide-react";

interface DashboardStats {
  totalAppointments: number;
  pendingAppointments: number;
  completedAppointments: number;
  cancelledAppointments: number;
  totalCustomers: number;
  totalRevenue: number;
  todayAppointments: number;
}

export default function AdminDashboard() {
  const { adminData, signOut } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalAppointments: 0,
    pendingAppointments: 0,
    completedAppointments: 0,
    cancelledAppointments: 0,
    totalCustomers: 0,
    totalRevenue: 0,
    todayAppointments: 0,
  });
  const [loading, setLoading] = useState(true);
  const [recentAppointments, setRecentAppointments] = useState<any[]>([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);

      // Get all appointments
      const appointmentsRef = collection(db, "appointments");
      const appointmentsSnap = await getDocs(appointmentsRef);
      const appointments = appointmentsSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      // Get customers count
      const customersRef = collection(db, "customers");
      const customersSnap = await getDocs(customersRef);
      const customersCount = customersSnap.size;

      // Calculate stats
      const today = new Date().toISOString().split("T")[0];
      
      const totalAppointments = appointments.length;
      const pendingAppointments = appointments.filter(a => a.status === "pending").length;
      const completedAppointments = appointments.filter(a => a.status === "completed").length;
      const cancelledAppointments = appointments.filter(a => a.status === "cancelled").length;
      const todayAppointments = appointments.filter(a => a.appointment_date === today).length;
      
      const totalRevenue = appointments.reduce((sum, a) => {
        if (a.status === "completed" || a.status === "confirmed") {
          return sum + (a.paid_amount || 0);
        }
        return sum;
      }, 0);

      setStats({
        totalAppointments,
        pendingAppointments,
        completedAppointments,
        cancelledAppointments,
        totalCustomers: customersCount,
        totalRevenue,
        todayAppointments,
      });

      // Get recent appointments (sorted by created_at)
      const recent = appointments
        .sort((a, b) => {
          const aTime = a.createdAt?.toDate?.() || new Date(0);
          const bTime = b.createdAt?.toDate?.() || new Date(0);
          return bTime.getTime() - aTime.getTime();
        })
        .slice(0, 5);
      
      setRecentAppointments(recent);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "confirmed":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#FAF9F6] via-white to-[#F5F0E8]">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#C9A96E] mx-auto"></div>
            <Crown className="h-6 w-6 text-[#C9A96E] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </div>
          <p className="mt-6 text-sm font-medium text-gray-600 tracking-wide">Loading luxury dashboard...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAF9F6] via-white to-[#F5F0E8]">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#C9A96E]/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-[#C9A96E]/10 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="relative bg-white/80 backdrop-blur-xl shadow-sm border-b border-white/50">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-[#C9A96E] to-[#B8956A] shadow-lg">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-serif font-bold text-gray-900">Admin Dashboard</h1>
                <p className="mt-1 text-sm text-gray-600 flex items-center gap-2">
                  <Sparkles className="w-3 h-3 text-[#C9A96E]" />
                  Welcome back, {adminData?.fullName || "Admin"}
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 rounded-xl bg-white/50 backdrop-blur-sm px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-white/80 border border-gray-200 transition-all duration-200 shadow-sm"
                >
                  <Home className="h-4 w-4" />
                  Home
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/admin/bookings"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#C9A96E] to-[#B8956A] px-4 py-2.5 text-sm font-medium text-white shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <Calendar className="h-4 w-4" />
                  Bookings
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/admin/gallery"
                  className="inline-flex items-center gap-2 rounded-xl bg-white/50 backdrop-blur-sm px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-white/80 border border-gray-200 transition-all duration-200 shadow-sm"
                >
                  <ImageIcon className="h-4 w-4" />
                  Gallery
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <button
                  onClick={handleSignOut}
                  className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-red-700 shadow-lg transition-all duration-200"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {/* Total Appointments */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg p-6 border border-white/50 hover:shadow-xl transition-all duration-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Appointments</p>
                <p className="mt-2 text-4xl font-bold text-gray-900">{stats.totalAppointments}</p>
                <p className="mt-2 text-xs text-gray-500 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-green-600" />
                  All bookings
                </p>
              </div>
              <div className="rounded-full bg-gradient-to-br from-blue-100 to-blue-50 p-4 shadow-inner">
                <Calendar className="h-8 w-8 text-blue-600" />
              </div>
            </div>
          </motion.div>

          {/* Pending Appointments */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg p-6 border border-white/50 hover:shadow-xl transition-all duration-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="mt-2 text-4xl font-bold text-yellow-600">{stats.pendingAppointments}</p>
                <p className="mt-2 text-xs text-gray-500 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-yellow-600" />
                  Awaiting review
                </p>
              </div>
              <div className="rounded-full bg-gradient-to-br from-yellow-100 to-yellow-50 p-4 shadow-inner">
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
            </div>
          </motion.div>

          {/* Total Customers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg p-6 border border-white/50 hover:shadow-xl transition-all duration-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Customers</p>
                <p className="mt-2 text-4xl font-bold text-gray-900">{stats.totalCustomers}</p>
                <p className="mt-2 text-xs text-gray-500 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#C9A96E]" />
                  Unique clients
                </p>
              </div>
              <div className="rounded-full bg-gradient-to-br from-purple-100 to-purple-50 p-4 shadow-inner">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
            </div>
          </motion.div>

          {/* Total Revenue */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-[#C9A96E] to-[#B8956A] rounded-2xl shadow-lg p-6 border border-white/50 hover:shadow-xl transition-all duration-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white/90">Total Revenue</p>
                <p className="mt-2 text-4xl font-bold text-white">₹{stats.totalRevenue.toLocaleString()}</p>
                <p className="mt-2 text-xs text-white/80 flex items-center gap-1">
                  <DollarSign className="w-3 h-3" />
                  Completed bookings
                </p>
              </div>
              <div className="rounded-full bg-white/20 backdrop-blur-sm p-4 shadow-inner">
                <DollarSign className="h-8 w-8 text-white" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg p-6 border border-white/50 hover:shadow-xl transition-all duration-200"
          >
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-gradient-to-br from-green-100 to-green-50 p-3 shadow-inner">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-3xl font-bold text-gray-900">{stats.completedAppointments}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg p-6 border border-white/50 hover:shadow-xl transition-all duration-200"
          >
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-gradient-to-br from-red-100 to-red-50 p-3 shadow-inner">
                <XCircle className="h-8 w-8 text-red-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Cancelled</p>
                <p className="text-3xl font-bold text-gray-900">{stats.cancelledAppointments}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg p-6 border border-white/50 hover:shadow-xl transition-all duration-200"
          >
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-gradient-to-br from-blue-100 to-blue-50 p-3 shadow-inner">
                <AlertCircle className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Today's Appointments</p>
                <p className="text-3xl font-bold text-gray-900">{stats.todayAppointments}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Recent Appointments */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50"
        >
          <div className="px-6 py-5 border-b border-gray-200/50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-[#C9A96E] to-[#B8956A]">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-serif font-semibold text-gray-900">Recent Appointments</h2>
            </div>
            <Link
              to="/admin/bookings"
              className="text-sm font-medium text-[#C9A96E] hover:text-[#B8956A] transition-colors"
            >
              View all →
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200/50">
              <thead className="bg-gray-50/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Booking Ref
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white/50 divide-y divide-gray-200/50">
                {recentAppointments.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <div className="rounded-full bg-gray-100 p-4 mb-4">
                          <Calendar className="h-8 w-8 text-gray-400" />
                        </div>
                        <p className="text-sm font-medium text-gray-500">No appointments yet</p>
                        <p className="text-xs text-gray-400 mt-1">Bookings will appear here</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  recentAppointments.map((appointment, index) => (
                    <motion.tr
                      key={appointment.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="hover:bg-white/80 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {appointment.booking_reference}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {appointment.customerName || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {appointment.appointment_date ? new Date(appointment.appointment_date).toLocaleDateString() : "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(appointment.status)}`}>
                          {appointment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        ₹{(appointment.total_amount || 0).toLocaleString()}
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
