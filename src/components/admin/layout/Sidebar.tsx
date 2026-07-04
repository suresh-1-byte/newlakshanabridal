import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Calendar,
  Users,
  Image as ImageIcon,
  History,
  Settings,
  Crown,
  Sparkles,
  X,
} from "lucide-react";
import { useAuth } from "../../../contexts/FirebaseAuthContext";

interface SidebarProps {
  isOpen: boolean;
  mobileOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/admin/dashboard",
    color: "text-blue-600",
  },
  {
    name: "Bookings",
    icon: Calendar,
    path: "/admin/bookings",
    color: "text-green-600",
  },
  {
    name: "Booking History",
    icon: History,
    path: "/admin/booking-history",
    color: "text-purple-600",
  },
  {
    name: "Customers",
    icon: Users,
    path: "/admin/customers",
    color: "text-pink-600",
  },
  {
    name: "Gallery",
    icon: ImageIcon,
    path: "/admin/gallery",
    color: "text-orange-600",
  },
  {
    name: "Settings",
    icon: Settings,
    path: "/admin/settings",
    color: "text-gray-600",
  },
];

export default function Sidebar({ isOpen, mobileOpen, onClose }: SidebarProps) {
  const location = useLocation();
  const { adminData } = useAuth();

  const sidebarContent = (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-white/30">
        <Link to="/admin/dashboard" className="flex items-center gap-3">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-[#C9A96E] to-[#B8956A] shadow-lg">
            <Crown className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-serif font-bold text-gray-900">Lakshana</h1>
            <p className="text-xs text-gray-600 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#C9A96E]" />
              Admin Panel
            </p>
          </div>
        </Link>
        
        {/* Mobile Close Button */}
        <button
          onClick={onClose}
          className="lg:hidden text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Admin Profile */}
      <div className="p-6 border-b border-white/30">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#C9A96E] to-[#B8956A] flex items-center justify-center text-white font-bold text-lg shadow-md">
            {adminData?.fullName?.charAt(0) || "A"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">
              {adminData?.fullName || "Admin"}
            </p>
            <p className="text-xs text-gray-600 truncate">
              {adminData?.role || "Administrator"}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto custom-scrollbar">
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                to={item.path}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                  ${
                    isActive
                      ? "bg-gradient-to-r from-[#C9A96E]/20 to-[#B8956A]/10 border-l-4 border-[#C9A96E] shadow-md"
                      : "hover:bg-white/50 hover:shadow-sm"
                  }
                `}
              >
                <Icon
                  className={`w-5 h-5 ${isActive ? "text-[#C9A96E]" : item.color}`}
                />
                <span
                  className={`text-sm font-medium ${
                    isActive ? "text-gray-900" : "text-gray-700"
                  }`}
                >
                  {item.name}
                </span>
              </Link>
            </motion.div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/30">
        <div className="glass-card rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Crown className="w-4 h-4 text-[#C9A96E]" />
            <span className="text-xs font-semibold text-gray-900">Premium Admin</span>
          </div>
          <p className="text-xs text-gray-600">
            Version 2.0 • All features enabled
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`
          hidden lg:block fixed top-0 left-0 h-full z-30
          transition-all duration-300 ease-in-out
          ${isOpen ? "w-64" : "w-0"}
        `}
      >
        <div
          className={`
            h-full glass-card overflow-hidden
            ${isOpen ? "opacity-100" : "opacity-0"}
          `}
        >
          {sidebarContent}
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="lg:hidden fixed top-0 left-0 h-full w-64 z-50"
          >
            <div className="h-full glass-card shadow-2xl">
              {sidebarContent}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
