import { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { Users, Search, Phone, Mail } from "lucide-react";
import { motion } from "framer-motion";
import EmptyState from "../../components/admin/common/EmptyState";
import LoadingSkeleton from "../../components/admin/common/LoadingSkeleton";

interface Customer {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  totalBookings: number;
  totalSpent: number;
  status: string;
  createdAt: any;
}

export default function CustomerManagement() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadCustomers();
  }, []);

  useEffect(() => {
    filterCustomers();
  }, [searchTerm, customers]);

  const loadCustomers = async () => {
    try {
      setLoading(true);
      const customersRef = collection(db, "customers");
      const q = query(customersRef, orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Customer[];

      setCustomers(data);
    } catch (error) {
      console.error("Error loading customers:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterCustomers = () => {
    if (!searchTerm) {
      setFilteredCustomers(customers);
      return;
    }

    const search = searchTerm.toLowerCase();
    const filtered = customers.filter(
      (c) =>
        c.fullName?.toLowerCase().includes(search) ||
        c.phone?.includes(search) ||
        c.email?.toLowerCase().includes(search)
    );
    setFilteredCustomers(filtered);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 bg-gray-200 rounded skeleton" />
        <LoadingSkeleton type="table" count={5} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-serif font-bold text-gray-900">
          Customer Management
        </h1>
        <p className="text-gray-600 mt-1">
          {filteredCustomers.length} of {customers.length} customers
        </p>
      </div>

      {/* Search */}
      <div className="glass-card rounded-2xl p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, phone, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#C9A96E] focus:border-transparent"
          />
        </div>
      </div>

      {/* Customers List */}
      {filteredCustomers.length === 0 ? (
        <div className="glass-card rounded-2xl">
          <EmptyState
            icon={Users}
            title="No customers found"
            description="Customers will appear here as bookings are made"
          />
        </div>
      ) : (
        <div className="glass-card rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200/50">
              <thead className="bg-gray-50/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                    Customer
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                    Contact
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                    Bookings
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                    Total Spent
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white/50 divide-y divide-gray-200/50">
                {filteredCustomers.map((customer, index) => (
                  <motion.tr
                    key={customer.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-white/80 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C9A96E] to-[#B8956A] flex items-center justify-center text-white font-bold">
                          {customer.fullName?.charAt(0) || "C"}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {customer.fullName}
                          </div>
                          <div className="text-xs text-gray-500">
                            Joined{" "}
                            {customer.createdAt?.toDate?.().toLocaleDateString() || "N/A"}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <Phone className="w-4 h-4 text-gray-400" />
                          {customer.phone}
                        </div>
                        {customer.email && (
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Mail className="w-4 h-4 text-gray-400" />
                            {customer.email}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {customer.totalBookings || 0} bookings
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ₹{(customer.totalSpent || 0).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`status-badge ${
                          customer.status === "active"
                            ? "status-confirmed"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {customer.status || "active"}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
