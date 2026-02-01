import connectToDB from "@/configs/db";
import DiscountModel from "@/models/Discount";

export async function POST(req, res) {
  try {
    await connectToDB();

    const body = await req.json();

    if (
      !body.code ||
      !body.discountType ||
      !body.value_type ||
      !body.value ||
      !body.expiry_date
    ) {
      return Response.json(
        { message: "فیلدهای اجباری را پر کنید" },
        { status: 400 }
      );
    }

    const expiryDate = new Date(body.expiry_date);
    if (expiryDate <= new Date()) {
      return Response.json(
        { message: "تاریخ انقضای تخفیف باید در آینده باشد" },
        { status: 400 }
      );
    }

    if (body.value_type === "percentage" && body.value > 100) {
      return Response.json(
        { message: "تخفیف درصدی نمی‌تواند بیشتر از ۱۰۰٪ باشد" },
        { status: 400 }
      );
    }

    // بررسی نوع تخفیف و فیلدهای مرتبط
    if (
      body.discountType === "specific_product" &&
      (!body.specific_products || body.specific_products.length === 0)
    ) {
      return Response.json(
        { message: "برای تخفیف محصول خاص، حداقل یک محصول انتخاب کنید" },
        { status: 400 }
      );
    }

    if (
      body.discountType === "specific_customer" &&
      (!body.specific_customers || body.specific_customers.length === 0)
    ) {
      return Response.json(
        { message: "برای تخفیف مشتری خاص، حداقل یک مشتری انتخاب کنید" },
        { status: 400 }
      );
    }

    const existingDiscount = await DiscountModel.findOne({
      code: body.code.toUpperCase(),
    });
    if (existingDiscount) {
      return Response.json(
        { message: "این کد تخفیف قبلاً ثبت شده است" },
        { status: 400 }
      );
    }

    const discount = await DiscountModel.create({
      ...body,
      code: body.code.toUpperCase(),
      specific_products: body.specific_products || [],
      specific_customers: body.specific_customers || [],
    });

    return Response.json(
      {
        message: "تخفیف با موفقیت ایجاد شد",
        data: discount,
      },
      { status: 201 }
    );
  } catch (err) {
    return Response.json({ message: "خطا در ساخت تخفیف" }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    await connectToDB();

    const discounts = await DiscountModel.find()
      .populate("specific_customers", "_id username")
      .populate("specific_products", "_id name");

    return Response.json(
      {
        message: "تخفیف‌ها با موفقیت دریافت شدند",
        data: discounts,
      },
      { status: 200 }
    );
  } catch (err) {
    return Response.json(
      { message: "خطا در دریافت تخفیف‌ها" },
      { status: 500 }
    );
  }
}
