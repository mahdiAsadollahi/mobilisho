import connectToDB from "@/configs/db";
import { hashPassword, validatePassword, validatePhone } from "@/utils/auth";
import UserModel from "@/models/User";

export async function PUT(req, { params }) {
  try {
    await connectToDB();

    const param = await params;
    const { id } = await params;
    const body = await req.json();

    const { username, phone, role, password } = body;

    const isValidPhone = validatePhone(phone);

    if (!isValidPhone) {
      return Response.json(
        { message: "شماره یا رمز عبور نامعتبر" },
        { status: 400 }
      );
    }

    console.log("ID ->", id);
    console.log("PARAMS ->", param);

    if (password) {
      const isValidPassword = validatePassword(password);

      if (!isValidPhone) {
        return Response.json(
          { message: "شماره یا رمز عبور نامعتبر" },
          { status: 400 }
        );
      }

      const hashedPassword = await hashPassword(password);

      const updatedUser = await UserModel.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            username,
            phone,
            role,
            hashedPassword,
          },
        }
      );

      return Response.json(
        {
          message: "کاربر با موفقیت ویرایش شد",
          data: updatedUser,
        },
        {
          status: 201,
        }
      );
    } else {
      const updatedUser = await UserModel.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            username,
            phone,
            role,
          },
        }
      );

      return Response.json(
        {
          message: "کاربر با موفقیت ویرایش شد",
          data: updatedUser,
        },
        {
          status: 201,
        }
      );
    }
  } catch (err) {
    console.log("Error ->", err.message);

    return Response.json(
      {
        message: "خطا در ویرایش کاربر",
        error: err.message,
      },
      {
        status: 500,
      }
    );
  }
}
