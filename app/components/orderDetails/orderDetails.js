// app/dashboard/orders/components/OrderDetails.jsx
"use client";

import {
  FiChevronRight,
  FiMapPin,
  FiTruck,
  FiCheckCircle,
  FiClock,
  FiXCircle,
} from "react-icons/fi";
import OrderTimeline from "@/app/components/orderTimeLine/orderTimeLine";

const OrderDetails = ({ order, onBack, onCancel }) => {
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
    <div className="p-4 md:p-6">
      {/* هدر */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={onBack}
          className="flex font-bold text-2xl cursor-pointer items-center gap-2 text-gray-600 hover:text-black transition-colors"
        >
          <FiChevronRight className="text-lg" />
          <span>بازگشت به لیست سفارشات</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* بخش اصلی */}
        <div className="lg:col-span-2 space-y-6">
          {/* اطلاعات سفارش */}
          <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg ${statusInfo.bg}`}>
                  <StatusIcon className={`text-xl ${statusInfo.color}`} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-black">{order.id}</h2>
                  <p className="text-gray-500">ثبت شده در {order.date}</p>
                </div>
              </div>
              <span
                className={`px-4 py-2 rounded-full font-medium ${statusInfo.bg} ${statusInfo.color}`}
              >
                {statusInfo.text}
              </span>
            </div>

            {/* جدول محصولات */}
            <div className="border-t border-gray-100 pt-6">
              <h3 className="font-semibold text-black mb-4">کالاهای سفارش</h3>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                      {/* تصویر محصول */}
                      <span className="text-gray-400 text-xs">تصویر</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-black">{item.name}</h4>
                      <p className="text-sm text-gray-500">
                        تعداد: {item.quantity}
                      </p>
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-black">
                        {formatPrice(item.price)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* خط زمانی سفارش */}
          <OrderTimeline status={order.status} />
        </div>

        {/* سایدبار */}
        <div className="space-y-6">
          {/* اطلاعات ارسال */}
          <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <FiMapPin className="text-gray-600" />
              <h3 className="font-semibold text-black">آدرس تحویل</h3>
            </div>
            <div className="space-y-2 text-sm">
              <p className="font-medium">{order.address.fullName}</p>
              <p className="text-gray-600">{order.address.phone}</p>
              <p className="text-gray-600">
                {order.address.province}، {order.address.city}
              </p>
              <p className="text-gray-600">{order.address.address}</p>
              <p className="text-gray-500">
                کد پستی: {order.address.postalCode}
              </p>
            </div>
          </div>

          {/* خلاصه پرداخت */}
          <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
            <h3 className="font-semibold text-black mb-4">خلاصه پرداخت</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">مبلغ کل کالاها:</span>
                <span>{formatPrice(order.total)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">هزینه ارسال:</span>
                <span>رایگان</span>
              </div>
              <div className="border-t border-gray-100 pt-3 flex justify-between font-semibold text-black">
                <span>مبلغ قابل پرداخت:</span>
                <span>{formatPrice(order.total)}</span>
              </div>
            </div>
          </div>

          {/* اقدامات */}
          <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
            <h3 className="font-semibold text-black mb-4">اقدامات</h3>
            <div className="space-y-3">
              {(order.status === "pending" || order.status === "confirmed") && (
                <button
                  onClick={() => onCancel(order)}
                  className="w-full py-3 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                >
                  لغو سفارش
                </button>
              )}

              {order.trackingCode && (
                <button className="w-full py-3 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors">
                  پیگیری مرسوله
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
