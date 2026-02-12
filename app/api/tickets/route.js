export async function POST(req) {
  try {
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
