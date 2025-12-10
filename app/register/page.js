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
  FaKey,
  FaRedo,
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
import Swal from "sweetalert2";

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

  const sendVerificationCode = async () => {
    if (!formData.phone) {
      Swal.fire("لطفا شماره همراه را وارد کنید");
      return;
    }

    setIsCodeSent(true);
    setCountdown(120);

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const res = await fetch("/api/auth/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phone: formData.phone,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      Swal.fire("کد تایید به شماره شما ارسال شد");
    } else {
      Swal.fire(data.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // اعتبارسنجی اولیه
    if (!formData.username || formData.username.length < 3) {
      Swal.fire({
        icon: "warning",
        title: "نام کاربری نامعتبر",
        text: "نام کاربری باید حداقل ۳ کاراکتر داشته باشد",
        confirmButtonColor: "#3b82f6",
      });
      return;
    }

    if (
      !formData.phone ||
      !/^(\+98|0)?9\d{9}$/.test(formData.phone.replace(/\s+/g, ""))
    ) {
      Swal.fire({
        icon: "warning",
        title: "شماره تلفن نامعتبر",
        text: "لطفا شماره تلفن معتبر وارد کنید (مانند 09123456789)",
        confirmButtonColor: "#3b82f6",
      });
      return;
    }

    if (formData.password.length < 8) {
      Swal.fire({
        icon: "warning",
        title: "رمز عبور کوتاه",
        text: "رمز عبور باید حداقل ۸ کاراکتر داشته باشد",
        confirmButtonColor: "#3b82f6",
      });
      return;
    }

    if (
      !/(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/.test(
        formData.password
      )
    ) {
      Swal.fire({
        icon: "warning",
        title: "رمز عبور ضعیف",
        text: "رمز عبور باید شامل حروف بزرگ، کوچک، عدد و کاراکتر ویژه باشد",
        confirmButtonColor: "#3b82f6",
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "عدم تطابق رمز عبور",
        text: "رمز عبور و تکرار آن مطابقت ندارند",
        confirmButtonColor: "#ef4444",
      });
      return;
    }

    if (!formData.verificationCode || formData.verificationCode.length !== 6) {
      Swal.fire({
        icon: "warning",
        title: "کد تایید نامعتبر",
        text: "لطفا کد تایید ۶ رقمی را وارد کنید",
        confirmButtonColor: "#3b82f6",
      });
      return;
    }

    if (!isCodeSent) {
      Swal.fire({
        icon: "warning",
        title: "کد تایید ارسال نشده",
        text: "لطفا ابتدا کد تایید را دریافت کنید",
        confirmButtonColor: "#3b82f6",
      });
      return;
    }

    Swal.fire({
      title: "در حال ثبت نام...",
      text: "لطفا منتظر بمانید",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          phone: formData.phone,
          password: formData.password,
          verificationCode: formData.verificationCode,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        Swal.close();

        Swal.fire({
          icon: "success",
          title: "ثبت نام موفق",
          text: data.message || "حساب کاربری با موفقیت ایجاد شد",
          confirmButtonColor: "#10b981",
          confirmButtonText: "ورود به پنل کاربری",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/login";
          }
        });

        setFormData({
          username: "",
          phone: "",
          password: "",
          confirmPassword: "",
          verificationCode: "",
        });
        setIsCodeSent(false);
        setCountdown(0);
      } else {
        Swal.fire({
          icon: "error",
          title: "خطا در ثبت نام",
          text: data.message || "خطایی رخ داده است",
          confirmButtonColor: "#ef4444",
        });

        if (data.message?.includes("کد تایید") || res.status === 400) {
          setIsCodeSent(false);
          setCountdown(0);
          setFormData({
            ...formData,
            verificationCode: "",
          });
        }
      }
    } catch (error) {
      console.error("Register error:", error);
      Swal.fire({
        icon: "error",
        title: "خطای ارتباط",
        text: "خطا در ارتباط با سرور. لطفا دوباره تلاش کنید",
        confirmButtonColor: "#ef4444",
      });
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
          <form onSubmit={handleSubmit} className="space-y-6">
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
                  className={`whitespace-nowrap px-4 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2 ${
                    countdown > 0
                      ? "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-gray-700"
                      : "bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white"
                  }`}
                >
                  {countdown > 0 ? (
                    <>
                      <span className="text-xs">{countdown} ثانیه</span>
                    </>
                  ) : isCodeSent ? (
                    <>
                      <FaRedo className="text-sm" />
                      <span>ارسال مجدد</span>
                    </>
                  ) : (
                    <>
                      <FaKey className="text-sm" />
                      <span>ارسال کد</span>
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* کد تایید - UI بهبود یافته */}
            {isCodeSent && (
              <div className="space-y-3 animate-slide-down">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <div className="p-2 bg-linear-to-r from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-800/30 rounded-lg">
                      <FaKey className="text-blue-600 dark:text-blue-400 text-sm" />
                    </div>
                    کد تایید
                  </label>
                  <span className="text-xs bg-linear-to-r from-blue-500 to-blue-600 text-white px-3 py-1 rounded-full font-medium">
                    کد 6 رقمی
                  </span>
                </div>

                <div className="relative group">
                  <Input
                    type="text"
                    name="verificationCode"
                    value={formData.verificationCode}
                    onChange={handleChange}
                    placeholder="ـــ ـــ ـــ ـــ ـــ ـــ"
                    required
                    className="w-full bg-linear-to-r from-blue-50/80 to-blue-50/50 dark:from-blue-900/20 dark:to-blue-800/20 border-2 border-blue-200 dark:border-blue-800 focus:border-blue-400 dark:focus:border-blue-500 transition-all duration-300 rounded-xl px-4 py-3 text-center text-lg tracking-widest font-bold placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900"
                    maxLength={6}
                  />
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                  <span>کد تایید تا ۲ دقیقه دیگر منقضی می‌شود</span>
                </div>
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
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
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
        .animate-slide-down {
          animation: slide-down 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
