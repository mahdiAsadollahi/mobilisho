import connectToDB from "@/configs/db";
import UserModel from "@/models/User";
import VerificationCode from "@/models/VerificationCode";
import { generateAuthCode, validatePhone } from "@/utils/auth";

export async function POST(req) {
  try {
    await connectToDB();

    const { phone } = await req.json();

    const isValidPhone = validatePhone(phone);

    if (!isValidPhone) {
      return Response.json(
        { message: "شماره نامعتبر" },
        { status: 400 }
      );
    }

    const existingUser = await UserModel.findOne({ phone });

    if (existingUser) {
      return Response.json(
        { message: "phone is already exist!" },
        { status: 400 }
      );
    }

    await VerificationCode.deleteMany({ phone });

    const code = generateAuthCode();

    await VerificationCode.create({
      phone,
      code,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    });

    return Response.json(
      { message: "send code successfully :))" },
      { status: 200 }
    );
  } catch (err) {
    return Response.json(
      { message: "send code has error !", err },
      { status: 500 }
    );
  }
}
