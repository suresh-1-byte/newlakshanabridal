import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { collection, onSnapshot, doc, updateDoc, deleteDoc, query, orderBy } from "firebase/firestore";
import { motion } from "framer-motion";
import {
  Calendar,
  Search,
  Filter,
  Eye,
  Trash2,
  Phone,
  Clock,
  DollarSign,
  User,
  Download,
  CheckCircle,
  XCircle,
  Edit,
} from "lucide-react";
import * as XLSX from 'xlsx';
import LoadingSkeleton from "../components/admin/common/LoadingSkeleton";
import EmptyState from "../components/admin/common/EmptyState";
import ConfirmDialog from "../components/admin/common/ConfirmDialog";

interface Appointment {
  id: string;
  bookingReference: string;
  appointmentDate: string;
  appointmentTime: string;
  status: string;
  totalAmount: number;
  paidAmount: number;
  paymentStatus: string;
  customerNotes?: string;
  adminNotes?: string;
  customerName?: string;
  customerPhone?: string;
  customerEmail?: string;
  serviceName?: string;
}

export default function AdminBookings() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [filteredAppointments, setFilteredAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [confirmBooking, setConfirmBooking] = useState<Appointment | null>(null);
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    // Real-time listener for appointments
    const appointmentsRef = collection(db, "appointments");
    const q = query(appointmentsRef, orderBy("createdAt", "desc"));
    
    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Appointment[];
        
        setAppointments(data);
        setLoading(false);
      },
      (error) => {
        console.error("Error loading appointments:", error);
        setLoading(false);
      }
    );

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    filterAppointments();
  }, [searchTerm, statusFilter, appointments]);

  const exportToExcel = () => {
    try {
      // Prepare data for Excel
      const exportData = filteredAppointments.map((appointment) => ({
        "Booking Reference": appointment.bookingReference || "N/A",
        "Customer Name": appointment.customerName || "N/A",
        "Phone": appointment.customerPhone || "N/A",
        "Email": appointment.customerEmail || "N/A",
        "Service": appointment.serviceName || "N/A",
        "Date": appointment.appointmentDate 
          ? new Date(appointment.appointmentDate).toLocaleDateString() 
          : "N/A",
        "Time": appointment.appointmentTime || "N/A",
        "Status": appointment.status || "N/A",
        "Total Amount": appointment.totalAmount || 0,
        "Paid Amount": appointment.paidAmount || 0,
        "Payment Status": appointment.paymentStatus || "N/A",
        "Customer Notes": appointment.customerNotes || "",
        "Admin Notes": appointment.adminNotes || "",
      }));

      // Create workbook
      const ws = XLSX.utils.json_to_sheet(exportData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Bookings");

      // Auto-size columns
      const maxWidth = 30;
      const colWidths = Object.keys(exportData[0] || {}).map(key => ({
        wch: Math.min(maxWidth, Math.max(key.length, 10))
      }));
      ws['!cols'] = colWidths;

      // Generate filename with current date
      const filename = `Lakshana_Bookings_${new Date().toISOString().split('T')[0]}.xlsx`;

      // Download
      XLSX.writeFile(wb, filename);
      
      alert(`✅ Exported ${exportData.length} bookings successfully!`);
    } catch (error) {
      console.error("Export error:", error);
      alert("Failed to export bookings");
    }
  };

  const loadAppointments = async () => {
    // This function is no longer needed with real-time listeners
    // Kept for backward compatibility if needed
    console.log("Real-time listeners are active");
  };

  const filterAppointments = () => {
    let filtered = [...appointments];

    if (statusFilter !== "all") {
      filtered = filtered.filter((a) => a.status === statusFilter);
    }

    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (a) =>
          a.bookingReference?.toLowerCase().includes(search) ||
          a.customerName?.toLowerCase().includes(search) ||
          a.customerPhone?.includes(search) ||
          a.customerEmail?.toLowerCase().includes(search)
      );
    }

    setFilteredAppointments(filtered);
  };

  const handleStatusUpdate = async (appointmentId: string, newStatus: string) => {
    try {
      const appointmentRef = doc(db, "appointments", appointmentId);
      await updateDoc(appointmentRef, { 
        status: newStatus,
        updatedAt: new Date()
      });
      // No need to reload - real-time listener will update automatically
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status");
    }
  };

  const handleConfirmBooking = async () => {
    if (!confirmBooking) return;
    
    try {
      setConfirming(true);
      const appointmentRef = doc(db, "appointments", confirmBooking.id);
      await updateDoc(appointmentRef, { 
        status: "confirmed",
        updatedAt: new Date()
      });
      
      // Show success message
      alert(`✅ Booking ${confirmBooking.bookingReference} confirmed!\n\nCustomer: ${confirmBooking.customerName}\nDate: ${confirmBooking.appointmentDate ? new Date(confirmBooking.appointmentDate).toLocaleDateString() : 'N/A'}\nTime: ${confirmBooking.appointmentTime || 'N/A'}\n\nYou can now contact the customer via WhatsApp.`);
      
      setConfirmBooking(null);
    } catch (error) {
      console.error("Error confirming booking:", error);
      alert("Failed to confirm booking");
    } finally {
      setConfirming(false);
    }
  };

  const handleDeleteAppointment = async (appointmentId: string) => {
    try {
      setDeleting(true);
      const appointmentRef = doc(db, "appointments", appointmentId);
      await deleteDoc(appointmentRef);
      setDeleteConfirm(null);
    } catch (error) {
      console.error("Error deleting appointment:", error);
      alert("Failed to delete appointment");
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
      case "in_progress":
        return "bg-purple-100 text-purple-800 border border-purple-200";
      case "completed":
        return "status-completed";
      case "cancelled":
        return "status-cancelled";
      case "rescheduled":
        return "bg-orange-100 text-orange-800 border border-orange-200";
      case "no_show":
        return "bg-gray-100 text-gray-800 border border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border border-gray-200";
    }
  };

  if (loading) {
    return <LoadingSkeleton type="table" count={5} />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-gray-900">
            Manage Bookings
          </h1>
          <p className="text-gray-600 mt-1">
            {filteredAppointments.length} of {appointments.length} bookings
            <span className="ml-2 text-green-600">● Real-time updates</span>
          </p>
        </div>
        <button
          onClick={exportToExcel}
          disabled={filteredAppointments.length === 0}
          className="btn-gold inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Download className="w-4 h-4" />
          Export to Excel
        </button>
      </div>

      {/* Filters */}
      <div className="glass-card rounded-2xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, phone, booking ref..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#C9A96E] focus:border-transparent"
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#C9A96E] focus:border-transparent appearance-none"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
              <option value="rescheduled">Rescheduled</option>
              <option value="no_show">No Show</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      {filteredAppointments.length === 0 ? (
        <div className="glass-card rounded-2xl">
          <EmptyState
            icon={Calendar}
            title="No bookings found"
            description="Bookings that match your filters will appear here"
          />
        </div>
      ) : (
        <div className="glass-card rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200/50">
              <thead className="bg-gray-50/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Booking Details
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white/50 divide-y divide-gray-200/50">
                {filteredAppointments.map((appointment, index) => (
                  <motion.tr
                    key={appointment.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-white/80 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {appointment.bookingReference}
                      </div>
                      <div className="text-sm text-gray-500">
                        {appointment.serviceName || "General Service"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-400" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {appointment.customerName || "N/A"}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            <a 
                              href={`https://wa.me/91${appointment.customerPhone?.replace(/[^0-9]/g, '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-green-600 hover:underline"
                              title="Open WhatsApp"
                            >
                              {appointment.customerPhone || "N/A"}
                            </a>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {appointment.appointmentDate ? new Date(appointment.appointmentDate).toLocaleDateString() : "N/A"}
                      </div>
                      <div className="text-sm text-gray-500 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {appointment.appointmentTime || "N/A"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={appointment.status}
                        onChange={(e) =>
                          handleStatusUpdate(appointment.id, e.target.value)
                        }
                        className={`status-badge ${getStatusColor(
                          appointment.status
                        )} border-0 cursor-pointer text-xs font-semibold px-3 py-1 rounded-full`}
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="rescheduled">Rescheduled</option>
                        <option value="no_show">No Show</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 flex items-center gap-1">
                        <DollarSign className="h-3 w-3" />
                        ₹{(appointment.totalAmount || 0).toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-500">
                        Paid: ₹{(appointment.paidAmount || 0).toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        {appointment.status === "pending" && (
                          <button
                            onClick={() => setConfirmBooking(appointment)}
                            className="px-3 py-1.5 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all shadow-sm hover:shadow-md flex items-center gap-1.5 font-medium"
                            title="Confirm Booking"
                          >
                            <CheckCircle className="h-4 w-4" />
                            Confirm
                          </button>
                        )}
                        <button
                          onClick={() => {
                            setSelectedAppointment(appointment);
                            setShowDetails(true);
                          }}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-blue-200 hover:border-blue-300"
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(appointment.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-red-200 hover:border-red-300"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Confirm Booking Dialog */}
      <ConfirmDialog
        isOpen={!!confirmBooking}
        onClose={() => setConfirmBooking(null)}
        onConfirm={handleConfirmBooking}
        title="Confirm Booking"
        message={confirmBooking ? `Confirm booking for ${confirmBooking.customerName}?\n\nDate: ${confirmBooking.appointmentDate ? new Date(confirmBooking.appointmentDate).toLocaleDateString() : 'N/A'}\nTime: ${confirmBooking.appointmentTime || 'N/A'}\nService: ${confirmBooking.serviceName || 'General Service'}\n\nThe booking status will be changed to "Confirmed".` : ''}
        confirmText="Confirm Booking"
        cancelText="Cancel"
        type="success"
        loading={confirming}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        onConfirm={() => deleteConfirm && handleDeleteAppointment(deleteConfirm)}
        title="Delete Booking"
        message="Are you sure you want to delete this booking? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
        loading={deleting}
      />

      {/* Booking Details Modal */}
      {showDetails && selectedAppointment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowDetails(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative glass-card rounded-2xl p-8 max-w-3xl w-full shadow-2xl max-h-[90vh] overflow-y-auto custom-scrollbar"
          >
            {/* Modal content */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
              <h2 className="text-3xl font-serif font-bold text-gray-900">Booking Details</h2>
              <button
                onClick={() => setShowDetails(false)}
                className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 p-6 rounded-xl border border-blue-200 shadow-sm">
                <h3 className="font-bold text-blue-900 mb-4 text-lg flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Booking Information
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-white/70 p-3 rounded-lg">
                    <span className="text-gray-600 block mb-1 text-xs font-semibold uppercase">Reference</span>
                    <p className="font-bold text-gray-900 text-base">{selectedAppointment.bookingReference}</p>
                  </div>
                  <div className="bg-white/70 p-3 rounded-lg">
                    <span className="text-gray-600 block mb-1 text-xs font-semibold uppercase">Status</span>
                    <p className={`font-bold text-base capitalize inline-flex px-3 py-1 rounded-full ${getStatusColor(selectedAppointment.status)}`}>
                      {selectedAppointment.status}
                    </p>
                  </div>
                  <div className="bg-white/70 p-3 rounded-lg">
                    <span className="text-gray-600 block mb-1 text-xs font-semibold uppercase">Date</span>
                    <p className="font-bold text-gray-900 text-base">
                      {selectedAppointment.appointmentDate ? new Date(selectedAppointment.appointmentDate).toLocaleDateString('en-IN', { 
                        weekday: 'short', 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      }) : "N/A"}
                    </p>
                  </div>
                  <div className="bg-white/70 p-3 rounded-lg">
                    <span className="text-gray-600 block mb-1 text-xs font-semibold uppercase">Time</span>
                    <p className="font-bold text-gray-900 text-base">{selectedAppointment.appointmentTime || "N/A"}</p>
                  </div>
                  <div className="bg-white/70 p-3 rounded-lg col-span-2">
                    <span className="text-gray-600 block mb-1 text-xs font-semibold uppercase">Service</span>
                    <p className="font-bold text-gray-900 text-base">{selectedAppointment.serviceName || "General Service"}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 p-6 rounded-xl border border-purple-200 shadow-sm">
                <h3 className="font-bold text-purple-900 mb-4 text-lg flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Customer Information
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="bg-white/70 p-3 rounded-lg">
                    <span className="text-gray-600 block mb-1 text-xs font-semibold uppercase">Name</span>
                    <p className="font-bold text-gray-900 text-base">{selectedAppointment.customerName || "N/A"}</p>
                  </div>
                  <div className="bg-white/70 p-3 rounded-lg">
                    <span className="text-gray-600 block mb-1 text-xs font-semibold uppercase">Phone</span>
                    <p className="font-bold text-gray-900 text-base flex items-center gap-2">
                      <Phone className="w-4 h-4 text-purple-600" />
                      {selectedAppointment.customerPhone || "N/A"}
                    </p>
                  </div>
                  {selectedAppointment.customerEmail && (
                    <div className="bg-white/70 p-3 rounded-lg">
                      <span className="text-gray-600 block mb-1 text-xs font-semibold uppercase">Email</span>
                      <p className="font-bold text-gray-900 text-base">{selectedAppointment.customerEmail}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100/50 p-6 rounded-xl border border-green-200 shadow-sm">
                <h3 className="font-bold text-green-900 mb-4 text-lg flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Payment Information
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-white/70 p-3 rounded-lg">
                    <span className="text-gray-600 block mb-1 text-xs font-semibold uppercase">Total Amount</span>
                    <p className="font-bold text-gray-900 text-xl">₹{(selectedAppointment.totalAmount || 0).toLocaleString()}</p>
                  </div>
                  <div className="bg-white/70 p-3 rounded-lg">
                    <span className="text-gray-600 block mb-1 text-xs font-semibold uppercase">Paid Amount</span>
                    <p className="font-bold text-green-600 text-xl">₹{(selectedAppointment.paidAmount || 0).toLocaleString()}</p>
                  </div>
                  <div className="bg-white/70 p-3 rounded-lg col-span-2">
                    <span className="text-gray-600 block mb-1 text-xs font-semibold uppercase">Payment Status</span>
                    <p className="font-bold text-gray-900 text-base capitalize">{selectedAppointment.paymentStatus || "N/A"}</p>
                  </div>
                </div>
              </div>

              {selectedAppointment.customerNotes && (
                <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 p-6 rounded-xl border border-amber-200 shadow-sm">
                  <h3 className="font-bold text-amber-900 mb-3 text-lg">Customer Notes</h3>
                  <div className="bg-white/70 p-4 rounded-lg">
                    <p className="text-gray-700 leading-relaxed">{selectedAppointment.customerNotes}</p>
                  </div>
                </div>
              )}

              {selectedAppointment.adminNotes && (
                <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 p-6 rounded-xl border border-gray-200 shadow-sm">
                  <h3 className="font-bold text-gray-900 mb-3 text-lg">Admin Notes</h3>
                  <div className="bg-white/70 p-4 rounded-lg">
                    <p className="text-gray-700 leading-relaxed">{selectedAppointment.adminNotes}</p>
                  </div>
                </div>
              )}
              
              {/* WhatsApp Button */}
              <div className="bg-gradient-to-r from-green-500 to-green-600 p-1 rounded-xl shadow-lg">
                <a
                  href={`https://wa.me/91${selectedAppointment.customerPhone?.replace(/[^0-9]/g, '')}?text=Hi ${selectedAppointment.customerName}, regarding your booking ${selectedAppointment.bookingReference} for ${selectedAppointment.serviceName} on ${selectedAppointment.appointmentDate ? new Date(selectedAppointment.appointmentDate).toLocaleDateString() : ''}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-white hover:bg-green-50 rounded-lg transition-colors group"
                >
                  <svg className="h-8 w-8 text-green-600 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  <span className="text-gray-900 font-bold text-lg">Open WhatsApp Chat</span>
                </a>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end gap-3">
              {selectedAppointment.status === "pending" && (
                <button
                  onClick={() => {
                    setShowDetails(false);
                    setConfirmBooking(selectedAppointment);
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all shadow-md hover:shadow-lg font-semibold flex items-center gap-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  Confirm Booking
                </button>
              )}
              <button
                onClick={() => setShowDetails(false)}
                className="px-6 py-3 btn-gold"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
