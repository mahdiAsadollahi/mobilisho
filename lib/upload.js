import { writeFile } from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const DEFAULT_CONFIG = {
  maxSize: 5 * 1024 * 1024, // 5MB حداکثر حجم
  allowedExtensions: ["jpg", "jpeg", "png", "webp", "gif"], // پسوندهای مجاز
  uploadDir: "public/uploads", // پوشه آپلود پیش‌فرض
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000", // آدرس پایه
};

const validateFile = (file, config = {}) => {
  const { maxSize, allowedExtensions } = { ...DEFAULT_CONFIG, ...config };

  if (!file || !file.name || !file.size) {
    return {
      isValid: false,
      error: "فایل معتبر نمی‌باشد",
    };
  }

  // بررسی پسوند فایل
  const fileExtension = file.name.split(".").pop().toLowerCase();
  if (!allowedExtensions.includes(fileExtension)) {
    return {
      isValid: false,
      error: `پسوند فایل مجاز نمی‌باشد. پسوندهای مجاز: ${allowedExtensions.join(
        ", "
      )}`,
    };
  }

  // بررسی حجم فایل
  if (file.size > maxSize) {
    const maxSizeMB = (maxSize / (1024 * 1024)).toFixed(2);
    return {
      isValid: false,
      error: `حجم فایل باید کمتر از ${maxSizeMB} مگابایت باشد`,
    };
  }

  // بررسی نوع MIME
  const allowedMimeTypes = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    webp: "image/webp",
    gif: "image/gif",
  };

  if (!Object.values(allowedMimeTypes).includes(file.type)) {
    return {
      isValid: false,
      error: "نوع فایل معتبر نمی‌باشد",
    };
  }

  return {
    isValid: true,
    extension: fileExtension,
    mimeType: file.type,
  };
};

const generateUniqueFileName = (originalName, extension) => {
  const timestamp = Date.now();
  const uniqueId = uuidv4().split("-")[0]; // 8 کاراکتر اول UUID
  const sanitizedName = originalName
    .split(".")[0]
    .replace(/[^a-zA-Z0-9آ-ی_-]/g, "_") // حذف کاراکترهای غیرمجاز
    .substring(0, 50); // محدود کردن طول نام

  return `${sanitizedName}_${uniqueId}_${timestamp}.${extension}`;
};

export const uploadFile = async (file, options = {}) => {
  try {
    // تنظیمات
    const config = { ...DEFAULT_CONFIG, ...options };

    // بررسی اعتبار فایل
    const validation = validateFile(file, config);
    if (!validation.isValid) {
      return {
        success: false,
        error: validation.error,
      };
    }

    // ایجاد نام یکتا برای فایل
    const uniqueFileName = generateUniqueFileName(
      file.name,
      validation.extension
    );

    // ایجاد مسیر کامل
    const uploadPath = path.join(process.cwd(), config.uploadDir);
    const filePath = path.join(uploadPath, uniqueFileName);

    // ایجاد بافر از فایل
    const buffer = Buffer.from(await file.arrayBuffer());

    // ذخیره فایل
    await writeFile(filePath, buffer);

    // تولید URL دسترسی به فایل
    const relativePath = path
      .join(config.uploadDir, uniqueFileName)
      .replace(/\\/g, "/");
    const fileUrl = `${config.baseUrl}/${relativePath.replace("public/", "")}`;

    return {
      success: true,
      fileName: uniqueFileName,
      originalName: file.name,
      filePath: filePath,
      fileUrl: fileUrl,
      relativePath: relativePath,
      size: file.size,
      mimeType: validation.mimeType,
      extension: validation.extension,
      message: "فایل با موفقیت آپلود شد",
    };
  } catch (error) {
    console.error("خطا در آپلود فایل:", error);
    return {
      success: false,
      error: `خطا در آپلود فایل: ${error.message}`,
    };
  }
};

export const uploadImage = async (imageFile) => {
  return uploadFile(imageFile, {
    allowedExtensions: ["jpg", "jpeg", "png", "webp"],
    maxSize: 5 * 1024 * 1024, // 5MB برای تصاویر
  });
};

export const uploadProductImage = async (productImage) => {
  return uploadFile(productImage, {
    allowedExtensions: ["jpg", "jpeg", "png", "webp"],
    maxSize: 2 * 1024 * 1024, // 2MB برای محصولات (برای سرعت لود بهتر)
    uploadDir: "public/uploads/products", // پوشه مخصوص محصولات
  });
};

export const uploadArticleImage = async (articleImage) => {
  return uploadFile(articleImage, {
    allowedExtensions: ["jpg", "jpeg", "png", "webp", "gif"],
    maxSize: 3 * 1024 * 1024, // 3MB برای مقالات
    uploadDir: "public/uploads/articles", // پوشه مخصوص مقالات
  });
};
