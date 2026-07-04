import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  Search,
  Bell,
  User,
  LogOut,
  Settings,
  Home,
  ChevronDown,
} from "lucide-react";
import { useAuth } from "../../../contexts/FirebaseAuthContext";

interface TopBarProps {
  onMenuClick: () => void;
}

export default function TopBar({ onMenuClick }: TopBarProps) {
  const { adminData, signOut } = useAuth();
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSignOut = async () => {
    await signOut();
    navigate("/admin/login");
  };

  const notifications = [
    {
      id: 1,
      title: "New Booking",
      message: "You have a new booking request",
      time: "5 minutes ago",
      unread: true,
    },
    {
      id: 2,
      title: "Payment Received",
      message: "Payment of ₹15,000 received",
      time: "1 hour ago",
      unread: true,
    },
    {
      id: 3,
      title: "Booking Confirmed",
      message: "Booking #BK12345 has been confirmed",
      time: "3 hours ago",
      unread: false,
    },
  ];

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <header className="sticky top-0 z-20 glass-card shadow-soft">
      <div className="flex items-center justify-between px-4 md:px-6 py-4">
        {/* Left Section */}
        <div className="flex items-center gap-4 flex-1">
          {/* Menu Button */}
          <button
            onClick={onMenuClick}
            className="p-2 rounded-lg hover:bg-white/50 transition-colors"
          >
            <Menu className="w-6 h-6 text-gray-700" />
          </button>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search bookings, customers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/50 border border-white/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A96E] focus:border-transparent transition-all"
              />
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Home Button */}
          <Link
            to="/"
            className="p-2 rounded-lg hover:bg-white/50 transition-colors hidden md:block"
            title="View Website"
          >
            <Home className="w-5 h-5 text-gray-700" />
          </Link>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-lg hover:bg-white/50 transition-colors relative"
            >
              <Bell className="w-5 h-5 text-gray-700" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            <AnimatePresence>
              {showNotifications && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowNotifications(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-80 glass-card rounded-xl shadow-xl z-20"
                  >
                    <div className="p-4 border-b border-white/30">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900">
                          Notifications
                        </h3>
                        {unreadCount > 0 && (
                          <span className="text-xs text-[#C9A96E] font-medium">
                            {unreadCount} new
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="max-h-96 overflow-y-auto custom-scrollbar">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-4 border-b border-white/30 hover:bg-white/30 transition-colors cursor-pointer ${
                            notification.unread ? "bg-[#C9A96E]/5" : ""
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className={`w-2 h-2 rounded-full mt-2 ${
                                notification.unread
                                  ? "bg-[#C9A96E]"
                                  : "bg-gray-300"
                              }`}
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {notification.title}
                              </p>
                              <p className="text-xs text-gray-600 mt-1">
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-400 mt-1">
                                {notification.time}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 text-center border-t border-white/30">
                      <button className="text-sm text-[#C9A96E] hover:text-[#B8956A] font-medium">
                        View all notifications
                      </button>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Profile Menu */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 md:gap-3 p-2 rounded-lg hover:bg-white/50 transition-colors"
            >
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-[#C9A96E] to-[#B8956A] flex items-center justify-center text-white font-bold text-sm shadow-md">
                {adminData?.fullName?.charAt(0) || "A"}
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-semibold text-gray-900">
                  {adminData?.fullName || "Admin"}
                </p>
                <p className="text-xs text-gray-600">
                  {adminData?.role || "Administrator"}
                </p>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-600 hidden md:block" />
            </button>

            {/* Profile Dropdown */}
            <AnimatePresence>
              {showProfileMenu && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowProfileMenu(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-56 glass-card rounded-xl shadow-xl z-20"
                  >
                    <div className="p-4 border-b border-white/30">
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {adminData?.fullName || "Admin"}
                      </p>
                      <p className="text-xs text-gray-600 truncate">
                        {adminData?.email || "admin@lakshana.com"}
                      </p>
                    </div>
                    <div className="p-2">
                      <Link
                        to="/admin/settings"
                        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/50 transition-colors"
                        onClick={() => setShowProfileMenu(false)}
                      >
                        <User className="w-4 h-4 text-gray-600" />
                        <span className="text-sm text-gray-700">Profile</span>
                      </Link>
                      <Link
                        to="/admin/settings"
                        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/50 transition-colors"
                        onClick={() => setShowProfileMenu(false)}
                      >
                        <Settings className="w-4 h-4 text-gray-600" />
                        <span className="text-sm text-gray-700">Settings</span>
                      </Link>
                    </div>
                    <div className="p-2 border-t border-white/30">
                      <button
                        onClick={handleSignOut}
                        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors w-full text-left"
                      >
                        <LogOut className="w-4 h-4 text-red-600" />
                        <span className="text-sm text-red-600 font-medium">
                          Sign Out
                        </span>
                      </button>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden px-4 pb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/50 border border-white/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A96E] focus:border-transparent transition-all"
          />
        </div>
      </div>
    </header>
  );
}
