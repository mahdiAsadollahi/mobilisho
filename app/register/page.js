// RegisterPage.js
"use client";
import { useState } from "react";
import {
  FaUser,
  FaPhone,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaCheckCircle,
  FaShieldAlt,
} from "react-icons/fa";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/app/components/ui/Card/Card";
import { Input } from "@/app/components/ui/Input/Input";
import { Button } from "@/app/components/ui/Button/Button";
import Link from "next/link";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: "",
    phone: "",
    password: "",
    confirmPassword: "",
    verificationCode: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const sendVerificationCode = () => {
    if (!formData.phone) {
      alert("لطفا شماره تلفن را وارد کنید");
      return;
    }

    setIsCodeSent(true);
    setCountdown(60);

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    console.log("ارسال کد تایید به:", formData.phone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("رمز عبور و تکرار آن مطابقت ندارند");
      return;
    }

  };

  return (
    <div className="min-h-screen my-12 bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-10 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(0,0,0,0.02)_25%,rgba(0,0,0,0.02)_50%,transparent_50%,transparent_75%,rgba(0,0,0,0.02)_75%)] bg-size[20px_20px]"></div>

      <Card className="w-full max-w-md bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-2xl relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-linear-to-br from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 rounded-full opacity-10"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-linear-to-br from-gray-400 to-gray-500 dark:from-gray-700 dark:to-gray-800 rounded-full opacity-10"></div>

        <CardHeader className="text-center relative z-10 pb-6">
          <div className="w-16 h-16 mx-auto mb-4 bg-linear-to-br from-gray-800 to-gray-600 dark:from-gray-600 dark:to-gray-800 rounded-2xl flex items-center justify-center shadow-lg">
            <FaShieldAlt className="text-2xl text-white" />
          </div>
          <CardTitle className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
            ایجاد حساب
          </CardTitle>
          <p className="text-gray-500 dark:text-gray-400 mt-3 text-sm font-medium">
            اطلاعات خود را برای ساخت حساب جدید وارد کنید
          </p>
        </CardHeader>

        <CardContent className="relative z-10">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* نام کاربری */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <FaUser className="text-gray-600 dark:text-gray-400 text-sm" />
                </div>
                نام کاربری
              </label>
              <Input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="نام کاربری خود را وارد کنید"
                required
                className="w-full bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 focus:border-gray-400 dark:focus:border-gray-500 transition-all duration-200 rounded-xl px-4 py-3"
              />
            </div>

            {/* شماره تلفن */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <FaPhone className="text-gray-600 dark:text-gray-400 text-sm" />
                </div>
                شماره تلفن
              </label>
              <div className="flex gap-3">
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="09XXXXXXXXX"
                  required
                  className="flex-1 bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 focus:border-gray-400 dark:focus:border-gray-500 transition-all duration-200 rounded-xl px-4 py-3"
                />
                <Button
                  type="button"
                  onClick={sendVerificationCode}
                  disabled={countdown > 0}
                  variant={countdown > 0 ? "outline" : "default"}
                  className="whitespace-nowrap bg-gray-800 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 border-0 px-4 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  {countdown > 0 ? `${countdown} ثانیه` : "ارسال کد"}
                </Button>
              </div>
            </div>

            {/* کد تایید */}
            {isCodeSent && (
              <div className="space-y-3 animate-fade-in">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  کد تایید
                </label>
                <Input
                  type="text"
                  name="verificationCode"
                  value={formData.verificationCode}
                  onChange={handleChange}
                  placeholder="کد ارسال شده را وارد کنید"
                  required
                  className="w-full bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 ring-0 outline-0 focus:ring-0 focus:outline-0 dark:border-gray-600 focus:border-gray-400 dark:focus:border-gray-500 transition-all duration-200 rounded-xl px-4 py-3"
                />
              </div>
            )}

            {/* رمز عبور */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <FaLock className="text-gray-600 dark:text-gray-400 text-sm" />
                </div>
                رمز عبور
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="رمز عبور خود را وارد کنید"
                  required
                  className="w-full bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 focus:border-gray-400 dark:focus:border-gray-500 transition-all duration-200 rounded-xl px-4 py-3 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors duration-200 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* تکرار رمز عبور */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                تکرار رمز عبور
              </label>
              <div className="relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="رمز عبور را تکرار کنید"
                  required
                  className="w-full bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 focus:border-gray-400 dark:focus:border-gray-500 transition-all duration-200 rounded-xl px-4 py-3 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors duration-200 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* دکمه ثبت‌نام */}
            <Button
              type="submit"
              className="w-full bg-linear-to-r from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 dark:from-gray-700 dark:to-gray-600 dark:hover:from-gray-600 dark:hover:to-gray-500 text-white py-3.5 rounded-xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-0.5 mt-6"
            >
              <FaCheckCircle className="ml-2" />
              ایجاد حساب کاربری
            </Button>

            {/* لینک به صفحه ورود */}
            <div className="text-center pt-4">
              <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                حساب کاربری دارید؟{" "}
              </span>
              <Link
                href="/login"
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-bold text-sm transition-colors duration-200 border-b-2 border-gray-300 dark:border-gray-600 hover:border-gray-700 dark:hover:border-gray-400 pb-0.5"
              >
                وارد شوید
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
