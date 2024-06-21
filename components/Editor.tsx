"use client";

import { useEffect, useState } from "react";
import { useAutosave } from "react-autosave";
import { updateEntry } from "@/utils/api";

const Editor = ({ entry }) => {
  const [content, setContent] = useState(entry?.content);
  const [isSaving, setIsSaving] = useState(false);
  const [analysis, setAnalysis] = useState(entry.analysis);

  const { mood, subject, negative, summary, color } = analysis;

  const analysisData = [
    { name: "Mood", value: mood || "" },
    { name: "Subject", value: subject || "" },
    { name: "Summary", value: summary || "" },
    { name: "Nagative", value: negative ? "True" : "False" || "" },
  ];

  useAutosave({
    data: content,
    onSave: async (_value) => {
      setIsSaving(true);
      const data = await updateEntry(entry.id, _value);
      setAnalysis(data.analysis);
      setIsSaving(false);
    },
  });

  return (
    <>
      <div title="editor" className="w-full h-full col-span-2">
        {isSaving && "Saving..."}
        <textarea
          className="w-full h-full p-8 outline-none"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <div title="sidebar" className="border-l border-black/10 p-6">
        <h2 className={`text-3xl`} style={{ color: color }}>
          Analysis
        </h2>
        <ul>
          {analysisData.map(({ name, value }) => (
            <li key={name} className="">
              {name}: {value}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Editor;
