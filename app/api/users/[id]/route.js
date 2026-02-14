// app/api/user/[id]/route.js
import connectToDB from "@/configs/db";
import { hashPassword, validatePassword, validatePhone } from "@/utils/auth";
import UserModel from "@/models/User";

export async function PUT(req, { params }) {
  try {
    await connectToDB();

    const { id } = await params;
    const body = await req.json();

    const { username, phone, role, password } = body;

    // اعتبارسنجی شماره تلفن
    const isValidPhone = validatePhone(phone);
    if (!isValidPhone) {
      return Response.json(
        { message: "شماره تلفن نامعتبر است" },
        { status: 400 }
      );
    }

    // آماده‌سازی داده‌های به‌روزرسانی
    const updateData = {
      username,
      phone,
      role,
    };

    // اگر رمز عبور جدید داده شده، هش کن
    if (password) {
      const isValidPassword = validatePassword(password);
      if (!isValidPassword) {
        return Response.json(
          { message: "رمز عبور باید حداقل ۸ کاراکتر باشد" },
          { status: 400 }
        );
      }

      const hashedPassword = await hashPassword(password);
      updateData.password = hashedPassword; // توجه: فیلد password در مدل
    }

    // به‌روزرسانی کاربر و دریافت نسخه ساده شده
    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: id },
      { $set: updateData },
      { new: true } // این باعث میشه کاربر به‌روز شده رو برگردونه
    ).select("-__v -password"); // حذف فیلدهای اضافی

    if (!updatedUser) {
      return Response.json({ message: "کاربر یافت نشد" }, { status: 404 });
    }

    // تبدیل به آبجکت ساده جاوااسکریپتی
    const userObject = updatedUser.toObject();

    return Response.json(
      {
        message: "کاربر با موفقیت ویرایش شد",
        data: userObject,
      },
      { status: 200 } // status 200 برای PUT مناسب‌تره
    );
  } catch (err) {
    console.log("Error ->", err.message);

    return Response.json(
      {
        message: "خطا در ویرایش کاربر",
        error: err.message,
      },
      { status: 500 }
    );
  }
}

export async function GET(req, { params }) {
  try {
    await connectToDB();

    const { id } = await params;

    // دریافت کاربر با select مناسب
    const user = await UserModel.findById(id)
      .select("-__v -password -refreshToken -updatedAt")
      .lean();

    if (!user) {
      return Response.json({ message: "کاربر یافت نشد" }, { status: 404 });
    }

    return Response.json(
      {
        message: "اطلاعات کاربر با موفقیت دریافت شد",
        data: user,
      },
      { status: 200 }
    );
  } catch (err) {
    console.log("Error in GET user:", err.message);

    return Response.json(
      {
        message: "دریافت کاربر با خطا مواجه شد",
        error: err.message,
      },
      { status: 500 }
    );
  }
}
