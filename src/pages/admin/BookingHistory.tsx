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

    // Auto-size columns
    const maxWidth = 30;
    const colWidths = Object.keys(exportData[0] || {}).map(key => ({
      wch: Math.min(maxWidth, Math.max(key.length, 10))
    }));
    ws['!cols'] = colWidths;

    // Style header row with gold background
    const range = XLSX.utils.decode_range(ws['!ref'] || 'A1');
    for (let col = range.s.c; col <= range.e.c; col++) {
      const cellAddress = XLSX.utils.encode_cell({ r: 0, c: col });
      if (!ws[cellAddress]) continue;
      
      ws[cellAddress].s = {
        fill: { fgColor: { rgb: "C9A96E" } },
        font: { bold: true, color: { rgb: "FFFFFF" }, sz: 12 },
        alignment: { horizontal: "center", vertical: "center" },
        border: {
          top: { style: "thin", color: { rgb: "000000" } },
          bottom: { style: "thin", color: { rgb: "000000" } },
          left: { style: "thin", color: { rgb: "000000" } },
          right: { style: "thin", color: { rgb: "000000" } }
        }
      };
    }

    // Style status cells with colors
    for (let row = range.s.r + 1; row <= range.e.r; row++) {
      const statusCol = 6; // Status column (0-indexed)
      const cellAddress = XLSX.utils.encode_cell({ r: row, c: statusCol });
      if (!ws[cellAddress]) continue;
      
      const status = ws[cellAddress].v?.toString().toLowerCase();
      let bgColor = "FFFFFF";
      
      if (status === "pending") bgColor = "FEF3C7"; // Yellow
      else if (status === "confirmed") bgColor = "DBEAFE"; // Blue
      else if (status === "in_progress") bgColor = "E9D5FF"; // Purple
      else if (status === "completed") bgColor = "D1FAE5"; // Green
      else if (status === "cancelled") bgColor = "FEE2E2"; // Red
      else if (status === "rescheduled") bgColor = "FED7AA"; // Orange
      else if (status === "no_show") bgColor = "E5E7EB"; // Gray
      
      ws[cellAddress].s = {
        fill: { fgColor: { rgb: bgColor } },
        font: { bold: true },
        alignment: { horizontal: "center", vertical: "center" },
        border: {
          top: { style: "thin", color: { rgb: "000000" } },
          bottom: { style: "thin", color: { rgb: "000000" } },
          left: { style: "thin", color: { rgb: "000000" } },
          right: { style: "thin", color: { rgb: "000000" } }
        }
      };
    }

    // Style amount column
    for (let row = range.s.r + 1; row <= range.e.r; row++) {
      const amountCol = 7; // Amount column
      const cellAddress = XLSX.utils.encode_cell({ r: row, c: amountCol });
      if (!ws[cellAddress]) continue;
      
      ws[cellAddress].s = {
        font: { bold: true, color: { rgb: "065F46" } },
        alignment: { horizontal: "right", vertical: "center" },
        numFmt: "₹#,##0",
        border: {
          top: { style: "thin", color: { rgb: "000000" } },
          bottom: { style: "thin", color: { rgb: "000000" } },
          left: { style: "thin", color: { rgb: "000000" } },
          right: { style: "thin", color: { rgb: "000000" } }
        }
      };
    }

    const filename = `Booking_History_${new Date().toISOString().split("T")[0]}.xlsx`;
    XLSX.writeFile(wb, filename);
    
    toast.success(`✅ Exported ${exportData.length} bookings successfully!`);
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
          <h1 className="text-4xl font-serif font-extrabold text-gray-900" style={{ fontWeight: '900' }}>
            Booking History
          </h1>
          <p className="text-gray-800 mt-2 font-bold text-lg" style={{ fontWeight: '700' }}>
            {filteredBookings.length} of {bookings.length} bookings
          </p>
        </div>
        <button
          onClick={exportToExcel}
          disabled={filteredBookings.length === 0}
          className="px-8 py-4 bg-gradient-to-r from-[#C9A96E] to-[#B8956A] text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 inline-flex items-center gap-3 text-lg font-extrabold disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ fontWeight: '900' }}
        >
          <Download className="w-6 h-6" />
          Export to Excel
        </button>
      </div>

      {/* Filters */}
      <div className="glass-card rounded-2xl p-6 shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-base font-extrabold text-gray-900 mb-3" style={{ fontWeight: '800' }}>
              <Filter className="w-5 h-5 inline mr-2" />
              Filter by Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-4 border-2 border-gray-400 rounded-xl focus:ring-2 focus:ring-[#C9A96E] focus:border-[#C9A96E] text-base font-bold text-gray-900 cursor-pointer"
              style={{ fontSize: '16px', fontWeight: '700' }}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div>
            <label className="block text-base font-extrabold text-gray-900 mb-3" style={{ fontWeight: '800' }}>
              <Calendar className="w-5 h-5 inline mr-2" />
              Filter by Date
            </label>
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full px-4 py-4 border-2 border-gray-400 rounded-xl focus:ring-2 focus:ring-[#C9A96E] focus:border-[#C9A96E] text-base font-bold text-gray-900 cursor-pointer"
              style={{ fontSize: '16px', fontWeight: '700' }}
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
              <thead className="bg-gradient-to-r from-gray-100 to-gray-50">
                <tr>
                  <th className="px-6 py-5 text-left text-sm font-extrabold text-gray-900 uppercase tracking-wider" style={{ fontWeight: '900' }}>
                    Booking Ref
                  </th>
                  <th className="px-6 py-5 text-left text-sm font-extrabold text-gray-900 uppercase tracking-wider" style={{ fontWeight: '900' }}>
                    Customer
                  </th>
                  <th className="px-6 py-5 text-left text-sm font-extrabold text-gray-900 uppercase tracking-wider" style={{ fontWeight: '900' }}>
                    Service
                  </th>
                  <th className="px-6 py-5 text-left text-sm font-extrabold text-gray-900 uppercase tracking-wider" style={{ fontWeight: '900' }}>
                    Date
                  </th>
                  <th className="px-6 py-5 text-left text-sm font-extrabold text-gray-900 uppercase tracking-wider" style={{ fontWeight: '900' }}>
                    Status
                  </th>
                  <th className="px-6 py-5 text-left text-sm font-extrabold text-gray-900 uppercase tracking-wider" style={{ fontWeight: '900' }}>
                    Amount
                  </th>
                  <th className="px-6 py-5 text-left text-sm font-extrabold text-gray-900 uppercase tracking-wider" style={{ fontWeight: '900' }}>
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
                    <td className="px-6 py-4 whitespace-nowrap text-base font-extrabold text-gray-900" style={{ fontSize: '16px', fontWeight: '800' }}>
                      {booking.bookingReference}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-base font-extrabold text-gray-900" style={{ fontSize: '15px', fontWeight: '800' }}>
                        {booking.customerName}
                      </div>
                      <div className="text-sm font-bold text-gray-700 mt-1" style={{ fontWeight: '700' }}>
                        {booking.customerPhone}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-base font-bold text-gray-900" style={{ fontSize: '15px', fontWeight: '700' }}>
                      {booking.serviceName || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-base font-extrabold text-gray-900" style={{ fontSize: '15px', fontWeight: '800' }}>
                        {booking.appointmentDate
                          ? new Date(booking.appointmentDate).toLocaleDateString('en-IN')
                          : "N/A"}
                      </div>
                      <div className="text-sm font-bold text-gray-700 mt-1" style={{ fontWeight: '700' }}>
                        {booking.appointmentTime || "N/A"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`status-badge ${getStatusColor(booking.status)} px-4 py-2 text-sm font-extrabold`} style={{ fontWeight: '800' }}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-lg font-extrabold text-gray-900" style={{ fontSize: '17px', fontWeight: '900' }}>
                      ₹{(booking.totalAmount || 0).toLocaleString('en-IN')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => setDeleteConfirm(booking.id)}
                        className="p-3 text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition-all border-2 border-red-300 hover:border-red-400 shadow-sm hover:shadow-md"
                        title="Delete Booking"
                      >
                        <Trash2 className="h-5 w-5" />
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
