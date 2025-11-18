// app/dashboard/profile/page.js
"use client";

import { useState } from "react";
import {
  FiUser,
  FiPhone,
  FiMail,
  FiLock,
  FiCheckCircle,
  FiXCircle,
  FiEdit3,
  FiSave,
  FiCamera,
  FiShield,
  FiBell,
} from "react-icons/fi";

export default function ProfilePage() {
  const [userData, setUserData] = useState({
    firstName: "امین",
    lastName: "محمدی",
    username: "aminmohammadi",
    phone: "09123456789",
    email: "amin.mohammadi@example.com",
    nationalCode: "1234567890",
    avatar: null,
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [notifications, setNotifications] = useState({
    email: true,
    sms: true,
    push: false,
    promotional: false,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");

  const handleInputChange = (field, value) => {
    setUserData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

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

  const handleSaveProfile = () => {
    // در اینجا اطلاعات به سرور ارسال می‌شود
    console.log("Saving profile:", userData);
    setIsEditing(false);
    // شبیه‌سازی ذخیره‌سازی موفق
    alert("اطلاعات با موفقیت ذخیره شد");
  };

  const handleSendVerificationCode = () => {
    // شبیه‌سازی ارسال کد تایید
    console.log("Sending verification code to:", userData.phone);
    setIsCodeSent(true);
    // در واقعیت اینجا باید به سرور درخواست ارسال کد بدهید
    setTimeout(() => {
      alert("کد تایید به شماره شما ارسال شد");
    }, 1000);
  };

  const handleVerifyCode = () => {
    if (verificationCode === "123456") {
      // در واقعیت باید با سرور چک شود
      alert("شماره همراه با موفقیت تایید شد");
      setIsCodeSent(false);
      setVerificationCode("");
    } else {
      alert("کد تایید نامعتبر است");
    }
  };

  const handleChangePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("رمز عبور جدید با تکرار آن مطابقت ندارد");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      alert("رمز عبور جدید باید حداقل ۶ کاراکتر باشد");
      return;
    }

    // شبیه‌سازی تغییر رمز عبور
    console.log("Changing password...");
    setIsChangingPassword(false);
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    alert("رمز عبور با موفقیت تغییر کرد");
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUserData((prev) => ({
          ...prev,
          avatar: e.target.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-4 md:p-6 mx-auto">
      {/* هدر صفحه */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-black mb-2">پروفایل کاربری</h1>
        <p className="text-gray-600">مدیریت اطلاعات شخصی و امنیت حساب کاربری</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* سایدبار */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
            <div className="space-y-1">
              <button
                onClick={() => setActiveTab("personal")}
                className={`w-full text-right p-3 rounded-lg transition-colors flex items-center justify-between ${
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
                className={`w-full text-right p-3 rounded-lg transition-colors flex items-center justify-between ${
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
                className={`w-full text-right p-3 rounded-lg transition-colors flex items-center justify-between ${
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
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-black">
                    اطلاعات شخصی
                  </h2>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    {isEditing ? (
                      <>
                        <FiSave className="text-lg" />
                        <span>ذخیره تغییرات</span>
                      </>
                    ) : (
                      <>
                        <FiEdit3 className="text-lg" />
                        <span>ویرایش اطلاعات</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="space-y-6">
                  {/* آواتار */}
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                        {userData.avatar ? (
                          <img
                            src={userData.avatar}
                            alt="Avatar"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <FiUser className="text-gray-400 text-2xl" />
                        )}
                      </div>
                      {isEditing && (
                        <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-1 rounded-full cursor-pointer">
                          <FiCamera className="text-sm" />
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleAvatarChange}
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-black">
                        {userData.firstName} {userData.lastName}
                      </h3>
                      <p className="text-gray-500 text-sm">
                        @{userData.username}
                      </p>
                    </div>
                  </div>

                  {/* فرم اطلاعات */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        نام
                      </label>
                      <input
                        type="text"
                        value={userData.firstName}
                        onChange={(e) =>
                          handleInputChange("firstName", e.target.value)
                        }
                        disabled={!isEditing}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        نام خانوادگی
                      </label>
                      <input
                        type="text"
                        value={userData.lastName}
                        onChange={(e) =>
                          handleInputChange("lastName", e.target.value)
                        }
                        disabled={!isEditing}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        نام کاربری
                      </label>
                      <input
                        type="text"
                        value={userData.username}
                        onChange={(e) =>
                          handleInputChange("username", e.target.value)
                        }
                        disabled={!isEditing}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        کد ملی
                      </label>
                      <input
                        type="text"
                        value={userData.nationalCode}
                        onChange={(e) =>
                          handleInputChange("nationalCode", e.target.value)
                        }
                        disabled={!isEditing}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        آدرس ایمیل
                      </label>
                      <input
                        type="email"
                        value={userData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        disabled={!isEditing}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                      />
                    </div>
                  </div>

                  {isEditing && (
                    <div className="flex gap-3 pt-4 border-t border-gray-200">
                      <button
                        onClick={handleSaveProfile}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                      >
                        <FiSave />
                        <span>ذخیره تغییرات</span>
                      </button>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="border border-gray-300 text-gray-600 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        انصراف
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* امنیت و رمز عبور */}
          {activeTab === "security" && (
            <div className="space-y-6">
              {/* تایید شماره همراه */}
              <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-black">
                    تایید شماره همراه
                  </h3>
                  <div className="flex items-center gap-2 text-green-600">
                    <FiCheckCircle />
                    <span className="text-sm">تایید شده</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <FiPhone className="text-gray-400" />
                  <span className="text-gray-700">{userData.phone}</span>
                </div>

                {!isCodeSent ? (
                  <button
                    onClick={handleSendVerificationCode}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  >
                    ارسال مجدد کد تایید
                  </button>
                ) : (
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        placeholder="کد تایید ۶ رقمی"
                        className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        maxLength={6}
                      />
                      <button
                        onClick={handleVerifyCode}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                      >
                        تایید کد
                      </button>
                    </div>
                    <p className="text-sm text-gray-500">
                      کد تایید به شماره {userData.phone} ارسال شد
                    </p>
                  </div>
                )}
              </div>

              {/* تغییر رمز عبور */}
              <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-black">تغییر رمز عبور</h3>
                  <button
                    onClick={() => setIsChangingPassword(!isChangingPassword)}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <FiLock className="text-lg" />
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
                      />
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button
                        onClick={handleChangePassword}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        تغییر رمز عبور
                      </button>
                      <button
                        onClick={() => setIsChangingPassword(false)}
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
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
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
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.email}
                      onChange={() => handleNotificationChange("email")}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
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
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.sms}
                      onChange={() => handleNotificationChange("sms")}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

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
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
