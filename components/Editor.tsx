"use client";

import { useState } from "react";
import { useAutosave } from "react-autosave";
import { updateEntry } from "@/utils/api";

const Editor = ({ entry }) => {
  const [content, setContent] = useState(entry?.content);
  const [isSaving, setIsSaving] = useState(false);

  useAutosave({
    data: content,
    onSave: async (_value) => {
      setIsSaving(true);
      const updated = await updateEntry(entry.id, _value);
      setIsSaving(false);
    },
  });

  return (
    <div title="editor" className="w-full h-full col-span-2">
      {isSaving && "Saving..."}
      <textarea
        className="w-full h-full p-8 outline-none"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
    </div>
  );
};

export default Editor;
