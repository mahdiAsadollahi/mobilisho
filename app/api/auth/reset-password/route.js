import {
  generateAccessToken,
  generateRefreshToken,
  hashPassword,
  validatePassword,
  validatePhone,
} from "@/utils/auth";
import UserModel from "@/models/User";
import VerificationCode from "@/models/VerificationCode";

export async function POST(req) {
  try {
    const { phone, code, newPassword } = await req.json();

    const isValidPhone = validatePhone(phone);
    const isValidPassword = validatePassword(newPassword);

    if (!isValidPhone || !isValidPassword) {
      return Response.json(
        { message: "شماره یا رمز عبور نامعتبر" },
        { status: 400 }
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

    const verifyCodeDoc = await VerificationCode.findOne({ phone });

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

    if (code !== verifyCodeDoc.code) {
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

    await UserModel.updateOne(
      { phone },
      {
        $set: {
          password: hashedPassword,
        },
      }
    );

    return Response.json(
      { message: "رمز عبور با موفقیت تغییر کرد" },
      {
        status: 200,
      }
    );
  } catch (err) {
    return Response.json(
      {
        message: "خطا در سرور. در صورت رفع نشدن با پشتیبانی ارتباط برقرار کنید",
      },
      {
        status: 500,
      }
    );
  }
}
