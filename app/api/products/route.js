import connectToDB from "@/configs/db";
import ProductModel from "@/models/Product";
import CategoryModel from "@/models/Category";
import { uploadProductImage, deleteUploadedFile } from "@/lib/upload";
import { NextResponse } from "next/server";

/**
 * اعتبارسنجی داده‌های محصول
 */
const validateProductData = (data) => {
  const errors = [];

  if (!data.name || data.name.trim().length < 2) {
    errors.push("نام محصول باید حداقل 2 کاراکتر باشد");
  }

  if (!data.description || data.description.trim().length < 10) {
    errors.push("توضیحات محصول باید حداقل 10 کاراکتر باشد");
  }

  if (!data.price || data.price <= 0) {
    errors.push("قیمت محصول باید بیشتر از 0 باشد");
  }

  if (data.stock < 0) {
    errors.push("موجودی نمی‌تواند منفی باشد");
  }

  if (!data.categoryId) {
    errors.push("دسته‌بندی الزامی است");
  }

  return errors;
};

/**
 * تولید slug از نام محصول
 */
const generateSlug = (name) => {
  const slug = name
    .toLowerCase()
    .replace(/[^\w\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .substring(0, 100);

  return `${slug}-${Date.now()}`;
};

/**
 * پردازش مشخصات فنی از فرم‌دیتا
 */
const processSpecifications = (formData) => {
  const specifications = [];
  let index = 0;

  while (true) {
    const key = formData.get(`specifications[${index}][key]`);
    const value = formData.get(`specifications[${index}][value]`);

    if (!key || !value) break;

    if (key.trim() && value.trim()) {
      specifications.push({
        key: key.trim(),
        value: value.trim(),
      });
    }

    index++;
  }

  return specifications;
};

/**
 * پردازش تنوع‌های محصول از فرم‌دیتا
 */
const processVariations = (formData, basePrice) => {
  const variations = [];
  let index = 0;

  while (true) {
    const type = formData.get(`variations[${index}][type]`);
    const value = formData.get(`variations[${index}][value]`);
    const price = formData.get(`variations[${index}][price]`);
    const stock = formData.get(`variations[${index}][stock]`);

    if (!type || !value) break;

    if (type.trim() && value.trim()) {
      variations.push({
        type: type.trim(),
        value: value.trim(),
        price: price ? parseFloat(price) : basePrice,
        stock: stock ? parseInt(stock) : 0,
      });
    }

    index++;
  }

  return variations;
};

/**
 * آپلود چندین عکس به صورت موازی
 */
const uploadMultipleImages = async (images) => {
  const uploadPromises = images
    .filter((image) => image && image.size > 0)
    .map(async (image) => {
      try {
        const result = await uploadProductImage(image);
        return result.success ? result.fileUrl : null;
      } catch (error) {
        console.error(`خطا در آپلود عکس: ${error.message}`);
        return null;
      }
    });

  const results = await Promise.all(uploadPromises);
  return results.filter((url) => url !== null);
};

/**
 * دریافت لیست محصولات با فیلتر و صفحه‌بندی
 */
export async function GET(request) {
  try {
    await connectToDB();

    const { searchParams } = new URL(request.url);

    // پارامترهای فیلتر
    const categoryId = searchParams.get("categoryId");
    const isActive = searchParams.get("isActive");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const search = searchParams.get("search");
    const hasStock = searchParams.get("hasStock");

    // پارامترهای صفحه‌بندی
    const page = Math.max(1, parseInt(searchParams.get("page")) || 1);
    const limit = Math.min(
      50,
      Math.max(1, parseInt(searchParams.get("limit")) || 20)
    );
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const sortOrder = searchParams.get("sortOrder") === "asc" ? 1 : -1;

    // ساخت آبجکت فیلتر
    const filter = {};

    if (categoryId) filter.categoryId = categoryId;
    if (isActive !== null) filter.isActive = isActive === "true";

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }

    if (hasStock === "true") filter.stock = { $gt: 0 };
    if (hasStock === "false") filter.stock = 0;

    if (search?.trim()) {
      filter.$or = [
        { name: { $regex: search.trim(), $options: "i" } },
        { description: { $regex: search.trim(), $options: "i" } },
      ];
    }

    // اجرای کوئری‌ها به صورت موازی
    const [products, total] = await Promise.all([
      ProductModel.find(filter)
        .populate("categoryId", "title icon _id")
        .select("-specifications -variations")
        .sort({ [sortBy]: sortOrder })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      ProductModel.countDocuments(filter),
    ]);

    // محاسبه موجودی کل شامل تنوع‌ها
    const productsWithStock = products.map((product) => ({
      ...product,
      totalStock:
        product.stock +
        (product.variations || []).reduce((sum, v) => sum + (v.stock || 0), 0),
    }));

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      success: true,
      data: productsWithStock,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
      filters: {
        applied: {
          categoryId,
          isActive,
          minPrice,
          maxPrice,
          search,
          hasStock,
        },
      },
    });
  } catch (error) {
    console.error("خطا در دریافت محصولات:", error);

    return NextResponse.json(
      {
        success: false,
        message: "خطا در دریافت محصولات",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

/**
 * ایجاد محصول جدید
 */
export async function POST(request) {
  let uploadedImages = [];

  try {
    await connectToDB();

    const formData = await request.formData();
    console.log("POST - FormData keys:", Array.from(formData.keys()));

    // استخراج داده‌های اصلی
    const name = formData.get("name")?.toString().trim();
    const description = formData.get("description")?.toString().trim();
    const price = parseFloat(formData.get("price") || "0");
    const stock = parseInt(formData.get("stock") || "0");
    const categoryId = formData.get("categoryId")?.toString().trim();
    const isActive = formData.get("isActive") !== "false";

    // استخراج عکس‌ها
    const images = [];
    let imageIndex = 0;
    while (true) {
      const image = formData.get(`images[${imageIndex}]`);
      if (!image || typeof image === "string") break;
      images.push(image);
      imageIndex++;
    }

    console.log("POST - Extracted data:", {
      name,
      descriptionLength: description?.length,
      price,
      stock,
      categoryId,
      imagesCount: images.length,
    });

    // اعتبارسنجی داده‌ها
    const validationErrors = validateProductData({
      name,
      description,
      price,
      stock,
      categoryId,
    });

    if (validationErrors.length > 0) {
      console.log("POST - Validation errors:", validationErrors);
      return NextResponse.json(
        {
          success: false,
          message: "خطا در اعتبارسنجی",
          errors: validationErrors,
        },
        { status: 400 }
      );
    }

    // بررسی وجود دسته‌بندی
    const categoryExists = await CategoryModel.findById(categoryId);
    if (!categoryExists) {
      return NextResponse.json(
        {
          success: false,
          message: "دسته‌بندی انتخاب شده وجود ندارد",
        },
        { status: 400 }
      );
    }

    // بررسی تکراری نبودن نام
    const existingProduct = await ProductModel.findOne({ name });
    if (existingProduct) {
      return NextResponse.json(
        {
          success: false,
          message: "محصول با این نام قبلاً ثبت شده است",
        },
        { status: 409 }
      );
    }

    // آپلود عکس‌ها
    uploadedImages = await uploadMultipleImages(images);
    console.log("POST - Uploaded images:", uploadedImages);

    if (uploadedImages.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "حداقل یک عکس برای محصول الزامی است",
        },
        { status: 400 }
      );
    }

    // پردازش داده‌های اضافی
    const specificationsJson = formData.get("specifications");
    const variationsJson = formData.get("variations");

    let specifications = [];
    if (specificationsJson) {
      try {
        specifications = JSON.parse(specificationsJson);
      } catch (error) {
        console.log("POST - Parsing JSON specs failed, processing manually");
        specifications = processSpecifications(formData);
      }
    } else {
      specifications = processSpecifications(formData);
    }

    let variations = [];
    if (variationsJson) {
      try {
        variations = JSON.parse(variationsJson);
      } catch (error) {
        console.log(
          "POST - Parsing JSON variations failed, processing manually"
        );
        variations = processVariations(formData, price);
      }
    } else {
      variations = processVariations(formData, price);
    }

    const slug = generateSlug(name);
    const totalStock =
      stock + variations.reduce((sum, v) => sum + (v.stock || 0), 0);

    // ایجاد محصول جدید
    const productData = {
      name,
      slug,
      description,
      price,
      stock,
      categoryId,
      specifications,
      variations,
      images: uploadedImages,
      isActive,
      totalStock,
    };

    console.log("POST - Product data to create:", productData);

    const newProduct = await ProductModel.create(productData);

    // افزایش تعداد محصولات دسته‌بندی
    await CategoryModel.findByIdAndUpdate(categoryId, {
      $inc: { productCount: 1 },
    });

    // بازگرداندن محصول کامل
    const populatedProduct = await ProductModel.findById(
      newProduct._id
    ).populate("categoryId", "title icon _id");

    return NextResponse.json(
      {
        success: true,
        message: "محصول با موفقیت ایجاد شد",
        data: populatedProduct,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("خطا در ایجاد محصول:", error);

    // پاک‌سازی عکس‌های آپلود شده در صورت خطا
    if (uploadedImages.length > 0) {
      await Promise.allSettled(
        uploadedImages.map((imageUrl) =>
          deleteUploadedFile(imageUrl).catch((err) =>
            console.error("خطا در حذف عکس:", err)
          )
        )
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "خطا در ایجاد محصول",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
