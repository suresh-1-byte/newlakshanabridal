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
        <h1 className="text-4xl font-serif font-extrabold text-gray-900" style={{ fontWeight: '900' }}>
          Customer Management
        </h1>
        <p className="text-gray-800 mt-2 font-bold text-lg" style={{ fontWeight: '700' }}>
          {filteredCustomers.length} of {customers.length} customers
        </p>
      </div>

      {/* Search */}
      <div className="glass-card rounded-2xl p-6 shadow-lg">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-600" />
          <input
            type="text"
            placeholder="Search by name, phone, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 border-2 border-gray-400 rounded-xl focus:ring-2 focus:ring-[#C9A96E] focus:border-[#C9A96E] text-base font-bold text-gray-900 placeholder-gray-600"
            style={{ fontSize: '16px', fontWeight: '700' }}
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
              <thead className="bg-gradient-to-r from-gray-100 to-gray-50">
                <tr>
                  <th className="px-6 py-5 text-left text-sm font-extrabold text-gray-900 uppercase tracking-wider" style={{ fontWeight: '900' }}>
                    Customer
                  </th>
                  <th className="px-6 py-5 text-left text-sm font-extrabold text-gray-900 uppercase tracking-wider" style={{ fontWeight: '900' }}>
                    Contact
                  </th>
                  <th className="px-6 py-5 text-left text-sm font-extrabold text-gray-900 uppercase tracking-wider" style={{ fontWeight: '900' }}>
                    Bookings
                  </th>
                  <th className="px-6 py-5 text-left text-sm font-extrabold text-gray-900 uppercase tracking-wider" style={{ fontWeight: '900' }}>
                    Total Spent
                  </th>
                  <th className="px-6 py-5 text-left text-sm font-extrabold text-gray-900 uppercase tracking-wider" style={{ fontWeight: '900' }}>
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
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#C9A96E] to-[#B8956A] flex items-center justify-center text-white font-extrabold text-xl shadow-md" style={{ fontWeight: '900' }}>
                          {customer.fullName?.charAt(0) || "C"}
                        </div>
                        <div>
                          <div className="text-base font-extrabold text-gray-900" style={{ fontSize: '16px', fontWeight: '800' }}>
                            {customer.fullName}
                          </div>
                          <div className="text-sm font-bold text-gray-700 mt-1" style={{ fontWeight: '700' }}>
                            Joined{" "}
                            {customer.createdAt?.toDate?.().toLocaleDateString('en-IN') || "N/A"}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-base font-bold text-gray-900" style={{ fontSize: '15px', fontWeight: '800' }}>
                          <Phone className="w-5 h-5 text-gray-700" />
                          {customer.phone}
                        </div>
                        {customer.email && (
                          <div className="flex items-center gap-2 text-sm font-bold text-gray-700" style={{ fontWeight: '700' }}>
                            <Mail className="w-4 h-4 text-gray-600" />
                            {customer.email}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-base font-extrabold text-gray-900" style={{ fontSize: '16px', fontWeight: '800' }}>
                      {customer.totalBookings || 0} bookings
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-lg font-extrabold text-gray-900" style={{ fontSize: '17px', fontWeight: '900' }}>
                      ₹{(customer.totalSpent || 0).toLocaleString('en-IN')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`status-badge px-4 py-2 text-sm font-extrabold ${
                          customer.status === "active"
                            ? "status-confirmed"
                            : "bg-gray-100 text-gray-800"
                        }`}
                        style={{ fontWeight: '800' }}
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
