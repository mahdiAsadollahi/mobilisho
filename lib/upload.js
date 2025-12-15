import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";

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

// تابع جدید برای تولید نام امن فایل با UUID
const generateSecureFileName = (originalName, extension) => {
  // تولید UUID کامل
  const uuid = uuidv4();

  // فقط پسوند فایل را از نام اصلی بگیریم
  // نام اصلی را کاملاً نادیده می‌گیریم و فقط UUID استفاده می‌کنیم
  return `${uuid}.${extension}`;

  // اگر می‌خواهید کمی اطلاعات مفید داشته باشید:
  // const timestamp = Date.now();
  // const safeName = originalName
  //   .split('.')[0]
  //   .replace(/[^a-zA-Z0-9آ-ی_-]/g, '_')
  //   .substring(0, 20);
  // return `${safeName}_${uuid}_${timestamp}.${extension}`;
};

// تابع برای ایجاد پوشه اگر وجود ندارد
const ensureDirectoryExists = async (dirPath) => {
  try {
    await fs.promises.access(dirPath);
  } catch {
    await mkdir(dirPath, { recursive: true });
    console.log(`Directory created: ${dirPath}`);
  }
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

    // ایجاد نام امن با UUID
    const secureFileName = generateSecureFileName(
      file.name,
      validation.extension
    );

    // ایجاد مسیر کامل
    const uploadPath = path.join(process.cwd(), config.uploadDir);
    const filePath = path.join(uploadPath, secureFileName);

    // اطمینان از وجود پوشه
    await ensureDirectoryExists(uploadPath);

    // ایجاد بافر از فایل
    const buffer = Buffer.from(await file.arrayBuffer());

    // ذخیره فایل
    await writeFile(filePath, buffer);

    // تولید URL دسترسی به فایل
    const relativePath = path
      .join(config.uploadDir, secureFileName)
      .replace(/\\/g, "/");
    const fileUrl = `${config.baseUrl}/${relativePath.replace("public/", "")}`;

    return {
      success: true,
      fileName: secureFileName,
      originalName: file.name, // فقط برای اطلاع کاربر، نه برای استفاده
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
    maxSize: 2 * 1024 * 1024, // 2MB برای محصولات
    uploadDir: "public/uploads/products",
  });
};

export const uploadArticleImage = async (articleImage) => {
  return uploadFile(articleImage, {
    allowedExtensions: ["jpg", "jpeg", "png", "webp", "gif"],
    maxSize: 3 * 1024 * 1024, // 3MB برای مقالات
    uploadDir: "public/uploads/articles",
  });
};

// تابع جدید برای آپلود تصاویر دسته‌بندی
export const uploadCategoryImage = async (categoryImage) => {
  return uploadFile(categoryImage, {
    allowedExtensions: ["jpg", "jpeg", "png", "webp"],
    maxSize: 2 * 1024 * 1024, // 2MB برای دسته‌بندی‌ها
    uploadDir: "public/uploads/categories",
  });
};

// تابع کمکی برای حذف فایل امن
export const deleteUploadedFile = async (fileUrl) => {
  try {
    if (!fileUrl)
      return { success: true, message: "فایلی برای حذف وجود ندارد" };

    // استخراج مسیر نسبی از URL
    const urlParts = fileUrl.split("/uploads/");
    if (urlParts.length < 2) {
      return { success: false, error: "آدرس فایل معتبر نیست" };
    }

    const relativePath = urlParts[1];
    const filePath = path.join(
      process.cwd(),
      "public",
      "uploads",
      relativePath
    );

    // بررسی وجود فایل
    try {
      await fs.promises.access(filePath);
      await fs.promises.unlink(filePath);
      return { success: true, message: "فایل با موفقیت حذف شد" };
    } catch (err) {
      // اگر فایل وجود نداشت، خطا نیست
      if (err.code === "ENOENT") {
        return { success: true, message: "فایل قبلاً حذف شده بود" };
      }
      throw err;
    }
  } catch (error) {
    console.error("خطا در حذف فایل:", error);
    return { success: false, error: `خطا در حذف فایل: ${error.message}` };
  }
};
