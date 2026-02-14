// app/api/auth/logout/route.js
import { cookies } from "next/headers";

export async function POST() {
  try {
    cookies().delete("token");

    return Response.json({ message: "خروج موفقیت‌آمیز" }, { status: 200 });
  } catch (error) {
    return Response.json({ message: "خطا در خروج" }, { status: 500 });
  }
}
