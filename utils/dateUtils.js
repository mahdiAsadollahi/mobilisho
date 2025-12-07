// utils/dateUtils.js
import { format } from "date-fns-jalali";

export const formatToJalali = (date, formatStr = "yyyy/MM/dd") => {
  if (!date) return "";
  try {
    return format(date, formatStr);
  } catch (error) {
    console.error("Error formatting date:", error);
    return new Intl.DateTimeFormat("fa-IR").format(date);
  }
};

export const parseJalaliDate = (dateString) => {
  if (!dateString) return undefined;
  try {
    const [year, month, day] = dateString.split("/").map(Number);
    const gregorianYear = year + 621;
    const gregorianDate = new Date(gregorianYear, month - 1, day);
    return gregorianDate;
  } catch (error) {
    console.error("Error parsing date:", error);
    return undefined;
  }
};

export const getTodayJalali = () => {
  return formatToJalali(new Date());
};
