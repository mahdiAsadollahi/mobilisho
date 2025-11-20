// app/blog/preview/[id]/page.js
import { notFound } from "next/navigation";
import {
  FaCalendar,
  FaUser,
  FaTag,
  FaEye,
  FaHeart,
  FaArrowRight,
} from "react-icons/fa";
import Link from "next/link";

// داده‌های نمونه مقالات
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

// کامپوننت اصلی صفحه
async function PreviewArticleContent({ id }) {
  const article = sampleArticles[id];

  if (!article) {
    notFound();
  }

  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("fa-IR");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* هدر مدیریت */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                پیش‌نمایش مقاله
              </h1>
              <p className="text-gray-600 mt-1">
                مشاهده مقاله قبل از انتشار - این صفحه فقط برای پیش‌نمایش است
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/admin/articles"
                className="flex items-center gap-2 bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm"
              >
                <FaArrowRight size={14} />
                بازگشت به مدیریت مقالات
              </Link>
              <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm">
                انتشار مقاله
              </button>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                ویرایش مقاله
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* محتوای مقاله */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <article className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* تصویر اصلی */}
          <div className="h-80 sm:h-96 overflow-hidden">
            <img
              src={article.mainImage}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* محتوای مقاله */}
          <div className="p-6 sm:p-8">
            {/* وضعیت مقاله */}
            <div className="mb-4">
              {article.status === "draft" ? (
                <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                  📝 وضعیت: پیش‌نویس
                </span>
              ) : (
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  ✅ وضعیت: منتشر شده
                </span>
              )}
              {!article.isActive && (
                <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium mr-2">
                  ⚠ غیرفعال
                </span>
              )}
            </div>

            {/* عنوان */}
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 text-right leading-tight">
              {article.title}
            </h1>

            {/* خلاصه */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-blue-800 mb-2">خلاصه مقاله:</h3>
              <p className="text-blue-700 text-sm sm:text-base">
                {article.summary}
              </p>
            </div>

            {/* متادیتا */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-gray-600 mb-6 pb-6 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <FaUser className="text-blue-600 flex-shrink-0" />
                <span className="text-sm">
                  نویسنده: <strong>{article.author}</strong>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <FaTag className="text-green-600 flex-shrink-0" />
                <span className="text-sm">
                  دسته‌بندی: <strong>{article.category}</strong>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <FaCalendar className="text-orange-600 flex-shrink-0" />
                <span className="text-sm">
                  تاریخ ایجاد: <strong>{formatDate(article.createdAt)}</strong>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <FaCalendar className="text-purple-600 flex-shrink-0" />
                <span className="text-sm">
                  تاریخ انتشار:{" "}
                  <strong>{formatDate(article.publishedAt) || "-"}</strong>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <FaEye className="text-gray-600 flex-shrink-0" />
                <span className="text-sm">
                  بازدید: <strong>{article.views.toLocaleString()}</strong>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <FaHeart className="text-red-600 flex-shrink-0" />
                <span className="text-sm">
                  لایک: <strong>{article.likes.toLocaleString()}</strong>
                </span>
              </div>
            </div>

            {/* اطلاعات مطالعه */}
            <div className="flex items-center gap-4 mb-6 text-sm text-gray-500">
              <span>
                ⏱️ زمان مطالعه: <strong>{article.readTime} دقیقه</strong>
              </span>
              <span>
                📊 تعداد کلمات:{" "}
                <strong>
                  حدود {Math.ceil(article.content.length / 5)} کلمه
                </strong>
              </span>
            </div>

            {/* محتوای اصلی */}
            <div
              className="prose prose-sm sm:prose-base max-w-none text-justify leading-7 sm:leading-8"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* تگ‌ها */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="font-semibold text-gray-700 mb-3">برچسب‌ها:</h3>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </article>

        {/* نکات پیش‌نمایش */}
        <div className="mt-6 space-y-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="text-yellow-600 text-lg">💡</div>
              <div>
                <h4 className="font-semibold text-yellow-800 mb-1">
                  اطلاعات پیش‌نمایش
                </h4>
                <p className="text-yellow-700 text-sm">
                  این صفحه فقط برای پیش‌نمایش است. مقاله{" "}
                  {article.status === "draft"
                    ? "هنوز منتشر نشده"
                    : "در حال حاضر منتشر شده"}{" "}
                  است.
                  {article.status === "draft" &&
                    " برای انتشار مقاله به پنل مدیریت مراجعه کنید."}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="text-blue-600 text-lg">ℹ️</div>
              <div>
                <h4 className="font-semibold text-blue-800 mb-1">آمار مقاله</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm text-blue-700">
                  <div>
                    شناسه مقاله: <strong>{article.id}</strong>
                  </div>
                  <div>
                    وضعیت:{" "}
                    <strong>
                      {article.status === "draft" ? "پیش‌نویس" : "منتشر شده"}
                    </strong>
                  </div>
                  <div>
                    فعال: <strong>{article.isActive ? "بله" : "خیر"}</strong>
                  </div>
                  <div>
                    زمان مطالعه: <strong>{article.readTime} دقیقه</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* دکمه‌های اقدام */}
        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          <Link
            href="/admin/articles"
            className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
          >
            <FaArrowRight size={16} />
            بازگشت به لیست مقالات
          </Link>

          {article.status === "draft" && (
            <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
              انتشار مقاله
            </button>
          )}

          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
            ویرایش مقاله
          </button>
        </div>
      </div>
    </div>
  );
}

// صفحه اصلی
export default async function PreviewArticlePage({ params }) {
  const { id } = await params;

  return <PreviewArticleContent id={id} />;
}

// متادیتا
export async function generateMetadata({ params }) {
  const { id } = await params;
  const article = sampleArticles[id];

  if (!article) {
    return {
      title: "مقاله یافت نشد",
      description: "مقاله مورد نظر یافت نشد.",
    };
  }

  return {
    title: `پیش‌نمایش: ${article.title}`,
    description: article.summary,
    openGraph: {
      title: `پیش‌نمایش: ${article.title}`,
      description: article.summary,
      images: [article.mainImage],
    },
  };
}
