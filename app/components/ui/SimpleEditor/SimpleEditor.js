// app/components/ui/SimpleEditor/SimpleEditor.js
"use client";
import { useState, useRef } from "react";
import { FiBold, FiItalic, FiList, FiLink, FiImage } from "react-icons/fi";

const SimpleEditor = ({ value, onChange, placeholder }) => {
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const textareaRef = useRef(null);

  const handleFormat = (type) => {
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);

    let newText = value;
    let newCursorPos = end;

    switch (type) {
      case "bold":
        newText =
          value.substring(0, start) +
          `**${selectedText}**` +
          value.substring(end);
        newCursorPos = end + 4;
        break;
      case "italic":
        newText =
          value.substring(0, start) +
          `*${selectedText}*` +
          value.substring(end);
        newCursorPos = end + 2;
        break;
      case "list":
        const lines = selectedText.split("\n");
        const listText = lines
          .map((line) => (line ? `- ${line}` : ""))
          .join("\n");
        newText = value.substring(0, start) + listText + value.substring(end);
        newCursorPos = end + lines.length * 2;
        break;
      case "link":
        if (selectedText) {
          setIsLinkModalOpen(true);
          return;
        }
        break;
      default:
        return;
    }

    onChange(newText);

    // بازگرداندن موقعیت کرسر
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  const insertLink = () => {
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);

    const linkText = `[${selectedText}](${linkUrl})`;
    const newText = value.substring(0, start) + linkText + value.substring(end);

    onChange(newText);
    setIsLinkModalOpen(false);
    setLinkUrl("");

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + linkText.length,
        start + linkText.length
      );
    }, 0);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageMarkdown = `\n![${file.name}](${e.target.result})\n`;
        const newValue = value + imageMarkdown;
        onChange(newValue);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">
      {/* نوار ابزار */}
      <div className="flex items-center gap-1 p-3 border-b border-gray-200 bg-gray-50">
        <button
          type="button"
          onClick={() => handleFormat("bold")}
          className="p-2 hover:bg-gray-200 rounded transition-colors"
          title="پررنگ"
        >
          <FiBold size={16} />
        </button>

        <button
          type="button"
          onClick={() => handleFormat("italic")}
          className="p-2 hover:bg-gray-200 rounded transition-colors"
          title="ایتالیک"
        >
          <FiItalic size={16} />
        </button>

        <button
          type="button"
          onClick={() => handleFormat("list")}
          className="p-2 hover:bg-gray-200 rounded transition-colors"
          title="لیست"
        >
          <FiList size={16} />
        </button>

        <button
          type="button"
          onClick={() => handleFormat("link")}
          className="p-2 hover:bg-gray-200 rounded transition-colors"
          title="لینک"
        >
          <FiLink size={16} />
        </button>

        <label
          className="p-2 hover:bg-gray-200 rounded transition-colors cursor-pointer"
          title="تصویر"
        >
          <FiImage size={16} />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>
      </div>

      {/* ویرایشگر */}
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-96 p-4 resize-none focus:outline-none text-right leading-7 font-medium"
        dir="rtl"
      />

      {/* مودال لینک */}
      {isLinkModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-lg font-medium mb-4">افزودن لینک</h3>
            <input
              type="url"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="آدرس لینک را وارد کنید"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-4"
            />
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setIsLinkModalOpen(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                انصراف
              </button>
              <button
                onClick={insertLink}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                افزودن
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SimpleEditor;
