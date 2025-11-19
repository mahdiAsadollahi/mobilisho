// app/admin/products/components/ProductsTable.js
"use client";
import {
  FiEdit2,
  FiTrash2,
  FiEye,
  FiEyeOff,
  FiPackage,
  FiMoreVertical,
} from "react-icons/fi";

const ProductsTable = ({
  products,
  onEdit,
  onDelete,
  onToggleStatus,
  loading,
}) => {
  // فرمت کردن قیمت
  const formatPrice = (price) => {
    return new Intl.NumberFormat("fa-IR").format(price) + " تومان";
  };

  // وضعیت موجودی
  const getStockStatus = (stock) => {
    if (stock > 10) {
      return { text: "موجود", color: "text-green-600", bg: "bg-green-100" };
    } else if (stock > 0) {
      return {
        text: "کم موجود",
        color: "text-orange-600",
        bg: "bg-orange-100",
      };
    } else {
      return { text: "ناموجود", color: "text-red-600", bg: "bg-red-100" };
    }
  };

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-right px-4 py-3 text-sm font-semibold text-gray-700 whitespace-nowrap">
                محصول
              </th>
              <th className="text-right px-4 py-3 text-sm font-semibold text-gray-700 whitespace-nowrap">
                قیمت
              </th>
              <th className="text-right px-4 py-3 text-sm font-semibold text-gray-700 whitespace-nowrap">
                موجودی
              </th>
              <th className="text-right px-4 py-3 text-sm font-semibold text-gray-700 whitespace-nowrap">
                وضعیت
              </th>
              <th className="text-right px-4 py-3 text-sm font-semibold text-gray-700 whitespace-nowrap">
                عملیات
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map((product) => {
              const stockStatus = getStockStatus(product.stock);

              return (
                <tr
                  key={product.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  {/* اطلاعات محصول */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden shrink-0 flex items-center justify-center">
                        {product.images && product.images[0] ? (
                          <img
                            src={product.images[0]}
                            alt={product.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                            <FiPackage className="text-gray-500" size={16} />
                          </div>
                        )}
                      </div>
                      <div className="text-right min-w-0 flex-1">
                        <h3 className="text-sm font-medium text-gray-900 mb-1 truncate">
                          {product.title}
                        </h3>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span className="bg-gray-100 px-2 py-1 rounded-md">
                            {product.category}
                          </span>
                          <span>•</span>
                          <span>{product.sku}</span>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* قیمت */}
                  <td className="px-4 py-3">
                    <span className="text-sm font-bold text-gray-800">
                      {formatPrice(product.price)}
                    </span>
                  </td>

                  {/* موجودی */}
                  <td className="px-4 py-3">
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-xs text-gray-600">
                        {product.stock} عدد
                      </span>
                    </div>
                  </td>

                  {/* وضعیت */}
                  <td className="px-4 py-3">
                    <button
                      onClick={() => onToggleStatus(product.id, "isActive")}
                      className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                        product.isActive
                          ? "bg-green-100 text-green-800 hover:bg-green-200"
                          : "bg-red-100 text-red-800 hover:bg-red-200"
                      }`}
                    >
                      {product.isActive ? (
                        <FiEye size={12} />
                      ) : (
                        <FiEyeOff size={12} />
                      )}
                      {product.isActive ? "فعال" : "غیرفعال"}
                    </button>
                  </td>

                  {/* عملیات */}
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => onEdit(product)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="ویرایش"
                      >
                        <FiEdit2 size={16} />
                      </button>

                      <button
                        onClick={() => onDelete(product)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="حذف"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {products.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <FiPackage className="mx-auto text-gray-400 mb-3" size={48} />
            <p className="text-lg">هیچ محصولی یافت نشد</p>
            <p className="text-sm mt-1">برای شروع یک محصول جدید اضافه کنید</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsTable;
