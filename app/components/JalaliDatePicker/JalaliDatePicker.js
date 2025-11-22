// components/JalaliDatePicker.jsx
"use client";
import React, { useState, useRef, useEffect } from "react";
import { FaCalendarAlt, FaTimes } from "react-icons/fa";

const JalaliDatePicker = ({
  value = "",
  onChange,
  placeholder = "انتخاب تاریخ",
  className = "",
  disabled = false,
  minDate = null,
  maxDate = null,
  showTodayButton = true,
  showClearButton = true,
  outputFormat = "jalali",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(value);
  const [currentJalali, setCurrentJalali] = useState(getCurrentJalaliDate());
  const [viewMode, setViewMode] = useState("calendar");
  const calendarRef = useRef(null);

  // تابع تبدیل میلادی به شمسی
  function gregorianToJalali(gy, gm, gd) {
    const g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    let jy = gy - 621;
    let gy2 = gm > 2 ? gy + 1 : gy;
    let days =
      355666 +
      365 * gy +
      Math.floor((gy2 + 3) / 4) -
      Math.floor((gy2 + 99) / 100) +
      Math.floor((gy2 + 399) / 400) +
      gd +
      g_d_m[gm - 1];
    jy = -1595 + 33 * Math.floor(days / 12053);
    days %= 12053;
    jy += 4 * Math.floor(days / 1461);
    days %= 1461;
    if (days > 365) {
      jy += Math.floor((days - 1) / 365);
      days = (days - 1) % 365;
    }
    let jm, jd;
    if (days < 186) {
      jm = 1 + Math.floor(days / 31);
      jd = 1 + (days % 31);
    } else {
      jm = 7 + Math.floor((days - 186) / 30);
      jd = 1 + ((days - 186) % 30);
    }
    return [jy, jm, jd];
  }

  // تابع تبدیل شمسی به میلادی
  function jalaliToGregorian(jy, jm, jd) {
    jy += 1595;
    let days =
      -355668 +
      365 * jy +
      Math.floor(jy / 33) * 8 +
      Math.floor(((jy % 33) + 3) / 4) +
      jd +
      (jm < 7 ? (jm - 1) * 31 : (jm - 7) * 30 + 186);
    let gy = 400 * Math.floor(days / 146097);
    days %= 146097;
    if (days > 36524) {
      gy += 100 * Math.floor(--days / 36524);
      days %= 36524;
      if (days >= 365) days++;
    }
    gy += 4 * Math.floor(days / 1461);
    days %= 1461;
    if (days > 365) {
      gy += Math.floor((days - 1) / 365);
      days = (days - 1) % 365;
    }
    let gd = days + 1;
    const sal_a = [
      0,
      31,
      (gy % 4 === 0 && gy % 100 !== 0) || gy % 400 === 0 ? 29 : 28,
      31,
      30,
      31,
      30,
      31,
      31,
      30,
      31,
      30,
      31,
    ];
    let gm;
    for (gm = 0; gm < 13; gm++) {
      let v = sal_a[gm];
      if (gd <= v) break;
      gd -= v;
    }
    return [gy, gm, gd];
  }

  // دریافت تاریخ جاری شمسی
  function getCurrentJalaliDate() {
    const now = new Date();
    return gregorianToJalali(
      now.getFullYear(),
      now.getMonth() + 1,
      now.getDate()
    );
  }

  // فرمت تاریخ به صورت رشته
  const formatDate = (year, month, day) => {
    return `${year}/${month.toString().padStart(2, "0")}/${day
      .toString()
      .padStart(2, "0")}`;
  };

  // تجزیه رشته تاریخ
  const parseDate = (dateString) => {
    if (!dateString) return null;
    const parts = dateString.split("/");
    if (parts.length !== 3) return null;
    return {
      year: parseInt(parts[0]),
      month: parseInt(parts[1]),
      day: parseInt(parts[2]),
    };
  };

  // بررسی تعداد روزهای ماه شمسی
  const getDaysInJalaliMonth = (year, month) => {
    if (month <= 6) return 31;
    if (month <= 11) return 30;
    const leapYears = [1, 5, 9, 13, 17, 22, 26, 30];
    const remainder = year % 33;
    return leapYears.includes(remainder) ? 30 : 29;
  };

  // محاسبه روز هفته برای تاریخ شمسی
  const getJalaliDayOfWeek = (year, month, day) => {
    const gregorianDate = jalaliToGregorian(year, month, day);
    const date = new Date(
      gregorianDate[0],
      gregorianDate[1] - 1,
      gregorianDate[2]
    );
    const dayOfWeek = date.getDay();
    return (dayOfWeek + 1) % 7;
  };

  // بررسی اینکه آیا تاریخ در محدوده مجاز است
  const isDateInRange = (year, month, day) => {
    if (!minDate && !maxDate) return true;

    const dateString = formatDate(year, month, day);

    if (minDate) {
      const minDateObj = parseDate(minDate);
      if (!minDateObj) return true;

      if (year < minDateObj.year) return false;
      if (year === minDateObj.year && month < minDateObj.month) return false;
      if (
        year === minDateObj.year &&
        month === minDateObj.month &&
        day < minDateObj.day
      )
        return false;
    }

    if (maxDate) {
      const maxDateObj = parseDate(maxDate);
      if (!maxDateObj) return true;

      if (year > maxDateObj.year) return false;
      if (year === maxDateObj.year && month > maxDateObj.month) return false;
      if (
        year === maxDateObj.year &&
        month === maxDateObj.month &&
        day > maxDateObj.day
      )
        return false;
    }

    return true;
  };

  // تولید روزهای ماه برای نمایش در تقویم
  const generateDays = () => {
    const year = currentJalali[0];
    const month = currentJalali[1];
    const daysInMonth = getDaysInJalaliMonth(year, month);
    const firstDayOfWeek = getJalaliDayOfWeek(year, month, 1);

    const days = [];
    const persianDays = ["ش", "ی", "د", "س", "چ", "پ", "ج"];

    // اضافه کردن هدر روزهای هفته
    days.push(
      ...persianDays.map((day) => ({
        type: "header",
        label: day,
      }))
    );

    // اضافه کردن خانه‌های خالی قبل از شروع ماه
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push({ type: "empty" });
    }

    // اضافه کردن روزهای ماه
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = formatDate(year, month, day);
      const isSelected = selectedDate === dateString;
      const currentJalaliToday = getCurrentJalaliDate();
      const isToday =
        year === currentJalaliToday[0] &&
        month === currentJalaliToday[1] &&
        day === currentJalaliToday[2];
      const is31DayMonth = month <= 6;
      const isDisabled = !isDateInRange(year, month, day);

      days.push({
        type: "day",
        day,
        date: dateString,
        isSelected,
        isToday,
        is31DayMonth,
        isDisabled,
      });
    }

    return days;
  };

  // تولید لیست سال‌ها
  const generateYears = () => {
    const currentYear = getCurrentJalaliDate()[0];
    const years = [];
    for (let year = currentYear - 10; year <= currentYear + 10; year++) {
      years.push(year);
    }
    return years;
  };

  // مدیریت کلیک خارج از تقویم
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setIsOpen(false);
        setViewMode("calendar");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDateSelect = (date) => {
    let outputDate = date;

    if (outputFormat === "gregorian") {
      const parts = date.split("/");
      if (parts.length === 3) {
        const year = parseInt(parts[0]);
        const month = parseInt(parts[1]);
        const day = parseInt(parts[2]);
        const gregorian = jalaliToGregorian(year, month, day);
        outputDate = `${gregorian[0]}-${gregorian[1]
          .toString()
          .padStart(2, "0")}-${gregorian[2].toString().padStart(2, "0")}`;
      }
    }

    setSelectedDate(date);
    onChange(outputDate);
    setIsOpen(false);
    setViewMode("calendar");
  };

  // پاک کردن تاریخ
  const handleClear = (e) => {
    e.stopPropagation();
    setSelectedDate("");
    onChange("");
  };

  // انتخاب سال از لیست
  const handleYearSelect = (year) => {
    setCurrentJalali([year, currentJalali[1], currentJalali[2]]);
    setViewMode("calendar");
  };

  // انتخاب ماه از لیست
  const handleMonthSelect = (month) => {
    setCurrentJalali([currentJalali[0], month, currentJalali[2]]);
    setViewMode("calendar");
  };

  // تغییر ماه
  const changeMonth = (increment) => {
    let newYear = currentJalali[0];
    let newMonth = currentJalali[1] + increment;

    if (newMonth > 12) {
      newYear++;
      newMonth = 1;
    } else if (newMonth < 1) {
      newYear--;
      newMonth = 12;
    }

    setCurrentJalali([newYear, newMonth, currentJalali[2]]);
  };

  // نام ماه‌های شمسی
  const persianMonths = [
    "فروردین",
    "اردیبهشت",
    "خرداد",
    "تیر",
    "مرداد",
    "شهریور",
    "مهر",
    "آبان",
    "آذر",
    "دی",
    "بهمن",
    "اسفند",
  ];

  const days = generateDays();
  const years = generateYears();

  return (
    <div
      className={`jalali-date-picker relative ${className}`}
      ref={calendarRef}
    >
      <div
        className="date-input-container relative cursor-pointer w-full"
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <input
          type="text"
          value={selectedDate}
          placeholder={placeholder}
          readOnly
          disabled={disabled}
          className="date-input w-full p-3 pr-12 border border-gray-300 rounded-lg bg-gray-50 cursor-pointer transition-all duration-300 focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100"
        />
        <div className="date-icons absolute left-3 top-1/2 transform -translate-y-1/2 flex gap-2 items-center">
          {selectedDate && showClearButton && (
            <FaTimes
              className="clear-icon text-gray-400 hover:text-red-500 cursor-pointer transition-colors"
              onClick={handleClear}
            />
          )}
          <FaCalendarAlt className="calendar-icon text-gray-500" />
        </div>
      </div>

      {isOpen && !disabled && (
        <div className="calendar-popup absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50 min-w-[320px] p-4 animate-fadeIn">
          <div className="calendar-header flex justify-center items-center mb-4">
            <div className="current-date-display">
              <div className="month-year-selector flex gap-3 items-center">
                <button
                  className="nav-button bg-gray-50 border border-gray-200 rounded-lg p-2 hover:bg-gray-100 transition-colors"
                  onClick={() => changeMonth(-1)}
                >
                  ‹
                </button>
                <span
                  className={`year-selector font-semibold px-4 py-2 rounded-lg cursor-pointer transition-colors ${
                    viewMode === "year"
                      ? "bg-purple-600 text-white border-purple-700"
                      : "bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => setViewMode("year")}
                >
                  {currentJalali[0]}
                </span>
                <span
                  className={`month-selector font-semibold px-4 py-2 rounded-lg cursor-pointer transition-colors ${
                    viewMode === "month"
                      ? "bg-purple-600 text-white border-purple-700"
                      : "bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => setViewMode("month")}
                >
                  {persianMonths[currentJalali[1] - 1]}
                </span>
                <button
                  className="nav-button bg-gray-50 border border-gray-200 rounded-lg p-2 hover:bg-gray-100 transition-colors"
                  onClick={() => changeMonth(1)}
                >
                  ›
                </button>
              </div>
            </div>
          </div>

          {viewMode === "calendar" && (
            <>
              <div className="calendar-grid grid grid-cols-7 gap-1 mb-3">
                {days.map((day, index) => (
                  <div
                    key={index}
                    className={`calendar-cell h-9 flex items-center justify-center text-sm rounded-lg transition-all ${
                      day.type === "header"
                        ? "calendar-header-cell font-semibold text-gray-500 text-xs"
                        : day.type === "empty"
                        ? "calendar-empty-cell"
                        : `calendar-day-cell cursor-pointer border border-transparent ${
                            day.isSelected
                              ? "bg-purple-600 text-white border-purple-700 font-semibold"
                              : day.isToday
                              ? "border-purple-600 text-purple-600 font-semibold"
                              : day.is31DayMonth
                              ? "bg-gray-50 text-gray-700"
                              : "bg-white text-gray-700"
                          } ${
                            day.isDisabled
                              ? "text-gray-400 cursor-not-allowed bg-gray-100"
                              : "hover:bg-gray-100 hover:border-gray-300 hover:translate-y-px]"
                          }`
                    }`}
                    onClick={() =>
                      day.type === "day" &&
                      !day.isDisabled &&
                      handleDateSelect(day.date)
                    }
                  >
                    {day.type === "header" && day.label}
                    {day.type === "day" && day.day}
                  </div>
                ))}
              </div>

              <div className="calendar-footer flex justify-between pt-3 border-t border-gray-100">
                {showTodayButton && (
                  <button
                    className="today-button bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm"
                    onClick={() => {
                      const today = getCurrentJalaliDate();
                      setCurrentJalali(today);
                      handleDateSelect(formatDate(...today));
                    }}
                  >
                    امروز
                  </button>
                )}
                <button
                  className="confirm-button bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors text-sm"
                  onClick={() => setIsOpen(false)}
                >
                  تایید
                </button>
              </div>
            </>
          )}

          {viewMode === "year" && (
            <>
              <div className="year-month-grid grid grid-cols-4 gap-2 max-h-60 overflow-y-auto p-2">
                {years.map((year) => (
                  <div
                    key={year}
                    className={`year-cell h-12 flex items-center justify-center text-sm rounded-lg cursor-pointer transition-all ${
                      year === currentJalali[0]
                        ? "bg-purple-600 text-white border-2 border-purple-700 font-semibold"
                        : "bg-gray-50 border-2 border-transparent text-gray-700 hover:bg-gray-100 hover:translate-y-px"
                    }`}
                    onClick={() => handleYearSelect(year)}
                  >
                    {year}
                  </div>
                ))}
              </div>
              <div className="calendar-footer flex justify-between pt-3 border-t border-gray-100">
                <button
                  className="back-button bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors text-sm"
                  onClick={() => setViewMode("calendar")}
                >
                  بازگشت
                </button>
              </div>
            </>
          )}

          {viewMode === "month" && (
            <>
              <div className="year-month-grid grid grid-cols-4 gap-2 max-h-60 overflow-y-auto p-2">
                {persianMonths.map((month, index) => (
                  <div
                    key={index}
                    className={`month-cell h-12 flex items-center justify-center text-sm rounded-lg cursor-pointer transition-all ${
                      index + 1 === currentJalali[1]
                        ? "bg-purple-600 text-white border-2 border-purple-700 font-semibold"
                        : "bg-gray-50 border-2 border-transparent text-gray-700 hover:bg-gray-100 hover:translate-y-px"
                    }`}
                    onClick={() => handleMonthSelect(index + 1)}
                  >
                    {month}
                  </div>
                ))}
              </div>
              <div className="calendar-footer flex justify-between pt-3 border-t border-gray-100">
                <button
                  className="back-button bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors text-sm"
                  onClick={() => setViewMode("calendar")}
                >
                  بازگشت
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default JalaliDatePicker;
