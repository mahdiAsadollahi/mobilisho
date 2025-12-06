// app/components/TicketModal/TicketModal.js
import { useState } from "react";
import { FiX, FiPaperclip, FiUser, FiSearch } from "react-icons/fi";

export default function TicketModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    subject: "",
    category: "general",
    priority: "medium",
    message: "",
    customer: null,
    attachments: [],
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [showCustomerSearch, setShowCustomerSearch] = useState(false);

  // نمونه کاربران برای جستجو
  const sampleCustomers = [
    {
      id: 1,
      name: "محمد احمدی",
      email: "m.ahmadi@example.com",
      phone: "09123456789",
    },
    {
      id: 2,
      name: "فاطمه زارعی",
      email: "f.zarei@example.com",
      phone: "09129876543",
    },
    {
      id: 3,
      name: "علی محمدی",
      email: "a.mohammadi@example.com",
      phone: "09121234567",
    },
  ];

  const filteredCustomers = sampleCustomers.filter(
    (customer) =>
      customer.name.includes(searchTerm) ||
      customer.email.includes(searchTerm) ||
      customer.phone.includes(searchTerm)
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.customer) {
      alert("لطفاً یک مشتری انتخاب کنید");
      return;
    }

    onSubmit({
      ...formData,
      customer: formData.customer,
    });

    // ریست فرم
    setFormData({
      subject: "",
      category: "general",
      priority: "medium",
      message: "",
      customer: null,
      attachments: [],
    });
    setSearchTerm("");
    setShowCustomerSearch(false);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({ ...prev, attachments: files }));
  };

  const removeAttachment = (index) => {
    setFormData((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index),
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* هدر */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white">
          <h2 className="text-xl font-bold text-gray-900">ایجاد تیکت جدید</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <FiX size={24} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-120px)]"
        >
          {/* انتخاب مشتری */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              انتخاب مشتری
            </label>
            {!formData.customer ? (
              <div className="space-y-3">
                <div className="relative">
                  <FiSearch
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() => setShowCustomerSearch(true)}
                    placeholder="جستجوی مشتری با نام، ایمیل یا تلفن..."
                    className="w-full p-4 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {showCustomerSearch && (
                  <div className="border border-gray-200 rounded-xl bg-white shadow-lg max-h-60 overflow-y-auto">
                    {filteredCustomers.map((customer) => (
                      <button
                        key={customer.id}
                        type="button"
                        onClick={() => {
                          setFormData((prev) => ({ ...prev, customer }));
                          setShowCustomerSearch(false);
                          setSearchTerm("");
                        }}
                        className="w-full p-4 text-right hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors"
                      >
                        <div className="font-medium text-gray-900">
                          {customer.name}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          {customer.email}
                        </div>
                        <div className="text-sm text-gray-600">
                          {customer.phone}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <div>
                  <div className="font-medium text-blue-900">
                    {formData.customer.name}
                  </div>
                  <div className="text-sm text-blue-700 mt-1">
                    {formData.customer.email}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, customer: null }))
                  }
                  className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                >
                  <FiX size={18} />
                </button>
              </div>
            )}
          </div>

          {/* موضوع */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              موضوع تیکت
            </label>
            <input
              type="text"
              required
              value={formData.subject}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, subject: e.target.value }))
              }
              className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="موضوع تیکت را وارد کنید..."
            />
          </div>

          {/* دسته‌بندی و اولویت */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                دسته‌بندی
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, category: e.target.value }))
                }
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="technical">فنی</option>
                <option value="financial">مالی</option>
                <option value="sales">فروش</option>
                <option value="general">عمومی</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                اولویت
              </label>
              <select
                value={formData.priority}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, priority: e.target.value }))
                }
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="low">کم</option>
                <option value="medium">متوسط</option>
                <option value="high">بالا</option>
                <option value="urgent">فوری</option>
              </select>
            </div>
          </div>

          {/* پیام */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              پیام
            </label>
            <textarea
              required
              rows={6}
              value={formData.message}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, message: e.target.value }))
              }
              className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="متن پیام خود را وارد کنید..."
            />
          </div>

          {/* فایل‌های پیوست */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              فایل‌های پیوست
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-gray-400 transition-colors">
              <FiPaperclip className="mx-auto text-gray-400 mb-3" size={28} />
              <p className="text-sm text-gray-600 mb-3">
                فایل‌ها را اینجا رها کنید یا برای آپلود کلیک کنید
              </p>
              <input
                type="file"
                multiple
                className="hidden"
                id="file-upload"
                onChange={handleFileSelect}
              />
              <label
                htmlFor="file-upload"
                className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 cursor-pointer inline-block font-medium"
              >
                انتخاب فایل
              </label>
            </div>
          </div>

          {/* لیست فایل‌های انتخاب شده */}
          {formData.attachments.length > 0 && (
            <div className="space-y-3">
              <p className="text-sm font-medium text-gray-700">
                فایل‌های انتخاب شده:
              </p>
              {formData.attachments.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gray-50 p-4 rounded-xl border border-gray-200"
                >
                  <div className="flex items-center gap-3">
                    <FiPaperclip className="text-gray-400" size={18} />
                    <span className="text-sm text-gray-600">{file.name}</span>
                    <span className="text-xs text-gray-500">
                      ({(file.size / 1024).toFixed(1)} KB)
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeAttachment(index)}
                    className="text-red-600 hover:text-red-800 transition-colors"
                  >
                    <FiX size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* دکمه‌های اقدام */}
          <div className="flex items-center gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 px-6 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
            >
              ایجاد تیکت
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-4 bg-gray-300 text-gray-700 rounded-xl hover:bg-gray-400 transition-all duration-200 font-medium"
            >
              انصراف
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
