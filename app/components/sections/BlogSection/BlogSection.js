// components/sections/BlogSection/BlogSection.js
"use client";

import SectionHeader from "@/app/components/ui/SectionHeader";
import BlogSlider from "@/app/components/ui/BlogSlider/BlogSlider";
import BlogCard from "../../ui/BlogCard/BlogCard";

const BlogSection = ({ posts = [] }) => {
  const defaultPosts = [
    {
      id: 1,
      title: "برخی از مودم‌های تی‌پی-لینک آسیب‌پذیری دارند",
      image:
        "https://tec.shuner.ir/wp-content/uploads/2025/10/tp-link-tl-wr3602be-689356e34a11743828d587c7-1.webp",
      date: "۱۴۰۴/۰۸/۰۱",
      excerpt:
        "CWMP به اپراتور‌ اینترنت اجازه می‌دهد تا بدون دخالت کاربران، رمز و نام کاربری وای‌فای را ع...",
      href: "/blog/%d8%a8%d8%b1%d8%ae%db%8c-%d8%a7%d8%b2-%d9%85%d9%88%d8%af%d9%85%d9%87%d8%a7%db%8c-%d8%aa%db%8c%d9%be%db%8c-%d9%84%db%8c%d9%86%da%a9-%d8%a2%d8%b3%db%8c%d8%a8%d9%be",
    },
    {
      id: 2,
      title:
        "اتفاق بی‌سابقه در ۴ سال اخیر؛ «کال آو دیوتی» و «بتلفیلد» به جنگ تن‌به‌تن می‌روند",
      image:
        "https://tec.shuner.ir/wp-content/uploads/2025/07/call-of-duty-black-ops-6-black-man-soldier-6655e4e14b10d5a6894b8256.webp",
      date: "۱۴۰۴/۰۴/۲۴",
      excerpt:
        "از سلولز شفاف آلمانی‌ها تا شبح سیاه اف-۱۱۷؛ فناوری رادارگریزی، روایتی است از تلاش انسان بر...",
      href: "/blog/%d8%a7%d8%aa%d9%81%d8%a7%d9%82-%d8%a8%db%8c%d8%b3%d8%a7%d8%a8%d9%82%d9%87-%d8%af%d8%b1-%db%b4-%d8%b3%d8%a7%d9%84-%d8%a7%d8%ae%db%8c%d8%b1%d8%9b-%da%a9%d8%a7%d9%84-%d8%a2%d9%88-%d8%af",
    },
    {
      id: 3,
      title: "راز نامرئی‌شدن جنگنده‌ها؛ فناوری رادارگریز چطور کار می‌کند؟",
      image:
        "https://tec.shuner.ir/wp-content/uploads/2025/07/2020-12-sony-playstation-4-fat-vs-5-638c64e4a77666af5aef0d0e.webp",
      date: "۱۴۰۴/۰۴/۲۴",
      excerpt:
        "از سلولز شفاف آلمانی‌ها تا شبح سیاه اف-۱۱۷؛ فناوری رادارگریزی، روایتی است از تلاش انسان بر...",
      href: "/blog/%d8%b1%d8%a7%d8%b2-%d9%86%d8%a7%d9%85%d8%b1%d8%a6%db%8c%d8%b4%d8%af%d9%86-%d8%ac%d9%86%da%af%d9%86%d8%af%d9%87%d9%87%d8%a7%d8%9b-%d9%81%d9%86%d8%a7%d9%88%d8%b1%db%8c-%d8%b1%d8%a7",
    },
    {
      id: 4545,
      title: "حساب ارزی چیست و چه کاربردهایی دارد؟",
      image:
        "https://tec.shuner.ir/wp-content/uploads/2025/07/foring-account-bank-6888b50cee632076c713fd66.webp",
      date: "۱۴۰۴/۰۴/۱۱",
      excerpt:
        "از سلولز شفاف آلمانی‌ها تا شبح سیاه اف-۱۱۷؛ فناوری رادارگریزی، روایتی است از تلاش انسان بر...",
      href: "/blog/jets",
    },
    {
      id: 13314,
      title: "حساب ارزی چیست و چه کاربردهایی دارد؟",
      image:
        "https://tec.shuner.ir/wp-content/uploads/2025/07/foring-account-bank-6888b50cee632076c713fd66.webp",
      date: "۱۴۰۴/۰۴/۱۱",
      excerpt:
        "از سلولز شفاف آلمانی‌ها تا شبح سیاه اف-۱۱۷؛ فناوری رادارگریزی، روایتی است از تلاش انسان بر...",
      href: "/blog/jets",
    },
    {
      id: 124,
      title: "حساب ارزی چیست و چه کاربردهایی دارد؟",
      image:
        "https://tec.shuner.ir/wp-content/uploads/2025/07/foring-account-bank-6888b50cee632076c713fd66.webp",
      date: "۱۴۰۴/۰۴/۱۱",
      excerpt:
        "از سلولز شفاف آلمانی‌ها تا شبح سیاه اف-۱۱۷؛ فناوری رادارگریزی، روایتی است از تلاش انسان بر...",
      href: "/blog/jets",
    },
    {
      id: 114,
      title: "حساب ارزی چیست و چه کاربردهایی دارد؟",
      image:
        "https://tec.shuner.ir/wp-content/uploads/2025/07/foring-account-bank-6888b50cee632076c713fd66.webp",
      date: "۱۴۰۴/۰۴/۱۱",
      excerpt:
        "از سلولز شفاف آلمانی‌ها تا شبح سیاه اف-۱۱۷؛ فناوری رادارگریزی، روایتی است از تلاش انسان بر...",
      href: "/blog/jets",
    },
    {
      id: 14,
      title: "حساب ارزی چیست و چه کاربردهایی دارد؟",
      image:
        "https://tec.shuner.ir/wp-content/uploads/2025/07/foring-account-bank-6888b50cee632076c713fd66.webp",
      date: "۱۴۰۴/۰۴/۱۱",
      excerpt:
        "از سلولز شفاف آلمانی‌ها تا شبح سیاه اف-۱۱۷؛ فناوری رادارگریزی، روایتی است از تلاش انسان بر...",
      href: "/blog/jets",
    },
  ];

  const postsData = posts.length > 0 ? posts : defaultPosts;

  return (
    <div className="container text-[#1B1F22] mb-24">
      <div className="flex justify-between">
        <SectionHeader
          title="بلاگ موبایلیــشو"
          subtitle="نمایش همه"
          icon="blog"
          href="/blog"
        />
      </div>

      {/* اسلایدر مقالات */}
      <div className="gap-4 mt-4">
        <BlogSlider
          posts={postsData}
          postComponent={BlogCard}
          slidesPerView="auto"
        />
      </div>
    </div>
  );
};

export default BlogSection;
