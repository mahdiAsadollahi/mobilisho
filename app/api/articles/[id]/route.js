import connectToDB from "@/configs/db";
import ArticleModel from "@/models/Article";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    await connectToDB();

    const { id } = await params;

    // جستجوی مقاله
    const article = await ArticleModel.findById(id);

    if (!article) {
      return NextResponse.json(
        {
          success: false,
          message: "مقاله یافت نشد",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: article,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("خطا در دریافت مقاله:", error);

    return NextResponse.json(
      {
        success: false,
        message: "خطا در دریافت مقاله",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  try {
    await connectToDB();

    const { id } = await params;

    const formData = await req.formData();

    const title = formData.get("title")?.toString().trim();
    const summary = formData.get("summary")?.toString().trim();
    const content = formData.get("content")?.toString().trim();
    const status = formData.get("status")?.toString() || "draft";
    const category = formData.get("category")?.toString().trim();
    const readingTime = parseInt(formData.get("readingTime") || "5");
    const author = formData.get("author")?.toString().trim();
    const seoTitle = formData.get("seoTitle")?.toString().trim() || title;
    const seoDescription =
      formData.get("seoDescription")?.toString().trim() || summary;

    const tags = [];
    let index = 0;
    while (true) {
      const tag = formData.get(`tags[${index}]`);
      if (!tag) break;
      if (tag.toString().trim()) {
        tags.push(tag.toString().trim());
      }
      index++;
    }

    const existingArticle = await ArticleModel.findById(id);
    if (!existingArticle) {
      return NextResponse.json(
        {
          success: false,
          message: "مقاله یافت نشد",
        },
        { status: 404 }
      );
    }

    let imageUrl = existingArticle.image;
    const image = formData.get("image");

    if (image && image instanceof File) {
      const { deleteUploadedFile, uploadArticleImage } = await import(
        "@/lib/upload"
      );

      if (existingArticle.image) {
        await deleteUploadedFile(existingArticle.image).catch((err) =>
          console.error("خطا در حذف تصویر قبلی:", err)
        );
      }

      const uploadResult = await uploadArticleImage(image, "articles");
      if (uploadResult.success) {
        imageUrl = uploadResult.fileUrl;
      }
    }

    // آپدیت مقاله
    const updatedArticle = await ArticleModel.findByIdAndUpdate(
      id,
      {
        $set: {
          title,
          summary,
          content,
          status,
          category,
          readingTime,
          author,
          image: imageUrl,
          tags,
          seoTitle,
          seoDescription,
          updatedAt: new Date(),
        },
      },
      { new: true, runValidators: true }
    );

    return NextResponse.json(
      {
        success: true,
        message: "مقاله با موفقیت ویرایش شد",
        data: updatedArticle,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("خطا در ویرایش مقاله:", error);

    return NextResponse.json(
      {
        success: false,
        message: "خطا در ویرایش مقاله",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
