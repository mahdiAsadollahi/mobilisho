// app/admin/products/components/ProductModal.js
"use client";
import { useState, useEffect, useRef } from "react";
import { FiX, FiUpload, FiPlus, FiTrash2 } from "react-icons/fi";
import ProductVariants from "@/app/components/ProductVariants/ProductVariants";
import ProductSpecifications from "@/app/components/ProductSpecifications/ProductSpecifications";
import dynamic from "next/dynamic";

// بارگذاری CKEditor به صورت داینامیک
const CKEditor = dynamic(() => import("@/app/components/ui/CKEditor/CKEditor"), {
  ssr: false,
  loading: () => <div>در حال بارگذاری ویرایشگر...</div>,
});

const ProductModal = ({ product, categories, onClose, onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    specifications: [],
    variants: [],
    images: [],
  });

  const [imagePreviews, setImagePreviews] = useState([]);
  const [activeTab, setActiveTab] = useState("basic");
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title || "",
        description: product.description || "",
        price: product.price || "",
        stock: product.stock || "",
        category: product.category || "",
        specifications: product.specifications || [],
        variants: product.variants || [],
        images: product.images || [],
      });
      setImagePreviews(product.images || []);
    } else {
      setFormData((prev) => ({
        ...prev,
        category: categories[0] || "",
      }));
    }
  }, [product, categories]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const submitData = {
      ...formData,
      price: parseInt(formData.price) || 0,
      stock: parseInt(formData.stock) || 0,
    };

    onSubmit(submitData);
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      const newPreviews = files.map((file) => URL.createObjectURL(file));
      setImagePreviews((prev) => [...prev, ...newPreviews]);
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...files],
      }));
    }
  };

  const removeImage = (index) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleVariantsChange = (variants) => {
    setFormData((prev) => ({ ...prev, variants }));
  };

  const handleSpecificationsChange = (specifications) => {
    setFormData((prev) => ({ ...prev, specifications }));
  };

  const tabs = [
    { id: "basic", label: "اطلاعات پایه" },
    { id: "specs", label: "مشخصات فنی" },
    { id: "variants", label: "تنوع محصول" },
    { id: "images", label: "تصاویر" },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* هدر مودال */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-800">
            {product ? "ویرایش محصول" : "افزودن محصول جدید"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* تب‌ها */}
        <div className="border-b border-gray-200">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 min-w-0 px-6 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600 bg-blue-50"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* بدنه مودال */}
        <form
          onSubmit={handleSubmit}
          className="p-6 overflow-y-auto max-h-[60vh]"
        >
          {/* تب اطلاعات پایه */}
          {activeTab === "basic" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    عنوان محصول *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="عنوان کامل محصول"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    دسته‌بندی *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => handleChange("category", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">انتخاب دسته‌بندی</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  توضیحات محصول
                </label>
                <CKEditor
                  value={formData.description}
                  onChange={(data) => handleChange("description", data)}
                  placeholder="توضیحات کامل درباره محصول..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    قیمت اصلی (تومان) *
                  </label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => handleChange("price", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="25000000"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    موجودی *
                  </label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => handleChange("stock", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="10"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {/* تب مشخصات فنی */}
          {activeTab === "specs" && (
            <ProductSpecifications
              specifications={formData.specifications}
              onChange={handleSpecificationsChange}
            />
          )}

          {/* تب تنوع محصول */}
          {activeTab === "variants" && (
            <ProductVariants
              variants={formData.variants}
              onChange={handleVariantsChange}
            />
          )}

          {/* تب تصاویر */}
          {activeTab === "images" && (
            <div className="space-y-6">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                multiple
                className="hidden"
              />

              <button
                type="button"
                onClick={triggerFileInput}
                className="w-full border-2 border-dashed border-gray-300 rounded-lg p-8 hover:border-blue-500 hover:bg-blue-50 transition-colors"
              >
                <div className="flex flex-col items-center justify-center gap-2">
                  <FiUpload className="text-gray-400 text-2xl" />
                  <span className="text-sm text-gray-600">
                    کلیک کنید برای آپلود تصاویر
                  </span>
                  <span className="text-xs text-gray-500">
                    PNG, JPG, WEBP (حداکثر 5MB هر تصویر)
                  </span>
                </div>
              </button>

              {/* پیش‌نمایش تصاویر */}
              {imagePreviews.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg border border-gray-200"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <FiTrash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </form>

        {/* فوتر مودال */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center gap-3">
            {tabs.map((tab, index) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {index + 1}. {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors border border-gray-300 rounded-lg hover:bg-gray-100"
            >
              انصراف
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={
                loading ||
                !formData.title ||
                !formData.price ||
                !formData.stock ||
                !formData.category
              }
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  {product ? "در حال ویرایش..." : "در حال افزودن..."}
                </>
              ) : (
                <>{product ? "ویرایش محصول" : "افزودن محصول"}</>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* کلیک خارج از مودال */}
      <div className="absolute inset-0 -z-10" onClick={onClose} />
    </div>
  );
};

export default ProductModal;
