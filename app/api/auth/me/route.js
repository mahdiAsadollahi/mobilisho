import connectToDB from "@/configs/db";
import { verifyAccessToken } from "@/utils/auth";
import { cookies } from "next/headers";
import UserModel from "@/models/User";

export async function GET(req) {
  connectToDB();
  const token = cookies().get("token");
  let user = null;

  if (token) {
    const tokenPayload = verifyAccessToken(token.value);

    if (tokenPayload) {
      user = await UserModel.findOne(
        { phone: tokenPayload.phone },
        "_id username phone role isBan"
      );
    }

    return Response.json(user);
  } else {
    return Response.json(
      {
        data: null,
        message: "دسترسی غیرمجاز",
      },
      {
        status: 401,
      }
    );
  }
}
