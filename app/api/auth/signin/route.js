import connectToDB from "@/configs/db";
import {
  generateAccessToken,
  generateRefreshToken,
  validatePassword,
  validatePhone,
  verifyPassword,
} from "@/utils/auth";
import UserModel from "@/models/User";

export async function POST(req) {
  try {
    connectToDB();

    const { phone, password } = await req.json();

    const isValidPhone = validatePhone(phone);
    const isValidPassword = validatePassword(password);

    if (!isValidPhone || !isValidPassword) {
      return Response.json(
        {
          message: "شماره یا رمز عبور نامعتبر",
        },
        {
          status: 400,
        }
      );
    }

    const user = await UserModel.findOne({ phone });

    if (!user) {
      return Response.json(
        {
          message: "کاربری با این شماره پیدا نشد !",
        },
        {
          status: 400,
        }
      );
    }

    const isCorrectPassword = await verifyPassword(password, user.password);

    if (!isCorrectPassword) {
      return Response.json(
        {
          message: "شماره یا رمز عبور اشتباه",
        },
        {
          status: 400,
        }
      );
    }

    const accessToken = generateAccessToken({ phone });
    const refreshToken = generateRefreshToken({ phone });

    await UserModel.findOneAndUpdate(
      { phone },
      {
        $set: {
          refreshToken,
        },
      }
    );

    return Response.json(
      {
        message: "با موفقیت وارد شدید :))",
      },
      {
        status: 200,
        headers: {
          "Set-Cookie": `token=${accessToken};path=/;httpOnly=true;`,
        },
      }
    );
  } catch (err) {
    console.log(err);
    return Response.json(
      {
        message: "خطا در سرور. در صورت رفع نشدن با پشتیبانی ارتباط برقرار کنید",
      },
      { status: 500 }
    );
  }
}
