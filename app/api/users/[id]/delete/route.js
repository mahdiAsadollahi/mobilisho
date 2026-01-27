export async function DELETE(req, { params }) {
  try {
  } catch (err) {
    return Response.json(
      { message: "خطا در حذف کاربر !", error: err.message },
      {
        status: 500,
      }
    );
  }
}
