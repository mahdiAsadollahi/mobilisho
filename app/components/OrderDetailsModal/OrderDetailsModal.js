// app/components/OrderDetailsModal/OrderDetailsModal.js
"use client";
import {
  FiX,
  FiUser,
  FiPhone,
  FiMail,
  FiMapPin,
  FiCalendar,
  FiPackage,
  FiTruck,
  FiCreditCard,
  FiBox,
  FiDollarSign,
} from "react-icons/fi";

export default function OrderDetailsModal({ isOpen, onClose, order }) {
  const handleClose = (e) => {
    e?.stopPropagation();
    onClose();
  };

  if (!isOpen || !order) return null;

  const statusConfig = {
    pending: {
      color: "bg-yellow-100 text-yellow-800",
      text: "در انتظار تایید",
      icon: FiPackage,
    },
    confirmed: {
      color: "bg-blue-100 text-blue-800",
      text: "تایید شده",
      icon: FiPackage,
    },
    shipped: {
      color: "bg-purple-100 text-purple-800",
      text: "ارسال شده",
      icon: FiTruck,
    },
    delivered: {
      color: "bg-green-100 text-green-800",
      text: "تحویل شده",
      icon: FiBox,
    },
    cancelled: { color: "bg-red-100 text-red-800", text: "لغو شده", icon: FiX },
  };

  const paymentMethodConfig = {
    online: { text: "پرداخت آنلاین", color: "bg-green-100 text-green-800" },
    cash: { text: "پرداخت در محل", color: "bg-orange-100 text-orange-800" },
    bank: { text: "کارت به کارت", color: "bg-blue-100 text-blue-800" },
  };

  const status = statusConfig[order.status];
  const paymentMethod = paymentMethodConfig[order.paymentMethod];
  const StatusIcon = status.icon;

  const TimelineItem = ({ icon: Icon, label, date, time, isActive }) => (
    <div
      className={`flex items-center gap-3 p-3 rounded-lg ${
        isActive ? "bg-blue-50 border border-blue-200" : "bg-gray-50"
      }`}
    >
      <div
        className={`p-2 rounded-full ${
          isActive ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-400"
        }`}
      >
        <Icon size={16} />
      </div>
      <div className="flex-1">
        <div className="font-medium text-sm text-gray-800">{label}</div>
        {date && time && (
          <div className="text-xs text-gray-500">
            {date} - {time}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-xl shadow-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">
            جزئیات سفارش #{order.orderNumber}
          </h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FiX size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Header Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                <FiPackage size={18} />
                اطلاعات سفارش
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">شماره سفارش:</span>
                  <span className="font-medium">{order.orderNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">کد فاکتور:</span>
                  <span className="font-medium">{order.invoiceCode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">تاریخ ثبت:</span>
                  <span className="font-medium">
                    {order.createdAt} - {order.createdTime}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">آخرین بروزرسانی:</span>
                  <span className="font-medium">{order.updatedAt}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">وضعیت:</span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${status.color}`}
                  >
                    <StatusIcon size={14} />
                    {status.text}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                <FiDollarSign size={18} />
                اطلاعات مالی
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">مبلغ کل:</span>
                  <span className="font-medium">
                    {order.totalAmount.toLocaleString()} تومان
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">هزینه ارسال:</span>
                  <span className="font-medium">
                    {order.shippingCost.toLocaleString()} تومان
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">تخفیف:</span>
                  <span className="font-medium text-red-600">
                    -{order.discount.toLocaleString()} تومان
                  </span>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-2">
                  <span className="text-gray-800 font-medium">مبلغ نهایی:</span>
                  <span className="font-bold text-lg text-green-600">
                    {order.finalAmount.toLocaleString()} تومان
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                <FiCreditCard size={18} />
                اطلاعات پرداخت
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">روش پرداخت:</span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${paymentMethod.color}`}
                  >
                    {paymentMethod.text}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">وضعیت پرداخت:</span>
                  <span
                    className={`font-medium ${
                      order.paymentStatus === "paid"
                        ? "text-green-600"
                        : order.paymentStatus === "pending"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {order.paymentStatus === "paid"
                      ? "پرداخت شده"
                      : order.paymentStatus === "pending"
                      ? "در انتظار پرداخت"
                      : order.paymentStatus === "refunded"
                      ? "عودت داده شده"
                      : "ناموفق"}
                  </span>
                </div>
                {order.shipping.trackingCode && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">کد رهگیری:</span>
                    <span className="font-medium">
                      {order.shipping.trackingCode}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium text-gray-700 mb-4 flex items-center gap-2">
              <FiCalendar size={18} />
              زمان‌بندی سفارش
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              <TimelineItem
                icon={FiPackage}
                label="ثبت سفارش"
                date={order.timeline.created.date}
                time={order.timeline.created.time}
                isActive={true}
              />
              <TimelineItem
                icon={FiPackage}
                label="تایید سفارش"
                date={order.timeline.confirmed?.date}
                time={order.timeline.confirmed?.time}
                isActive={!!order.timeline.confirmed}
              />
              <TimelineItem
                icon={FiTruck}
                label="ارسال شده"
                date={order.timeline.shipped?.date}
                time={order.timeline.shipped?.time}
                isActive={!!order.timeline.shipped}
              />
              <TimelineItem
                icon={FiBox}
                label="تحویل شده"
                date={order.timeline.delivered?.date}
                time={order.timeline.delivered?.time}
                isActive={!!order.timeline.delivered}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Customer Information */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                <FiUser size={18} />
                اطلاعات مشتری
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <FiUser className="text-gray-400" size={16} />
                  <div>
                    <div className="font-medium text-gray-800">
                      {order.customer.name}
                    </div>
                    <div className="text-sm text-gray-600">نام کامل</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FiPhone className="text-gray-400" size={16} />
                  <div>
                    <div className="font-medium text-gray-800">
                      {order.customer.phone}
                    </div>
                    <div className="text-sm text-gray-600">تلفن همراه</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FiMail className="text-gray-400" size={16} />
                  <div>
                    <div className="font-medium text-gray-800">
                      {order.customer.email}
                    </div>
                    <div className="text-sm text-gray-600">ایمیل</div>
                  </div>
                </div>
                {order.customer.postalCode && (
                  <div className="flex items-center gap-3">
                    <FiMapPin className="text-gray-400" size={16} />
                    <div>
                      <div className="font-medium text-gray-800">
                        {order.customer.postalCode}
                      </div>
                      <div className="text-sm text-gray-600">کد پستی</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Shipping Information */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                <FiTruck size={18} />
                اطلاعات ارسال
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <FiMapPin className="text-gray-400 mt-1" size={16} />
                  <div>
                    <div className="font-medium text-gray-800">آدرس تحویل</div>
                    <div className="text-sm text-gray-600 mt-1">
                      {order.customer.address}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FiTruck className="text-gray-400" size={16} />
                  <div>
                    <div className="font-medium text-gray-800">
                      {order.shipping.method === "express"
                        ? "پیک موتوری"
                        : order.shipping.method === "free"
                        ? "ارسال رایگان"
                        : "پست پیشتاز"}
                    </div>
                    <div className="text-sm text-gray-600">روش ارسال</div>
                  </div>
                </div>
                {order.shipping.estimatedDelivery && (
                  <div className="flex items-center gap-3">
                    <FiCalendar className="text-gray-400" size={16} />
                    <div>
                      <div className="font-medium text-gray-800">
                        {order.shipping.estimatedDelivery}
                      </div>
                      <div className="text-sm text-gray-600">
                        تاریخ تحویل预估
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium text-gray-700 mb-4">
              محصولات سفارش ({order.items.length} قلم)
            </h3>
            <div className="space-y-3">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 bg-white rounded-lg border"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FiPackage className="text-blue-600" size={20} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800">{item.name}</h4>
                      {item.variants &&
                        Object.keys(item.variants).length > 0 && (
                          <div className="flex items-center gap-2 mt-1">
                            {Object.entries(item.variants).map(
                              ([key, value]) => (
                                <span
                                  key={key}
                                  className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                                >
                                  {key}: {value}
                                </span>
                              )
                            )}
                          </div>
                        )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-800">
                      {item.quantity} عدد
                    </p>
                    <p className="text-sm text-gray-600">
                      {item.price.toLocaleString()} تومان
                    </p>
                    <p className="font-medium text-green-600 mt-1">
                      {(item.price * item.quantity).toLocaleString()} تومان
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notes */}
          {order.notes && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-700 mb-2">یادداشت‌ها</h3>
              <p className="text-sm text-gray-600 bg-white p-3 rounded-lg border">
                {order.notes}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
