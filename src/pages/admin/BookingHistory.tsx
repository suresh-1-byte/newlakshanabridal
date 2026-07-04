import { useState, useEffect } from "react";
import { collection, query, where, orderBy, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { History, Download, Filter, Calendar, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import * as XLSX from "xlsx";
import EmptyState from "../../components/admin/common/EmptyState";
import LoadingSkeleton from "../../components/admin/common/LoadingSkeleton";
import ConfirmDialog from "../../components/admin/common/ConfirmDialog";
import { toast } from "sonner";

interface BookingHistoryItem {
  id: string;
  bookingReference: string;
  customerName: string;
  customerPhone: string;
  serviceName: string;
  appointmentDate: string;
  appointmentTime: string;
  status: string;
  totalAmount: number;
  createdAt: any;
}

export default function BookingHistory() {
  const [bookings, setBookings] = useState<BookingHistoryItem[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<BookingHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    loadBookingHistory();
  }, []);

  useEffect(() => {
    filterBookings();
  }, [statusFilter, dateFilter, bookings]);

  const loadBookingHistory = async () => {
    try {
      setLoading(true);
      const appointmentsRef = collection(db, "appointments");
      const q = query(appointmentsRef, orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as BookingHistoryItem[];

      setBookings(data);
    } catch (error) {
      console.error("Error loading booking history:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterBookings = () => {
    let filtered = [...bookings];

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((b) => b.status === statusFilter);
    }

    // Date filter
    if (dateFilter !== "all") {
      const now = new Date();
      const startDate = new Date();

      switch (dateFilter) {
        case "today":
          startDate.setHours(0, 0, 0, 0);
          break;
        case "week":
          startDate.setDate(now.getDate() - 7);
          break;
        case "month":
          startDate.setMonth(now.getMonth() - 1);
          break;
        case "year":
          startDate.setFullYear(now.getFullYear() - 1);
          break;
      }

      if (dateFilter !== "all") {
        filtered = filtered.filter((b) => {
          const bookingDate = b.createdAt?.toDate?.() || new Date(0);
          return bookingDate >= startDate;
        });
      }
    }

    setFilteredBookings(filtered);
  };

  const exportToExcel = () => {
    const exportData = filteredBookings.map((booking) => ({
      "Booking Reference": booking.bookingReference,
      "Customer Name": booking.customerName,
      "Phone": booking.customerPhone,
      "Service": booking.serviceName || "N/A",
      "Date": booking.appointmentDate
        ? new Date(booking.appointmentDate).toLocaleDateString()
        : "N/A",
      "Time": booking.appointmentTime || "N/A",
      "Status": booking.status,
      "Amount": booking.totalAmount || 0,
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Booking History");

    const filename = `Booking_History_${new Date().toISOString().split("T")[0]}.xlsx`;
    XLSX.writeFile(wb, filename);
  };

  const handleDeleteBooking = async (bookingId: string) => {
    try {
      setDeleting(true);
      const bookingRef = doc(db, "appointments", bookingId);
      await deleteDoc(bookingRef);
      
      toast.success("Booking deleted successfully!");
      setDeleteConfirm(null);
      
      // Reload bookings after delete
      loadBookingHistory();
    } catch (error) {
      console.error("Error deleting booking:", error);
      toast.error("Failed to delete booking");
    } finally {
      setDeleting(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "status-pending";
      case "confirmed":
        return "status-confirmed";
      case "completed":
        return "status-completed";
      case "cancelled":
        return "status-cancelled";
      default:
        return "status-badge bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="h-8 w-48 bg-gray-200 rounded skeleton" />
            <div className="h-4 w-32 bg-gray-200 rounded mt-2 skeleton" />
          </div>
        </div>
        <LoadingSkeleton type="table" count={5} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-gray-900">
            Booking History
          </h1>
          <p className="text-gray-600 mt-1">
            {filteredBookings.length} of {bookings.length} bookings
          </p>
        </div>
        <button
          onClick={exportToExcel}
          disabled={filteredBookings.length === 0}
          className="px-6 py-3 bg-gradient-to-r from-[#d4af37] to-[#f4d35e] text-white rounded-xl font-bold shadow-lg hover:shadow-xl hover:from-[#f4d35e] hover:to-[#d4af37] transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-2 text-base"
        >
          <Download className="w-5 h-5" />
          Export to Excel
        </button>
      </div>

      {/* Filters */}
      <div className="glass-card rounded-2xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Filter className="w-4 h-4 inline mr-2" />
              Filter by Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#C9A96E] focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="w-4 h-4 inline mr-2" />
              Filter by Date
            </label>
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#C9A96E] focus:border-transparent"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
              <option value="year">Last Year</option>
            </select>
          </div>
        </div>
      </div>

      {/* History Table */}
      {filteredBookings.length === 0 ? (
        <div className="glass-card rounded-2xl">
          <EmptyState
            icon={History}
            title="No booking history found"
            description="Bookings that match your filters will appear here"
          />
        </div>
      ) : (
        <div className="glass-card rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200/50">
              <thead className="bg-gray-50/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                    Booking Ref
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                    Customer
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                    Service
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white/50 divide-y divide-gray-200/50">
                {filteredBookings.map((booking, index) => (
                  <motion.tr
                    key={booking.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-white/80 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {booking.bookingReference}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {booking.customerName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {booking.customerPhone}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {booking.serviceName || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {booking.appointmentDate
                          ? new Date(booking.appointmentDate).toLocaleDateString()
                          : "N/A"}
                      </div>
                      <div className="text-sm text-gray-500">
                        {booking.appointmentTime || "N/A"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`status-badge ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ₹{(booking.totalAmount || 0).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => setDeleteConfirm(booking.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-red-200 hover:border-red-300"
                        title="Delete Booking"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        onConfirm={() => deleteConfirm && handleDeleteBooking(deleteConfirm)}
        title="Delete Booking"
        message="Are you sure you want to delete this booking from history? This action cannot be undone."
        confirmText="Delete Booking"
        cancelText="Cancel"
        type="danger"
        loading={deleting}
      />
    </div>
  );
}
