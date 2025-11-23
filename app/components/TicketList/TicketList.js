// app/components/TicketList/TicketList.js
import {
  FiMessageSquare,
  FiClock,
  FiCheckCircle,
  FiUser,
  FiEye,
  FiArchive,
  FiTrash2,
} from "react-icons/fi";

export default function TicketList({
  tickets,
  onViewDetails,
  onUpdateStatus,
  onArchiveTicket,
}) {
  const getStatusBadge = (status) => {
    const config = {
      open: {
        color: "bg-yellow-100 text-yellow-800 border-yellow-200",
        icon: FiClock,
        text: "باز",
      },
      answered: {
        color: "bg-green-100 text-green-800 border-green-200",
        icon: FiCheckCircle,
        text: "پاسخ داده شده",
      },
      customer_reply: {
        color: "bg-blue-100 text-blue-800 border-blue-200",
        icon: FiUser,
        text: "در انتظار پاسخ",
      },
      closed: {
        color: "bg-gray-100 text-gray-800 border-gray-200",
        text: "بسته شده",
      },
    }[status];

    const IconComponent = config.icon;

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit border ${config.color}`}
      >
        {IconComponent && <IconComponent size={12} />}
        {config.text}
      </span>
    );
  };

  const getPriorityBadge = (priority) => {
    const config = {
      low: { color: "bg-gray-100 text-gray-800", text: "کم" },
      medium: { color: "bg-blue-100 text-blue-800", text: "متوسط" },
      high: { color: "bg-orange-100 text-orange-800", text: "بالا" },
      urgent: { color: "bg-red-100 text-red-800", text: "فوری" },
    }[priority];

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}
      >
        {config.text}
      </span>
    );
  };

  const getCategoryText = (category) => {
    const categories = {
      technical: "فنی",
      financial: "مالی",
      sales: "فروش",
      general: "عمومی",
    };
    return categories[category];
  };

  if (tickets.length === 0) {
    return (
      <div className="text-center py-12">
        <FiMessageSquare className="mx-auto text-gray-400 mb-4" size={48} />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          تیکتی یافت نشد
        </h3>
        <p className="text-gray-500">
          هیچ تیکتی با فیلترهای انتخاب شده مطابقت ندارد.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-4 text-right text-sm font-medium text-gray-500 uppercase tracking-wider">
              اطلاعات تیکت
            </th>
            <th className="px-6 py-4 text-right text-sm font-medium text-gray-500 uppercase tracking-wider">
              مشتری
            </th>
            <th className="px-6 py-4 text-right text-sm font-medium text-gray-500 uppercase tracking-wider">
              دسته‌بندی
            </th>
            <th className="px-6 py-4 text-right text-sm font-medium text-gray-500 uppercase tracking-wider">
              اولویت
            </th>
            <th className="px-6 py-4 text-right text-sm font-medium text-gray-500 uppercase tracking-wider">
              وضعیت
            </th>
            <th className="px-6 py-4 text-right text-sm font-medium text-gray-500 uppercase tracking-wider">
              آخرین بروزرسانی
            </th>
            <th className="px-6 py-4 text-right text-sm font-medium text-gray-500 uppercase tracking-wider">
              عملیات
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {tickets.map((ticket) => (
            <tr
              key={ticket.id}
              className={`hover:bg-gray-50 transition-colors ${
                ticket.isArchived ? "bg-gray-50 opacity-75" : ""
              }`}
            >
              <td className="px-6 py-4">
                <div className="flex flex-col gap-2">
                  <div className="font-medium text-gray-900 flex items-center gap-2">
                    <FiMessageSquare size={16} className="text-gray-400" />
                    {ticket.ticketNumber}
                  </div>
                  <div className="text-sm text-gray-900 font-semibold">
                    {ticket.subject}
                  </div>
                  <div className="text-xs text-gray-500">
                    {ticket.createdAt}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex flex-col gap-1">
                  <div className="font-medium text-gray-900">
                    {ticket.customer.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {ticket.customer.phone}
                  </div>
                  <div className="text-xs text-gray-500 truncate max-w-[150px]">
                    {ticket.customer.email}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                  {getCategoryText(ticket.category)}
                </span>
              </td>
              <td className="px-6 py-4">{getPriorityBadge(ticket.priority)}</td>
              <td className="px-6 py-4">{getStatusBadge(ticket.status)}</td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-600">{ticket.updatedAt}</div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onViewDetails(ticket)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-blue-200"
                    title="مشاهده جزئیات"
                  >
                    <FiEye size={16} />
                  </button>
                  {!ticket.isArchived && (
                    <button
                      onClick={() => onArchiveTicket(ticket.id)}
                      className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors border border-gray-300"
                      title="بایگانی تیکت"
                    >
                      <FiArchive size={16} />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
