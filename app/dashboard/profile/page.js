// app/dashboard/profile/page.js
"use client";

import { useUser } from "@/app/contexts/UserContext";
import { useEffect, useState } from "react";
import {
  FiUser,
  FiPhone,
  FiLock,
  FiCheckCircle,
  FiEdit3,
  FiSave,
  FiShield,
  FiBell,
  FiCalendar,
} from "react-icons/fi";


function toPersianDate(isoDate) {
  if (!isoDate) return "نامشخص";
  const date = new Date(isoDate);
  return new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

export default function ProfilePage() {
  const { userData } = useUser();

  const [localUserData, setLocalUserData] = useState({
    username: "",
    phone: "",
    createdAt: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [notifications, setNotifications] = useState({
    push: false,
    email: false,
    sms: false,
    promotional: false,
  });

  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");

  // پر کردن فرم با دیتای واقعی کاربر
  useEffect(() => {
    if (userData) {
      setLocalUserData({
        username: userData.username || "",
        phone: userData.phone || "",
        createdAt: userData.createdAt || "",
      });
    }
  }, [userData]);

  const handlePasswordChange = (field, value) => {
    setPasswordData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNotificationChange = (type) => {
    setNotifications((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const handleChangePassword = async () => {
    // اعتبارسنجی
    if (!passwordData.currentPassword) {
      alert("رمز عبور فعلی را وارد کنید");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      alert("رمز عبور جدید باید حداقل ۶ کاراکتر باشد");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("رمز عبور جدید با تکرار آن مطابقت ندارد");
      return;
    }

    setIsLoading(true);
    try {
      // شبیه‌سازی درخواست به سرور
      await new Promise((resolve) => setTimeout(resolve, 1000));

      alert("رمز عبور با موفقیت تغییر کرد");
      setIsChangingPassword(false);
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      alert("خطا در تغییر رمز عبور");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-6 mx-auto max-w-7xl">
      {/* هدر صفحه */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-black mb-2">پروفایل کاربری</h1>
        <p className="text-gray-600">مشاهده اطلاعات حساب کاربری</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* سایدبرگه */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
            <div className="space-y-1">
              <button
                onClick={() => setActiveTab("personal")}
                className={`w-full text-right p-3 rounded-lg transition-colors flex items-center gap-3 ${
                  activeTab === "personal"
                    ? "bg-blue-50 text-blue-600 border border-blue-200"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <FiUser className="text-lg" />
                <span>اطلاعات شخصی</span>
              </button>

              <button
                onClick={() => setActiveTab("security")}
                className={`w-full text-right p-3 rounded-lg transition-colors flex items-center gap-3 ${
                  activeTab === "security"
                    ? "bg-blue-50 text-blue-600 border border-blue-200"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <FiShield className="text-lg" />
                <span>امنیت و رمز عبور</span>
              </button>

              <button
                onClick={() => setActiveTab("notifications")}
                className={`w-full text-right p-3 rounded-lg transition-colors flex items-center gap-3 ${
                  activeTab === "notifications"
                    ? "bg-blue-50 text-blue-600 border border-blue-200"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <FiBell className="text-lg" />
                <span>اعلان‌ها</span>
              </button>
            </div>
          </div>
        </div>

        {/* محتوای اصلی */}
        <div className="lg:col-span-3">
          {/* اطلاعات شخصی */}
          {activeTab === "personal" && (
            <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-black mb-6">
                اطلاعات شخصی
              </h2>

              <div className="space-y-6">
                {/* آواتار */}
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-full bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-2xl font-bold">
                    {localUserData.username?.charAt(0) || "U"}
                  </div>
                  <div>
                    <p className="text-gray-700 font-medium">
                      {localUserData.username}
                    </p>
                    <p className="text-gray-500 text-sm">
                      کاربر {userData?.role === "ADMIN" ? "مدیر" : "عادی"}
                    </p>
                  </div>
                </div>

                {/* فرم اطلاعات (فقط نمایش) */}
                <div className="grid grid-cols-1 gap-4">
                  {/* نام کاربری */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      نام کاربری
                    </label>
                    <div className="flex items-center gap-2">
                      <FiUser className="text-gray-400" />
                      <span className="text-black font-medium">
                        {localUserData.username || "تنظیم نشده"}
                      </span>
                    </div>
                  </div>

                  {/* شماره تلفن (تایید شده) */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      شماره همراه
                    </label>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FiPhone className="text-gray-400" />
                        <span className="text-black font-medium" dir="ltr">
                          {localUserData.phone}
                        </span>
                      </div>
                      <span className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded text-sm">
                        <FiCheckCircle size={14} />
                        <span>تایید شده</span>
                      </span>
                    </div>
                  </div>

                  {/* تاریخ عضویت */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      تاریخ عضویت
                    </label>
                    <div className="flex items-center gap-2">
                      <FiCalendar className="text-gray-400" />
                      <span className="text-black font-medium">
                        {toPersianDate(localUserData.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* امنیت و رمز عبور */}
          {activeTab === "security" && (
            <div className="space-y-6">
              {/* وضعیت شماره همراه */}
              <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                <h3 className="font-semibold text-black mb-4">
                  وضعیت شماره همراه
                </h3>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <FiCheckCircle className="text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-green-800">
                        شماره همراه تایید شده
                      </p>
                      <p className="text-sm text-green-600" dir="ltr">
                        {localUserData.phone}
                      </p>
                    </div>
                  </div>
                  <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm">
                    فعال
                  </span>
                </div>
              </div>

              {/* تغییر رمز عبور */}
              <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-black">تغییر رمز عبور</h3>
                  <button
                    onClick={() => setIsChangingPassword(!isChangingPassword)}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <FiEdit3 className="text-lg" />
                    <span>تغییر رمز عبور</span>
                  </button>
                </div>

                {isChangingPassword && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        رمز عبور فعلی
                      </label>
                      <input
                        type="password"
                        value={passwordData.currentPassword}
                        onChange={(e) =>
                          handlePasswordChange(
                            "currentPassword",
                            e.target.value
                          )
                        }
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        disabled={isLoading}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        رمز عبور جدید
                      </label>
                      <input
                        type="password"
                        value={passwordData.newPassword}
                        onChange={(e) =>
                          handlePasswordChange("newPassword", e.target.value)
                        }
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        disabled={isLoading}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        تکرار رمز عبور جدید
                      </label>
                      <input
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={(e) =>
                          handlePasswordChange(
                            "confirmPassword",
                            e.target.value
                          )
                        }
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        disabled={isLoading}
                      />
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button
                        onClick={handleChangePassword}
                        disabled={isLoading}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                      >
                        {isLoading ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>در حال تغییر...</span>
                          </>
                        ) : (
                          <>
                            <FiSave />
                            <span>تغییر رمز عبور</span>
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => {
                          setIsChangingPassword(false);
                          setPasswordData({
                            currentPassword: "",
                            newPassword: "",
                            confirmPassword: "",
                          });
                        }}
                        className="border border-gray-300 text-gray-600 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        انصراف
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* تنظیمات اعلان‌ها */}
          {activeTab === "notifications" && (
            <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-black mb-6">
                تنظیمات اعلان‌ها
              </h2>

              <div className="space-y-4">
                {/* اعلان‌های push (فعال) */}
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FiBell className="text-gray-400" />
                    <div>
                      <h4 className="font-medium text-black">اعلان‌های push</h4>
                      <p className="text-sm text-gray-500">
                        دریافت نوتیفیکیشن در مرورگر
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.push}
                      onChange={() => handleNotificationChange("push")}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                {/* سایر اعلان‌ها (غیرفعال) */}
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg opacity-50">
                  <div className="flex items-center gap-3">
                    <FiMail className="text-gray-400" />
                    <div>
                      <h4 className="font-medium text-black">
                        اعلان‌های ایمیلی
                      </h4>
                      <p className="text-sm text-gray-500">
                        دریافت اطلاعیه‌ها از طریق ایمیل
                      </p>
                    </div>
                  </div>
                  <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded">
                    به زودی
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg opacity-50">
                  <div className="flex items-center gap-3">
                    <FiPhone className="text-gray-400" />
                    <div>
                      <h4 className="font-medium text-black">
                        اعلان‌های پیامکی
                      </h4>
                      <p className="text-sm text-gray-500">
                        دریافت اطلاعیه‌ها از طریق SMS
                      </p>
                    </div>
                  </div>
                  <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded">
                    به زودی
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg opacity-50">
                  <div className="flex items-center gap-3">
                    <FiBell className="text-gray-400" />
                    <div>
                      <h4 className="font-medium text-black">
                        اعلان‌های تبلیغاتی
                      </h4>
                      <p className="text-sm text-gray-500">
                        دریافت پیشنهادها و تخفیف‌ها
                      </p>
                    </div>
                  </div>
                  <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded">
                    به زودی
                  </span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  ⚠️ سایر روش‌های اعلان به زودی اضافه خواهند شد
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
