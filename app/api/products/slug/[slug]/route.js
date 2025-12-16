import connectToDB from "@/configs/db";
import ProductModel from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    await connectToDB();

    const { slug } = params;

    if (!slug) {
      return NextResponse.json(
        {
          success: false,
          message: "شناسه محصول الزامی است",
        },
        { status: 400 }
      );
    }

    const product = await ProductModel.findOne({ slug }).populate(
      "categoryId",
      "title icon _id"
    );

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          message: "محصول یافت نشد",
        },
        { status: 404 }
      );
    }

    // افزایش تعداد بازدیدها
    await ProductModel.findByIdAndUpdate(product._id, {
      $inc: { views: 1 },
    });

    // محاسبه موجودی کل
    const totalStock =
      product.stock +
      (product.variations || []).reduce((sum, v) => sum + (v.stock || 0), 0);

    const productWithTotalStock = {
      ...product.toObject(),
      totalStock,
      views: (product.views || 0) + 1,
    };

    return NextResponse.json({
      success: true,
      data: productWithTotalStock,
    });
  } catch (error) {
    console.error("GET Product by Slug Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "خطا در دریافت محصول",
      },
      { status: 500 }
    );
  }
}
