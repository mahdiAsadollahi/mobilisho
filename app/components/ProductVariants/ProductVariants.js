"use client";
import { useState } from "react";
import { FiPlus, FiTrash2 } from "react-icons/fi";

const ProductVariants = ({ variants, onChange }) => {
  const [newVariant, setNewVariant] = useState({
    type: "",
    value: "",
    price: "",
    stock: "",
    sku: "",
  });

  const addVariant = () => {
    if (newVariant.type && newVariant.value && newVariant.price) {
      const variant = {
        type: newVariant.type,
        value: newVariant.value,
        price: parseInt(newVariant.price),
        stock: parseInt(newVariant.stock) || 0,
        sku: newVariant.sku || `VAR-${Date.now()}`,
      };

      onChange([...variants, variant]);
      setNewVariant({
        type: "",
        value: "",
        price: "",
        stock: "",
        sku: "",
      });
    }
  };

  const removeVariant = (index) => {
    onChange(variants.filter((_, i) => i !== index));
  };

  const updateVariant = (index, field, value) => {
    const updatedVariants = variants.map((variant, i) =>
      i === index ? { ...variant, [field]: value } : variant
    );
    onChange(updatedVariants);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="text-sm font-medium text-gray-700 mb-3">
          افزودن تنوع جدید
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          <input
            type="text"
            value={newVariant.type}
            onChange={(e) =>
              setNewVariant((prev) => ({ ...prev, type: e.target.value }))
            }
            placeholder="نوع (مثلاً: رنگ)"
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
          <input
            type="text"
            value={newVariant.value}
            onChange={(e) =>
              setNewVariant((prev) => ({ ...prev, value: e.target.value }))
            }
            placeholder="مقدار (مثلاً: قرمز)"
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
          <input
            type="number"
            value={newVariant.price}
            onChange={(e) =>
              setNewVariant((prev) => ({ ...prev, price: e.target.value }))
            }
            placeholder="قیمت"
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
          <input
            type="number"
            value={newVariant.stock}
            onChange={(e) =>
              setNewVariant((prev) => ({ ...prev, stock: e.target.value }))
            }
            placeholder="موجودی"
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
          <input
            type="text"
            value={newVariant.sku}
            onChange={(e) =>
              setNewVariant((prev) => ({ ...prev, sku: e.target.value }))
            }
            placeholder="SKU"
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
        </div>
        <div className="mt-3 text-xs text-gray-500">
          <p>SKU: کد یکتای شناسایی تنوع محصول</p>
        </div>
        <button
          type="button"
          onClick={addVariant}
          disabled={!newVariant.type || !newVariant.value || !newVariant.price}
          className="mt-3 flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
        >
          <FiPlus size={16} />
          افزودن تنوع
        </button>
      </div>

      {variants.length > 0 ? (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-700">تنوع‌های موجود</h4>
          {variants.map((variant, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg"
            >
              <div className="flex-1 grid grid-cols-1 md:grid-cols-5 gap-3">
                <input
                  type="text"
                  value={variant.type}
                  onChange={(e) => updateVariant(index, "type", e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="نوع"
                />
                <input
                  type="text"
                  value={variant.value}
                  onChange={(e) =>
                    updateVariant(index, "value", e.target.value)
                  }
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="مقدار"
                />
                <input
                  type="number"
                  value={variant.price}
                  onChange={(e) =>
                    updateVariant(index, "price", parseInt(e.target.value) || 0)
                  }
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="قیمت"
                />
                <input
                  type="number"
                  value={variant.stock}
                  onChange={(e) =>
                    updateVariant(index, "stock", parseInt(e.target.value) || 0)
                  }
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="موجودی"
                />
                <input
                  type="text"
                  value={variant.sku}
                  onChange={(e) => updateVariant(index, "sku", e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="SKU"
                />
              </div>
              <button
                type="button"
                onClick={() => removeVariant(index)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <FiTrash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
          <p>هنوز هیچ تنوعی اضافه نشده است</p>
          <p className="text-sm mt-1">
            برای افزودن تنوع از فرم بالا استفاده کنید
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductVariants;
