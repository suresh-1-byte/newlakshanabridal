import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { motion } from "framer-motion";
import { 
  Calendar, 
  Users, 
  DollarSign, 
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  TrendingUp
} from "lucide-react";
import StatsCard from "../components/admin/dashboard/StatsCard";
import LoadingSkeleton from "../components/admin/common/LoadingSkeleton";

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
      const todayAppointments = appointments.filter(a => a.appointmentDate === today).length;
      
      const totalRevenue = appointments.reduce((sum, a) => {
        if (a.status === "completed" || a.status === "confirmed") {
          return sum + (a.paidAmount || 0);
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

      // Get recent appointments (sorted by createdAt)
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
    return <LoadingSkeleton type="stats" />;
  }

  return (
    <div className="space-y-8">
      {/* Stats Grid - Using New StatsCard Component */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Appointments"
          value={stats.totalAppointments}
          subtitle="All bookings"
          icon={Calendar}
          iconColor="text-blue-600"
          iconBgColor="bg-gradient-to-br from-blue-100 to-blue-50"
          trend={{ value: "+12%", isPositive: true }}
          delay={0.1}
        />
        
        <StatsCard
          title="Pending"
          value={stats.pendingAppointments}
          subtitle="Awaiting review"
          icon={Clock}
          iconColor="text-yellow-600"
          iconBgColor="bg-gradient-to-br from-yellow-100 to-yellow-50"
          delay={0.2}
        />
        
        <StatsCard
          title="Total Customers"
          value={stats.totalCustomers}
          subtitle="Unique clients"
          icon={Users}
          iconColor="text-purple-600"
          iconBgColor="bg-gradient-to-br from-purple-100 to-purple-50"
          trend={{ value: "+8%", isPositive: true }}
          delay={0.3}
        />
        
        <StatsCard
          title="Total Revenue"
          value={`₹${stats.totalRevenue.toLocaleString('en-IN')}`}
          subtitle="Completed bookings"
          icon={DollarSign}
          iconColor="text-white"
          iconBgColor="bg-white/20"
          gradient={true}
          trend={{ value: "+24%", isPositive: true }}
          delay={0.4}
        />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card rounded-2xl p-6 shadow-soft hover:shadow-soft-lg transition-all duration-300 hover-lift"
        >
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-gradient-to-br from-green-100 to-green-50 p-3 shadow-inner">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-700 uppercase tracking-wide">Completed</p>
              <p className="text-4xl font-extrabold text-gray-900" style={{ fontWeight: '900' }}>{stats.completedAppointments}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass-card rounded-2xl p-6 shadow-soft hover:shadow-soft-lg transition-all duration-300 hover-lift"
        >
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-gradient-to-br from-red-100 to-red-50 p-3 shadow-inner">
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-700 uppercase tracking-wide">Cancelled</p>
              <p className="text-4xl font-extrabold text-gray-900" style={{ fontWeight: '900' }}>{stats.cancelledAppointments}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="glass-card rounded-2xl p-6 shadow-soft hover:shadow-soft-lg transition-all duration-300 hover-lift"
        >
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-gradient-to-br from-blue-100 to-blue-50 p-3 shadow-inner">
              <AlertCircle className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-700 uppercase tracking-wide">Today's Appointments</p>
              <p className="text-4xl font-extrabold text-gray-900" style={{ fontWeight: '900' }}>{stats.todayAppointments}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recent Appointments */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="glass-card rounded-2xl shadow-soft"
      >
        <div className="px-6 py-5 border-b border-white/30 flex items-center justify-between">
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900" style={{ fontSize: '15px', fontWeight: '700' }}>
                      {appointment.bookingReference}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900" style={{ fontSize: '15px', fontWeight: '600' }}>
                      {appointment.customerName || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-700" style={{ fontSize: '14px', fontWeight: '600' }}>
                      {appointment.appointmentDate ? new Date(appointment.appointmentDate).toLocaleDateString('en-IN') : "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex rounded-full px-4 py-1.5 text-xs font-bold uppercase ${getStatusColor(appointment.status)}`} style={{ fontWeight: '700' }}>
                        {appointment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-base font-extrabold text-gray-900" style={{ fontSize: '16px', fontWeight: '800' }}>
                      ₹{(appointment.totalAmount || 0).toLocaleString('en-IN')}
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
