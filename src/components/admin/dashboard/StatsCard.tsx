import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  iconColor: string;
  iconBgColor: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  gradient?: boolean;
  delay?: number;
}

export default function StatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconColor,
  iconBgColor,
  trend,
  gradient = false,
  delay = 0,
}: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
      className={`
        ${
          gradient
            ? "bg-gradient-to-br from-[#C9A96E] to-[#B8956A] text-white"
            : "glass-card"
        }
        rounded-2xl p-6 shadow-soft hover:shadow-soft-lg transition-all duration-300
        hover-lift cursor-pointer
      `}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p
            className={`text-sm font-bold uppercase tracking-wide ${
              gradient ? "text-white/90" : "text-gray-700"
            }`}
          >
            {title}
          </p>
          <p
            className={`mt-2 text-5xl font-extrabold tracking-tight ${
              gradient ? "text-white drop-shadow-lg" : "text-gray-900"
            }`}
            style={{ fontWeight: '900' }}
          >
            {value}
          </p>
          {subtitle && (
            <p
              className={`mt-2 text-xs flex items-center gap-1 ${
                gradient ? "text-white/80" : "text-gray-500"
              }`}
            >
              {subtitle}
            </p>
          )}
          {trend && (
            <div className="mt-3 flex items-center gap-2">
              <span
                className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                  trend.isPositive
                    ? gradient
                      ? "bg-white/20 text-white"
                      : "bg-green-100 text-green-800"
                    : gradient
                    ? "bg-white/20 text-white"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {trend.isPositive ? "↑" : "↓"} {trend.value}
              </span>
              <span
                className={`text-xs ${
                  gradient ? "text-white/70" : "text-gray-500"
                }`}
              >
                vs last month
              </span>
            </div>
          )}
        </div>
        <div
          className={`rounded-full ${
            gradient ? "bg-white/20 backdrop-blur-sm" : iconBgColor
          } p-4 shadow-inner`}
        >
          <Icon
            className={`w-8 h-8 ${gradient ? "text-white" : iconColor}`}
          />
        </div>
      </div>
    </motion.div>
  );
}
