import connectToDB from "@/configs/db";
import TicketModel from "@/models/Ticket";
import TicketMessageModel from "@/models/TicketMessage";
import { verifyAccessToken } from "@/utils/auth";
import { cookies } from "next/headers";
import UserModel from "@/models/User";

export async function POST(req) {
  try {
    await connectToDB();

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
    if (!user) {
      return Response.json(
        {
          success: false,
          message: "کاربر یافت نشد",
        },
        { status: 404 }
      );
    }

    let body;
    try {
      body = await req.json();
    } catch (parseError) {
      return Response.json(
        {
          success: false,
          message: "فرمت داده‌های ارسالی نامعتبر است",
        },
        { status: 400 }
      );
    }

    const { subject, category, priority, content } = body;

    if (!subject?.trim()) {
      return Response.json(
        {
          success: false,
          message: "موضوع تیکت الزامی است",
        },
        { status: 400 }
      );
    }

    if (!category?.trim()) {
      return Response.json(
        {
          success: false,
          message: "دسته‌بندی تیکت الزامی است",
        },
        { status: 400 }
      );
    }

    if (!priority?.trim()) {
      return Response.json(
        {
          success: false,
          message: "اولویت تیکت الزامی است",
        },
        { status: 400 }
      );
    }

    if (!content?.trim()) {
      return Response.json(
        {
          success: false,
          message: "متن تیکت الزامی است",
        },
        { status: 400 }
      );
    }

    if (subject.trim().length < 3) {
      return Response.json(
        {
          success: false,
          message: "موضوع تیکت باید حداقل ۳ کاراکتر باشد",
        },
        { status: 400 }
      );
    }

    if (content.trim().length < 10) {
      return Response.json(
        {
          success: false,
          message: "متن تیکت باید حداقل ۱۰ کاراکتر باشد",
        },
        { status: 400 }
      );
    }

    const validPriorities = ["low", "medium", "high", "urgent"];
    if (!validPriorities.includes(priority.toLowerCase())) {
      return Response.json(
        {
          success: false,
          message:
            "اولویت تیکت نامعتبر است. مقادیر مجاز: low, medium, high, urgent",
        },
        { status: 400 }
      );
    }

    const ticketData = {
      user: user._id,
      subject: subject.trim(),
      category: category.trim(),
      priority: priority.toLowerCase(),
      status: "open",
      lastActivityAt: new Date(),
    };

    const createdTicket = await TicketModel.create(ticketData);

    const messageData = {
      ticket: createdTicket._id,
      sender: user._id,
      senderType: user.role === "ADMIN" ? "ADMIN" : "USER",
      content: content.trim(),
      readBy: [user._id],
    };

    const firstMessage = await TicketMessageModel.create(messageData);

    createdTicket.firstMessage = firstMessage._id;
    await createdTicket.save();

    return Response.json(
      {
        success: true,
        message: "تیکت با موفقیت ایجاد شد",
        data: {
          ticket: {
            id: createdTicket._id,
            subject: createdTicket.subject,
            category: createdTicket.category,
            priority: createdTicket.priority,
            status: createdTicket.status,
            createdAt: createdTicket.createdAt,
            user: {
              id: user._id,
              username: user.username,
              phone: user.phone,
            },
          },
          firstMessage: {
            id: firstMessage._id,
            content: firstMessage.content,
            senderType: firstMessage.senderType,
            createdAt: firstMessage.createdAt,
          },
        },
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("Error creating ticket:", err);

    // مدیریت خطاهای خاص
    let errorMessage = "خطا در ایجاد تیکت";
    let statusCode = 500;

    if (err.name === "ValidationError") {
      errorMessage = "داده‌های وارد شده نامعتبر هستند";
      statusCode = 400;
    } else if (err.code === 11000) {
      errorMessage = "تیکت تکراری است";
      statusCode = 409;
    }

    return Response.json(
      {
        success: false,
        message: errorMessage,
        ...(process.env.NODE_ENV === "development" && {
          error: err.message,
          stack: err.stack,
        }),
      },
      { status: statusCode }
    );
  }
}

export async function GET(req) {
  try {
    await connectToDB();

    const tickets = await TicketModel.find({})
      .populate("user", "username phone")
      .sort({ createdAt: -1 })
      .limit(10);

    return Response.json({
      message: "تیکت‌ها دریافت شدند",
      data: tickets,
    });
  } catch (err) {
    return Response.json(
      {
        message: "خطا در دریافت تیکت‌ها",
        error: err.message,
      },
      {
        status: 500,
      }
    );
  }
}
