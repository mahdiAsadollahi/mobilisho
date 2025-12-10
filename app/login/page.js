// LoginPage.js
"use client";
import { useState } from "react";
import {
  FaPhone,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaSignInAlt,
  FaKey,
  FaUserCircle,
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

export default function LoginPage() {
  const [formData, setFormData] = useState({
    phone: "",
    password: "",
    verificationCode: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
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

  const handleLogin = async (e) => {
    e.preventDefault();

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

    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: formData.phone,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        Swal.close();

        Swal.fire({
          icon: "success",
          title: "ورود موفق",
          text: data.message || "به حساب کاربری با موفقیت وارد شدید :))",
          confirmButtonColor: "#10b981",
          confirmButtonText: "ورود به پنل کاربری",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/dashboard";
          }
        });

        setFormData({
          username: "",
          phone: "",
          password: "",
          confirmPassword: "",
          verificationCode: "",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "خطا در ورود",
          text: data.message || "خطایی رخ داده است",
          confirmButtonColor: "#ef4444",
        });
      }
    } catch (err) {
      console.error("Register error:", error);
      Swal.fire({
        icon: "error",
        title: "خطای ارتباط",
        text: "خطا در ارتباط با سرور. لطفا دوباره تلاش کنید",
        confirmButtonColor: "#ef4444",
      });
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // اعتبارسنجی شماره تلفن
    if (
      !formData.phone ||
      !/^(\+98|0)?9\d{9}$/.test(formData.phone.replace(/\s+/g, ""))
    ) {
      Swal.fire({
        icon: "warning",
        title: "شماره تلفن نامعتبر",
        text: "لطفا شماره تلفن معتبر وارد کنید",
        confirmButtonColor: "#3b82f6",
      });
      setIsLoading(false);
      return;
    }

    // اگر کد ارسال نشده، ارسال کن
    if (!isCodeSent) {
      await sendVerificationCode();
      setIsLoading(false);
      return;
    }

    // اعتبارسنجی کد تأیید
    if (
      !formData.verificationCode ||
      !/^\d{6}$/.test(formData.verificationCode)
    ) {
      Swal.fire({
        icon: "warning",
        title: "کد تأیید نامعتبر",
        text: "لطفا کد تأیید ۶ رقمی را وارد کنید",
        confirmButtonColor: "#3b82f6",
      });
      setIsLoading(false);
      return;
    }

    // اعتبارسنجی رمز عبور جدید
    if (!formData.newPassword || formData.newPassword.length < 8) {
      Swal.fire({
        icon: "warning",
        title: "رمز عبور کوتاه",
        text: "رمز عبور باید حداقل ۸ کاراکتر باشد",
        confirmButtonColor: "#3b82f6",
      });
      setIsLoading(false);
      return;
    }

    // اعتبارسنجی تطابق رمز عبور
    if (formData.newPassword !== formData.confirmNewPassword) {
      Swal.fire({
        icon: "error",
        title: "عدم تطابق رمز عبور",
        text: "رمز عبور جدید و تکرار آن مطابقت ندارند",
        confirmButtonColor: "#ef4444",
      });
      setIsLoading(false);
      return;
    }

    // اعتبارسنجی قوی بودن رمز عبور
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!strongPasswordRegex.test(formData.newPassword)) {
      Swal.fire({
        icon: "warning",
        title: "رمز عبور ضعیف",
        text: "رمز عبور باید شامل حروف بزرگ، کوچک، عدد و کاراکتر ویژه باشد",
        confirmButtonColor: "#3b82f6",
      });
      setIsLoading(false);
      return;
    }

    try {
      Swal.fire({
        title: "در حال تغییر رمز عبور...",
        text: "لطفا منتظر بمانید",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: formData.phone,
          code: formData.verificationCode,
          newPassword: formData.newPassword,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "رمز عبور تغییر کرد",
          text: data.message || "رمز عبور شما با موفقیت تغییر یافت",
          confirmButtonColor: "#10b981",
          confirmButtonText: "ورود با رمز جدید",
        }).then((result) => {
          if (result.isConfirmed) {
            // برگشت به صفحه لاگین
            setIsForgotPassword(false);
            setIsCodeSent(false);
            setCountdown(0);
            setFormData({
              phone: "",
              password: "",
              verificationCode: "",
              newPassword: "",
              confirmNewPassword: "",
            });
          }
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "خطا در تغییر رمز",
          text: data.message || "خطایی در تغییر رمز عبور رخ داد",
          confirmButtonColor: "#ef4444",
        });

        // اگر خطا مربوط به کد تأیید بود
        if (res.status === 400 || data.message?.includes("کد")) {
          setFormData({
            ...formData,
            verificationCode: "",
          });
        }
      }
    } catch (error) {
      console.error("Reset password error:", error);
      Swal.fire({
        icon: "error",
        title: "خطای ارتباط",
        text: "خطا در ارتباط با سرور",
        confirmButtonColor: "#ef4444",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen my-10 bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-10 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(0,0,0,0.02)_25%,rgba(0,0,0,0.02)_50%,transparent_50%,transparent_75%,rgba(0,0,0,0.02)_75%)] bg-size-[20px_20px]"></div>

      <Card className="w-full max-w-md bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-2xl relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-linear-to-br from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 rounded-full opacity-10"></div>
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-linear-to-br from-gray-400 to-gray-500 dark:from-gray-700 dark:to-gray-800 rounded-full opacity-10"></div>

        <CardHeader className="text-center relative z-10 pb-6">
          <div className="w-16 h-16 mx-auto mb-4 bg-linear-to-br from-gray-800 to-gray-600 dark:from-gray-600 dark:to-gray-800 rounded-2xl flex items-center justify-center shadow-lg">
            <FaUserCircle className="text-2xl text-white" />
          </div>
          <CardTitle className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
            {isForgotPassword ? "بازیابی رمز" : "ورود به حساب"}
          </CardTitle>
          <p className="text-gray-500 dark:text-gray-400 mt-3 text-sm font-medium">
            {isForgotPassword
              ? "برای بازیابی رمز عبور شماره تلفن خود را وارد کنید"
              : "لطفا اطلاعات حساب خود را وارد کنید"}
          </p>
        </CardHeader>

        <CardContent className="relative z-10">
          <form
            onSubmit={isForgotPassword ? handleResetPassword : handleLogin}
            className="space-y-5"
          >
            {/* شماره تلفن */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <FaPhone className="text-gray-600 dark:text-gray-400 text-sm" />
                </div>
                شماره تلفن
              </label>
              <Input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="09XXXXXXXXX"
                required
                className="w-full bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 focus:border-gray-400 dark:focus:border-gray-500 transition-all duration-200 rounded-xl px-4 py-3"
              />
            </div>

            {!isForgotPassword ? (
              /* رمز عبور برای حالت ورود */
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
            ) : (
              /* کد تایید برای حالت بازیابی رمز عبور */
              <>
                <div className="space-y-3 animate-fade-in">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    کد تایید
                  </label>
                  <div className="flex gap-3">
                    <Input
                      type="text"
                      name="verificationCode"
                      value={formData.verificationCode}
                      onChange={handleChange}
                      placeholder="کد ارسال شده را وارد کنید"
                      required
                      className="flex-1 bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 focus:border-gray-400 dark:focus:border-gray-500 transition-all duration-200 rounded-xl px-4 py-3"
                    />
                    <Button
                      type="button"
                      onClick={sendVerificationCode}
                      disabled={countdown > 0}
                      variant={countdown > 0 ? "outline" : "default"}
                      className="whitespace-nowrap bg-gray-800 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 text-white border-0 px-4 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      {countdown > 0 ? `${countdown} ثانیه` : "ارسال کد"}
                    </Button>
                  </div>
                </div>

                {/* رمز عبور جدید */}
                <div className="space-y-3 animate-fade-in">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    رمز عبور جدید
                  </label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="رمز عبور جدید را وارد کنید"
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
              </>
            )}

            {/* دکمه‌های اصلی */}
            <Button
              type="submit"
              className="w-full bg-linear-to-r from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 dark:from-gray-700 dark:to-gray-600 dark:hover:from-gray-600 dark:hover:to-gray-500 text-white py-3.5 rounded-xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-0.5 mt-6"
            >
              {isForgotPassword ? (
                <FaKey className="ml-2" />
              ) : (
                <FaSignInAlt className="ml-2" />
              )}
              {isForgotPassword ? "بازیابی رمز عبور" : "ورود به حساب"}
            </Button>

            {/* لینک‌های کمکی */}
            <div className="flex flex-col gap-3 text-center pt-4">
              {!isForgotPassword ? (
                <>
                  <button
                    type="button"
                    onClick={() => setIsForgotPassword(true)}
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300 text-sm font-medium transition-colors duration-200 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    رمز عبور خود را فراموش کرده‌اید؟
                  </button>
                  <div className="pt-2">
                    <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                      حساب کاربری ندارید؟{" "}
                    </span>
                    <Link
                      href="/register"
                      className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-bold text-sm transition-colors duration-200 border-b-2 border-gray-300 dark:border-gray-600 hover:border-gray-700 dark:hover:border-gray-400 pb-0.5"
                    >
                      ثبت نام کنید
                    </Link>
                  </div>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsForgotPassword(false)}
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300 text-sm font-medium transition-colors duration-200 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  بازگشت به صفحه ورود
                </button>
              )}
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
