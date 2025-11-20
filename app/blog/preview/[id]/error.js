// app/blog/preview/[id]/error.js
"use client";

import { useEffect } from "react";
import { FaExclamationTriangle, FaArrowRight } from "react-icons/fa";
import Link from "next/link";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error("Preview Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        <FaExclamationTriangle className="mx-auto text-red-500 text-4xl mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          خطا در بارگذاری پیش‌نمایش
        </h2>
        <p className="text-gray-600 mb-6">
          متاسفانه مشکلی در بارگذاری پیش‌نمایش مقاله پیش آمده است.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors flex items-center justify-center gap-2"
          >
            تلاش مجدد
          </button>
          <Link
            href="/admin/articles"
            className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
          >
            <FaArrowRight size={14} />
            بازگشت به مدیریت
          </Link>
        </div>
      </div>
    </div>
  );
}
