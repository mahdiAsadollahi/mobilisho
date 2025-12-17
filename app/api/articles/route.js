import connectToDB from "@/configs/db";
import { deleteUploadedFile, uploadImage } from "@/lib/upload";
import { NextResponse } from "next/server";
import ArticleModel from "@/models/Article";

const validateArticleData = (data) => {
  const errors = [];

  if (!data.title || data.title.trim().length < 3) {
    errors.push("عنوان مقاله باید حداقل 3 کاراکتر باشد");
  }

  if (!data.summary || data.summary.trim().length < 10) {
    errors.push("خلاصه مقاله باید حداقل 10 کاراکتر باشد");
  }

  if (!data.content || data.content.trim().length < 50) {
    errors.push("محتوای مقاله باید حداقل 50 کاراکتر باشد");
  }

  if (!data.category || data.category.trim().length < 2) {
    errors.push("دسته‌بندی الزامی است");
  }

  if (!data.readingTime || data.readingTime <= 0) {
    errors.push("زمان مطالعه باید بیشتر از 0 دقیقه باشد");
  }

  if (!data.author || data.author.trim().length < 2) {
    errors.push("نویسنده الزامی است");
  }

  if (!data.seoTitle || data.seoTitle.trim().length < 10) {
    errors.push("عنوان سئو باید حداقل 10 کاراکتر باشد");
  }

  if (!data.seoDescription || data.seoDescription.trim().length < 20) {
    errors.push("توضیحات سئو باید حداقل 20 کاراکتر باشد");
  }

  return errors;
};

const generateSlug = (title) => {
  const slug = title
    .toLowerCase()
    .replace(/[^\w\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .substring(0, 100);

  return `${slug}-${Date.now()}`;
};

const processTags = (formData) => {
  const tags = [];
  let index = 0;

  while (true) {
    const tag = formData.get(`tags[${index}]`);
    if (!tag) break;

    if (tag.trim()) {
      tags.push(tag.trim());
    }

    index++;
  }

  return tags;
};

export async function POST(req) {
  try {
    await connectToDB();

    const formData = await req.formData();
    console.log("ARTICLE POST DATA -> ", formData);

    let uploadedImage = null;

    const title = formData.get("title")?.toString().trim();
    const summary = formData.get("summary")?.toString().trim();
    const content = formData.get("content")?.toString().trim();
    const status = formData.get("status")?.toString() || "draft";
    const category = formData.get("category")?.toString().trim();
    const readingTime = parseInt(formData.get("readingTime") || "1");
    const author = formData.get("author")?.toString().trim();
    const seoTitle = formData.get("seoTitle")?.toString().trim() || title;
    const seoDescription =
      formData.get("seoDescription")?.toString().trim() || summary;

    const image = formData.get("image");

    const validationErrors = validateArticleData({
      title,
      summary,
      content,
      category,
      readingTime,
      author,
      seoTitle,
      seoDescription,
    });

    if (validationErrors.length > 0) {
      console.log("POST Article - Validation errors:", validationErrors);
      return NextResponse.json(
        {
          success: false,
          message: "خطا در اعتبارسنجی",
          errors: validationErrors,
        },
        { status: 400 }
      );
    }

    if (!image || typeof image === "string") {
      return NextResponse.json(
        {
          success: false,
          message: "تصویر مقاله الزامی است",
        },
        { status: 400 }
      );
    }

    try {
      const result = await uploadImage(image, "articles");
      if (!result.success) {
        return NextResponse.json(
          {
            success: false,
            message: "خطا در آپلود تصویر",
            error: result.error,
          },
          { status: 400 }
        );
      }
      uploadedImage = result.fileUrl;

      console.log("POST Article - Uploaded image:", uploadedImage);
    } catch (uploadError) {
      console.error("POST Article - Image upload error:", uploadError);
      return NextResponse.json(
        {
          success: false,
          message: "خطا در آپلود تصویر",
          error: uploadError.message,
        },
        { status: 500 }
      );
    }

    const existingArticle = await ArticleModel.findOne({ title });
    if (existingArticle) {
      // پاک کردن تصویر آپلود شده
      if (uploadedImage) {
        await deleteUploadedFile(uploadedImage).catch((err) =>
          console.error("Error deleting uploaded image:", err)
        );
      }

      return NextResponse.json(
        {
          success: false,
          message: "مقاله با این عنوان قبلاً ثبت شده است",
        },
        { status: 409 }
      );
    }

    const tagsJson = formData.get("tags");
    let tags = [];

    if (tagsJson) {
      try {
        tags = JSON.parse(tagsJson);
      } catch (error) {
        console.log(
          "POST Article - Parsing JSON tags failed, processing manually"
        );
        tags = processTags(formData);
      }
    } else {
      tags = processTags(formData);
    }

    const slug = generateSlug(title);

    const articleData = {
      title,
      slug,
      summary,
      content,
      category,
      readingTime,
      author,
      image: uploadedImage,
      tags,
      seoTitle,
      seoDescription,
      status,
    };

    const newArticle = await ArticleModel.create(articleData);

    return NextResponse.json(
      {
        success: true,
        message: "مقاله با موفقیت ایجاد شد",
        data: newArticle,
      },
      { status: 201 }
    );
  } catch (err) {
    if (uploadedImage) {
      await deleteUploadedFile(uploadedImage).catch((err) =>
        console.error("خطا در حذف تصویر:", err)
      );
    }

    return Response.json(
      {
        success: false,
        message: "خطا در ساخت مقاله",
        error: err,
      },
      {
        status: 500,
      }
    );
  }
}
