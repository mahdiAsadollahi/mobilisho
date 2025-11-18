// components/ui/ProductDetail/ProductComments.js
"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { FaStar, FaRegStar, FaCheck, FaFlag, FaLink } from "react-icons/fa";

// بارگذاری داینامیک CKEditor برای جلوگیری از خطاهای SSR
const CKEditor = dynamic(
  () => import("@/app/components/ui/CKEditor/CKEditor"),
  {
    ssr: false,
  }
);

const ProductComments = ({ productId }) => {
  const [commentText, setCommentText] = useState("");
  const [userRating, setUserRating] = useState(0);
  const [comments, setComments] = useState([
    {
      id: 1,
      user: "علیرضا محمدی",
      date: "۱۴۰۲/۱۰/۱۵",
      rating: 5,
      text: "کیفیت عالی داره، واقعا راضی هستم. صدای بسیار شفاف و باس قوی. نویز کنسلینگ فوق العاده‌ای داره و در محیط‌های شلوغ واقعا کارایی داره.",
      verified: true,
    },
    {
      id: 2,
      user: "فاطمه کریمی",
      date: "۱۴۰۲/۱۰/۱۲",
      rating: 4,
      text: "مناسب قیمتش هست ولی باتری زود تموم میشه. طراحی شیک و سبک هست، حملش راحته.",
      verified: true,
    },
    {
      id: 3,
      user: "محمد رضایی",
      date: "۱۴۰۲/۱۰/۱۰",
      rating: 5,
      text: "سبک و با کیفیت. نویز کنسلینگ عالی داره. کیفیت ساخت فوق العاده‌ست و واقعا ارزش خرید داره.",
      verified: false,
    },
  ]);

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (!commentText.trim() || userRating === 0) return;

    const newComment = {
      id: comments.length + 1,
      user: "شما",
      date: new Date().toLocaleDateString("fa-IR"),
      rating: userRating,
      text: commentText,
      verified: false,
    };

    setComments([newComment, ...comments]);
    setCommentText("");
    setUserRating(0);

    // نمایش پیام موفقیت
    alert("نظر شما با موفقیت ثبت شد!");
  };

  const renderStars = (rating, interactive = false, onRatingChange = null) => {
    return [...Array(5)].map((_, index) => {
      const isFilled = index < rating;
      const StarIcon = isFilled ? FaStar : FaRegStar;

      return (
        <button
          key={index}
          type={interactive ? "button" : "span"}
          className={`text-lg transition-colors ${
            interactive ? "hover:scale-110 cursor-pointer" : "cursor-default"
          } ${isFilled ? "text-yellow-500" : "text-gray-300"}`}
          onClick={() =>
            interactive && onRatingChange && onRatingChange(index + 1)
          }
        >
          <StarIcon />
        </button>
      );
    });
  };

  const getRatingText = (rating) => {
    const texts = {
      1: "خیلی ضعیف",
      2: "ضعیف",
      3: "متوسط",
      4: "خوب",
      5: "عالی",
    };
    return texts[rating] || "بدون امتیاز";
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="bg-white rounded-xl py-8 mt-8">
      {/* هدر بخش نظرات */}
      <div className="text-right mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">نظرات کاربران</h2>
        <div className="flex items-center gap-4 text-gray-600 text-sm">
          <div className="flex items-center gap-1">
            <span className="font-semibold text-gray-800">
              {comments.length}
            </span>
            <span>نظر</span>
          </div>
          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
          <div className="flex items-center gap-1">
            <span className="font-semibold text-gray-800">۴.۸</span>
            <span>میانگین امتیاز</span>
          </div>
        </div>
      </div>

      {/* فرم ارسال نظر */}
      <div className="bg-gray-50 rounded-xl p-6 mb-8 border border-gray-200">
        <div className="text-right mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-1">
            نظر خود را بنویسید
          </h3>
          <p className="text-gray-600 text-sm">
            تجربه خود از این محصول را با دیگران به اشتراک بگذارید
          </p>
        </div>

        <form onSubmit={handleSubmitComment} className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-300">
            <CKEditor
              value={commentText}
              onChange={setCommentText}
              placeholder="نظر خود را با جزئیات بنویسید... تجربه‌تان از کیفیت صدا، باتری، طراحی و سایر ویژگی‌ها چیست؟"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-gray-700 font-medium text-sm">
                امتیاز شما:
              </span>
              <div className="flex gap-1">
                {renderStars(userRating, true, setUserRating)}
              </div>
              {userRating > 0 && (
                <span className="text-sm text-gray-600">
                  {getRatingText(userRating)}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="bg-gray-900 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-gray-800 transition-all flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed text-sm"
              disabled={!commentText.trim() || userRating === 0}
            >
              <span>ثبت نظر</span>
              <FaCheck size={14} />
            </button>
          </div>
        </form>
      </div>

      {/* لیست نظرات */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="p-6 border-b border-gray-200 last:border-b-0 last:pb-0"
          >
            <div className="flex items-start gap-4">
              {/* آواتار کاربر */}
              <div className="shrink-0">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-medium text-sm">
                  {getInitials(comment.user)}
                </div>
              </div>

              {/* محتوای نظر */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">
                      {comment.user}
                    </span>
                    {comment.verified && (
                      <span className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded flex items-center gap-1">
                        <FaCheck size={10} />
                        <span>تایید شده</span>
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-gray-500">{comment.date}</span>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <div className="flex">{renderStars(comment.rating)}</div>
                  <span className="text-xs text-gray-600">
                    {getRatingText(comment.rating)}
                  </span>
                </div>

                {/* متن نظر */}
                <div className="mb-3">
                  <p className="text-gray-700 leading-6 text-justify text-sm">
                    {comment.text}
                  </p>
                </div>

                {/* اقدامات */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-gray-500 text-xs">
                    <button className="hover:text-gray-700 transition-colors">
                      مفید بود
                    </button>
                    <button className="hover:text-gray-700 transition-colors">
                      پاسخ
                    </button>
                  </div>
                  <div className="flex items-center gap-1">
                    <button className="text-gray-400 hover:text-gray-600 transition-colors p-1.5 rounded">
                      <FaLink size={14} />
                    </button>
                    <button className="text-gray-400 hover:text-gray-600 transition-colors p-1.5 rounded">
                      <FaFlag size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* دکمه بارگذاری بیشتر */}
      <div className="text-center mt-8">
        <button className="bg-white border border-gray-300 text-gray-700 px-6 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition-all text-sm">
          نمایش نظرات بیشتر
        </button>
      </div>
    </div>
  );
};

export default ProductComments;
