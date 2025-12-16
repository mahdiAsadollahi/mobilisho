"use client";
import { useState, useEffect, useRef } from "react";
import { FiX, FiUpload, FiPlus, FiTrash2 } from "react-icons/fi";
import ProductVariants from "@/app/components/ProductVariants/ProductVariants";
import ProductSpecifications from "@/app/components/ProductSpecifications/ProductSpecifications";
import dynamic from "next/dynamic";

const CKEditor = dynamic(
  () => import("@/app/components/ui/CKEditor/CKEditor"),
  {
    ssr: false,
    loading: () => <div>در حال بارگذاری ویرایشگر...</div>,
  }
);

const ProductModal = ({ product, categories, onClose, onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    categoryId: "",
    specifications: [],
    variations: [],
    images: [],
  });

  const [imagePreviews, setImagePreviews] = useState([]);
  const [activeTab, setActiveTab] = useState("basic");
  const fileInputRef = useRef(null);

  // حالت اولیه برای محصول جدید
  const initializeForNewProduct = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      stock: "0",
      categoryId: categories.length > 0 ? categories[0]._id : "",
      specifications: [],
      variations: [],
      images: [],
    });
    setImagePreviews([]);
  };

  // حالت برای ویرایش محصول موجود
  const initializeForExistingProduct = (productData) => {
    console.log("Initializing modal with product data:", productData);

    // اطمینان از اینکه specifications و variations آرایه هستند
    const safeSpecifications = Array.isArray(productData.specifications)
      ? productData.specifications
      : [];

    const safeVariations = Array.isArray(productData.variations)
      ? productData.variations
      : [];

    setFormData({
      name: productData.name || "",
      description: productData.description || "",
      price: productData.price?.toString() || "",
      stock: productData.stock?.toString() || "0",
      categoryId: productData.categoryId?._id || productData.categoryId || "",
      specifications: safeSpecifications,
      variations: safeVariations,
      images: productData.images || [],
    });

    setImagePreviews(productData.images || []);
  };

  useEffect(() => {
    if (product) {
      initializeForExistingProduct(product);
    } else {
      initializeForNewProduct();
    }
  }, [product, categories]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const submitData = {
      ...formData,
      price: parseInt(formData.price) || 0,
      stock: parseInt(formData.stock) || 0,
    };

    console.log("Submitting product data:", submitData);
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
    const isFile = formData.images[index] instanceof File;

    if (isFile) {
      // اگر فایل جدید است، فقط از state حذف کن
      setImagePreviews((prev) => prev.filter((_, i) => i !== index));
      setFormData((prev) => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== index),
      }));
    } else {
      // اگر URL قدیمی است، فقط از پیش‌نمایش حذف کن اما در images نگه دار
      setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleVariantsChange = (variations) => {
    setFormData((prev) => ({ ...prev, variations }));
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
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-800">
            {product ? "ویرایش محصول" : "افزودن محصول جدید"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            disabled={loading}
          >
            <FiX size={20} />
          </button>
        </div>

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

        <form
          onSubmit={handleSubmit}
          className="p-6 overflow-y-auto max-h-[60vh]"
        >
          {activeTab === "basic" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    نام محصول *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="نام کامل محصول"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    دسته‌بندی *
                  </label>
                  <select
                    value={formData.categoryId}
                    onChange={(e) => handleChange("categoryId", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">انتخاب دسته‌بندی</option>
                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.title}
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
                    قیمت (تومان) *
                  </label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => handleChange("price", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="25000000"
                    required
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    موجودی پایه *
                  </label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => handleChange("stock", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="10"
                    required
                    min="0"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === "specs" && (
            <div>
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-700">
                  مشخصات فنی محصول
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  کلید و مقدار مشخصات فنی محصول را وارد کنید
                </p>
              </div>
              <ProductSpecifications
                specifications={formData.specifications}
                onChange={handleSpecificationsChange}
              />
            </div>
          )}

          {activeTab === "variants" && (
            <div>
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-700">
                  تنوع‌های محصول
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  تنوع‌های مختلف محصول مانند رنگ، سایز و ... را تعریف کنید
                </p>
              </div>
              <ProductVariants
                variants={formData.variations}
                onChange={handleVariantsChange}
              />
            </div>
          )}

          {activeTab === "images" && (
            <div className="space-y-6">
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-700">
                  تصاویر محصول
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  برای آپلود تصاویر جدید کلیک کنید یا برای حذف روی × تصویر کلیک
                  کنید
                </p>
              </div>

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
                    PNG, JPG, WEBP (حداکثر 2MB هر تصویر)
                  </span>
                </div>
              </button>

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
                        title="حذف تصویر"
                      >
                        <FiTrash2 size={14} />
                      </button>
                      <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        {index + 1}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {imagePreviews.length === 0 && (
                <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
                  <FiUpload className="mx-auto text-gray-400 mb-3" size={32} />
                  <p>هنوز تصویری آپلود نشده است</p>
                  <p className="text-sm mt-1">
                    برای افزودن تصاویر محصول، روی دکمه بالا کلیک کنید
                  </p>
                </div>
              )}
            </div>
          )}
        </form>

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
              className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50"
            >
              انصراف
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={
                loading ||
                !formData.name ||
                !formData.price ||
                !formData.stock ||
                !formData.categoryId ||
                formData.images.length === 0
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

      <div className="absolute inset-0 -z-10" onClick={onClose} />
    </div>
  );
};

export default ProductModal;
