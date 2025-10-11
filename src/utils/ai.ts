import { GoogleGenerativeAI } from "@google/generative-ai";
import {
   ChatGoogleGenerativeAI,
   GoogleGenerativeAIEmbeddings,
} from "@langchain/google-genai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { Document } from "langchain/document";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import type { AnalysisData } from "@/src/types/analysis";
import { log } from "console";

// Access your API key as an environment variable
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");

export const analyze = async (entry = ""): Promise<AnalysisData> => {
   // ✅ Use gemini-2.5-flash - stable and fast model
   const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
   });

   const prompt = `Analyze this journal entry and respond ONLY with a valid JSON object (no markdown, no code blocks, no extra text) with these exact fields:
{
  "mood": "the mood of the person (e.g., happy, sad, anxious, excited)",
  "subject": "the main subject of the entry",
  "negative": true or false (whether the mood is negative),
  "summary": "a brief summary from the author's perspective (2-3 sentences)",
  "color": "a hex color code representing the mood (e.g., #FF6B6B for sad, #4ECDC4 for happy)",
  "sentimentScore": a number from -10 (very negative) to 10 (very positive)
}

Journal entry: "${entry}"

Respond with ONLY the JSON object:`;

   try {
      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();

      // Clean the response - remove markdown code blocks if present
      let cleanedText = text.trim();
      if (cleanedText.startsWith("```json")) {
         cleanedText = cleanedText
            .replace(/```json\n?/g, "")
            .replace(/```\n?$/g, "");
      } else if (cleanedText.startsWith("```")) {
         cleanedText = cleanedText
            .replace(/```\n?/g, "")
            .replace(/```\n?$/g, "");
      }

      const parsed = JSON.parse(cleanedText) as Partial<AnalysisData>;

      // ✅ Validate and fill missing fields with defaults
      return {
         mood: parsed.mood ?? "neutral",
         subject: parsed.subject ?? "General",
         negative: parsed.negative ?? false,
         summary: parsed.summary ?? "No summary available.",
         color: parsed.color ?? "#cccccc",
         sentimentScore: parsed.sentimentScore ?? 0,
      };
   } catch (error) {
      console.error("Error in analyze function:", error);

      // Return default values if anything fails
      return {
         mood: "neutral",
         subject: "General",
         negative: false,
         summary: entry.slice(0, 100) + "...",
         color: "#cccccc",
         sentimentScore: 0,
      };
   }
};

export const qa = async (
   question: string,
   entries: {
      id: string;
      content: string;
      createdAt: Date;
   }[]
) => {
   const docs = entries
      .filter((entry) => entry?.content)
      .map((entry) => {
         return new Document({
            pageContent: entry.content,
            metadata: { source: entry.id, date: entry.createdAt },
         });
      });

   log("Docs for QA: 📝", docs);
   const model = new ChatGoogleGenerativeAI({
      modelName: "gemini-2.5-flash", // ✅ Updated to available model
      maxOutputTokens: 2048,
      apiKey: process.env.GOOGLE_API_KEY,
   });

   const prompt = ChatPromptTemplate.fromTemplate(
      "Answer the question based on these journal entries:\n{entries}\n\nQuestion: {question}\nAnswer in 100 words or less."
   );

   log("QA Prompt: ❓", prompt);

   const chain = prompt.pipe(model).pipe(new StringOutputParser());

   const embeddings = new GoogleGenerativeAIEmbeddings({
      apiKey: process.env.GOOGLE_API_KEY,
   });

   const store = await MemoryVectorStore.fromDocuments(docs, embeddings);

   const relevantDocs = await store.similaritySearch(question);

   const res = await chain.invoke({
      question,
      entries: relevantDocs.map((doc) => doc.pageContent).join("\n\n"),
   });

   log("QA Response: 🤖", res);

   return res;
};
