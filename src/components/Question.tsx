"use client";

import { useState } from "react";
import { askQuestion } from "@/src/utils/api";

const Question = () => {
   const [value, setValue] = useState("");
   const [loading, setLoading] = useState(false);
   const [answer, setAnswer] = useState("");

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
   }

   return (
      <div>
         <form onSubmit={handleSubmit}>
            <input
               type="text"
               placeholder="Ask a Question"
               value={value}
               onChange={handleChange}
               disabled={loading}
            />
            <button type="submit" disabled={loading}>
               Ask
            </button>
         </form>
         {loading && <p>Loading...</p>}
         <p>{answer}</p>
      </div>
   );
};

export default Question;
