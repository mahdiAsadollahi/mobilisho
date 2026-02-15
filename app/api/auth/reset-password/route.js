// app/api/auth/reset-password/route.js
import { verifyPassword, hashPassword, validatePassword } from "@/utils/auth";
import UserModel from "@/models/User";
import { cookies } from "next/headers";
import connectToDB from "@/configs/db";
import { verifyAccessToken } from "@/utils/auth";

export async function POST(req) {
  try {
    await connectToDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return Response.json({ message: "دسترسی غیرمجاز" }, { status: 401 });
    }

    const tokenPayload = verifyAccessToken(token);

    if (!tokenPayload) {
      return Response.json({ message: "توکن نامعتبر است" }, { status: 401 });
    }

    const { currentPassword, newPassword } = await req.json();

    if (!currentPassword || !newPassword) {
      return Response.json(
        { message: "لطفا رمز عبور فعلی و جدید را وارد کنید" },
        { status: 400 }
      );
    }

    const isValidPassword = validatePassword(newPassword);

    if (!isValidPassword) {
      return Response.json(
        {
          message:
            "رمز عبور جدید باید حداقل ۸ کاراکتر و شامل حرف بزرگ، کوچک، عدد و کاراکتر خاص باشد",
        },
        { status: 400 }
      );
    }

    const user = await UserModel.findOne({ phone: tokenPayload.phone });

    if (!user) {
      return Response.json({ message: "کاربر یافت نشد" }, { status: 404 });
    }

    const isPasswordValid = await verifyPassword(
      currentPassword,
      user.password
    );

    if (!isPasswordValid) {
      return Response.json(
        { message: "رمز عبور فعلی اشتباه است" },
        { status: 400 }
      );
    }

    const hashedPassword = await hashPassword(newPassword);

    await UserModel.updateOne(
      { phone: tokenPayload.phone },
      { $set: { password: hashedPassword } }
    );

    return Response.json(
      { message: "رمز عبور با موفقیت تغییر کرد" },
      { status: 200 }
    );
  } catch (err) {
    return Response.json(
      {
        message: "خطا در سرور. در صورت رفع نشدن با پشتیبانی ارتباط برقرار کنید",
      },
      { status: 500 }
    );
  }
}
