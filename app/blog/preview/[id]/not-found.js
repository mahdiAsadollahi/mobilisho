// app/blog/preview/[id]/not-found.js
import Link from "next/link";
import { FaHome, FaArrowRight, FaSearch } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="text-6xl font-bold text-gray-300 mb-4">۴۰۴</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          مقاله مورد نظر یافت نشد
        </h2>
        <p className="text-gray-600 mb-8">
          متاسفانه مقاله‌ای که به دنبال آن هستید وجود ندارد یا حذف شده است. این
          صفحه پیش‌نمایش فقط برای مقالات موجود قابل دسترسی است.
        </p>
        <div className="flex flex-col gap-3">
          <Link
            href="/admin/articles"
            className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors flex items-center justify-center gap-2"
          >
            <FaArrowRight size={16} />
            بازگشت به مدیریت مقالات
          </Link>
          <Link
            href="/admin/articles/create"
            className="border border-primary text-primary px-6 py-3 rounded-lg hover:bg-primary hover:text-white transition-colors flex items-center justify-center gap-2"
          >
            ایجاد مقاله جدید
          </Link>
        </div>
      </div>
    </div>
  );
}
