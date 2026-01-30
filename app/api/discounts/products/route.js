import connectToDB from "@/configs/db";
import ProductModel from "@/models/Product";

export async function GET(req) {
  try {
    await connectToDB();

    const products = await ProductModel.find({}, "_id name");

    return Response.json(
      {
        message: "دریافت محصولات با موفقیت انجام شد",
        data: products,
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    return Response.json(
      {
        message: "خطا در دریافت محصولات",
        error: err.message,
      },
      {
        status: 500,
      }
    );
  }
}
