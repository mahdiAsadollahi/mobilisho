// app/blog/[slug]/page.js
import { notFound } from "next/navigation";

// داده‌های نمونه
const blogData = {
  "tp-link-vulnerability": {
    title: "برخی از مودم‌های تی‌پی-لینک آسیب‌پذیری دارند",
    image:
      "https://tec.shuner.ir/wp-content/uploads/2025/10/tp-link-tl-wr3602be-689356e34a11743828d587c7-1.webp",
    author: "alireza",
    category: "خبر",
    date: "۱۴۰۴/۸/۱",
    content: [
      "CWMP به اپراتور اینترنت اجازه می‌دهد تا بدون دخالت کاربران، رمز و نام کاربری وای‌فای را عوض کند. این پروتکل حتی امکان بررسی خطاها و به‌روزرسانی فرم‌ور را نیز فراهم می‌کند.",
      "تعدادی از مودم‌های TP-Link بازار ایران مانند AX1500 و Archer AX10 و Archer VR400 و TD-W9970 می‌توانند تحت تاثیر این آسیب‌پذیری روز صفر قرار بگیرند.",
    ],
    tags: ["مودم"],
    relatedPosts: [
      {
        id: 1,
        title:
          "اتفاق بی‌سابقه در ۴ سال اخیر؛ «کال آو دیوتی» و «بتلفیلد» به جنگ تن‌به‌تن می‌روند",
        image:
          "https://tec.shuner.ir/wp-content/uploads/2025/07/call-of-duty-black-ops-6-black-man-soldier-6655e4e14b10d5a6894b8256.webp",
        date: "۱۴۰۴/۰۴/۲۴",
        excerpt:
          "از سلولز شفاف آلمانی‌ها تا شبح سیاه اف-۱۱۷؛ فناوری رادارگریزی، روایتی است از تلاش انسان بر...",
        href: "/blog/cod-battlefield",
      },
      {
        id: 2,
        title: "راز نامرئی‌شدن جنگنده‌ها؛ فناوری رادارگریز چطور کار می‌کند؟",
        image:
          "https://tec.shuner.ir/wp-content/uploads/2025/07/2020-12-sony-playstation-4-fat-vs-5-638c64e4a77666af5aef0d0e.webp",
        date: "۱۴۰۴/۰۴/۲۴",
        excerpt:
          "از سلولز شفاف آلمانی‌ها تا شبح سیاه اف-۱۱۷؛ فناوری رادارگریزی، روایتی است از تلاش انسان بر...",
        href: "/blog/stealth-technology",
      },
    ],
  },
};

// کامپوننت‌های کلاینت
import ClientBlogPage from "./ClientBlogPage";

export async function generateMetadata({ params }) {
  // استفاده از await برای unwrap کردن params
  const { slug } = await params;
  const post = blogData[slug];

  if (!post) {
    return {
      title: "مقاله یافت نشد",
      description: "مقاله مورد نظر یافت نشد.",
    };
  }

  return {
    title: post.title,
    description: post.content[0]?.substring(0, 160) || "مقاله تخصصی",
    openGraph: {
      title: post.title,
      description: post.content[0]?.substring(0, 160) || "مقاله تخصصی",
      images: [post.image],
    },
  };
}

export default async function BlogDetailPage({ params }) {
  // استفاده از await برای unwrap کردن params
  const { slug } = await params;
  const post = blogData[slug];

  if (!post) {
    notFound();
  }

  return <ClientBlogPage post={post} />;
}
