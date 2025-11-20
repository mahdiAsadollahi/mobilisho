// app/components/ui/AdvancedCKEditor/AdvancedCKEditor.js
"use client";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import { ClassicEditor } from "@ckeditor/ckeditor5-editor-classic";
import { Essentials } from "@ckeditor/ckeditor5-essentials";
import { UploadAdapter } from "@ckeditor/ckeditor5-upload";
import { Paragraph } from "@ckeditor/ckeditor5-paragraph";
import { Heading } from "@ckeditor/ckeditor5-heading";
import { Bold, Italic, Underline } from "@ckeditor/ckeditor5-basic-styles";
import { Font } from "@ckeditor/ckeditor5-font";
import { Alignment } from "@ckeditor/ckeditor5-alignment";
import { List } from "@ckeditor/ckeditor5-list";
import { Indent } from "@ckeditor/ckeditor5-indent";
import { Link } from "@ckeditor/ckeditor5-link";
import {
  Image,
  ImageInsert,
  ImageUpload,
  ImageStyle,
  ImageToolbar,
  ImageCaption,
} from "@ckeditor/ckeditor5-image";
import { BlockQuote } from "@ckeditor/ckeditor5-block-quote";
import {
  Table,
  TableToolbar,
  TableColumn,
  TableRow,
  TableCell,
} from "@ckeditor/ckeditor5-table";
import { Undo } from "@ckeditor/ckeditor5-undo";
import { Autoformat } from "@ckeditor/ckeditor5-autoformat";

// آداپتور آپلود سفارشی
class SimpleUploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }

  upload() {
    return this.loader.file.then((file) => {
      return new Promise((resolve, reject) => {
        this._initRequest();
        this._initListeners(resolve, reject, file);
        this._sendRequest(file);
      });
    });
  }

  abort() {
    if (this.xhr) {
      this.xhr.abort();
    }
  }

  _initRequest() {
    const xhr = (this.xhr = new XMLHttpRequest());
    xhr.open("POST", "/api/upload", true);
    xhr.responseType = "json";
  }

  _initListeners(resolve, reject, file) {
    const xhr = this.xhr;
    const loader = this.loader;
    const genericErrorText = `Couldn't upload file: ${file.name}.`;

    xhr.addEventListener("error", () => reject(genericErrorText));
    xhr.addEventListener("abort", () => reject());
    xhr.addEventListener("load", () => {
      const response = xhr.response;

      if (!response || response.error) {
        return reject(
          response && response.error ? response.error.message : genericErrorText
        );
      }

      // اگر سرور آپلود واقعی دارید، URL تصویر آپلود شده را برگردانید
      // در اینجا از URL موقت استفاده می‌کنیم
      const temporaryUrl = URL.createObjectURL(file);

      resolve({
        default: temporaryUrl,
      });
    });

    if (xhr.upload) {
      xhr.upload.addEventListener("progress", (evt) => {
        if (evt.lengthComputable) {
          loader.uploadTotal = evt.total;
          loader.uploaded = evt.loaded;
        }
      });
    }
  }

  _sendRequest(file) {
    const data = new FormData();
    data.append("upload", file);
    this.xhr.send(data);
  }
}

function SimpleUploadAdapterPlugin(editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
    return new SimpleUploadAdapter(loader);
  };
}

const AdvancedCKEditor = ({ value, onChange, placeholder }) => {
  const editorConfiguration = {
    placeholder: placeholder,
    toolbar: {
      items: [
        "heading",
        "|",
        "bold",
        "italic",
        "underline",
        "|",
        "fontSize",
        "fontColor",
        "fontBackgroundColor",
        "|",
        "alignment",
        "|",
        "numberedList",
        "bulletedList",
        "|",
        "outdent",
        "indent",
        "|",
        "link",
        "imageUpload",
        "imageInsert",
        "blockQuote",
        "insertTable",
        "|",
        "undo",
        "redo",
      ],
      shouldNotGroupWhenFull: true,
    },
    language: "fa",
    image: {
      toolbar: [
        "imageTextAlternative",
        "toggleImageCaption",
        "imageStyle:inline",
        "imageStyle:block",
        "imageStyle:side",
      ],
      upload: {
        types: ["jpeg", "png", "gif", "bmp", "webp"],
      },
    },
    table: {
      contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
    },
    plugins: [
      Essentials,
      UploadAdapter,
      Paragraph,
      Heading,
      Bold,
      Italic,
      Underline,
      Font,
      Alignment,
      List,
      Indent,
      Link,
      Image,
      ImageInsert,
      ImageUpload,
      ImageStyle,
      ImageToolbar,
      ImageCaption,
      BlockQuote,
      Table,
      TableToolbar,
      TableColumn,
      TableRow,
      TableCell,
      Undo,
      Autoformat,
      SimpleUploadAdapterPlugin,
    ],
    heading: {
      options: [
        {
          model: "paragraph",
          title: "پاراگراف",
          class: "ck-heading_paragraph",
        },
        {
          model: "heading1",
          view: "h1",
          title: "عنوان 1",
          class: "ck-heading_heading1",
        },
        {
          model: "heading2",
          view: "h2",
          title: "عنوان 2",
          class: "ck-heading_heading2",
        },
        {
          model: "heading3",
          view: "h3",
          title: "عنوان 3",
          class: "ck-heading_heading3",
        },
      ],
    },
    fontSize: {
      options: [
        9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
        27, 28, 29, 30, 32, 34, 36, 38, 40,
      ],
    },
    fontFamily: {
      options: [
        "default",
        "Tahoma, Geneva, sans-serif",
        "Arial, Helvetica, sans-serif",
        "Courier New, Courier, monospace",
        "Georgia, serif",
        "Times New Roman, Times, serif",
        "Verdana, Geneva, sans-serif",
      ],
    },
  };

  return (
    <div className="advanced-ckeditor-container">
      <style jsx>{`
        .advanced-ckeditor-container :global(.ck-editor__editable) {
          min-height: 400px;
          max-height: 600px;
          font-size: 16px;
          line-height: 1.8;
          padding: 20px;
          background: white;
          font-family: system-ui, -apple-system, sans-serif;
          text-align: right;
          direction: rtl;
        }

        .advanced-ckeditor-container :global(.ck-editor__editable:focus) {
          background: white;
          border-color: #10b981;
          box-shadow: 0 0 0 1px #10b981;
        }

        .advanced-ckeditor-container :global(.ck.ck-toolbar) {
          background: #f8fafc;
          border: none;
          border-bottom: 1px solid #e2e8f0;
          border-radius: 8px 8px 0 0;
          padding: 12px 16px;
        }

        .advanced-ckeditor-container :global(.ck.ck-toolbar .ck.ck-icon) {
          color: #475569;
        }

        .advanced-ckeditor-container
          :global(.ck.ck-button:not(.ck-disabled):hover),
        .advanced-ckeditor-container :global(.ck.ck-button.ck-on) {
          background: #e2e8f0;
        }

        .advanced-ckeditor-container :global(.ck.ck-dropdown__panel) {
          border-radius: 8px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
        }

        /* RTL Styles */
        .advanced-ckeditor-container
          :global(.ck.ck-toolbar > .ck-toolbar__items) {
          flex-direction: row-reverse;
        }

        .advanced-ckeditor-container :global(.ck.ck-list) {
          text-align: right;
        }

        /* استایل برای تصاویر */
        .advanced-ckeditor-container :global(.ck-editor__editable img) {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
        }

        /* استایل برای جداول */
        .advanced-ckeditor-container :global(.ck-editor__editable table) {
          width: 100%;
          border-collapse: collapse;
        }

        .advanced-ckeditor-container :global(.ck-editor__editable table td),
        .advanced-ckeditor-container :global(.ck-editor__editable table th) {
          border: 1px solid #e2e8f0;
          padding: 8px;
          text-align: right;
        }
      `}</style>

      <CKEditor
        editor={ClassicEditor}
        data={value}
        onReady={(editor) => {
          console.log("Editor is ready to use!", editor);
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          onChange(data);
        }}
        onBlur={(event, editor) => {
          console.log("Blur.", editor);
        }}
        onFocus={(event, editor) => {
          console.log("Focus.", editor);
        }}
        config={editorConfiguration}
      />
    </div>
  );
};

export default AdvancedCKEditor;
