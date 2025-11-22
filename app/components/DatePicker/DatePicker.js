// app/admin/discounts/components/DatePicker/DatePicker.js
"use client";
import { useState, useRef, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import { FiCalendar } from "react-icons/fi";
import "react-day-picker/dist/style.css";
import { faIR } from "date-fns/locale";
import { format } from "date-fns-jalali";

const DatePicker = ({ selected, onSelect, placeholder = "انتخاب تاریخ" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDaySelect = (date) => {
    onSelect(date);
    setIsOpen(false);
  };

  // تبدیل تاریخ میلادی به شمسی برای نمایش
  const formatToJalali = (date) => {
    if (!date) return "";
    try {
      return format(date, "yyyy/MM/dd");
    } catch (error) {
      return new Intl.DateTimeFormat("fa-IR").format(date);
    }
  };

  return (
    <div className="relative" ref={containerRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between p-3 border border-gray-300 rounded-lg cursor-pointer bg-white hover:border-gray-400 transition-colors"
      >
        <span className={selected ? "text-gray-800" : "text-gray-500"}>
          {selected ? formatToJalali(selected) : placeholder}
        </span>
        <FiCalendar className="text-gray-400" />
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg z-50 border border-gray-200">
          <DayPicker
            mode="single"
            selected={selected}
            onSelect={handleDaySelect}
            locale={faIR} // تقویم میلادی با متن فارسی
            className="p-3 bg-white"
            dir="rtl"
            
            modifiersClassNames={{
              selected: "bg-blue-500 text-white rounded-full",
              today: "bg-blue-100 text-blue-800 font-bold",
            }}
            styles={{
              caption: {
                color: "#1f2937",
                fontWeight: "bold",
                fontSize: "1.1rem",
              },
              head_cell: {
                color: "#6b7280",
                fontWeight: "500",
                fontSize: "0.9rem",
              },
              cell: {
                color: "#374151",
                fontSize: "0.9rem",
              },
            }}
          />
        </div>
      )}
    </div>
  );
};

export default DatePicker;
