import connectToDB from "@/configs/db";
import TicketModel from "@/models/Ticket";
import TicketMessagesModel from "@/models/TicketMessage";
import UserModel from "@/models/User";

export async function GET(req, { params }) {
  try {
    await connectToDB();

    const { id } = await params;

    if (!id || id.length < 10) {
      return NextResponse.json(
        { success: false, message: "شناسه تیکت معتبر نیست" },
        { status: 400 }
      );
    }

    const ticket = await TicketModel.findById(id)
      .populate("user", "username phone email role")
      .lean();

    if (!ticket) {
      return NextResponse.json(
        { success: false, message: "تیکت مورد نظر یافت نشد" },
        { status: 404 }
      );
    }

    const messages = await TicketMessagesModel.find({ ticket: id })
      .populate("sender", "username phone email role")
      .sort({ createdAt: 1 })
      .lean();

    return Response.json(
      {
        message: "پیام ها با موفقیت دریافت شدند",
        data: [ticket, messages],
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    return Response.json({
      message: "خطا در دریافت تیکت ها",
      error: err.message,
    });
  }
}
