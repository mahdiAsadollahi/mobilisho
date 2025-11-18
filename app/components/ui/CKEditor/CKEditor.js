// components/ui/CKEditor/CKEditor.js
"use client";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const CustomCKEditor = ({ value, onChange, placeholder }) => {
  return (
    <div className="ckeditor-container rounded-lg overflow-hidden border border-gray-300 hover:border-gray-400 transition-colors">
      <style jsx>{`
        .ck-editor__editable {
          min-height: 400px !important;
          max-height: 600px !important;
          font-size: 16px !important;
          line-height: 1.7 !important;
          padding: 24px !important;
          background: white !important;
          font-family: system-ui, -apple-system, sans-serif !important;
        }

        .ck-editor__editable:focus {
          background: white !important;
          border-color: #2563eb !important;
          box-shadow: 0 0 0 1px #2563eb !important;
        }

        .ck.ck-toolbar {
          background: #f8fafc !important;
          border: none !important;
          border-bottom: 1px solid #e2e8f0 !important;
          border-radius: 0 !important;
          padding: 12px 16px !important;
        }

        .ck.ck-toolbar .ck.ck-icon {
          color: #475569 !important;
        }

        .ck.ck-button:not(.ck-disabled):hover {
          background: #e2e8f0 !important;
        }

        .ck.ck-dropdown__panel {
          border-radius: 8px !important;
          border: 1px solid #e2e8f0 !important;
          box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1) !important;
        }
      `}</style>

      <CKEditor
        editor={ClassicEditor}
        data={value}
        onChange={(event, editor) => {
          const data = editor.getData();
          onChange(data);
        }}
        config={{
          placeholder: placeholder,
          toolbar: {
            items: [
              "heading",
              "|",
              "bold",
              "italic",
              "underline",
              "link",
              "bulletedList",
              "numberedList",
              "|",
              "blockQuote",
              "insertTable",
              "|",
              "undo",
              "redo",
            ],
            shouldNotGroupWhenFull: true,
          },
          language: "fa",
          heading: {
            options: [
              {
                model: "paragraph",
                title: "پاراگراف",
                class: "ck-heading_paragraph",
              },
              {
                model: "heading1",
                view: "h2",
                title: "عنوان ۱",
                class: "ck-heading_heading1",
              },
              {
                model: "heading2",
                view: "h3",
                title: "عنوان ۲",
                class: "ck-heading_heading2",
              },
              {
                model: "heading3",
                view: "h4",
                title: "عنوان ۳",
                class: "ck-heading_heading3",
              },
            ],
          },
          link: {
            addTargetToExternalLinks: true,
            decorators: {
              openInNewTab: {
                mode: "manual",
                label: "باز کردن در تب جدید",
                attributes: {
                  target: "_blank",
                  rel: "noopener noreferrer",
                },
              },
            },
          },
        }}
      />
    </div>
  );
};

export default CustomCKEditor;
