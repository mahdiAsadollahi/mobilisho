export async function POST(req) {
  try {



  } catch (err) {
    return Response.json(
      {
        message: "خطا در ساخت کمپین",
        error: err.message,
      },
      {
        status: 500,
      }
    );
  }
}
