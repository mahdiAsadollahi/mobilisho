import connectToDB from "@/configs/db";
import UserModel from "@/models/User";

export async function DELETE(req, { params }) {
  try {
    await connectToDB();

    const { id } = await params;

    const user = await UserModel.findById(id);

    if (!user) {
      return Response.json({ message: "کاربر یافت نشد" }, { status: 404 });
    }

    const deletedUser = await UserModel.findOneAndDelete({ _id: id }, {});

    if (!deletedUser) {
      return Response.json({ message: "حذف کاربر انجام نشد" }, { status: 500 });
    }

    return Response.json(
      {
        success: true,
        message: "کاربر با موفقیت حذف شد",
        data: {
          id: deletedUser._id,
          username: deletedUser.username,
          phone: deletedUser.phone,
          role: deletedUser.role,
          deletedAt: new Date(),
        },
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    return Response.json(
      { message: "خطا در حذف کاربر !", error: err.message },
      {
        status: 500,
      }
    );
  }
}
