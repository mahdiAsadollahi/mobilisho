import connectToDB from "@/configs/db";
import { verifyAccessToken } from "@/utils/auth";
import { cookies } from "next/headers";

export async function POST(req) {
  try {
    await connectToDB();

    let body = await req.json();

    const { subject, category, priority, content, userId } = body;

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

    let targetUser;
    let createdByAdmin = false;
    let sender;
    let senderType;

    if (userId) {
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

      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return Response.json(
          {
            success: false,
            message: "شناسه کاربر نامعتبر است",
          },
          { status: 400 }
        );
      }

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

      createdByAdmin = true;
      sender = loggedInUser._id;
      senderType = "ADMIN";
    } else {
      targetUser = loggedInUser;
      createdByAdmin = false;
      sender = loggedInUser._id;
      senderType = "USER";
    }

    const ticketData = {
      user: targetUser._id,
      subject: subject.trim(),
      category: category.trim(),
      priority: priority.toLowerCase(),
      status: "open",
      lastActivityAt: new Date(),
      createdByAdmin: createdByAdmin,
      isArchived: false,
    };

    const createdTicket = await TicketModel.create(ticketData);

    const messageData = {
      ticket: createdTicket._id,
      sender: sender,
      senderType: senderType,
      content: content.trim(),
      readBy: [sender],
    };

    await TicketMessageModel.create(messageData);

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
              id: targetUser._id,
              username: targetUser.username,
              phone: targetUser.phone,
              role: targetUser.role,
            },
            sender: {
              id: sender,
              username: loggedInUser.username,
              role: loggedInUser.role,
            },
          },
        },
      },
      { status: 201 }
    );

    return Response.json({
      message: "test",
      subject,
      category,
      priority,
      content,
      userId,
    });
  } catch (err) {
    return Response.json(
      {
        message: "خطا در ساخت تیکت",
        error: err.message,
      },
      {
        status: 500,
      }
    );
  }
}
