// app/admin/support/components/SupportStats.js
import {
  FiMessageSquare,
  FiClock,
  FiCheckCircle,
  FiAlertTriangle,
  FiUsers,
} from "react-icons/fi";

export default function SupportStats({ tickets }) {
  const stats = [
    {
      label: "کل تیکت‌ها",
      value: tickets.length,
      icon: FiMessageSquare,
      color: "blue",
    },
    {
      label: "در انتظار پاسخ",
      value: tickets.filter((t) => t.status === "open").length,
      icon: FiClock,
      color: "yellow",
    },
    {
      label: "پاسخ داده شده",
      value: tickets.filter((t) => t.status === "answered").length,
      icon: FiCheckCircle,
      color: "green",
    },
    {
      label: "اولویت بالا",
      value: tickets.filter((t) => t.priority === "high").length,
      icon: FiAlertTriangle,
      color: "red",
    },
  ];

  const colorClasses = {
    blue: "bg-blue-100 text-blue-600",
    yellow: "bg-yellow-100 text-yellow-600",
    green: "bg-green-100 text-green-600",
    red: "bg-red-100 text-red-600",
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-xl shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            </div>
            <div className={`p-3 rounded-lg ${colorClasses[stat.color]}`}>
              <stat.icon size={24} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
