"use client";

import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const TextEditor = ({ setContent }) => {
  const editorConfig = {
    toolbar: ["bold", "italic"],
    removePlugins: ["EasyImage", "ImageUpload", "MediaEmbed", "Table"],
  };

  return (
    <div className="border rounded-lg">
      <CKEditor
        editor={ClassicEditor}
        data=""
        config={editorConfig}
        onChange={(event, editor) => {
          const data = editor.getData();
          setContent(data);
        }}
      />
    </div>
  );
};

export default TextEditor;
