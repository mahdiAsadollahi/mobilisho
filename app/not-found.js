// app/not-found.js
import Link from "next/link";
import { FaHome, FaExclamationTriangle } from "react-icons/fa";

export default function NotFound() {
  return (
    <main className="w-full min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-3 py-8">
      <div className="container mx-auto max-w-2xl lg:max-w-3xl px-4 sm:px-6">
        <div className="bg-white dark:bg-gray-900 rounded-2xl lg:rounded-3xl shadow-xl p-6 sm:p-8 md:p-10 text-center">
          {/* آیکون */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <div className="p-4 sm:p-5 bg-red-100 dark:bg-red-900/30 rounded-full">
              <FaExclamationTriangle className="text-4xl sm:text-5xl md:text-6xl text-red-500 dark:text-red-400" />
            </div>
          </div>

          {/* متن خطا */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-gray-800 dark:text-white mb-3 sm:mb-4">
            ۴۰۴
          </h1>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-300 mb-4 sm:mb-6">
            صفحه مورد نظر یافت نشد!
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 max-w-xl mx-auto leading-relaxed">
            متأسفانه صفحه‌ای که به دنبال آن هستید وجود ندارد یا حذف شده است.
            می‌توانید به صفحه اصلی بازگردید.
          </p>

          {/* دکمه بازگشت */}
          <div className="flex justify-center items-center mb-6 sm:mb-8">
            <Link
              href="/"
              className="bg-primary text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl hover:bg-primary/90 transition-all duration-300 font-medium flex items-center gap-2 sm:gap-3 text-base sm:text-lg"
            >
              <FaHome className="text-lg sm:text-xl" />
              بازگشت به صفحه اصلی
            </Link>
          </div>

          {/* اطلاعات مفید */}
          <div className="grid grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="text-center">
              <div className="text-lg sm:text-xl md:text-2xl font-bold text-primary mb-1 sm:mb-2">
                ۱۰۰+
              </div>
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                مقاله آموزشی
              </div>
            </div>
            <div className="text-center">
              <div className="text-lg sm:text-xl md:text-2xl font-bold text-primary mb-1 sm:mb-2">
                ۵۰+
              </div>
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                محصول ویژه
              </div>
            </div>
            <div className="text-center">
              <div className="text-lg sm:text-xl md:text-2xl font-bold text-primary mb-1 sm:mb-2">
                ۲۴/۷
              </div>
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                پشتیبانی
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
