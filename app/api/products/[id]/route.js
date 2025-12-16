import connectToDB from "@/configs/db";
import ProductModel from "@/models/Product";
import CategoryModel from "@/models/Category";
import { uploadProductImage, deleteUploadedFile } from "@/lib/upload";
import { NextResponse } from "next/server";

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

// GET: دریافت یک محصول با آیدی
export async function GET(request, { params }) {
  try {
    await connectToDB();

    // دریافت params به صورت صحیح
    const paramsObj = await params;
    const { id } = paramsObj;

    console.log("GET Product by ID - ID:", id);
    console.log("GET Product by ID - Full params:", paramsObj);

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "شناسه محصول الزامی است",
        },
        { status: 400 }
      );
    }

    const product = await ProductModel.findById(id).populate(
      "categoryId",
      "title icon _id"
    );

    console.log("GET Product by ID - Found product:", product ? "Yes" : "No");

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          message: "محصول یافت نشد",
        },
        { status: 404 }
      );
    }

    // محاسبه موجودی کل
    const totalStock =
      product.stock +
      (product.variations || []).reduce((sum, v) => sum + (v.stock || 0), 0);

    // تبدیل به object برای ویرایش
    const productObj = product.toObject();

    const productWithTotalStock = {
      ...productObj,
      totalStock,
      specifications: productObj.specifications || [],
      variations: productObj.variations || [],
      categoryId: productObj.categoryId?._id || productObj.categoryId,
      categoryInfo: productObj.categoryId,
    };

    console.log("GET Product by ID - Response data structure:", {
      hasSpecifications: !!productWithTotalStock.specifications,
      hasVariations: !!productWithTotalStock.variations,
      specificationsCount: productWithTotalStock.specifications?.length || 0,
      variationsCount: productWithTotalStock.variations?.length || 0,
    });

    return NextResponse.json({
      success: true,
      data: productWithTotalStock,
    });
  } catch (error) {
    console.error("GET Product by ID Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "خطا در دریافت محصول",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// PUT: ویرایش کامل محصول
export async function PUT(request, { params }) {
  let newUploadedImages = [];
  let oldImagesToKeep = [];

  try {
    await connectToDB();

    // دریافت params به صورت صحیح
    const paramsObj = await params;
    const { id } = paramsObj;

    console.log("PUT Product - ID:", id);

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "شناسه محصول الزامی است",
        },
        { status: 400 }
      );
    }

    // بررسی وجود محصول
    const existingProduct = await ProductModel.findById(id);
    if (!existingProduct) {
      return NextResponse.json(
        {
          success: false,
          message: "محصول یافت نشد",
        },
        { status: 404 }
      );
    }

    const formData = await request.formData();
    console.log("PUT - FormData keys:", Array.from(formData.keys()));

    // دریافت داده‌های به‌روزرسانی
    const name =
      formData.get("name")?.toString().trim() || existingProduct.name;
    const description =
      formData.get("description")?.toString().trim() ||
      existingProduct.description;
    const price = parseFloat(formData.get("price") || existingProduct.price);
    const stock = parseInt(formData.get("stock") || existingProduct.stock);
    const categoryId =
      formData.get("categoryId")?.toString().trim() ||
      existingProduct.categoryId.toString();
    const isActive = formData.get("isActive") !== "false";

    // دریافت عکس‌های قدیمی که باید نگه داشته شوند
    const keepImages = formData.get("keepImages")?.toString().split(",") || [];
    oldImagesToKeep = keepImages.filter((img) => img.trim());
    console.log("PUT - Old images to keep:", oldImagesToKeep);

    // دریافت عکس‌های جدید
    const newImages = [];
    let imageIndex = 0;
    while (true) {
      const image = formData.get(`newImages[${imageIndex}]`);
      if (!image || typeof image === "string") break;
      newImages.push(image);
      imageIndex++;
    }
    console.log("PUT - New images count:", newImages.length);

    // آپلود عکس‌های جدید
    if (newImages.length > 0) {
      newUploadedImages = await uploadMultipleImages(newImages);
      console.log("PUT - New uploaded images:", newUploadedImages);
    }

    // حذف عکس‌های قدیمی که انتخاب نشده‌اند
    const imagesToDelete = existingProduct.images.filter(
      (img) => !oldImagesToKeep.includes(img)
    );
    console.log("PUT - Images to delete:", imagesToDelete);

    for (const imageUrl of imagesToDelete) {
      try {
        await deleteUploadedFile(imageUrl);
      } catch (deleteError) {
        console.error("Error deleting old image:", deleteError);
      }
    }

    // ترکیب عکس‌های قدیمی (نگه‌داشته شده) و جدید
    const finalImages = [...oldImagesToKeep, ...newUploadedImages];
    console.log("PUT - Final images:", finalImages);

    if (finalImages.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "محصول باید حداقل یک عکس داشته باشد",
        },
        { status: 400 }
      );
    }

    // پردازش مشخصات فنی
    let specifications = existingProduct.specifications || [];
    const specsJson = formData.get("specifications");
    console.log("PUT - Specifications JSON:", specsJson);

    if (specsJson) {
      try {
        specifications = JSON.parse(specsJson);
      } catch (error) {
        console.log("PUT - Parsing JSON specs failed, processing manually");
        specifications = processSpecifications(formData);
      }
    } else {
      specifications = processSpecifications(formData);
    }
    console.log("PUT - Final specifications:", specifications);

    // پردازش تنوع‌ها
    let variations = existingProduct.variations || [];
    const variationsJson = formData.get("variations");
    console.log("PUT - Variations JSON:", variationsJson);

    if (variationsJson) {
      try {
        variations = JSON.parse(variationsJson);
      } catch (error) {
        console.log(
          "PUT - Parsing JSON variations failed, processing manually"
        );
        variations = processVariations(formData, price);
      }
    } else {
      variations = processVariations(formData, price);
    }
    console.log("PUT - Final variations:", variations);

    // محاسبه موجودی کل
    const totalStock =
      stock + variations.reduce((sum, v) => sum + (v.stock || 0), 0);

    // داده‌های به‌روزرسانی
    const updateData = {
      name,
      description,
      price,
      stock,
      totalStock,
      categoryId,
      specifications,
      variations,
      images: finalImages,
      isActive,
    };

    // اگر نام تغییر کرده، slug جدید ایجاد کن
    if (name !== existingProduct.name) {
      updateData.slug =
        name
          .toLowerCase()
          .replace(/[^\w\u0600-\u06FF]+/g, "-")
          .replace(/^-+|-+$/g, "") +
        "-" +
        Date.now();
    }

    console.log("PUT - Update data:", updateData);

    // به‌روزرسانی محصول
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).populate("categoryId", "title icon _id");

    // اگر دسته‌بندی تغییر کرده، تعداد محصولات رو به‌روزرسانی کن
    if (categoryId !== existingProduct.categoryId.toString()) {
      await Promise.all([
        CategoryModel.findByIdAndUpdate(existingProduct.categoryId, {
          $inc: { productCount: -1 },
        }),
        CategoryModel.findByIdAndUpdate(categoryId, {
          $inc: { productCount: 1 },
        }),
      ]);
    }

    return NextResponse.json({
      success: true,
      message: "محصول با موفقیت ویرایش شد",
      data: updatedProduct,
    });
  } catch (error) {
    console.error("PUT Product Error:", error);

    // در صورت خطا، عکس‌های جدید آپلود شده رو پاک کن
    if (newUploadedImages.length > 0) {
      for (const imageUrl of newUploadedImages) {
        try {
          await deleteUploadedFile(imageUrl);
        } catch (deleteError) {
          console.error("Error deleting newly uploaded image:", deleteError);
        }
      }
    }

    return NextResponse.json(
      {
        success: false,
        message: "خطا در ویرایش محصول",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// DELETE: حذف محصول
export async function DELETE(request, { params }) {
  try {
    await connectToDB();

    // دریافت params به صورت صحیح
    const paramsObj = await params;
    const { id } = paramsObj;

    console.log("DELETE Product - ID:", id);

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "شناسه محصول الزامی است",
        },
        { status: 400 }
      );
    }

    const product = await ProductModel.findById(id);

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          message: "محصول یافت نشد",
        },
        { status: 404 }
      );
    }

    // حذف تمام عکس‌های محصول
    for (const imageUrl of product.images) {
      try {
        await deleteUploadedFile(imageUrl);
      } catch (deleteError) {
        console.error("Error deleting product image:", deleteError);
      }
    }

    // ذخیره اطلاعات برای پاسخ
    const deletedProduct = {
      _id: product._id,
      name: product.name,
      categoryId: product.categoryId,
    };

    // حذف محصول از دیتابیس
    await ProductModel.findByIdAndDelete(id);

    // کاهش تعداد محصولات دسته‌بندی
    await CategoryModel.findByIdAndUpdate(product.categoryId, {
      $inc: { productCount: -1 },
    });

    return NextResponse.json({
      success: true,
      message: "محصول با موفقیت حذف شد",
      data: deletedProduct,
    });
  } catch (error) {
    console.error("DELETE Product Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "خطا در حذف محصول",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// PATCH: به‌روزرسانی جزئی (مثلاً فقط وضعیت یا موجودی)
export async function PATCH(request, { params }) {
  try {
    await connectToDB();

    // دریافت params به صورت صحیح
    const paramsObj = await params;
    const { id } = paramsObj;

    console.log("PATCH Product - ID:", id);

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "شناسه محصول الزامی است",
        },
        { status: 400 }
      );
    }

    const body = await request.json();
    console.log("PATCH - Request body:", body);

    // فقط فیلدهای مجاز برای PATCH
    const allowedFields = ["isActive", "stock", "price", "name", "description"];
    const updateData = {};

    for (const key in body) {
      if (allowedFields.includes(key)) {
        updateData[key] = body[key];
      }
    }

    console.log("PATCH - Update data:", updateData);

    // اگر موجودی یا قیمت تغییر کرد، به‌روزرسانی کن
    if (updateData.stock !== undefined || updateData.price !== undefined) {
      const product = await ProductModel.findById(id);
      if (product) {
        // اگر قیمت تغییر کرد، قیمت تنوع‌ها رو هم به‌روزرسانی کن
        if (
          updateData.price &&
          product.variations &&
          product.variations.length > 0
        ) {
          updateData.variations = product.variations.map((variation) => ({
            ...variation,
            price: updateData.price,
          }));
        }
      }
    }

    const updatedProduct = await ProductModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    ).populate("categoryId", "title icon _id");

    if (!updatedProduct) {
      return NextResponse.json(
        {
          success: false,
          message: "محصول یافت نشد",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "محصول با موفقیت به‌روزرسانی شد",
      data: updatedProduct,
    });
  } catch (error) {
    console.error("PATCH Product Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "خطا در به‌روزرسانی محصول",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
