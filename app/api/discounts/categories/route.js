import connectToDB from "@/configs/db";
import CategoryModel from "@/models/Category";

export async function GET(req) {
  try {
    await connectToDB();

    const categories = await CategoryModel.find({}, "_id title");

    return Response.json({
      message: "دریافت محصولات با موفقیت انجام شد",
      data: categories,
    });
  } catch (err) {
    return Response.json(
      {
        message: "خطا در دریافت دسته بندی ها",
        error: err.message,
      },
      {
        status: 500,
      }
    );
  }
}
