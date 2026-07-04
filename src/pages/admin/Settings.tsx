import { useState } from "react";
import { useAuth } from "../../contexts/FirebaseAuthContext";
import { Settings as SettingsIcon, User, Bell, Lock, Palette, Save } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

export default function Settings() {
  const { adminData } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [saving, setSaving] = useState(false);

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Lock },
    { id: "appearance", label: "Appearance", icon: Palette },
  ];

  const handleSave = async () => {
    setSaving(true);
    // Simulate save
    setTimeout(() => {
      toast.success("Settings saved successfully!");
      setSaving(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-serif font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Manage your admin preferences</p>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Tabs Sidebar */}
        <div className="glass-card rounded-2xl p-4">
          <nav className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                    ${
                      activeTab === tab.id
                        ? "bg-gradient-to-r from-[#C9A96E]/20 to-[#B8956A]/10 border-l-4 border-[#C9A96E]"
                        : "hover:bg-white/50"
                    }
                  `}
                >
                  <Icon
                    className={`w-5 h-5 ${
                      activeTab === tab.id ? "text-[#C9A96E]" : "text-gray-600"
                    }`}
                  />
                  <span
                    className={`text-sm font-medium ${
                      activeTab === tab.id ? "text-gray-900" : "text-gray-700"
                    }`}
                  >
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="lg:col-span-3 glass-card rounded-2xl p-6">
          {activeTab === "profile" && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-1">
                  Profile Settings
                </h2>
                <p className="text-sm text-gray-600">
                  Update your personal information
                </p>
              </div>

              {/* Profile Picture */}
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#C9A96E] to-[#B8956A] flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                  {adminData?.fullName?.charAt(0) || "A"}
                </div>
                <div>
                  <button className="btn-gold px-4 py-2 text-sm">
                    Change Photo
                  </button>
                  <p className="text-xs text-gray-500 mt-1">
                    JPG, PNG or GIF. Max 2MB
                  </p>
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    defaultValue={adminData?.fullName}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#C9A96E] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    defaultValue={adminData?.email}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#C9A96E] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    defaultValue={adminData?.phone}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#C9A96E] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Role
                  </label>
                  <input
                    type="text"
                    defaultValue={adminData?.role || "Administrator"}
                    disabled
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl bg-gray-50 text-gray-500"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="btn-gold inline-flex items-center gap-2 disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </motion.div>
          )}

          {activeTab === "notifications" && (
            <motion.div
              key="notifications"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-1">
                  Notification Settings
                </h2>
                <p className="text-sm text-gray-600">
                  Manage how you receive notifications
                </p>
              </div>

              <div className="space-y-4">
                <label className="flex items-center justify-between p-4 bg-white/50 rounded-xl">
                  <div>
                    <p className="font-medium text-gray-900">New Bookings</p>
                    <p className="text-sm text-gray-600">
                      Get notified when a new booking is made
                    </p>
                  </div>
                  <input type="checkbox" defaultChecked className="toggle" />
                </label>

                <label className="flex items-center justify-between p-4 bg-white/50 rounded-xl">
                  <div>
                    <p className="font-medium text-gray-900">Payment Received</p>
                    <p className="text-sm text-gray-600">
                      Notification when payment is confirmed
                    </p>
                  </div>
                  <input type="checkbox" defaultChecked className="toggle" />
                </label>

                <label className="flex items-center justify-between p-4 bg-white/50 rounded-xl">
                  <div>
                    <p className="font-medium text-gray-900">
                      Booking Cancellations
                    </p>
                    <p className="text-sm text-gray-600">
                      Alert when a booking is cancelled
                    </p>
                  </div>
                  <input type="checkbox" defaultChecked className="toggle" />
                </label>
              </div>
            </motion.div>
          )}

          {activeTab === "security" && (
            <motion.div
              key="security"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-1">
                  Security Settings
                </h2>
                <p className="text-sm text-gray-600">
                  Manage your password and security preferences
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Password
                  </label>
                  <input
                    type="password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#C9A96E] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#C9A96E] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#C9A96E] focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button className="btn-gold">Update Password</button>
              </div>
            </motion.div>
          )}

          {activeTab === "appearance" && (
            <motion.div
              key="appearance"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-1">
                  Appearance Settings
                </h2>
                <p className="text-sm text-gray-600">
                  Customize the look and feel
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Theme
                  </label>
                  <div className="grid grid-cols-3 gap-4">
                    <button className="p-4 border-2 border-[#C9A96E] rounded-xl bg-white">
                      <div className="w-full h-16 bg-gradient-to-br from-[#FAF9F6] to-white rounded mb-2" />
                      <p className="text-sm font-medium">Light</p>
                    </button>
                    <button className="p-4 border-2 border-gray-300 rounded-xl bg-white hover:border-[#C9A96E]">
                      <div className="w-full h-16 bg-gray-900 rounded mb-2" />
                      <p className="text-sm font-medium">Dark</p>
                    </button>
                    <button className="p-4 border-2 border-gray-300 rounded-xl bg-white hover:border-[#C9A96E]">
                      <div className="w-full h-16 bg-gradient-to-br from-gray-900 to-gray-700 rounded mb-2" />
                      <p className="text-sm font-medium">Auto</p>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
