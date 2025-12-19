// app/api/users/route.js
import connectToDB from "@/configs/db";
import UserModel from "@/models/User";

export async function GET(req) {
  try {
    await connectToDB();

    // دریافت پارامتر جستجو از URL
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const limit = parseInt(searchParams.get("limit")) || 10;

    // ایجاد کوئری جستجو
    let query = {};

    if (search) {
      query.$or = [
        { username: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
      ];
    }

    // فقط کاربران عادی (نه ادمین) را دریافت کنیم
    query.role = "USER";

    const users = await UserModel.find(query)
      .select("username phone role") // فقط فیلدهای مورد نیاز
      .sort({ username: 1 })
      .limit(limit);

    return Response.json({
      success: true,
      data: users,
      count: users.length,
    });
  } catch (err) {
    console.error("Error fetching users:", err);
    return Response.json(
      {
        success: false,
        message: "خطا در دریافت کاربران",
        error: err.message,
      },
      { status: 500 }
    );
  }
}
