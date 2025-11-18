// app/dashboard/orders/components/CancelOrderModal.jsx
import { useState } from "react";
import { FiX, FiAlertTriangle } from "react-icons/fi";

const CancelOrderModal = ({ isOpen, onClose, onConfirm, order }) => {
  const [reason, setReason] = useState("");
  const [otherReason, setOtherReason] = useState("");

  const cancelReasons = [
    "تغییر تصمیم برای خرید",
    "یافتن قیمت بهتر در جای دیگر",
    "تغییر آدرس تحویل",
    "مشکل در روش پرداخت",
    "سایر",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalReason = reason === "سایر" ? otherReason : reason;
    onConfirm(finalReason);
    setReason("");
    setOtherReason("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        {/* هدر */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <FiAlertTriangle className="text-red-600 text-lg" />
            </div>
            <h3 className="text-lg font-semibold text-black">لغو سفارش</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FiX className="text-lg" />
          </button>
        </div>

        {/* بدنه */}
        <form onSubmit={handleSubmit} className="p-6">
          <p className="text-gray-600 mb-2">سفارش: {order?.id}</p>
          <p className="text-gray-600 mb-6">
            لطفاً دلیل لغو سفارش خود را انتخاب کنید:
          </p>

          <div className="space-y-3 mb-6">
            {cancelReasons.map((cancelReason) => (
              <label
                key={cancelReason}
                className="flex items-center gap-3 cursor-pointer"
              >
                <input
                  type="radio"
                  name="cancelReason"
                  value={cancelReason}
                  checked={reason === cancelReason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-4 h-4 text-red-600 focus:ring-red-500"
                />
                <span className="text-gray-700">{cancelReason}</span>
              </label>
            ))}
          </div>

          {reason === "سایر" && (
            <div className="mb-6">
              <textarea
                value={otherReason}
                onChange={(e) => setOtherReason(e.target.value)}
                placeholder="لطفاً دلیل خود را توضیح دهید..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                rows="3"
                required
              />
            </div>
          )}

          {/* دکمه‌ها */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
            >
              انصراف
            </button>
            <button
              type="submit"
              disabled={!reason || (reason === "سایر" && !otherReason)}
              className="flex-1 py-3 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              تایید لغو سفارش
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CancelOrderModal;
