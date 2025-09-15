"use client";

import React from "react";
import dynamic from "next/dynamic";

/**
 * Dynamically load CKEditor and its Classic build on the client.
 * If loading fails, return a simple textarea fallback that mimics CKEditor's onChange signature.
 */
const EditorLoader = dynamic(
  async () => {
    try {
      const mod = await import("@ckeditor/ckeditor5-react");
      const ClassicEditor = (await import("@ckeditor/ckeditor5-build-classic"))
        .default;
      const { CKEditor } = mod;

      // Wrap CKEditor into a tiny wrapper so we can return a functional component
      return function CKEditorWrapper(props) {
        return <CKEditor editor={ClassicEditor} {...props} />;
      };
    } catch (err) {
      // If import fails, fallback to a simple textarea editor that calls onChange(_, { getData })
      console.error("CKEditor dynamic import failed:", err);
      return function FallbackEditor({ data = "", onChange }) {
        const [value, setValue] = React.useState(data || "");
        React.useEffect(() => setValue(data || ""), [data]);

        return (
          <textarea
            value={value}
            onChange={(e) => {
              const v = e.target.value;
              setValue(v);
              if (typeof onChange === "function") {
                // emulate CKEditor onChange signature: (event, editor)
                const fakeEditor = { getData: () => v };
                onChange(null, fakeEditor);
              }
            }}
            className="w-full min-h-[220px] p-2 border rounded"
            placeholder="Editor failed to load — using fallback textarea"
          />
        );
      };
    }
  },
  {
    ssr: false,
    loading: () => <div className="p-3">Loading editor…</div>,
  }
);

export default function TextEditor({ setContent, initialData = "" }) {
  const editorConfig = {
    toolbar: ["bold", "italic", "link"],
    removePlugins: ["EasyImage", "ImageUpload", "MediaEmbed", "Table"],
  };

  return (
    <div className="border rounded-lg">
      <EditorLoader
        data={initialData}
        config={editorConfig}
        onChange={(_, editor) => {
          try {
            const value = editor?.getData?.() ?? "";
            setContent(value);
          } catch (e) {
            console.error("Editor onChange error:", e);
          }
        }}
      />
    </div>
  );
}
