import connectToDB from "@/configs/db";
import TicketModel from "@/models/Ticket";
import TicketMessageModel from "@/models/TicketMessage";
import { verifyAccessToken } from "@/utils/auth";
import { cookies } from "next/headers";
import UserModel from "@/models/User";

export async function POST(req, { params }) {
  try {
    await connectToDB();

    const { id } = await params;
    const body = await req.json();
    const { content } = body;

    // اعتبارسنجی
    if (!content?.trim()) {
      return Response.json(
        {
          success: false,
          message: "متن پیام الزامی است",
        },
        { status: 400 }
      );
    }

    // احراز هویت
    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    if (!token || !token.value) {
      return Response.json(
        {
          success: false,
          message: "لطفا وارد حساب کاربری خود شوید",
        },
        { status: 401 }
      );
    }

    const tokenPayload = verifyAccessToken(token.value);
    if (!tokenPayload) {
      return Response.json(
        {
          success: false,
          message: "توکن نامعتبر یا منقضی شده است",
        },
        { status: 401 }
      );
    }

    // پیدا کردن کاربر
    const user = await UserModel.findOne({ phone: tokenPayload.phone });
    if (!user) {
      return Response.json(
        {
          success: false,
          message: "کاربر یافت نشد",
        },
        { status: 404 }
      );
    }

    // پیدا کردن تیکت
    const ticket = await TicketModel.findById(id);
    if (!ticket) {
      return Response.json(
        {
          success: false,
          message: "تیکت یافت نشد",
        },
        { status: 404 }
      );
    }

    // بررسی دسترسی
    const isAdmin = user.role === "ADMIN";
    const isTicketOwner = ticket.user.toString() === user._id.toString();

    if (!isAdmin && !isTicketOwner) {
      return Response.json(
        {
          success: false,
          message: "شما دسترسی به این تیکت را ندارید",
        },
        { status: 403 }
      );
    }

    // ایجاد پیام
    const message = await TicketMessageModel.create({
      ticket: ticket._id,
      sender: user._id,
      senderType: user.role === "ADMIN" ? "ADMIN" : "USER",
      content: content.trim(),
      readBy: [user._id],
    });

    // آپدیت تیکت
    const newStatus = user.role === "ADMIN" ? "answered" : "customer_reply";
    await TicketModel.findByIdAndUpdate(id, {
      status: newStatus,
      lastActivityAt: new Date(),
    });

    return Response.json({
      success: true,
      message: "پیام با موفقیت ارسال شد",
      data: {
        message: {
          id: message._id,
          sender: user.role === "ADMIN" ? "admin" : "customer",
          senderName: user.username,
          content: message.content,
          createdAt: message.createdAt,
        },
      },
    });
  } catch (err) {
    console.error("Error sending message:", err);
    return Response.json(
      {
        success: false,
        message: "خطا در ارسال پیام",
        error: err.message,
      },
      { status: 500 }
    );
  }
}

export async function GET(req, { params }) {
  try {
    await connectToDB();
    const { id } = await params;

    const messages = await TicketMessageModel.find({ ticket: id })
      .populate("sender", "username role")
      .sort({ createdAt: 1 });

    return Response.json({
      success: true,
      data: {
        messages: messages.map((msg) => ({
          id: msg._id,
          sender: msg.sender.role === "ADMIN" ? "admin" : "customer",
          senderName: msg.sender.username,
          message: msg.content,
          createdAt: msg.createdAt,
          isRead: msg.readBy.length > 0,
        })),
      },
    });
  } catch (err) {
    console.error("Error fetching messages:", err);
    return Response.json(
      {
        success: false,
        message: "خطا در دریافت پیام‌ها",
        error: err.message,
      },
      { status: 500 }
    );
  }
}
