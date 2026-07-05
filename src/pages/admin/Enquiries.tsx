import { useEffect, useState } from "react";
import { collection, query, orderBy, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { motion } from "framer-motion";
import {
  Mail,
  Search,
  Filter,
  Download,
  Phone,
  User,
  MessageSquare,
  Calendar,
  RefreshCw
} from "lucide-react";
import * as XLSX from "xlsx";
import LoadingSkeleton from "../../components/admin/common/LoadingSkeleton";
import EmptyState from "../../components/admin/common/EmptyState";
import { toast } from "sonner";

interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject?: string;
  message: string;
  serviceInterested?: string;
  status: "new" | "contacted" | "completed";
  createdAt: any;
}

const statusOptions = [
  { value: "new", label: "New", color: "bg-blue-100 text-blue-800 border-blue-300" },
  { value: "contacted", label: "Contacted", color: "bg-yellow-100 text-yellow-800 border-yellow-300" },
  { value: "completed", label: "Completed", color: "bg-green-100 text-green-800 border-green-300" }
];

export default function Enquiries() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [filteredEnquiries, setFilteredEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState<"date" | "name" | "status">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    // Real-time listener for enquiries
    const enquiriesRef = collection(db, "contact_messages");
    const q = query(enquiriesRef, orderBy("createdAt", "desc"));
    
    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Enquiry[];
        
        setEnquiries(data);
        setLoading(false);
        
        // Show toast for new enquiries (only if already loaded)
        if (!loading && data.length > enquiries.length) {
          toast.success("New enquiry received!");
        }
      },
      (error) => {
        console.error("Error loading enquiries:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    filterAndSortEnquiries();
  }, [searchTerm, statusFilter, sortBy, sortOrder, enquiries]);

  const filterAndSortEnquiries = () => {
    let filtered = [...enquiries];

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(e => e.status === statusFilter);
    }

    // Apply search
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(e =>
        e.name?.toLowerCase().includes(search) ||
        e.email?.toLowerCase().includes(search) ||
        e.phone?.includes(search) ||
        e.message?.toLowerCase().includes(search)
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let compareValue = 0;
      
      switch (sortBy) {
        case "name":
          compareValue = a.name.localeCompare(b.name);
          break;
        case "status":
          compareValue = a.status.localeCompare(b.status);
          break;
        case "date":
        default:
          const aTime = a.createdAt?.toDate?.() || new Date(0);
          const bTime = b.createdAt?.toDate?.() || new Date(0);
          compareValue = aTime.getTime() - bTime.getTime();
          break;
      }
      
      return sortOrder === "asc" ? compareValue : -compareValue;
    });

    setFilteredEnquiries(filtered);
    setCurrentPage(1); // Reset to first page on filter change
  };

  const handleStatusUpdate = async (enquiryId: string, newStatus: string) => {
    try {
      setUpdating(enquiryId);
      const enquiryRef = doc(db, "contact_messages", enquiryId);
      await updateDoc(enquiryRef, { 
        status: newStatus,
        updatedAt: new Date()
      });
      toast.success("Status updated successfully!");
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    } finally {
      setUpdating(null);
    }
  };

  const exportToExcel = () => {
    try {
      const exportData = filteredEnquiries.map((enquiry) => ({
        "Name": enquiry.name,
        "Email": enquiry.email,
        "Phone": enquiry.phone,
        "Subject": enquiry.subject || "N/A",
        "Service Interested": enquiry.serviceInterested || "N/A",
        "Message": enquiry.message,
        "Status": enquiry.status,
        "Submitted Date": enquiry.createdAt?.toDate?.().toLocaleString('en-IN') || "N/A"
      }));

      const ws = XLSX.utils.json_to_sheet(exportData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Enquiries");

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
        
        if (status === "new") bgColor = "DBEAFE"; // Blue
        else if (status === "contacted") bgColor = "FEF3C7"; // Yellow
        else if (status === "completed") bgColor = "D1FAE5"; // Green
        
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

      const filename = `Lakshana_Enquiries_${new Date().toISOString().split('T')[0]}.xlsx`;
      XLSX.writeFile(wb, filename);
      
      toast.success(`✅ Exported ${exportData.length} enquiries successfully!`);
    } catch (error) {
      console.error("Export error:", error);
      toast.error("Failed to export enquiries");
    }
  };

  const getStatusColor = (status: string) => {
    const option = statusOptions.find(opt => opt.value === status);
    return option?.color || "bg-gray-100 text-gray-800 border-gray-300";
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredEnquiries.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredEnquiries.length / itemsPerPage);

  if (loading) {
    return <LoadingSkeleton type="table" count={5} />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-serif font-extrabold text-gray-900" style={{ fontWeight: '900' }}>
            Enquiries Management
          </h1>
          <p className="text-gray-800 mt-2 font-bold text-lg flex items-center gap-2" style={{ fontWeight: '700' }}>
            <span>{filteredEnquiries.length} of {enquiries.length} enquiries</span>
            <span className="ml-2 text-green-600 font-extrabold flex items-center gap-1">
              <RefreshCw className="w-4 h-4 animate-spin" />
              Real-time
            </span>
          </p>
        </div>
        <button
          onClick={exportToExcel}
          disabled={filteredEnquiries.length === 0}
          className="px-8 py-4 bg-gradient-to-r from-[#C9A96E] to-[#B8956A] text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 inline-flex items-center gap-3 text-lg font-extrabold disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ fontWeight: '900' }}
        >
          <Download className="w-6 h-6" />
          Export to Excel
        </button>
      </div>

      {/* Filters & Search */}
      <div className="glass-card rounded-2xl p-6 shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative md:col-span-2">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-600" />
            <input
              type="text"
              placeholder="Search by name, email, phone, or message..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-400 rounded-xl focus:ring-2 focus:ring-[#C9A96E] focus:border-[#C9A96E] text-base font-bold text-gray-900 placeholder-gray-600"
              style={{ fontSize: '16px', fontWeight: '700' }}
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-600 pointer-events-none" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-400 rounded-xl focus:ring-2 focus:ring-[#C9A96E] focus:border-[#C9A96E] appearance-none text-base font-bold text-gray-900 cursor-pointer"
              style={{ fontSize: '16px', fontWeight: '700' }}
            >
              <option value="all">All Status</option>
              {statusOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Sort Options */}
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="text-sm font-bold text-gray-700 self-center">Sort by:</span>
          <button
            onClick={() => {
              setSortBy("date");
              setSortOrder(sortOrder === "asc" ? "desc" : "asc");
            }}
            className={`px-3 py-1 rounded-lg text-sm font-bold transition-all ${
              sortBy === "date" ? "bg-[#C9A96E] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Date {sortBy === "date" && (sortOrder === "asc" ? "↑" : "↓")}
          </button>
          <button
            onClick={() => {
              setSortBy("name");
              setSortOrder(sortOrder === "asc" ? "desc" : "asc");
            }}
            className={`px-3 py-1 rounded-lg text-sm font-bold transition-all ${
              sortBy === "name" ? "bg-[#C9A96E] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Name {sortBy === "name" && (sortOrder === "asc" ? "↑" : "↓")}
          </button>
          <button
            onClick={() => {
              setSortBy("status");
              setSortOrder(sortOrder === "asc" ? "desc" : "asc");
            }}
            className={`px-3 py-1 rounded-lg text-sm font-bold transition-all ${
              sortBy === "status" ? "bg-[#C9A96E] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Status {sortBy === "status" && (sortOrder === "asc" ? "↑" : "↓")}
          </button>
        </div>
      </div>

      {/* Enquiries Table */}
      {currentItems.length === 0 ? (
        <div className="glass-card rounded-2xl">
          <EmptyState
            icon={Mail}
            title="No enquiries found"
            description="Enquiries from the contact form will appear here"
          />
        </div>
      ) : (
        <>
          <div className="glass-card rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200/50">
                <thead className="bg-gradient-to-r from-gray-100 to-gray-50">
                  <tr>
                    <th className="px-6 py-5 text-left text-sm font-extrabold text-gray-900 uppercase tracking-wider" style={{ fontWeight: '900' }}>
                      Customer
                    </th>
                    <th className="px-6 py-5 text-left text-sm font-extrabold text-gray-900 uppercase tracking-wider" style={{ fontWeight: '900' }}>
                      Contact
                    </th>
                    <th className="px-6 py-5 text-left text-sm font-extrabold text-gray-900 uppercase tracking-wider" style={{ fontWeight: '900' }}>
                      Message
                    </th>
                    <th className="px-6 py-5 text-left text-sm font-extrabold text-gray-900 uppercase tracking-wider" style={{ fontWeight: '900' }}>
                      Submitted
                    </th>
                    <th className="px-6 py-5 text-left text-sm font-extrabold text-gray-900 uppercase tracking-wider" style={{ fontWeight: '900' }}>
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white/50 divide-y divide-gray-200/50">
                  {currentItems.map((enquiry, index) => (
                    <motion.tr
                      key={enquiry.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-white/80 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white font-extrabold text-xl shadow-md">
                            {enquiry.name?.charAt(0) || "E"}
                          </div>
                          <div>
                            <div className="text-base font-extrabold text-gray-900" style={{ fontWeight: '800' }}>
                              {enquiry.name}
                            </div>
                            {enquiry.serviceInterested && (
                              <div className="text-sm font-bold text-gray-700" style={{ fontWeight: '700' }}>
                                Interested: {enquiry.serviceInterested}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-base font-bold text-gray-900" style={{ fontWeight: '800' }}>
                            <Phone className="w-5 h-5 text-gray-700" />
                            <a 
                              href={`https://wa.me/91${enquiry.phone?.replace(/[^0-9]/g, '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-green-600 hover:underline"
                            >
                              {enquiry.phone}
                            </a>
                          </div>
                          <div className="flex items-center gap-2 text-sm font-bold text-gray-700" style={{ fontWeight: '700' }}>
                            <Mail className="w-4 h-4 text-gray-600" />
                            <a href={`mailto:${enquiry.email}`} className="hover:text-blue-600 hover:underline truncate">
                              {enquiry.email}
                            </a>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 max-w-md">
                        {enquiry.subject && (
                          <div className="text-sm font-extrabold text-gray-900 mb-1" style={{ fontWeight: '800' }}>
                            {enquiry.subject}
                          </div>
                        )}
                        <div className="text-sm font-bold text-gray-700 line-clamp-2" style={{ fontWeight: '700' }}>
                          {enquiry.message}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2 text-base font-bold text-gray-900" style={{ fontWeight: '800' }}>
                          <Calendar className="w-5 h-5 text-gray-700" />
                          {enquiry.createdAt?.toDate?.().toLocaleDateString('en-IN') || "N/A"}
                        </div>
                        <div className="text-sm font-bold text-gray-700 mt-1" style={{ fontWeight: '700' }}>
                          {enquiry.createdAt?.toDate?.().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) || ""}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={enquiry.status}
                          onChange={(e) => handleStatusUpdate(enquiry.id, e.target.value)}
                          disabled={updating === enquiry.id}
                          className={`px-4 py-2 rounded-full text-sm font-extrabold cursor-pointer border-2 transition-all ${getStatusColor(enquiry.status)} ${
                            updating === enquiry.id ? "opacity-50 cursor-not-allowed" : "hover:shadow-md"
                          }`}
                          style={{ fontWeight: '800' }}
                        >
                          {statusOptions.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                          ))}
                        </select>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between glass-card rounded-xl p-4">
              <div className="text-sm font-bold text-gray-700" style={{ fontWeight: '700' }}>
                Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredEnquiries.length)} of {filteredEnquiries.length} entries
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border-2 border-gray-400 rounded-lg font-bold text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-all"
                >
                  Previous
                </button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-4 py-2 rounded-lg font-bold transition-all ${
                        currentPage === page
                          ? "bg-[#C9A96E] text-white shadow-md"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border-2 border-gray-400 rounded-lg font-bold text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-all"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
