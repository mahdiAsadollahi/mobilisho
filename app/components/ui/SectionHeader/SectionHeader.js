// components/ui/SectionHeader/SectionHeader.js
"use client";

import {
  FaMobileAlt,
  FaGift,
  FaStar,
  FaArrowLeft,
  FaBlog,
} from "react-icons/fa";

const SectionHeader = ({
  title = "پیشنهادات ویژه",
  subtitle = "نمایش همه",
  icon = "gift",
  href = "#",
}) => {
  const getIcon = () => {
    switch (icon) {
      case "mobile":
        return <FaMobileAlt className="text-xl" />;
      case "star":
        return <FaStar className="text-xl" />;
      case "blog":
        return <FaBlog className="text-xl" />;
      case "gift":
      default:
        return <FaGift className="text-xl" />;
    }
  };

  return (
    <div className="flex items-center gap-4 md:gap-6">
      <div className="flex justify-center items-center w-12 h-12 bg-white border border-gray-200 rounded-xl hover:bg-white text-primary transition-colors">
        <span className="text-[22px] leading-none">{getIcon()}</span>
      </div>

      <div className="flex flex-col items-start justify-center gap-1">
        <h3 className="text-lg md:text-3xl font-bold tracking-[-0.065em] text-right">
          {title}
        </h3>
        <a
          href={href}
          className="tracking-[-0.065em] text-xs text-gray-400 cursor-pointer hover:text-primary transition-colors flex items-center gap-1"
        >
          {subtitle}
          <FaArrowLeft className="text-xs" />
        </a>
      </div>
    </div>
  );
};

export default SectionHeader;
