// app/blog/[slug]/not-found.js
import Link from "next/link";
import { FaHome, FaSearch } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="max-w-7xl mx-auto p-5 sm:p-10 md:p-16">
      <div className="text-center py-16">
        <h1 className="text-6xl font-bold text-gray-300 mb-4">۴۰۴</h1>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          مقاله مورد نظر یافت نشد
        </h2>
        <p className="text-gray-600 mb-8">
          متاسفانه مقاله‌ای که به دنبال آن هستید وجود ندارد یا حذف شده است.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/"
            className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors flex items-center gap-2"
          >
            <FaHome />
            بازگشت به خانه
          </Link>
          <Link
            href="/blog"
            className="border border-primary text-primary px-6 py-3 rounded-lg hover:bg-primary hover:text-white transition-colors flex items-center gap-2"
          >
            <FaSearch />
            مشاهده همه مقالات
          </Link>
        </div>
      </div>
    </div>
  );
}
