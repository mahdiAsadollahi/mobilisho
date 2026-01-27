import connectToDB from "@/configs/db";
import UserModel from "@/models/User";

export async function PUT(req, { params }) {
  try {
    await connectToDB();

    const { id } = await params;

    const user = await UserModel.findById(id);

    if (!user) {
      return Response.json({ message: "کاربر یافت نشد" }, { status: 404 });
    }

    const newBanStatus = !user.isBan;

    const updateData = {
      isBan: newBanStatus,
    };

    if (newBanStatus) {
      updateData.bannedAt = new Date();
      updateData.banReason = "بن توسط ادمین";
      updateData.unbannedAt = null;
    } else {
      updateData.unbannedAt = new Date();
      updateData.banReason = null;
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    ).select("-password");

    return Response.json(
      {
        message: `کاربر ${newBanStatus ? "مسدود" : "رفع مسدودیت"} شد`,
        data: updatedUser,
        action: newBanStatus ? "banned" : "unbanned",
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Ban/Unban Error:", err.message);

    return Response.json(
      {
        message: "خطا در تغییر وضعیت کاربر",
        error: err.message,
      },
      { status: 500 }
    );
  }
}
