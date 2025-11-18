// app/blog/[slug]/ClientBlogPage.js
"use client";

import BlogCard from "@/app/components/ui/BlogCard/BlogCard";
import { FaCalendar, FaUser, FaTag } from "react-icons/fa";

// کامپوننت هدر مقاله
const BlogHeader = ({ image, alt }) => (
  <div className="flex justify-center items-center overflow-hidden max-md:min-h-0 max-md:mb-[140px] min-h-[500px] bg-gray-100">
    <img
      src={image}
      alt={alt}
      className="object-cover w-full h-full max-h-[500px] rounded-2xl max-w-full"
    />
  </div>
);

// کامپوننت متادیتا
const BlogMeta = ({ author, category, date }) => (
  <div className="text-gray-700 text-xs mt-2 flex flex-wrap items-center gap-2 text-right">
    <span className="flex items-center gap-1">
      <FaUser className="text-primary" />
      نوشته شده توسط:
      <span className="text-primary font-medium mr-1">{author}</span>
    </span>
    در
    <span className="text-xs text-primary font-medium mx-1 flex items-center gap-1">
      <FaTag className="text-primary" />
      {category}
    </span>
    <div className="text-gray-500 text-xs mb-2 mt-3 flex items-center gap-1">
      <FaCalendar className="text-gray-400" />
      تاریخ: {date}
    </div>
  </div>
);

// کامپوننت محتوای مقاله
const BlogArticleContent = ({ content }) => (
  <div className="w-full">
    {content.map((paragraph, index) => (
      <p key={index} className="text-sm leading-8 my-5 text-justify">
        {paragraph}
      </p>
    ))}
  </div>
);

// کامپوننت تگ‌ها
const BlogTags = ({ tags }) => (
  <div className="mt-4">
    {tags.map((tag, index) => (
      <span key={index} className="text-sm text-primary font-medium mx-1">
        #{tag}
      </span>
    ))}
  </div>
);

// کامپوننت پست‌های مشابه
const RelatedPosts = ({ posts }) => (
  <div className="text-[#1B1F22] mb-4 mt-12 max-w-276">
    <h2 className="text-2xl font-bold text-gray-900 mb-6 text-right">
      پست‌های مشابه
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      {posts.map((post) => (
        <BlogCard key={post.id} product={post} />
      ))}
    </div>
  </div>
);

// کامپوننت محتوای مقاله
const BlogContent = ({ title, author, category, date, content, tags }) => (
  <div className="max-w-4xl mx-auto">
    <div className="mt-3 bg-white rounded-2xl flex flex-col justify-between leading-normal">
      <div className="bg-white relative top-0 -mt-32 p-5 sm:p-10 rounded-2xl">
        {/* عنوان */}
        <h1 className="text-gray-900 font-bold text-3xl mb-2 text-right">
          {title}
        </h1>

        {/* متادیتا */}
        <BlogMeta author={author} category={category} date={date} />

        {/* محتوای مقاله */}
        <BlogArticleContent content={content} />

        {/* تگ‌ها */}
        <BlogTags tags={tags} />
      </div>
    </div>
  </div>
);

export default function ClientBlogPage({ post }) {
  return (
    <main className="w-full">
      <div className="max-w-7xl mx-auto p-5 sm:p-10 md:p-16 relative">
        {/* بخش هدر با تصویر */}
        <BlogHeader image={post.image} alt={post.title} />

        {/* محتوای اصلی مقاله */}
        <BlogContent
          title={post.title}
          author={post.author}
          category={post.category}
          date={post.date}
          content={post.content}
          tags={post.tags}
        />

        {/* پست‌های مشابه */}
        <RelatedPosts posts={post.relatedPosts} />
      </div>
    </main>
  );
}
