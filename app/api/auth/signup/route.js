import connectToDB from "@/configs/db";
import UserModel from "@/models/User";
import {
  generateAccessToken,
  hashPassword,
  valiadtePassword,
  validatePhone,
} from "@/utils/auth";
import { roles } from "@/utils/constants";

export async function POST(req) {
  try {
    connectToDB();
    const body = await req.json();
    const { username, phone, password } = body;

    const isValidPhone = validatePhone(phone);
    const isValidPassword = valiadtePassword(password);

    if (!isValidPhone || !isValidPassword) {
      return Response.json(
        { message: "email or password is invalid" },
        { status: 419 }
      );
    }

    const isUserExist = await UserModel.findOne({
      $or: [{ username }, { phone }],
    });

    if (isUserExist) {
      return Response.json(
        {
          message: "the username or phone already exist !!",
        },
        {
          status: 422,
        }
      );
    }

    const hashedPassword = await hashPassword(password);
    const accessToken = generateAccessToken({ username });

    const users = await UserModel.find({});

    await UserModel.create({
      username,
      phone,
      password: hashedPassword,
      role: users.length > 0 ? roles.USER : roles.ADMIN,
    });

    return Response.json(
      { message: "user created successfully :))" },
      {
        status: 201,
        headers: { "Set-Cookie": `token=${accessToken};path=/;httpOnly=true` },
      }
    );
  } catch (err) {
    return Response.json({ message: "has error : ", err });
  }
}
