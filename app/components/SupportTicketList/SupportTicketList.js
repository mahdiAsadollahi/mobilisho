// app/dashboard/support/components/SupportTicketList.jsx
import SupportTicketCard from "@/app/components/SupportTicketCard/SupportTicketCard";
import { FiMessageCircle } from "react-icons/fi";

const SupportTicketList = ({ tickets, onTicketSelect }) => {
  if (tickets.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow border border-gray-200 p-8 text-center">
        <div className="text-gray-400 text-6xl mb-4">
          <FiMessageCircle className="inline-block" />
        </div>
        <h3 className="text-lg font-semibold text-gray-600 mb-2">
          تیکتی یافت نشد
        </h3>
        <p className="text-gray-500">شما هنوز هیچ تیکتی ایجاد نکرده‌اید.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tickets.map((ticket) => (
        <SupportTicketCard
          key={ticket.id}
          ticket={ticket}
          onSelect={onTicketSelect}
        />
      ))}
    </div>
  );
};

export default SupportTicketList;
