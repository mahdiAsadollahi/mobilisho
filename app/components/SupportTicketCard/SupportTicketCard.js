// app/dashboard/support/components/SupportTicketCard.jsx
import {
  FiChevronLeft,
  FiMessageCircle,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiAlertTriangle,
  FiUser,
} from "react-icons/fi";

const SupportTicketCard = ({ ticket, onSelect }) => {
  const getStatusInfo = (status) => {
    switch (status) {
      case "open":
        return {
          text: "باز",
          color: "text-yellow-600",
          bg: "bg-yellow-100",
          icon: FiClock,
        };
      case "answered":
        return {
          text: "پاسخ داده شده",
          color: "text-blue-600",
          bg: "bg-blue-100",
          icon: FiMessageCircle,
        };
      case "closed":
        return {
          text: "بسته شده",
          color: "text-green-600",
          bg: "bg-green-100",
          icon: FiCheckCircle,
        };
      default:
        return {
          text: "نامشخص",
          color: "text-gray-600",
          bg: "bg-gray-100",
          icon: FiMessageCircle,
        };
    }
  };

  const getPriorityInfo = (priority) => {
    switch (priority) {
      case "high":
        return {
          text: "بالا",
          color: "text-red-600",
          bg: "bg-red-100",
          icon: FiAlertTriangle,
        };
      case "medium":
        return {
          text: "متوسط",
          color: "text-orange-600",
          bg: "bg-orange-100",
          icon: FiAlertTriangle,
        };
      case "low":
        return {
          text: "پایین",
          color: "text-green-600",
          bg: "bg-green-100",
          icon: FiAlertTriangle,
        };
      default:
        return {
          text: "نامشخص",
          color: "text-gray-600",
          bg: "bg-gray-100",
          icon: FiAlertTriangle,
        };
    }
  };

  const statusInfo = getStatusInfo(ticket.status);
  const priorityInfo = getPriorityInfo(ticket.priority);
  const StatusIcon = statusInfo.icon;
  const PriorityIcon = priorityInfo.icon;

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-4">
        {/* هدر کارت */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${statusInfo.bg}`}>
              <StatusIcon className={`text-base ${statusInfo.color}`} />
            </div>
            <div>
              <h3 className="font-semibold text-black text-sm">
                {ticket.subject}
              </h3>
              <p className="text-xs text-gray-500">
                {ticket.id} • {ticket.createdAt}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${statusInfo.bg} ${statusInfo.color}`}
            >
              {statusInfo.text}
            </span>
            <button
              onClick={() => onSelect(ticket)}
              className="flex items-center gap-1 text-blue-600 hover:text-blue-700 transition-colors text-xs"
            >
              <span>مشاهده</span>
              <FiChevronLeft className="text-sm" />
            </button>
          </div>
        </div>

        {/* اطلاعات تیکت */}
        <div className="border-t border-gray-100 pt-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1">
                <PriorityIcon className={`text-xs ${priorityInfo.color}`} />
                <span className={priorityInfo.color}>
                  اولویت: {priorityInfo.text}
                </span>
              </div>

              <div className="flex items-center gap-1 text-gray-500">
                <FiMessageCircle className="text-xs" />
                <span>{ticket.messages.length} پیام</span>
              </div>

              <span className="text-gray-500">
                آخرین بروزرسانی: {ticket.lastUpdate}
              </span>
            </div>

            {/* پیش‌نمایش آخرین پیام */}
            <div className="text-xs text-gray-600 bg-gray-50 px-3 py-2 rounded-lg flex-1 min-w-0">
              <span className="truncate">
                {ticket.messages[ticket.messages.length - 1]?.message}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportTicketCard;
