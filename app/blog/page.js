// app/blog/page.js
import BlogCard from "@/app/components/ui/BlogCard/BlogCard";

export default function BlogPage() {
  // داده‌های نمونه برای مقالات
  const blogPosts = [
    {
      id: 1,
      title: "برخی از مودم‌‌های تی‌پی-لینک آسیب‌پذیری دارند",
      date: "۱۴۰۴/۰۸/۰۱",
      excerpt:
        "CWMP به اپراتور‌ اینترنت اجازه می‌دهد تا بدون دخالت کاربران، رمز و نام کاربری وای‌فای را ع...",
      image:
        "https://tec.shuner.ir/wp-content/uploads/2025/10/tp-link-tl-wr3602be-689356e34a11743828d587c7-1.webp",
      href: "/blog/%d8%a8%d8%b1%d8%ae%db%8c-%d8%a7%d8%b2-%d9%85%d9%88%d8%af%d9%85%d9%87%d8%a7%db%8c-%d8%aa%db%8c%d9%be%db%8c-%d9%84%db%8c%d9%86%da%a9-%d8%a2%d8%b3%db%8c%d8%a8%d9%be",
    },
    {
      id: 2,
      title:
        "اتفاق بی‌سابقه در ۴ سال اخیر؛ «کال آو دیوتی» و «بتلفیلد» به جنگ تن‌به‌تن می‌روند",
      date: "۱۴۰۴/۰۴/۲۴",
      excerpt:
        "از سلولز شفاف آلمانی‌ها تا شبح سیاه اف-۱۱۷؛ فناوری رادارگریزی، روایتی است از تلاش انسان بر...",
      image:
        "https://tec.shuner.ir/wp-content/uploads/2025/07/call-of-duty-black-ops-6-black-man-soldier-6655e4e14b10d5a6894b8256.webp",
      href: "/blog/%d8%a7%d8%aa%d9%81%d8%a7%d9%82-%d8%a8%db%8c%d8%b3%d8%a7%d8%a8%d9%82%d9%87-%d8%af%d8%b1-%db%b4-%d8%b3%d8%a7%d9%84-%d8%a7%d8%ae%db%8c%d8%b1%d8%9b-%da%a9%d8%a7%d9%84-%d8%a2%d9%88-%d8%af",
    },
    {
      id: 3,
      title: "راز نامرئی‌شدن جنگنده‌ها؛ فناوری رادارگریز چطور کار می‌کند؟",
      date: "۱۴۰۴/۰۴/۲۴",
      excerpt:
        "از سلولز شفاف آلمانی‌ها تا شبح سیاه اف-۱۱۷؛ فناوری رادارگریزی، روایتی است از تلاش انسان بر...",
      image:
        "https://tec.shuner.ir/wp-content/uploads/2025/07/2020-12-sony-playstation-4-fat-vs-5-638c64e4a77666af5aef0d0e.webp",
      href: "/blog/%d8%b1%d8%a7%d8%b2-%d9%86%d8%a7%d9%85%d8%b1%d8%a6%db%8c%d8%b4%d8%af%d9%86-%d8%ac%d9%86%da%af%d9%86%d8%af%d9%87%d9%87%d8%a7%d8%9b-%d9%81%d9%86%d8%a7%d9%88%d8%b1%db%8c-%d8%b1%d8%a7",
    },
    {
      id: 4,
      title: "حساب ارزی چیست و چه کاربردهایی دارد؟",
      date: "۱۴۰۴/۰۴/۱۱",
      excerpt:
        "از سلولز شفاف آلمانی‌ها تا شبح سیاه اف-۱۱۷؛ فناوری رادارگریزی، روایتی است از تلاش انسان بر...",
      image:
        "https://tec.shuner.ir/wp-content/uploads/2025/07/foring-account-bank-6888b50cee632076c713fd66.webp",
      href: "/blog/jets",
    },
  ];

  return (
    <main className="w-full min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-8">
        {/* عنوان صفحه */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
            وبلاگ فروشگاه
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
            جدیدترین مقالات و مطالب آموزشی در زمینه تکنولوژی و فناوری
          </p>
        </div>

        {/* گرید مقالات */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {blogPosts.map((post) => (
            <BlogCard key={post.id} product={post} />
          ))}
        </div>

        {/* دکمه بارگذاری بیشتر (اختیاری) */}
        <div className="text-center mt-12">
          <button className="bg-primary text-white px-8 py-3 rounded-2xl hover:bg-primary/90 transition-all duration-300 font-medium">
            مطالب بیشتر
          </button>
        </div>
      </div>
    </main>
  );
}
