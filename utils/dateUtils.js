// utils/dateUtils.js
import { format } from "date-fns-jalali";

// تبدیل تاریخ میلادی به رشته شمسی
export const formatToJalali = (date, formatStr = "yyyy/MM/dd") => {
  if (!date) return "";
  try {
    return format(date, formatStr);
  } catch (error) {
    console.error("Error formatting date:", error);
    // fallback به Intl
    return new Intl.DateTimeFormat("fa-IR").format(date);
  }
};

// تبدیل رشته شمسی به تاریخ میلادی
export const parseJalaliDate = (dateString) => {
  if (!dateString) return undefined;
  try {
    // این یک تبدیل ساده است - در پروژه واقعی از کتابخانه مناسب استفاده کنید
    const [year, month, day] = dateString.split("/").map(Number);
    // تقریبی برای تبدیل شمسی به میلادی
    const gregorianYear = year + 621;
    const gregorianDate = new Date(gregorianYear, month - 1, day);
    return gregorianDate;
  } catch (error) {
    console.error("Error parsing date:", error);
    return undefined;
  }
};

// گرفتن تاریخ امروز به شمسی
export const getTodayJalali = () => {
  return formatToJalali(new Date());
};
