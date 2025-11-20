// app/admin/articles/edit/[id]/page.js
"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  FiArrowRight,
  FiUpload,
  FiPlus,
  FiTrash2,
  FiTag,
  FiSave,
  FiEye,
} from "react-icons/fi";
import SimpleEditor from "@/app/components/ui/SimpleEditor/SimpleEditor";

// داده‌های نمونه مقالات (همانند صفحه پیش‌نمایش)
const sampleArticles = {
  1: {
    id: 1,
    title: "آموزش کامل React.js برای توسعه فرانت‌اند",
    summary: "یادگیری اصول و مفاهیم پیشرفته React.js در سال 2024",
    content: `
      <div class="prose max-w-none">
        <h2>مقدمه ای بر React.js</h2>
        <p>React.js یک کتابخانه قدرتمند جاوااسکریپت برای ساخت رابط‌های کاربری است. این کتابخانه توسط فیسبوک توسعه داده شده و امروزه توسط بسیاری از شرکت‌های بزرگ فناوری استفاده می‌شود.</p>
        
        <h3>مزایای استفاده از React</h3>
        <ul>
          <li><strong>یادگیری آسان:</strong> مستندات کامل و جامعه بزرگ</li>
          <li><strong>کامپوننت‌های قابل استفاده مجدد:</strong> صرفه‌جویی در زمان توسعه</li>
          <li><strong>Virtual DOM:</strong> عملکرد فوق‌العاده</li>
          <li><strong>اکوسیستم غنی:</strong> ابزارها و کتابخانه‌های متعدد</li>
        </ul>
        
        <h3>نصب و راه‌اندازی</h3>
        <p>برای شروع کار با React می‌توانید از Create React App استفاده کنید:</p>
        
        <pre><code>npx create-react-app my-app
cd my-app
npm start</code></pre>
        
        <h3>نتیجه‌گیری</h3>
        <p>React.js انتخابی عالی برای توسعه اپلیکیشن‌های مدرن وب است. با یادگیری این کتابخانه، می‌توانید اپلیکیشن‌های پیچیده و مقیاس‌پذیر ایجاد کنید.</p>
      </div>
    `,
    mainImage:
      "https://tec.shuner.ir/wp-content/uploads/2025/07/call-of-duty-black-ops-6-black-man-soldier-6655e4e14b10d5a6894b8256.webp",
    tags: ["React", "جاوااسکریپت", "فرانت‌اند", "برنامه‌نویسی"],
    author: "علیرضا محمدی",
    status: "published",
    readTime: 8,
    views: 1245,
    likes: 89,
    createdAt: "2024-01-15",
    publishedAt: "2024-01-15",
    isActive: true,
    category: "آموزش برنامه‌نویسی",
  },
  2: {
    id: 2,
    title: "بررسی جدیدترین قابلیت‌های Next.js 14",
    summary: "آشنایی با امکانات جدید و بهره‌وری نسخه 14 Next.js",
    content: `
      <div class="prose max-w-none">
        <h2>Next.js 14: انقلابی در توسعه وب</h2>
        <p>Next.js 14 آخرین نسخه از این فریمورک محبوب React است که ویژگی‌های متعددی را به ارمغان آورده است.</p>
        
        <h3>مهم‌ترین ویژگی‌های جدید</h3>
        
        <h4>1. Turbopack پایدار</h4>
        <p>Turbopack که قبلاً در حالت beta بود، اکنون به صورت پایدار در دسترس است. این باندلر جدید سرعت کامپایل را تا ۵ برابر افزایش می‌دهد.</p>
        
        <h4>2. Server Actions پایدار</h4>
        <p>اکنون می‌توانید توابع سرور را مستقیماً از کامپوننت‌های React فراخوانی کنید.</p>
        
        <h4>3. بهبودهای Image Component</h4>
        <p>کامپوننت Image اکنون از فرمت‌های جدید پشتیبانی می‌کند و بهینه‌سازی‌های بیشتری دارد.</p>
        
        <h3>کد نمونه</h3>
        <pre><code>// app/page.js
export default function Home() {
  return (
    &lt;div&gt;
      &lt;h1&gt;به Next.js 14 خوش آمدید&lt;/h1&gt;
    &lt;/div&gt;
  )
}</code></pre>
      </div>
    `,
    mainImage:
      "https://tec.shuner.ir/wp-content/uploads/2025/07/2020-12-sony-playstation-4-fat-vs-5-638c64e4a77666af5aef0d0e.webp",
    tags: ["Next.js", "React", "فریمورک", "توسعه وب"],
    author: "محمد رضایی",
    status: "published",
    readTime: 6,
    views: 892,
    likes: 45,
    createdAt: "2024-01-10",
    publishedAt: "2024-01-10",
    isActive: true,
    category: "تکنولوژی",
  },
  3: {
    id: 3,
    title: "بهینه‌سازی عملکرد در اپلیکیشن‌های React",
    summary: "تکنیک‌های پیشرفته برای بهبود performance اپلیکیشن‌های React",
    content: `
      <div class="prose max-w-none">
        <h2>بهینه‌سازی عملکرد در React</h2>
        <p>با رشد اپلیکیشن‌های React، بهینه‌سازی عملکرد تبدیل به یک ضرورت شده است. در این مقاله به بررسی تکنیک‌های مختلف می‌پردازیم.</p>
        
        <h3>۱. استفاده از React.memo</h3>
        <p>React.memo یک Higher-Order Component است که از رندرهای غیرضروری جلوگیری می‌کند.</p>
        
        <pre><code>const MyComponent = React.memo(function MyComponent({ prop }) {
  return &lt;div&gt;{prop}&lt;/div&gt;;
});</code></pre>
        
        <h3>۲. استفاده از useCallback و useMemo</h3>
        <p>این هوک‌ها از ایجاد مجدد توابع و مقادیر جلوگیری می‌کنند.</p>
        
        <pre><code>const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
const memoizedCallback = useCallback(() => { doSomething(a, b); }, [a, b]);</code></pre>
        
        <h3>۳. کداسپلیتینگ با React.lazy</h3>
        <p>بارگذاری تنبل کامپوننت‌ها می‌تواند زمان بارگذاری اولیه را کاهش دهد.</p>
        
        <pre><code>const LazyComponent = React.lazy(() => import('./LazyComponent'));</code></pre>
        
        <h3>۴. بهینه‌سازی تصاویر</h3>
        <p>استفاده از فرمت‌های مدرن مانند WebP و lazy loading تصاویر.</p>
      </div>
    `,
    mainImage:
      "https://tec.shuner.ir/wp-content/uploads/2025/10/tp-link-tl-wr3602be-689356e34a11743828d587c7-1.webp",
    tags: ["React", "Performance", "بهینه‌سازی", "جاوااسکریپت"],
    author: "سارا احمدی",
    status: "draft",
    readTime: 10,
    views: 0,
    likes: 0,
    createdAt: "2024-01-08",
    publishedAt: null,
    isActive: true,
    category: "آموزش برنامه‌نویسی",
  },
};

const categories = [
  "آموزش برنامه‌نویسی",
  "تکنولوژی",
  "اخبار",
  "طراحی وب",
  "هوش مصنوعی",
];

export default function EditArticlePage({ params }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    content: "",
    mainImage: "",
    tags: [],
    category: categories[0],
    status: "draft",
    readTime: "",
    author: "مدیر سایت",
    seoTitle: "",
    seoDescription: "",
  });
  const [newTag, setNewTag] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [article, setArticle] = useState(null);
  const fileInputRef = useRef(null);

  // دریافت مقاله بر اساس ID
  useEffect(() => {
    const fetchArticle = async () => {
      const { id } = await params;
      const foundArticle = sampleArticles[id];

      if (!foundArticle) {
        router.push("/admin/articles");
        return;
      }

      setArticle(foundArticle);
      setFormData({
        title: foundArticle.title,
        summary: foundArticle.summary,
        content: foundArticle.content,
        mainImage: foundArticle.mainImage,
        tags: foundArticle.tags,
        category: foundArticle.category,
        status: foundArticle.status,
        readTime: foundArticle.readTime.toString(),
        author: foundArticle.author,
        seoTitle: foundArticle.title,
        seoDescription: foundArticle.summary,
      });
      setImagePreview(foundArticle.mainImage);
    };

    fetchArticle();
  }, [params, router]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      setFormData((prev) => ({
        ...prev,
        mainImage: file,
      }));
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const removeImage = () => {
    setImagePreview("");
    setFormData((prev) => ({ ...prev, mainImage: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // شبیه‌سازی ارسال داده برای ویرایش
    setTimeout(() => {
      console.log("Updated article data:", formData);
      setLoading(false);
      alert("مقاله با موفقیت ویرایش شد!");
      router.push("/admin/articles");
    }, 2000);
  };

  const handleSaveDraft = () => {
    handleChange("status", "draft");
    // ذخیره به عنوان پیش‌نویس
    handleSubmit(new Event("submit"));
  };

  const handlePublish = () => {
    handleChange("status", "published");
    // انتشار مقاله
    handleSubmit(new Event("submit"));
  };

  const handlePreview = () => {
    if (article) {
      router.push(`/blog/preview/${article.id}`);
    }
  };

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">در حال بارگذاری مقاله...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* هدر صفحه */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">
            ویرایش مقاله
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            ویرایش مقاله: {article.title}
          </p>
        </div>

        <div className="flex gap-3 mt-4 sm:mt-0">
          <button
            onClick={handlePreview}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FiEye size={18} />
            پیش‌نمایش
          </button>
          <button
            onClick={() => router.push("/admin/articles")}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            <FiArrowRight size={18} />
            بازگشت به لیست
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ستون اصلی */}
          <div className="lg:col-span-2 space-y-6">
            {/* عنوان */}
            <div className="bg-white rounded-xl p-6 shadow">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                عنوان مقاله *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-lg"
                placeholder="عنوان جذاب و کامل مقاله را وارد کنید..."
                required
              />
            </div>

            {/* خلاصه */}
            <div className="bg-white rounded-xl p-6 shadow">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                خلاصه مقاله *
              </label>
              <textarea
                value={formData.summary}
                onChange={(e) => handleChange("summary", e.target.value)}
                rows={3}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="خلاصه کوتاه و جذاب از محتوای مقاله"
                required
              />
            </div>

            {/* محتوای اصلی */}
            <div className="bg-white rounded-xl p-6 shadow">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                محتوای مقاله *
              </label>
              <SimpleEditor
                value={formData.content}
                onChange={(data) => handleChange("content", data)}
                placeholder="محتوای کامل مقاله را اینجا بنویسید..."
              />
            </div>

            {/* سئو */}
            <div className="bg-white rounded-xl p-6 shadow">
              <h3 className="text-lg font-medium text-gray-800 mb-4">
                تنظیمات سئو
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    عنوان سئو
                  </label>
                  <input
                    type="text"
                    value={formData.seoTitle}
                    onChange={(e) => handleChange("seoTitle", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="عنوان برای سئو"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    توضیحات سئو
                  </label>
                  <textarea
                    value={formData.seoDescription}
                    onChange={(e) =>
                      handleChange("seoDescription", e.target.value)
                    }
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="توضیحات متا برای سئو"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ستون کناری */}
          <div className="space-y-6">
            {/* تنظیمات انتشار */}
            <div className="bg-white rounded-xl p-6 shadow">
              <h3 className="text-lg font-medium text-gray-800 mb-4">
                تنظیمات انتشار
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    وضعیت
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => handleChange("status", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="draft">پیش‌نویس</option>
                    <option value="published">منتشر شده</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    دسته‌بندی *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => handleChange("category", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    زمان مطالعه (دقیقه) *
                  </label>
                  <input
                    type="number"
                    value={formData.readTime}
                    onChange={(e) => handleChange("readTime", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="8"
                    min="1"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    نویسنده
                  </label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => handleChange("author", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="نام نویسنده"
                  />
                </div>
              </div>
            </div>

            {/* تصویر اصلی */}
            <div className="bg-white rounded-xl p-6 shadow">
              <h3 className="text-lg font-medium text-gray-800 mb-4">
                تصویر اصلی
              </h3>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />

              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg border border-gray-200"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={triggerFileInput}
                  className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-green-500 hover:bg-green-50 transition-colors"
                >
                  <div className="flex flex-col items-center justify-center gap-2">
                    <FiUpload className="text-gray-400 text-2xl" />
                    <span className="text-sm text-gray-600">
                      آپلود تصویر اصلی
                    </span>
                    <span className="text-xs text-gray-500">
                      PNG, JPG, WEBP
                    </span>
                  </div>
                </button>
              )}
            </div>

            {/* هشتگ‌ها */}
            <div className="bg-white rounded-xl p-6 shadow">
              <h3 className="text-lg font-medium text-gray-800 mb-4">
                هشتگ‌ها
              </h3>

              <div className="flex flex-wrap gap-2 mb-3">
                {formData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                  >
                    <FiTag size={12} />
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="hover:text-red-600 transition-colors"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) =>
                    e.key === "Enter" && (e.preventDefault(), handleAddTag())
                  }
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="افزودن هشتگ جدید"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <FiPlus size={16} />
                </button>
              </div>
            </div>

            {/* اطلاعات مقاله */}
            <div className="bg-gray-50 rounded-xl p-6 shadow border border-gray-200">
              <h3 className="text-lg font-medium text-gray-800 mb-4">
                اطلاعات مقاله
              </h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>شناسه:</span>
                  <span className="font-medium">{article.id}</span>
                </div>
                <div className="flex justify-between">
                  <span>تاریخ ایجاد:</span>
                  <span className="font-medium">
                    {new Date(article.createdAt).toLocaleDateString("fa-IR")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>بازدیدها:</span>
                  <span className="font-medium">
                    {article.views.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>لایک‌ها:</span>
                  <span className="font-medium">
                    {article.likes.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* دکمه‌های اقدام */}
        <div className="fixed bottom-6 left-6 right-6 bg-white border-t border-gray-200 p-4 rounded-xl shadow-lg">
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={() => router.push("/admin/articles")}
              className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors border border-gray-300 rounded-lg hover:bg-gray-100"
            >
              انصراف
            </button>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleSaveDraft}
                disabled={loading || !formData.title || !formData.content}
                className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              >
                <FiSave size={18} />
                ذخیره پیش‌نویس
              </button>

              <button
                type="submit"
                disabled={loading || !formData.title || !formData.content}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    در حال ذخیره...
                  </>
                ) : (
                  <>ذخیره تغییرات</>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
