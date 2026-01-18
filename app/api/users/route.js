import connectToDB from "@/configs/db";
import UserModel from "@/models/User";

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
