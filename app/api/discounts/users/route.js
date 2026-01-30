import connectToDB from "@/configs/db";
import UserModel from "@/models/User";

export async function GET(req) {
  try {
    await connectToDB();

    const users = await UserModel.find({}, "_id username");

    return Response.json(
      {
        message: "دریافت کاربران با موفقیت انجام شد",
        data: users,
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    return Response.json(
      {
        message: "خطا در دریافت کابران",
        error: err.message,
      },
      {
        status: 500,
      }
    );
  }
}
