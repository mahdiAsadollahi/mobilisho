// components/ui/Breadcrumb/Breadcrumb.js
"use client";

import Link from "next/link";
import { FaChevronLeft, FaHome } from "react-icons/fa";

const Breadcrumb = ({ items }) => {
  return (
    <nav className="flex items-center gap-3 py-5 mt-2">
      {/* خانه */}
      <Link
        href="/"
        className="flex items-center gap-2 text-gray-500 hover:text-primary transition-all duration-300 p-2 rounded-lg hover:bg-gray-100 group"
      >
        <FaHome className="text-lg group-hover:scale-110 transition-transform" />
      </Link>

      <FaChevronLeft className="text-gray-300 text-xs mx-1" />

      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-3">
          {index < items.length - 1 ? (
            <>
              <Link
                href={item.href}
                className="text-gray-600 hover:text-primary transition-all duration-300 px-3 py-1 rounded-lg hover:bg-blue-50 group flex items-center gap-2"
              >
                <span className="group-hover:translate-x-0.5 transition-transform">
                  {item.label}
                </span>
              </Link>
              <FaChevronLeft className="text-gray-300 text-xs" />
            </>
          ) : (
            <span className=" text-black px-4 py-2 rounded-xl font-medium flex items-center gap-2">
              <span className="p-1 rounded-lg">
                {item.icon && <item.icon className="text-sm" />}
              </span>
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumb;
