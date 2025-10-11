"use client";
import { useState } from "react";
import { useAutosave } from "react-autosave";
import { updateEntry } from "@/src/utils/api";

const Editor = ({ entry }: { entry: any }) => {
   const [content, setContent] = useState(entry?.content);
   const [isSaving, setIsSaving] = useState(false);
   const [analysis, setAnalysis] = useState(entry.analysis);

   // ✅ Destructure with default values OR destructure inside render
   const mood = analysis?.mood || "neutral";
   const subject = analysis?.subject || "New Entry";
   const negative = analysis?.negative || false;
   const summary = analysis?.summary || "Start writing to analyze your mood...";
   const color = analysis?.color || "#cccccc";

   const analysisData = [
      { name: "Mood", value: mood },
      { name: "Subject", value: subject },
      { name: "Summary", value: summary },
      { name: "Negative", value: negative ? "True" : "False" },
   ];

   useAutosave({
      data: content,
      interval: 2000, // ✅ Wait 2 seconds after user stops typing
      onSave: async (_value) => {
         if (!_value || _value.trim().length < 10) {
            return; // Don't save/analyze very short content
         }

         setIsSaving(true);
         try {
            const data = await updateEntry(entry.id, _value);
            if (data && data.analysis) {
               setAnalysis(data.analysis);
            }
         } catch (error) {
            console.error("Error saving entry:", error);
         } finally {
            setIsSaving(false);
         }
      },
   });

   return (
      <>
         <div title="editor" className="w-full h-full col-span-2">
            {isSaving && (
               <div className="text-sm text-gray-500 p-2">Saving...</div>
            )}
            <textarea
               className="w-full h-full p-8 outline-none text-black"
               value={content}
               onChange={(e) => setContent(e.target.value)}
               placeholder="Start writing your journal entry..."
            />
         </div>
         <div title="sidebar" className="border-l border-black/10 p-6">
            <h2 className="text-3xl mb-4" style={{ color: color }}>
               Analysis
            </h2>
            <ul className="space-y-2">
               {analysisData.map(({ name, value }) => (
                  <li key={name} className="flex flex-col">
                     <span className="font-semibold text-sm text-gray-600">
                        {name}
                     </span>
                     <span className="text-base">{value}</span>
                  </li>
               ))}
            </ul>
         </div>
      </>
   );
};

export default Editor;
