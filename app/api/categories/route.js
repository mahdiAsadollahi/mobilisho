import connectToDB from "@/configs/db";
import { uploadFile } from "@/lib/upload";
import CategoryModel from "@/models/Category";
import fs from "fs/promises";
import path from "path";

// Helper function to delete file
const deleteFileFromServer = async (filePath) => {
  try {
    // فقط فایل‌های داخل پوشه uploads رو حذف کنیم
    if (filePath && filePath.includes("uploads")) {
      // تبدیل URL به مسیر فایل
      const relativePath = filePath.split("/uploads/")[1];
      const fullPath = path.join(
        process.cwd(),
        "public",
        "uploads",
        relativePath
      );

      // بررسی وجود فایل
      try {
        await fs.access(fullPath);
        await fs.unlink(fullPath);
        console.log(`File deleted: ${fullPath}`);
        return true;
      } catch (err) {
        console.log(`File not found or already deleted: ${fullPath}`);
        return false;
      }
    }
    return false;
  } catch (error) {
    console.error("Error deleting file:", error);
    return false;
  }
};

// GET - دریافت همه دسته‌بندی‌ها یا یک دسته‌بندی خاص
export async function GET(req) {
  try {
    await connectToDB();

    // بررسی اگر آیدی در URL وجود دارد
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (id) {
      // دریافت یک دسته‌بندی خاص
      const category = await CategoryModel.findById(id, "-__v");

      if (!category) {
        return Response.json(
          {
            message: "دسته‌بندی مورد نظر یافت نشد",
          },
          { status: 404 }
        );
      }

      return Response.json(
        {
          message: "دسته‌بندی با موفقیت دریافت شد",
          data: category,
        },
        { status: 200 }
      );
    }

    // دریافت همه دسته‌بندی‌ها
    const categories = await CategoryModel.find({}, "-__v").sort({
      createdAt: -1,
    });

    if (categories.length === 0) {
      return Response.json(
        {
          message: "هنوز هیچ دسته‌بندی‌ای ایجاد نشده است",
          data: [],
        },
        { status: 200 }
      );
    }

    return Response.json(
      {
        message: "دسته‌بندی‌ها با موفقیت دریافت شدند",
        data: categories,
        count: categories.length,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("GET Error:", err);
    return Response.json(
      {
        message: "خطا در سرور. در صورت رفع نشدن با پشتیبانی ارتباط برقرار کنید",
      },
      {
        status: 500,
      }
    );
  }
}

// POST - ایجاد دسته‌بندی جدید
export async function POST(req) {
  try {
    await connectToDB();

    const formData = await req.formData();

    const image = formData.get("img");
    const title = formData.get("title");
    const icon = formData.get("icon");

    if (!title || title.trim() === "") {
      return Response.json({ message: "عنوان الزامی است" }, { status: 400 });
    }

    if (!icon || icon.trim() === "") {
      return Response.json({ message: "آیکون الزامی است" }, { status: 400 });
    }

    let imageUrl = "";

    if (image && image.size > 0) {
      const uploadResult = await uploadFile(image);

      if (!uploadResult.success) {
        return Response.json(
          {
            message: uploadResult.error || "خطا در آپلود تصویر",
          },
          {
            status: 400,
          }
        );
      }
      imageUrl = uploadResult.fileUrl;
    }

    const newCategory = await CategoryModel.create({
      image: imageUrl,
      title: title.trim(),
      icon: icon.trim(),
      isActive: true,
      productCount: 0,
    });

    return Response.json(
      {
        message: "دسته‌بندی با موفقیت اضافه شد",
        data: newCategory,
      },
      {
        status: 201,
      }
    );
  } catch (err) {
    console.error("POST Error:", err);
    return Response.json(
      {
        message: "خطا در سرور. در صورت رفع نشدن با پشتیبانی ارتباط برقرار کنید",
      },
      { status: 500 }
    );
  }
}

// PUT - ویرایش دسته‌بندی
export async function PUT(req) {
  try {
    await connectToDB();

    const formData = await req.formData();
    const id = formData.get("id");
    const image = formData.get("img");
    const title = formData.get("title");
    const icon = formData.get("icon");
    const isActive = formData.get("isActive");

    if (!id) {
      return Response.json(
        { message: "شناسه دسته‌بندی الزامی است" },
        { status: 400 }
      );
    }

    // بررسی وجود دسته‌بندی
    const existingCategory = await CategoryModel.findById(id);
    if (!existingCategory) {
      return Response.json(
        { message: "دسته‌بندی مورد نظر یافت نشد" },
        { status: 404 }
      );
    }

    let imageUrl = existingCategory.image;

    // اگر تصویر جدید ارسال شده، تصویر قبلی رو حذف و جدید رو آپلود کن
    if (image && image.size > 0) {
      // حذف تصویر قبلی
      if (existingCategory.image) {
        await deleteFileFromServer(existingCategory.image);
      }

      // آپلود تصویر جدید
      const uploadResult = await uploadFile(image);

      if (!uploadResult.success) {
        return Response.json(
          {
            message: uploadResult.error || "خطا در آپلود تصویر",
          },
          {
            status: 400,
          }
        );
      }
      imageUrl = uploadResult.fileUrl;
    }

    // آماده‌سازی داده‌های بروزرسانی
    const updateData = {
      title: title || existingCategory.title,
      icon: icon || existingCategory.icon,
      image: imageUrl,
    };

    if (isActive !== null) {
      updateData.isActive = isActive === "true";
    }

    // بروزرسانی دسته‌بندی
    const updatedCategory = await CategoryModel.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select("-__v");

    return Response.json(
      {
        message: "دسته‌بندی با موفقیت ویرایش شد",
        data: updatedCategory,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("PUT Error:", err);
    return Response.json(
      {
        message:
          "خطا در ویرایش دسته‌بندی. در صورت رفع نشدن با پشتیبانی ارتباط برقرار کنید",
      },
      { status: 500 }
    );
  }
}

// DELETE - حذف دسته‌بندی
export async function DELETE(req) {
  try {
    await connectToDB();

    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return Response.json(
        { message: "شناسه دسته‌بندی الزامی است" },
        { status: 400 }
      );
    }

    // بررسی وجود دسته‌بندی
    const existingCategory = await CategoryModel.findById(id);
    if (!existingCategory) {
      return Response.json(
        { message: "دسته‌بندی مورد نظر یافت نشد" },
        { status: 404 }
      );
    }

    // حذف تصویر مرتبط
    if (existingCategory.image) {
      await deleteFileFromServer(existingCategory.image);
    }

    // حذف دسته‌بندی از دیتابیس
    await CategoryModel.findByIdAndDelete(id);

    return Response.json(
      {
        message: "دسته‌بندی با موفقیت حذف شد",
        data: { id: existingCategory._id, title: existingCategory.title },
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("DELETE Error:", err);
    return Response.json(
      {
        message:
          "خطا در حذف دسته‌بندی. در صورت رفع نشدن با پشتیبانی ارتباط برقرار کنید",
      },
      { status: 500 }
    );
  }
}

// PATCH - تغییر وضعیت فعال/غیرفعال
export async function PATCH(req) {
  try {
    await connectToDB();

    const { id, isActive } = await req.json();

    if (!id || typeof isActive !== "boolean") {
      return Response.json(
        { message: "شناسه و وضعیت الزامی است" },
        { status: 400 }
      );
    }

    const updatedCategory = await CategoryModel.findByIdAndUpdate(
      id,
      { $set: { isActive } },
      { new: true, runValidators: true }
    ).select("-__v");

    if (!updatedCategory) {
      return Response.json(
        { message: "دسته‌بندی مورد نظر یافت نشد" },
        { status: 404 }
      );
    }

    return Response.json(
      {
        message: `دسته‌بندی ${isActive ? "فعال" : "غیرفعال"} شد`,
        data: updatedCategory,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("PATCH Error:", err);
    return Response.json(
      {
        message: "خطا در تغییر وضعیت دسته‌بندی",
      },
      { status: 500 }
    );
  }
}
