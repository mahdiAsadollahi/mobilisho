// app/components/CategoryModal/CategoryModal.js
"use client";
import { useState, useEffect, useRef } from "react";
import { FiX, FiUpload, FiSearch, FiImage } from "react-icons/fi";
import * as Icons from "react-icons/fi";

// آیکون‌های مرتبط با فروشگاه موبایل و مقالات
const relevantIcons = [
  "FiSmartphone",
  "FiTablet",
  "FiHeadphones",
  "FiWatch",
  "FiCamera",
  "FiBattery",
  "FiSpeaker",
  "FiMonitor",
  "FiBook",
  "FiFileText",
  "FiMessageSquare",
  "FiShoppingBag",
  "FiGift",
  "FiTruck",
  "FiPackage",
  "FiTag",
  "FiCreditCard",
  "FiShield",
  "FiWifi",
  "FiBluetooth",
  "FiCpu",
  "FiHardDrive",
  "FiMouse",
  "FiKeyboard",
  "FiPower",
];

const CategoryModal = ({ category, onClose, onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    title: "",
    image: null,
    icon: "FiSmartphone",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [showIconPicker, setShowIconPicker] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (category) {
      setFormData({
        title: category.title,
        image: category.image,
        icon: category.icon,
      });
      setImagePreview(category.image);
    }
  }, [category]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // مدیریت آپلود عکس
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // در اینجا باید فایل رو به سرور آپلود کنید
      // برای نمونه، از URL.createObjectURL استفاده می‌کنیم
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      handleChange("image", file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // فیلتر آیکون‌ها بر اساس جستجو
  const filteredIcons = relevantIcons.filter((iconName) =>
    iconName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // گرفتن کامپوننت آیکون
  const getIconComponent = (iconName) => {
    const IconComponent = Icons[iconName];
    return IconComponent ? <IconComponent className="text-lg" /> : null;
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* هدر مودال */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-800">
            {category ? "ویرایش دسته‌بندی" : "افزودن دسته‌بندی جدید"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* بدنه مودال */}
        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-6 overflow-y-auto max-h-[60vh]"
        >
          {/* فیلد عنوان */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              عنوان دسته‌بندی *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="مثال: گوشی موبایل، لوازم جانبی، مقالات آموزشی"
              required
            />
          </div>

          {/* فیلد آپلود عکس */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              تصویر دسته‌بندی
            </label>
            <div className="space-y-3">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />

              <button
                type="button"
                onClick={triggerFileInput}
                className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-500 hover:bg-blue-50 transition-colors"
              >
                <div className="flex flex-col items-center justify-center gap-2">
                  <FiUpload className="text-gray-400 text-xl" />
                  <span className="text-sm text-gray-600">
                    کلیک کنید برای آپلود تصویر
                  </span>
                  <span className="text-xs text-gray-500">
                    PNG, JPG, WEBP (حداکثر 2MB)
                  </span>
                </div>
              </button>

              {imagePreview && (
                <div className="flex items-center justify-center">
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-32 h-32 object-cover rounded-lg border border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview("");
                        handleChange("image", null);
                      }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                    >
                      <FiX size={14} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* فیلد آیکون */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              انتخاب آیکون *
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowIconPicker(!showIconPicker)}
                className="w-full flex items-center justify-between px-3 py-3 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg border border-blue-200">
                    {getIconComponent(formData.icon)}
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium text-gray-700 block">
                      {formData.icon}
                    </span>
                    <span className="text-xs text-gray-500">آیکون فعلی</span>
                  </div>
                </div>
                <FiSearch className="text-gray-400" />
              </button>

              {showIconPicker && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-xl z-10 max-h-60 overflow-y-auto">
                  {/* نوار جستجو */}
                  <div className="p-3 border-b border-gray-200 bg-gray-50">
                    <div className="relative">
                      <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg text-sm bg-white"
                        placeholder="جستجوی آیکون (مثال: phone, book, headphone)"
                      />
                    </div>
                  </div>

                  {/* لیست آیکون‌ها */}
                  <div className="grid grid-cols-6 gap-3 p-3">
                    {filteredIcons.map((iconName) => (
                      <button
                        key={iconName}
                        type="button"
                        onClick={() => {
                          handleChange("icon", iconName);
                          setShowIconPicker(false);
                          setSearchTerm("");
                        }}
                        className={`p-3 rounded-lg border-2 transition-all flex flex-col items-center gap-2 ${
                          formData.icon === iconName
                            ? "border-blue-500 bg-blue-50 text-blue-700"
                            : "border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                        }`}
                      >
                        {getIconComponent(iconName)}
                        <span className="text-xs text-gray-600 truncate w-full text-center">
                          {iconName.replace("Fi", "")}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </form>

        {/* فوتر مودال */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
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
            disabled={loading || !formData.title.trim() || !formData.icon}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                {category ? "در حال ویرایش..." : "در حال افزودن..."}
              </>
            ) : (
              <>{category ? "ویرایش دسته‌بندی" : "افزودن دسته‌بندی"}</>
            )}
          </button>
        </div>
      </div>

      {/* کلیک خارج از مودال */}
      <div className="absolute inset-0 -z-10" onClick={onClose} />
    </div>
  );
};

export default CategoryModal;
