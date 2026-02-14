// app/api/user/me/route.js
import connectToDB from "@/configs/db";
import { verifyAccessToken } from "@/utils/auth";
import { cookies } from "next/headers";
import UserModel from "@/models/User";

export async function GET(req) {
  try {
    await connectToDB();

    const token = cookies().get("token");

    if (!token) {
      return Response.json(
        {
          data: null,
          message: "دسترسی غیرمجاز",
        },
        { status: 401 }
      );
    }

    const tokenPayload = verifyAccessToken(token.value);

    if (!tokenPayload) {
      return Response.json(
        {
          data: null,
          message: "توکن نامعتبر است",
        },
        { status: 401 }
      );
    }

    // پیدا کردن کاربر با شماره تلفن از توکن
    const user = await UserModel.findOne(
      { phone: tokenPayload.phone },
      "_id username phone role isBan"
    );

    if (!user) {
      return Response.json(
        {
          data: null,
          message: "کاربر یافت نشد",
        },
        { status: 404 }
      );
    }

    return Response.json(user);
  } catch (err) {
    console.log("Error in GET user/me:", err.message);

    return Response.json(
      {
        data: null,
        message: "خطا در دریافت اطلاعات کاربر",
      },
      { status: 500 }
    );
  }
}
