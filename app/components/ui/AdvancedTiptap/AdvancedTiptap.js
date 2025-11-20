// app/components/ui/AdvancedTiptap/AdvancedTiptap.js
"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import {
  Table,
  TableRow,
  TableHeader,
  TableCell,
} from "@tiptap/extension-table";
import YouTube from "@tiptap/extension-youtube";
import { Color } from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";
import FontFamily from "@tiptap/extension-font-family";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import { useState, useRef } from "react";
import {
  FiBold,
  FiItalic,
  FiUnderline,
  FiAlignLeft,
  FiAlignCenter,
  FiAlignRight,
  FiAlignJustify,
  FiList,
  FiMinus,
  FiLink,
  FiImage,
  FiYoutube,
  FiTable,
  FiRotateCcw,
  FiRotateCw,
} from "react-icons/fi";

// آیکون‌های جایگزین برای آیکون‌هایی که پیدا نمی‌شوند
const FiListOrdered = () => <span>1.</span>;
const FiQuote = () => <span>"</span>;
const FiCode = () => <span>{`</>`}</span>;
const FiPalette = () => <span>🎨</span>;

const AdvancedTiptap = ({
  value,
  onChange,
  placeholder = "محتوای مقاله را اینجا بنویسید...",
}) => {
  const [linkUrl, setLinkUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showYoutubeModal, setShowYoutubeModal] = useState(false);
  const fileInputRef = useRef(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: "tiptap-image",
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
        alignments: ["left", "center", "right", "justify"],
        defaultAlignment: "right",
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "tiptap-link",
        },
      }),
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: "tiptap-table",
        },
      }),
      TableRow,
      TableHeader,
      TableCell,
      YouTube.configure({
        HTMLAttributes: {
          class: "tiptap-youtube",
        },
      }),
      Color,
      TextStyle,
      FontFamily.configure({
        types: ["textStyle"],
      }),
      Underline,
      Placeholder.configure({
        placeholder: placeholder,
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
    },
    editorProps: {
      attributes: {
        class: "prose prose-lg max-w-none focus:outline-none rtl:text-right",
        dir: "rtl",
      },
    },
  });

  // توابع فرمت‌بندی متن
  const toggleBold = () => editor.chain().focus().toggleBold().run();
  const toggleItalic = () => editor.chain().focus().toggleItalic().run();
  const toggleUnderline = () => editor.chain().focus().toggleUnderline().run();

  // توابع ترازبندی
  const setTextAlign = (align) =>
    editor.chain().focus().setTextAlign(align).run();

  // توابع لیست
  const toggleBulletList = () =>
    editor.chain().focus().toggleBulletList().run();
  const toggleOrderedList = () =>
    editor.chain().focus().toggleOrderedList().run();

  // توابع هدینگ
  const setHeading = (level) =>
    editor.chain().focus().toggleHeading({ level }).run();

  // سایر فرمت‌ها
  const toggleBlockquote = () =>
    editor.chain().focus().toggleBlockquote().run();
  const toggleCodeBlock = () => editor.chain().focus().toggleCodeBlock().run();
  const setHorizontalRule = () =>
    editor.chain().focus().setHorizontalRule().run();

  // مدیریت لینک
  const addLink = () => {
    if (linkUrl) {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: linkUrl })
        .run();
      setLinkUrl("");
      setShowLinkModal(false);
    }
  };

  const removeLink = () => {
    editor.chain().focus().unsetLink().run();
    setShowLinkModal(false);
  };

  // مدیریت تصویر
  const addImage = () => {
    if (imageUrl) {
      editor.chain().focus().setImage({ src: imageUrl }).run();
      setImageUrl("");
      setShowImageModal(false);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        editor.chain().focus().setImage({ src: e.target.result }).run();
      };
      reader.readAsDataURL(file);
    }
  };

  // مدیریت یوتیوب
  const addYoutube = () => {
    if (youtubeUrl) {
      editor.chain().focus().setYoutubeVideo({ src: youtubeUrl }).run();
      setYoutubeUrl("");
      setShowYoutubeModal(false);
    }
  };

  // مدیریت جدول
  const insertTable = () => {
    editor
      .chain()
      .focus()
      .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
      .run();
  };

  // مدیریت رنگ و فونت
  const setColor = (color) => {
    editor.chain().focus().setColor(color).run();
  };

  if (!editor) {
    return (
      <div className="border border-gray-300 rounded-lg p-6 min-h-[500px] bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
          <p className="text-gray-600">در حال بارگذاری ویرایشگر...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="advanced-tiptap-container border border-gray-300 rounded-lg overflow-hidden bg-white">
      {/* نوار ابزار */}
      <div className="flex flex-wrap items-center gap-1 p-3 border-b border-gray-200 bg-gray-50 rtl:flex-row-reverse">
        {/* حالت‌های هدینگ */}
        <select
          className="px-2 py-1 text-sm border border-gray-300 rounded bg-white"
          onChange={(e) => {
            const value = e.target.value;
            if (value === "paragraph") {
              editor.chain().focus().setParagraph().run();
            } else {
              setHeading(parseInt(value));
            }
          }}
          value={
            editor.isActive("heading", { level: 1 })
              ? "1"
              : editor.isActive("heading", { level: 2 })
              ? "2"
              : editor.isActive("heading", { level: 3 })
              ? "3"
              : "paragraph"
          }
        >
          <option value="paragraph">پاراگراف</option>
          <option value="1">عنوان 1</option>
          <option value="2">عنوان 2</option>
          <option value="3">عنوان 3</option>
        </select>

        {/* فرمت‌بندی متن */}
        <button
          onClick={toggleBold}
          className={`p-2 rounded hover:bg-gray-200 ${
            editor.isActive("bold") ? "bg-gray-300" : ""
          }`}
          title="پررنگ"
        >
          <FiBold size={16} />
        </button>

        <button
          onClick={toggleItalic}
          className={`p-2 rounded hover:bg-gray-200 ${
            editor.isActive("italic") ? "bg-gray-300" : ""
          }`}
          title="ایتالیک"
        >
          <FiItalic size={16} />
        </button>

        <button
          onClick={toggleUnderline}
          className={`p-2 rounded hover:bg-gray-200 ${
            editor.isActive("underline") ? "bg-gray-300" : ""
          }`}
          title="زیرخط"
        >
          <FiUnderline size={16} />
        </button>

        {/* ترازبندی */}
        <div className="h-6 border-l border-gray-300 mx-1"></div>

        <button
          onClick={() => setTextAlign("right")}
          className={`p-2 rounded hover:bg-gray-200 ${
            editor.isActive({ textAlign: "right" }) ? "bg-gray-300" : ""
          }`}
          title="تراز راست"
        >
          <FiAlignRight size={16} />
        </button>

        <button
          onClick={() => setTextAlign("center")}
          className={`p-2 rounded hover:bg-gray-200 ${
            editor.isActive({ textAlign: "center" }) ? "bg-gray-300" : ""
          }`}
          title="تراز وسط"
        >
          <FiAlignCenter size={16} />
        </button>

        <button
          onClick={() => setTextAlign("left")}
          className={`p-2 rounded hover:bg-gray-200 ${
            editor.isActive({ textAlign: "left" }) ? "bg-gray-300" : ""
          }`}
          title="تراز چپ"
        >
          <FiAlignLeft size={16} />
        </button>

        <button
          onClick={() => setTextAlign("justify")}
          className={`p-2 rounded hover:bg-gray-200 ${
            editor.isActive({ textAlign: "justify" }) ? "bg-gray-300" : ""
          }`}
          title="تراز کامل"
        >
          <FiAlignJustify size={16} />
        </button>

        {/* لیست‌ها */}
        <div className="h-6 border-l border-gray-300 mx-1"></div>

        <button
          onClick={toggleBulletList}
          className={`p-2 rounded hover:bg-gray-200 ${
            editor.isActive("bulletList") ? "bg-gray-300" : ""
          }`}
          title="لیست نقطه‌ای"
        >
          <FiList size={16} />
        </button>

        <button
          onClick={toggleOrderedList}
          className={`p-2 rounded hover:bg-gray-200 ${
            editor.isActive("orderedList") ? "bg-gray-300" : ""
          }`}
          title="لیست شماره‌ای"
        >
          <FiListOrdered />
        </button>

        {/* سایر ابزارها */}
        <button
          onClick={toggleBlockquote}
          className={`p-2 rounded hover:bg-gray-200 ${
            editor.isActive("blockquote") ? "bg-gray-300" : ""
          }`}
          title="نقل قول"
        >
          <FiQuote />
        </button>

        <button
          onClick={toggleCodeBlock}
          className={`p-2 rounded hover:bg-gray-200 ${
            editor.isActive("codeBlock") ? "bg-gray-300" : ""
          }`}
          title="بلوک کد"
        >
          <FiCode />
        </button>

        <button
          onClick={setHorizontalRule}
          className="p-2 rounded hover:bg-gray-200"
          title="خط افقی"
        >
          <FiMinus size={16} />
        </button>

        {/* لینک */}
        <button
          onClick={() => setShowLinkModal(true)}
          className={`p-2 rounded hover:bg-gray-200 ${
            editor.isActive("link") ? "bg-gray-300" : ""
          }`}
          title="لینک"
        >
          <FiLink size={16} />
        </button>

        {/* تصویر */}
        <button
          onClick={() => setShowImageModal(true)}
          className="p-2 rounded hover:bg-gray-200"
          title="تصویر"
        >
          <FiImage size={16} />
        </button>

        {/* یوتیوب */}
        <button
          onClick={() => setShowYoutubeModal(true)}
          className="p-2 rounded hover:bg-gray-200"
          title="ویدیو یوتیوب"
        >
          <FiYoutube size={16} />
        </button>

        {/* جدول */}
        <button
          onClick={insertTable}
          className="p-2 rounded hover:bg-gray-200"
          title="جدول"
        >
          <FiTable size={16} />
        </button>

        {/* رنگ */}
        <div className="relative group">
          <button className="p-2 rounded hover:bg-gray-200" title="رنگ متن">
            <FiPalette />
          </button>
          <div className="absolute top-full left-0 mt-1 p-2 bg-white border border-gray-300 rounded shadow-lg z-10 hidden group-hover:flex flex-wrap gap-1 w-32">
            {[
              "#000000",
              "#FF0000",
              "#00FF00",
              "#0000FF",
              "#FFFF00",
              "#FF00FF",
              "#00FFFF",
              "#FFA500",
            ].map((color) => (
              <button
                key={color}
                onClick={() => setColor(color)}
                className="w-6 h-6 rounded border border-gray-300"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        {/* undo/redo */}
        <div className="h-6 border-l border-gray-300 mx-1"></div>

        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className="p-2 rounded hover:bg-gray-200 disabled:opacity-50"
          title="بازگردانی"
        >
          <FiRotateCcw size={16} />
        </button>

        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className="p-2 rounded hover:bg-gray-200 disabled:opacity-50"
          title="انجام مجدد"
        >
          <FiRotateCw size={16} />
        </button>
      </div>

      {/* محتوای ادیتور */}
      <div className="p-6 min-h-[500px] max-h-[700px] overflow-y-auto">
        <EditorContent editor={editor} />
      </div>

      {/* مودال لینک */}
      {showLinkModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-lg font-bold mb-4">افزودن لینک</h3>
            <input
              type="url"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <div className="flex gap-2">
              <button
                onClick={addLink}
                className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700"
              >
                افزودن
              </button>
              <button
                onClick={removeLink}
                className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700"
              >
                حذف لینک
              </button>
              <button
                onClick={() => setShowLinkModal(false)}
                className="flex-1 bg-gray-600 text-white py-2 rounded hover:bg-gray-700"
              >
                انصراف
              </button>
            </div>
          </div>
        </div>
      )}

      {/* مودال تصویر */}
      {showImageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-lg font-bold mb-4">افزودن تصویر</h3>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="آدرس تصویر یا آپلود فایل"
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                آپلود فایل
              </button>
            </div>
            <div className="flex gap-2">
              <button
                onClick={addImage}
                className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700"
              >
                افزودن
              </button>
              <button
                onClick={() => setShowImageModal(false)}
                className="flex-1 bg-gray-600 text-white py-2 rounded hover:bg-gray-700"
              >
                انصراف
              </button>
            </div>
          </div>
        </div>
      )}

      {/* مودال یوتیوب */}
      {showYoutubeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-lg font-bold mb-4">افزودن ویدیو یوتیوب</h3>
            <input
              type="url"
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <div className="flex gap-2">
              <button
                onClick={addYoutube}
                className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700"
              >
                افزودن
              </button>
              <button
                onClick={() => setShowYoutubeModal(false)}
                className="flex-1 bg-gray-600 text-white py-2 rounded hover:bg-gray-700"
              >
                انصراف
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .advanced-tiptap-container :global(.ProseMirror) {
          min-height: 400px;
          padding: 16px;
          font-family: system-ui, -apple-system, sans-serif;
          font-size: 16px;
          line-height: 1.8;
          text-align: right;
        }

        .advanced-tiptap-container :global(.ProseMirror:focus) {
          outline: none;
        }

        .advanced-tiptap-container :global(.tiptap-image) {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          margin: 16px 0;
        }

        .advanced-tiptap-container :global(.tiptap-link) {
          color: #10b981;
          text-decoration: underline;
        }

        .advanced-tiptap-container :global(.tiptap-youtube) {
          width: 100%;
          min-height: 400px;
          border-radius: 8px;
          margin: 16px 0;
        }

        .advanced-tiptap-container :global(.ProseMirror table) {
          border-collapse: collapse;
          margin: 16px 0;
          width: 100%;
        }

        .advanced-tiptap-container :global(.ProseMirror table td),
        .advanced-tiptap-container :global(.ProseMirror table th) {
          border: 1px solid #e2e8f0;
          padding: 8px 12px;
          text-align: right;
        }

        .advanced-tiptap-container :global(.ProseMirror table th) {
          background-color: #f8fafc;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

export default AdvancedTiptap;
