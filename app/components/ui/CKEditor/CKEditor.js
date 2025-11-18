// components/ui/CKEditor.js
"use client";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const CustomCKEditor = ({ value, onChange, placeholder }) => {
  return (
    <div className="ckeditor-container border border-gray-300 rounded-lg overflow-hidden">
      <CKEditor
        editor={ClassicEditor}
        data={value}
        onChange={(event, editor) => {
          const data = editor.getData();
          onChange(data);
        }}
        config={{
          placeholder: placeholder,
          toolbar: [
            "heading",
            "|",
            "bold",
            "italic",
            "link",
            "bulletedList",
            "numberedList",
            "blockQuote",
            "undo",
            "redo",
          ],
          language: "fa",
        }}
      />
    </div>
  );
};

export default CustomCKEditor;
