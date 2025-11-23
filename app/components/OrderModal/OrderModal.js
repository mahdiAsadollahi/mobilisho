// app/components/OrderModal/OrderModal.js
"use client";
import { useState, useEffect } from "react";
import { FiX, FiPlus, FiTrash2 } from "react-icons/fi";

export default function OrderModal({
  isOpen,
  onClose,
  onSave,
  order,
  loading,
}) {
  const [formData, setFormData] = useState({
    status: "pending",
    totalAmount: 0,
    shippingCost: 0,
    discount: 0,
    finalAmount: 0,
    paymentMethod: "online",
    paymentStatus: "pending",
    customer: {
      name: "",
      phone: "",
      email: "",
      address: "",
      postalCode: "",
    },
    shipping: {
      method: "standard",
      cost: 0,
      trackingCode: "",
      estimatedDelivery: "",
    },
    items: [],
    notes: "",
  });

  useEffect(() => {
    if (order) {
      setFormData(order);
    } else {
      setFormData({
        status: "pending",
        totalAmount: 0,
        shippingCost: 0,
        discount: 0,
        finalAmount: 0,
        paymentMethod: "online",
        paymentStatus: "pending",
        customer: {
          name: "",
          phone: "",
          email: "",
          address: "",
          postalCode: "",
        },
        shipping: {
          method: "standard",
          cost: 0,
          trackingCode: "",
          estimatedDelivery: "",
        },
        items: [],
        notes: "",
      });
    }
  }, [order, isOpen]);

  useEffect(() => {
    const final =
      formData.totalAmount + formData.shippingCost - formData.discount;
    setFormData((prev) => ({ ...prev, finalAmount: final }));
  }, [formData.totalAmount, formData.shippingCost, formData.discount]);

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onSave(formData);
  };

  const handleClose = (e) => {
    e?.stopPropagation();
    onClose();
  };

  const handleCustomerChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      customer: {
        ...prev.customer,
        [field]: value,
      },
    }));
  };

  const handleShippingChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      shipping: {
        ...prev.shipping,
        [field]: value,
      },
    }));
  };

  const addItem = (e) => {
    e?.stopPropagation();
    const newItem = {
      id: Date.now(),
      name: "",
      price: 0,
      quantity: 1,
      total: 0,
      variants: {},
    };
    setFormData((prev) => ({
      ...prev,
      items: [...prev.items, newItem],
    }));
  };

  const updateItem = (index, field, value) => {
    const updatedItems = [...formData.items];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value,
    };

    if (field === "price" || field === "quantity") {
      updatedItems[index].total =
        updatedItems[index].price * updatedItems[index].quantity;
    }

    setFormData((prev) => ({
      ...prev,
      items: updatedItems,
    }));

    const totalAmount = updatedItems.reduce((sum, item) => sum + item.total, 0);
    setFormData((prev) => ({
      ...prev,
      totalAmount,
      finalAmount: totalAmount + prev.shippingCost - prev.discount,
    }));
  };

  const removeItem = (index, e) => {
    e?.stopPropagation();
    const updatedItems = formData.items.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      items: updatedItems,
    }));

    const totalAmount = updatedItems.reduce((sum, item) => sum + item.total, 0);
    setFormData((prev) => ({
      ...prev,
      totalAmount,
      finalAmount: totalAmount + prev.shippingCost - prev.discount,
    }));
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-xl shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">
            {order ? "ویرایش سفارش" : "سفارش جدید"}
          </h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FiX size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Order Status and Payment */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                وضعیت سفارش
              </label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, status: e.target.value }))
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="pending">در انتظار تایید</option>
                <option value="confirmed">تایید شده</option>
                <option value="shipped">ارسال شده</option>
                <option value="delivered">تحویل شده</option>
                <option value="cancelled">لغو شده</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                روش پرداخت
              </label>
              <select
                value={formData.paymentMethod}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    paymentMethod: e.target.value,
                  }))
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="online">پرداخت آنلاین</option>
                <option value="cash">پرداخت در محل</option>
                <option value="bank">کارت به کارت</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                وضعیت پرداخت
              </label>
              <select
                value={formData.paymentStatus}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    paymentStatus: e.target.value,
                  }))
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="pending">در انتظار پرداخت</option>
                <option value="paid">پرداخت شده</option>
                <option value="refunded">عودت داده شده</option>
                <option value="failed">ناموفق</option>
              </select>
            </div>
          </div>

          {/* Customer Information */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium text-gray-700 mb-4">اطلاعات مشتری</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  نام کامل
                </label>
                <input
                  type="text"
                  value={formData.customer.name}
                  onChange={(e) => handleCustomerChange("name", e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  تلفن همراه
                </label>
                <input
                  type="tel"
                  value={formData.customer.phone}
                  onChange={(e) =>
                    handleCustomerChange("phone", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ایمیل
                </label>
                <input
                  type="email"
                  value={formData.customer.email}
                  onChange={(e) =>
                    handleCustomerChange("email", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  کد پستی
                </label>
                <input
                  type="text"
                  value={formData.customer.postalCode}
                  onChange={(e) =>
                    handleCustomerChange("postalCode", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                آدرس ارسال
              </label>
              <textarea
                value={formData.customer.address}
                onChange={(e) =>
                  handleCustomerChange("address", e.target.value)
                }
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-700">محصولات سفارش</h3>
              <button
                type="button"
                onClick={addItem}
                className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FiPlus size={16} />
                افزودن محصول
              </button>
            </div>

            <div className="space-y-3">
              {formData.items.map((item, index) => (
                <div key={item.id} className="bg-white rounded-lg border p-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        نام محصول
                      </label>
                      <input
                        type="text"
                        value={item.name}
                        onChange={(e) =>
                          updateItem(index, "name", e.target.value)
                        }
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        قیمت (تومان)
                      </label>
                      <input
                        type="number"
                        value={item.price}
                        onChange={(e) =>
                          updateItem(
                            index,
                            "price",
                            parseInt(e.target.value) || 0
                          )
                        }
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        تعداد
                      </label>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          updateItem(
                            index,
                            "quantity",
                            parseInt(e.target.value) || 1
                          )
                        }
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div className="flex items-end gap-2">
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          جمع (تومان)
                        </label>
                        <div className="p-2 bg-gray-100 rounded-lg">
                          {item.total.toLocaleString()}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => removeItem(index, e)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                روش ارسال
              </label>
              <select
                value={formData.shipping.method}
                onChange={(e) => handleShippingChange("method", e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="standard">پست پیشتاز</option>
                <option value="express">پیک موتوری</option>
                <option value="free">ارسال رایگان</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                کد رهگیری
              </label>
              <input
                type="text"
                value={formData.shipping.trackingCode}
                onChange={(e) =>
                  handleShippingChange("trackingCode", e.target.value)
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Financial Summary */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium text-gray-700 mb-4">خلاصه مالی</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  مبلغ کل (تومان)
                </label>
                <input
                  type="number"
                  value={formData.totalAmount}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      totalAmount: parseInt(e.target.value) || 0,
                    }))
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  هزینه ارسال (تومان)
                </label>
                <input
                  type="number"
                  value={formData.shippingCost}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      shippingCost: parseInt(e.target.value) || 0,
                    }))
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  تخفیف (تومان)
                </label>
                <input
                  type="number"
                  value={formData.discount}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      discount: parseInt(e.target.value) || 0,
                    }))
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  مبلغ نهایی (تومان)
                </label>
                <div className="p-3 bg-gray-100 rounded-lg font-medium">
                  {formData.finalAmount.toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              یادداشت‌ها
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, notes: e.target.value }))
              }
              rows={3}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="یادداشت‌های مربوط به سفارش..."
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              انصراف
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading
                ? "در حال ذخیره..."
                : order
                ? "بروزرسانی سفارش"
                : "ایجاد سفارش"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
