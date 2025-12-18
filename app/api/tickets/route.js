import connectToDB from "@/configs/db";
import TicketModel from "@/models/Ticket";
import TicketMessageModel from "@/models/TicketMessage";
import mongoose from "mongoose";

export async function POST(req) {
  let session = null;

  try {
    await connectToDB();

    const { user, subject, category, priority, content } = await req.json();

    if (!user || !subject || !category || !priority || !content) {
      return Response.json(
        {
          message: "لطفا تمام فیلدهای ضروری را پر کنید",
          error: "Missing required fields",
        },
        {
          status: 400,
        }
      );
    }

    session = await mongoose.startSession();
    session.startTransaction();

    const newTicket = await TicketModel.create(
      [
        {
          user: user._id || user.id,
          subject: subject.trim(),
          category,
          priority,
          status: "open",
          lastActivityAt: Date.now(),
        },
      ],
      { session }
    );

    const createdTicket = newTicket[0];

    const firstMessage = await TicketMessageModel.create(
      [
        {
          ticket: createdTicket._id,
          sender: user._id || user.id,
          senderType: user.role === "ADMIN" ? "ADMIN" : "USER",
          content: content.trim(),
        },
      ],
      {
        session,
      }
    );

    await session.commitTransaction();

    const responseData = {
      message: "تیکت با موفقیت ایجاد شد",
      data: {
        ticket: {
          _id: createdTicket._id,
          subject: createdTicket.subject,
          category: createdTicket.category,
          priority: createdTicket.priority,
          status: createdTicket.status,
          lastActivityAt: createdTicket.lastActivityAt,
          createdAt: createdTicket.createdAt,
        },
        firstMessage: {
          _id: firstMessage[0]._id,
          content: firstMessage[0].content,
          senderType: firstMessage[0].senderType,
          createdAt: firstMessage[0].createdAt,
        },
      },
    };

    return Response.json(responseData, {
      status: 201,
    });
  } catch (err) {
    if (session) {
      await session.abortTransaction();
    }

    console.error("Error creating ticket:", err);

    let errorMessage = "خطا در ساخت تیکت";
    let statusCode = 500;

    if (err.name === "ValidationError") {
      errorMessage = "داده‌های ارسالی نامعتبر هستند";
      statusCode = 400;
    } else if (err.name === "MongoError" && err.code === 11000) {
      errorMessage = "تیکت تکراری";
      statusCode = 409;
    }

    return Response.json(
      {
        message: errorMessage,
      },
      {
        status: statusCode,
      }
    );
  } finally {
    if (session) {
      await session.endSession();
    }
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
