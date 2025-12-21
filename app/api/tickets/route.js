import connectToDB from "@/configs/db";
import TicketModel from "@/models/Ticket";
import TicketMessageModel from "@/models/TicketMessage";
import { verifyAccessToken } from "@/utils/auth";
import { cookies } from "next/headers";
import UserModel from "@/models/User";
import mongoose from "mongoose";

export async function POST(req) {
  try {
    await connectToDB();

    // دریافت داده‌های بدنه درخواست
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

    const { subject, category, priority, content, userId } = body;

    // اعتبارسنجی فیلدهای الزامی
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

    // اعتبارسنجی طول فیلدها
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

    // اعتبارسنجی اولویت
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

    // دریافت توکن و احراز هویت کاربر لاگین‌شده
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

    // پیدا کردن کاربر لاگین‌شده (فرستنده)
    const loggedInUser = await UserModel.findOne({ phone: tokenPayload.phone });
    if (!loggedInUser) {
      return Response.json(
        {
          success: false,
          message: "کاربر لاگین‌شده یافت نشد",
        },
        { status: 404 }
      );
    }

    // بررسی اینکه کاربر لاگین‌شده بلاک نباشد
    if (loggedInUser.isBan) {
      return Response.json(
        {
          success: false,
          message: "حساب کاربری شما مسدود شده است",
        },
        { status: 403 }
      );
    }

    let targetUser; // کاربر دریافت‌کننده تیکت
    let createdByAdmin = false;
    let sender; // فرستنده پیام
    let senderType; // نوع فرستنده

    if (userId) {
      // حالت ۱: ادمین می‌خواهد برای کاربر دیگری تیکت ایجاد کند

      // بررسی اینکه کاربر لاگین‌شده ادمین باشد
      if (loggedInUser.role !== "ADMIN") {
        return Response.json(
          {
            success: false,
            message:
              "شما دسترسی لازم برای ایجاد تیکت برای کاربران دیگر را ندارید",
          },
          { status: 403 }
        );
      }

      // اعتبارسنجی userId
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return Response.json(
          {
            success: false,
            message: "شناسه کاربر نامعتبر است",
          },
          { status: 400 }
        );
      }

      // پیدا کردن کاربر مورد نظر (دریافت‌کننده)
      targetUser = await UserModel.findById(userId);
      if (!targetUser) {
        return Response.json(
          {
            success: false,
            message: "کاربر مورد نظر یافت نشد",
          },
          { status: 404 }
        );
      }

      // بررسی اینکه کاربر هدف بلاک نباشد
      if (targetUser.isBan) {
        return Response.json(
          {
            success: false,
            message: "این کاربر مسدود شده است",
          },
          { status: 403 }
        );
      }

      // تنظیم اطلاعات برای حالت ادمین
      createdByAdmin = true;
      sender = loggedInUser._id; // فرستنده = ادمین لاگین‌شده
      senderType = "ADMIN";
    } else {
      // حالت ۲: کاربر عادی می‌خواهد برای خودش تیکت ایجاد کند
      targetUser = loggedInUser; // دریافت‌کننده = خود کاربر
      createdByAdmin = false;
      sender = loggedInUser._id; // فرستنده = خود کاربر
      senderType = "USER";
    }

    // ایجاد داده تیکت
    const ticketData = {
      user: targetUser._id, // همیشه کاربر دریافت‌کننده
      subject: subject.trim(),
      category: category.trim(),
      priority: priority.toLowerCase(),
      status: "open",
      lastActivityAt: new Date(),
      createdByAdmin: createdByAdmin,
      isArchived: false,
    };

    // ایجاد تیکت در دیتابیس
    const createdTicket = await TicketModel.create(ticketData);

    // ایجاد اولین پیام تیکت
    const messageData = {
      ticket: createdTicket._id,
      sender: sender, // ✅ درست: یا ادمین یا کاربر (فرستنده)
      senderType: senderType, // ✅ درست
      content: content.trim(),
      readBy: [sender], // ✅ درست
    };

    await TicketMessageModel.create(messageData);

    // بازگشت پاسخ موفقیت‌آمیز
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
            updatedAt: createdTicket.updatedAt,
            createdByAdmin: createdTicket.createdByAdmin,
            isArchived: createdTicket.isArchived,
            user: {
              id: targetUser._id, // کاربر دریافت‌کننده
              username: targetUser.username,
              phone: targetUser.phone,
              role: targetUser.role,
            },
            sender: {
              // اطلاعات فرستنده
              id: sender,
              username: loggedInUser.username,
              role: loggedInUser.role,
            },
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
        }),
      },
      { status: statusCode }
    );
  }
}

export async function GET(req) {
  try {
    await connectToDB();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const status = searchParams.get("status");
    const priority = searchParams.get("priority");
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const archived = searchParams.get("archived");
    const userId = searchParams.get("userId");
    const skip = (page - 1) * limit;

    // ساخت کوئری
    let query = {};

    // فیلتر وضعیت
    if (status && status !== "all") {
      if (status === "archived") {
        query.isArchived = true;
      } else if (status === "all_active") {
        query.isArchived = false;
      } else {
        query.status = status;
        query.isArchived = false;
      }
    } else {
      query.isArchived = false;
    }

    // فیلترهای دیگر
    if (priority) query.priority = priority;
    if (category) query.category = category;
    if (userId) query.user = userId;
    if (archived === "true") query.isArchived = true;

    // فیلتر جستجو
    if (search) {
      query.$or = [
        { subject: { $regex: search, $options: "i" } },
        { "user.username": { $regex: search, $options: "i" } },
        { "user.phone": { $regex: search, $options: "i" } },
      ];
    }

    // گرفتن تیکت‌ها با اطلاعات کاربر
    const tickets = await TicketModel.find(query)
      .populate("user", "username phone email role")
      .populate("assignedTo", "username")
      .sort({ lastActivityAt: -1, createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // شمارش کل تیکت‌ها
    const total = await TicketModel.countDocuments(query);
    const totalPages = Math.ceil(total / limit);

    // آمار
    const stats = {
      total: await TicketModel.countDocuments({ isArchived: false }),
      open: await TicketModel.countDocuments({
        status: "open",
        isArchived: false,
      }),
      answered: await TicketModel.countDocuments({
        status: "answered",
        isArchived: false,
      }),
      customer_reply: await TicketModel.countDocuments({
        status: "customer_reply",
        isArchived: false,
      }),
      closed: await TicketModel.countDocuments({
        status: "closed",
        isArchived: false,
      }),
      archived: await TicketModel.countDocuments({ isArchived: true }),
      highPriority: await TicketModel.countDocuments({
        priority: "high",
        isArchived: false,
      }),
    };

    return Response.json({
      success: true,
      data: {
        tickets: tickets.map((ticket) => ({
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
            id: ticket.user?._id,
            name: ticket.user?.username,
            phone: ticket.user?.phone,
            email: ticket.user?.email,
          },
          assignedTo: ticket.assignedTo
            ? {
                id: ticket.assignedTo._id,
                name: ticket.assignedTo.username,
              }
            : null,
        })),
        pagination: {
          page,
          limit,
          total,
          totalPages,
        },
        stats,
      },
    });
  } catch (err) {
    console.error("Error fetching tickets:", err);
    return Response.json(
      {
        success: false,
        message: "خطا در دریافت تیکت‌ها",
        error: err.message,
      },
      { status: 500 }
    );
  }
}
