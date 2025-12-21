import connectToDB from "@/configs/db";
import TicketModel from "@/models/Ticket";
import { verifyAccessToken } from "@/utils/auth";
import { cookies } from "next/headers";
import UserModel from "@/models/User";

export async function PATCH(req, { params }) {
  try {
    await connectToDB();

    const { id } = params;
    const body = await req.json();
    const { status, priority, category, assignedTo, isArchived } = body;

    // احراز هویت ادمین
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

    const user = await UserModel.findOne({ phone: tokenPayload.phone });
    if (!user || user.role !== "ADMIN") {
      return Response.json(
        {
          success: false,
          message: "شما دسترسی لازم را ندارید",
        },
        { status: 403 }
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

    // ساخت آبجکت آپدیت
    const updateData = {};
    if (status) updateData.status = status;
    if (priority) updateData.priority = priority;
    if (category) updateData.category = category;
    if (assignedTo !== undefined) updateData.assignedTo = assignedTo;
    if (isArchived !== undefined) updateData.isArchived = isArchived;

    updateData.lastActivityAt = new Date();

    // آپدیت تیکت
    const updatedTicket = await TicketModel.findByIdAndUpdate(id, updateData, {
      new: true,
    }).populate("user", "username phone email");

    return Response.json({
      success: true,
      message: "تیکت با موفقیت به‌روزرسانی شد",
      data: {
        ticket: {
          id: updatedTicket._id,
          status: updatedTicket.status,
          priority: updatedTicket.priority,
          category: updatedTicket.category,
          isArchived: updatedTicket.isArchived,
          assignedTo: updatedTicket.assignedTo,
          updatedAt: updatedTicket.updatedAt,
        },
      },
    });
  } catch (err) {
    console.error("Error updating ticket:", err);
    return Response.json(
      {
        success: false,
        message: "خطا در به‌روزرسانی تیکت",
        error: err.message,
      },
      { status: 500 }
    );
  }
}

export async function GET(req, { params }) {
  try {
    await connectToDB();
    const { id } = params;

    const ticket = await TicketModel.findById(id)
      .populate("user", "username phone email")
      .populate("assignedTo", "username");

    if (!ticket) {
      return Response.json(
        {
          success: false,
          message: "تیکت یافت نشد",
        },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      data: {
        ticket: {
          id: ticket._id,
          ticketNumber: `TKT-${ticket.createdAt.getFullYear()}-${String(
            ticket._id
          ).slice(-4)}`,
          subject: ticket.subject,
          category: ticket.category,
          priority: ticket.priority,
          status: ticket.status,
          isArchived: ticket.isArchived,
          createdAt: ticket.createdAt,
          updatedAt: ticket.updatedAt,
          lastActivityAt: ticket.lastActivityAt,
          createdByAdmin: ticket.createdByAdmin,
          customer: {
            id: ticket.user._id,
            name: ticket.user.username,
            phone: ticket.user.phone,
            email: ticket.user.email,
          },
          assignedTo: ticket.assignedTo
            ? {
                id: ticket.assignedTo._id,
                name: ticket.assignedTo.username,
              }
            : null,
        },
      },
    });
  } catch (err) {
    console.error("Error fetching ticket:", err);
    return Response.json(
      {
        success: false,
        message: "خطا در دریافت تیکت",
        error: err.message,
      },
      { status: 500 }
    );
  }
}
