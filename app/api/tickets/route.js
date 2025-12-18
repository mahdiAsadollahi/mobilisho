import TicketModel from "@/models/Ticket";
import TicketMessageModel from "@/models/TicketMessage";

export async function POST(req) {
  try {
  } catch (err) {
    return Response.json(
      {
        message: "خطا در ساخت تیکت",
        error: err,
      },
      {
        status: 500,
      }
    );
  }
}
