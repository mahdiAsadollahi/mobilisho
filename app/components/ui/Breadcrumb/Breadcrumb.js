// components/ui/Breadcrumb/Breadcrumb.js
"use client";

import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa";

const Breadcrumb = ({ items }) => {
  return (
    <nav className="flex items-center gap-2 text-sm py-4 mt-[5px]">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          {index < items.length - 1 ? (
            <>
              <Link
                href={item.href}
                className="text-gray-600 hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
              <FaChevronLeft className="text-gray-400 text-xs" />
            </>
          ) : (
            <span className="text-gray-900">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumb;
