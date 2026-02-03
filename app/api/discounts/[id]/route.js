import connectToDB from "@/configs/db";
import DiscountModel from "@/models/Discount";
import UserModel from "@/models/User";
import ProductModel from "@/models/Product";

export async function GET(req, { params }) {
  try {
    await connectToDB();

    const { id } = await params;

    const discount = await DiscountModel.findById(id)
      .populate("specific_customers", "_id username")
      .populate("specific_products", "_id name");

    if (!discount) {
      return Response.json(
        { message: "تخفیف مورد نظر یافت نشد" },
        { status: 404 }
      );
    }

    return Response.json(
      {
        message: "تخفیف دریافت شد",
        data: discount,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error fetching discount:", err);
    return Response.json({ message: "خطا در دریافت تخفیف" }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    await connectToDB();

    const { id } = await params;
    const body = await req.json();

    if (body.expiry_date) {
      const expiryDate = new Date(body.expiry_date);
      if (expiryDate <= new Date()) {
        return Response.json(
          { message: "تاریخ انقضای تخفیف باید در آینده باشد" },
          { status: 400 }
        );
      }
    }

    if (body.value_type === "percentage" && body.value > 100) {
      return Response.json(
        { message: "تخفیف درصدی نمی‌تواند بیشتر از ۱۰۰٪ باشد" },
        { status: 400 }
      );
    }

    if (body.code) {
      const existingDiscount = await DiscountModel.findOne({
        code: body.code.toUpperCase(),
        _id: { $ne: id },
      });
      if (existingDiscount) {
        return Response.json(
          { message: "این کد تخفیف قبلاً ثبت شده است" },
          { status: 400 }
        );
      }
    }

    const updatedDiscount = await DiscountModel.findByIdAndUpdate(
      id,
      {
        ...body,
        code: body.code ? body.code.toUpperCase() : undefined,
      },
      { new: true, runValidators: true }
    )
      .populate("specific_customers", "_id username")
      .populate("specific_products", "_id name");

    if (!updatedDiscount) {
      return Response.json(
        { message: "تخفیف مورد نظر یافت نشد" },
        { status: 404 }
      );
    }

    return Response.json(
      {
        message: "تخفیف با موفقیت بروزرسانی شد",
        data: updatedDiscount,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error updating discount:", err);
    return Response.json(
      { message: "خطا در بروزرسانی تخفیف" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectToDB();

    const { id } = await params;

    const deletedDiscount = await DiscountModel.findByIdAndDelete(id);

    if (!deletedDiscount) {
      return Response.json(
        { message: "تخفیف مورد نظر یافت نشد" },
        { status: 404 }
      );
    }

    return Response.json(
      {
        message: "تخفیف با موفقیت حذف شد",
        data: deletedDiscount,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error deleting discount:", err);
    return Response.json({ message: "خطا در حذف تخفیف" }, { status: 500 });
  }
}
