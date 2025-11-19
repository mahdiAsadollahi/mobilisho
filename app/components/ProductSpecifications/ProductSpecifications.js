// app/admin/products/components/ProductSpecifications.js
"use client";
import { useState } from "react";
import { FiPlus, FiTrash2 } from "react-icons/fi";

const ProductSpecifications = ({ specifications, onChange }) => {
  const [newSpec, setNewSpec] = useState({
    name: "",
    value: "",
  });

  const addSpecification = () => {
    if (newSpec.name && newSpec.value) {
      onChange([...specifications, { ...newSpec }]);
      setNewSpec({ name: "", value: "" });
    }
  };

  const removeSpecification = (index) => {
    onChange(specifications.filter((_, i) => i !== index));
  };

  const updateSpecification = (index, field, value) => {
    const updatedSpecs = specifications.map((spec, i) =>
      i === index ? { ...spec, [field]: value } : spec
    );
    onChange(updatedSpecs);
  };

  return (
    <div className="space-y-6">
      {/* فرم افزودن مشخصات جدید */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="text-sm font-medium text-gray-700 mb-3">
          افزودن مشخصات جدید
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input
            type="text"
            value={newSpec.name}
            onChange={(e) =>
              setNewSpec((prev) => ({ ...prev, name: e.target.value }))
            }
            placeholder="نام مشخصه (مثال: باتری، حافظه، وزن و...)"
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
          <input
            type="text"
            value={newSpec.value}
            onChange={(e) =>
              setNewSpec((prev) => ({ ...prev, value: e.target.value }))
            }
            placeholder="مقدار (مثال: 5000mAh، 256GB و...)"
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
        </div>
        <button
          type="button"
          onClick={addSpecification}
          disabled={!newSpec.name || !newSpec.value}
          className="mt-3 flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
        >
          <FiPlus size={16} />
          افزودن مشخصه
        </button>
      </div>

      {/* لیست مشخصات موجود */}
      {specifications.length > 0 ? (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-700">
            مشخصات فنی محصول
          </h4>
          {specifications.map((spec, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg"
            >
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  type="text"
                  value={spec.name}
                  onChange={(e) =>
                    updateSpecification(index, "name", e.target.value)
                  }
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="نام مشخصه"
                />
                <input
                  type="text"
                  value={spec.value}
                  onChange={(e) =>
                    updateSpecification(index, "value", e.target.value)
                  }
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="مقدار"
                />
              </div>
              <button
                type="button"
                onClick={() => removeSpecification(index)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <FiTrash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
          <p>هنوز هیچ مشخصه‌ای اضافه نشده است</p>
          <p className="text-sm mt-1">
            برای افزودن مشخصات فنی از فرم بالا استفاده کنید
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductSpecifications;
