// app/blog/[slug]/error.js
"use client";

import { useEffect } from "react";
import { FaExclamationTriangle } from "react-icons/fa";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="max-w-7xl mx-auto p-5 sm:p-10 md:p-16">
      <div className="text-center py-16">
        <FaExclamationTriangle className="mx-auto text-red-500 text-4xl mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          خطا در بارگذاری مقاله
        </h2>
        <p className="text-gray-600 mb-8">
          متاسفانه مشکلی در بارگذاری مقاله پیش آمده است.
        </p>
        <button
          onClick={reset}
          className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors"
        >
          تلاش مجدد
        </button>
      </div>
    </div>
  );
}
