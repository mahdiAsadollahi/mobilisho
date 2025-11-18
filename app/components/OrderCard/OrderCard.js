// app/dashboard/orders/components/OrderCard.jsx
import {
  FiChevronLeft,
  FiTruck,
  FiCheckCircle,
  FiClock,
  FiXCircle,
} from "react-icons/fi";

const OrderCard = ({ order, onSelect, onCancel }) => {
  const getStatusInfo = (status) => {
    switch (status) {
      case "pending":
        return {
          text: "در انتظار تایید",
          color: "text-yellow-600",
          bg: "bg-yellow-100",
          icon: FiClock,
        };
      case "confirmed":
        return {
          text: "تایید شده",
          color: "text-blue-600",
          bg: "bg-blue-100",
          icon: FiCheckCircle,
        };
      case "shipping":
        return {
          text: "در حال ارسال",
          color: "text-purple-600",
          bg: "bg-purple-100",
          icon: FiTruck,
        };
      case "delivered":
        return {
          text: "تحویل شده",
          color: "text-green-600",
          bg: "bg-green-100",
          icon: FiCheckCircle,
        };
      case "cancelled":
        return {
          text: "لغو شده",
          color: "text-red-600",
          bg: "bg-red-100",
          icon: FiXCircle,
        };
      default:
        return {
          text: "نامشخص",
          color: "text-gray-600",
          bg: "bg-gray-100",
          icon: FiClock,
        };
    }
  };

  const statusInfo = getStatusInfo(order.status);
  const StatusIcon = statusInfo.icon;

  const formatPrice = (price) => {
    return new Intl.NumberFormat("fa-IR").format(price) + " تومان";
  };

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-4">
        {/* هدر کارت - کامپکت‌تر */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div className={`p-1.5 rounded-lg ${statusInfo.bg}`}>
              <StatusIcon className={`text-base ${statusInfo.color}`} />
            </div>
            <div>
              <h3 className="font-semibold text-black text-sm">{order.id}</h3>
              <p className="text-xs text-gray-500">{order.date}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${statusInfo.bg} ${statusInfo.color}`}
            >
              {statusInfo.text}
            </span>
            <button
              onClick={() => onSelect(order)}
              className="flex items-center gap-1 text-blue-600 hover:text-blue-700 transition-colors text-xs"
            >
              <span>جزئیات</span>
              <FiChevronLeft className="text-sm" />
            </button>
          </div>
        </div>

        {/* اطلاعات محصولات - کامپکت‌تر */}
        <div className="border-t border-gray-100 pt-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-xs text-gray-600 mb-1">
                {order.itemsCount} کالا
              </p>
              <div className="flex flex-wrap items-center gap-1">
                {order.items.slice(0, 2).map((item, index) => (
                  <span
                    key={index}
                    className="text-xs text-gray-700 bg-gray-50 px-2 py-1 rounded"
                  >
                    {item.name}
                  </span>
                ))}
                {order.items.length > 2 && (
                  <span className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded">
                    +{order.items.length - 2} کالا
                  </span>
                )}
              </div>
            </div>
            <div className="text-left ml-2">
              <p className="font-semibold text-black text-sm">
                {formatPrice(order.total)}
              </p>
            </div>
          </div>

          {/* دکمه‌های اقدام - کامپکت‌تر */}
          <div className="flex flex-wrap gap-2 mt-3">
            {(order.status === "pending" || order.status !== "confirmed") && (
              <button
                onClick={() => onCancel(order)}
                className="px-3 py-1.5 text-xs border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
              >
                لغو سفارش
              </button>
            )}

            {order.trackingCode && (
              <button className="px-3 py-1.5 text-xs border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors">
                پیگیری
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
