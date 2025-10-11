"use client";

import { useState } from "react";
import { askQuestion } from "@/src/utils/api";
import { GlassCard, GlassInput } from "./GlassComponents";
import { Label } from "recharts";
import { set } from "zod";

const Question = () => {
   const [value, setValue] = useState("");
   const [loading, setLoading] = useState(false);
   const [answer, setAnswer] = useState("");
   const [question, setQuestion] = useState("");

   function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      setValue(e.target.value);
   }

   async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();
      setLoading(true);
      const res = await askQuestion(value);
      setAnswer(res);
      setValue("");
      setLoading(false);
      setQuestion(value);
   }

   return (
      <GlassCard variant="subtle" className="mb-6 p-6">
         {answer && (
            <p className="bg-[#363450] p-4 mb-4">
               <strong>Q:</strong> {question}
            </p>
         )}
         {answer && <p className="bg-purple-500\/20 p-4 mb-4">{answer}</p>}
         <form onSubmit={handleSubmit}>
            <label htmlFor="question" className="mb-3 block">
               ✨ Ask AI About Your Entries
            </label>
            <div className="flex gap-2">
               <GlassInput
                  value={value}
                  id="question"
                  onChange={handleChange}
                  placeholder="e.g., How have I been feeling this week?"
               />
               <button
                  type="submit"
                  disabled={value.length === 0 || loading}
                  className="bg-white text-brand-blue rounded-md px-4 py-2 disabled:opacity-50">
                  Ask
               </button>
            </div>
         </form>
         {loading && <p>Loading...</p>}
      </GlassCard>
   );
};

export default Question;
