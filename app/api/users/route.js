import connectToDB from "@/configs/db";
import UserModel from "@/models/User";
import {
  generateAccessToken,
  generateRefreshToken,
  hashPassword,
  validatePassword,
  validatePhone,
} from "@/utils/auth";

export async function GET(req) {
  try {
    await connectToDB();

    const users = await UserModel.find({}, "username phone role isBan");

    return Response.json(
      {
        success: true,
        data: users,
        count: users.length,
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    return Response.json(
      {
        message: "خطا در دریافت کاربران",
        error: err.message,
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(req, res) {
  try {
    await connectToDB();

    const body = await req.json();

    const { username, phone, role, password } = body;

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

    const hashedPassword = await hashPassword(password);

    await UserModel.create({
      username,
      phone,
      password: hashedPassword,
      role,
    });

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

    console.log("");

    return Response.json(
      {
        message: "خطا در ساخت کاربر",
        error: err.message,
      },
      {
        status: 500,
      }
    );
  }
}
