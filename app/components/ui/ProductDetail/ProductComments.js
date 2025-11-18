// components/ui/ProductDetail/ProductComments.js
"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

// بارگذاری داینامیک CKEditor برای جلوگیری از خطاهای SSR
const CKEditor = dynamic(() => import("@/app/components/ui/CKEditor/CKEditor"), {
  ssr: false,
});

const ProductComments = ({ productId }) => {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([
    {
      id: 1,
      user: "علیرضا محمدی",
      date: "۱۴۰۲/۱۰/۱۵",
      rating: 5,
      text: "کیفیت عالی داره، واقعا راضی هستم. صدای بسیار شفاف و باس قوی.",
      likes: 12,
      dislikes: 2,
    },
    {
      id: 2,
      user: "فاطمه کریمی",
      date: "۱۴۰۲/۱۰/۱۲",
      rating: 4,
      text: "مناسب قیمتش هست ولی باتری زود تموم میشه.",
      likes: 8,
      dislikes: 1,
    },
    {
      id: 3,
      user: "محمد رضایی",
      date: "۱۴۰۲/۱۰/۱۰",
      rating: 5,
      text: "سبک و با کیفیت. نویز کنسلینگ عالی داره.",
      likes: 15,
      dislikes: 0,
    },
  ]);

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newComment = {
      id: comments.length + 1,
      user: "کاربر جدید",
      date: new Date().toLocaleDateString("fa-IR"),
      rating: 5,
      text: commentText,
      likes: 0,
      dislikes: 0,
    };

    setComments([newComment, ...comments]);
    setCommentText("");
  };

  const handleLike = (commentId) => {
    setComments(
      comments.map((comment) =>
        comment.id === commentId
          ? { ...comment, likes: comment.likes + 1 }
          : comment
      )
    );
  };

  const handleDislike = (commentId) => {
    setComments(
      comments.map((comment) =>
        comment.id === commentId
          ? { ...comment, dislikes: comment.dislikes + 1 }
          : comment
      )
    );
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <span
        key={index}
        className={`text-lg ${
          index < rating ? "text-yellow-400" : "text-gray-300"
        }`}
      >
        ★
      </span>
    ));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm mt-6 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">نظرات کاربران</h2>

      {/* فرم ارسال نظر */}
      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <h3 className="font-medium text-gray-900 mb-4">ثبت نظر جدید</h3>
        <form onSubmit={handleSubmitComment}>
          <div className="mb-4">
            <CKEditor
              value={commentText}
              onChange={setCommentText}
              placeholder="نظر خود را اینجا بنویسید..."
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            ارسال نظر
          </button>
        </form>
      </div>

      {/* لیست نظرات */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="border-b border-gray-100 pb-6 last:border-0"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="font-medium text-gray-900">{comment.user}</div>
                <div className="text-sm text-gray-500">{comment.date}</div>
              </div>
              <div className="flex">{renderStars(comment.rating)}</div>
            </div>

            <p className="text-gray-700 mb-4 leading-relaxed">{comment.text}</p>

            <div className="flex items-center gap-4 text-sm text-gray-500">
              <button
                onClick={() => handleLike(comment.id)}
                className="flex items-center gap-1 hover:text-green-600 transition-colors"
              >
                <span>👍</span>
                <span>{comment.likes}</span>
              </button>
              <button
                onClick={() => handleDislike(comment.id)}
                className="flex items-center gap-1 hover:text-red-600 transition-colors"
              >
                <span>👎</span>
                <span>{comment.dislikes}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductComments;
