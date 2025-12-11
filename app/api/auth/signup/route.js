import connectToDB from "@/configs/db";
import UserModel from "@/models/User";
import VerificationCodeModel from "@/models/VerificationCode";
import {
  generateAccessToken,
  generateRefreshToken,
  hashPassword,
  validatePassword,
  validatePhone,
} from "@/utils/auth";
import { roles } from "@/utils/constants";

export async function POST(req) {
  try {
    connectToDB();
    const body = await req.json();
    const { username, phone, password, verificationCode } = body;

    const isValidPhone = validatePhone(phone);
    const isValidPassword = validatePassword(password);

    if (!isValidPhone || !isValidPassword) {
      return Response.json(
        { message: "شماره یا رمز عبور نامعتبر" },
        { status: 400 }
      );
    }

    const isUserExist = await UserModel.findOne({
      $or: [{ username }, { phone }],
    });

    if (isUserExist) {
      return Response.json(
        {
          message: "با این نام کاربری یا شماره قبلا ثبت نام انجام شده",
        },
        {
          status: 409,
        }
      );
    }

    const verifyCodeDoc = await VerificationCodeModel.findOne({ phone });

    if (!verifyCodeDoc) {
      return Response.json(
        {
          message: "کد تایید یافت نشد یا منقضی شده است",
        },
        {
          status: 400,
        }
      );
    }

    if (verificationCode !== verifyCodeDoc.code) {
      return Response.json(
        {
          message: "کد تایید به درستی وارد نشده",
        },
        {
          status: 400,
        }
      );
    }

    const hashedPassword = await hashPassword(password);
    const accessToken = generateAccessToken({ phone });
    const refreshToken = generateRefreshToken({ phone });

    const users = await UserModel.find({});
    const isFirstUser = users.length === 0;

    await UserModel.create({
      username,
      phone,
      password: hashedPassword,
      role: isFirstUser ? roles.ADMIN : roles.USER,
      refreshToken,
    });

    await VerificationCodeModel.deleteOne({ _id: verifyCodeDoc._id });

    return Response.json(
      {
        message: "کاربر با موفقیت ایجاد شد",
        data: { username, phone, role: isFirstUser ? roles.ADMIN : roles.USER },
      },
      {
        status: 201,
        headers: {
          "Set-Cookie": `token=${accessToken};path=/;httpOnly=true`,
        },
      }
    );
  } catch (err) {
    console.error("Error in signup API:", err);
    return Response.json(
      {
        message: "خطا در سرور. در صورت رفع نشدن با پشتیبانی ارتباط برقرار کنید",
      },
      { status: 500 }
    );
  }
}
