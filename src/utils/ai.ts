import { GoogleGenerativeAI } from "@google/generative-ai";
import {
   ChatGoogleGenerativeAI,
   GoogleGenerativeAIEmbeddings,
} from "@langchain/google-genai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { Document } from "langchain/document";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";

// Function declaration, to pass to the model.
import { FunctionDeclarationSchemaType } from "@google/generative-ai";

const analyzeSchema = {
   name: "analyzeMood",
   parameters: {
      type: FunctionDeclarationSchemaType.OBJECT,
      description:
         "Analyze the mood of the person who wrote the journal entry.",
      properties: {
         mood: {
            type: FunctionDeclarationSchemaType.STRING,
            description: "The mood of the person who wrote the journal entry.",
         },
         subject: {
            type: FunctionDeclarationSchemaType.STRING,
            description: "The subject of the journal entry.",
         },
         negative: {
            type: FunctionDeclarationSchemaType.BOOLEAN,
            description:
               "Whether the mood of the person who wrote the journal entry is negative.",
         },
         summary: {
            type: FunctionDeclarationSchemaType.STRING,
            description:
               "A summary of the journal entry from the author's perspective.",
         },
         color: {
            type: FunctionDeclarationSchemaType.STRING,
            description: "A hex color code representing the mood.",
         },
         sentimentScore: {
            type: FunctionDeclarationSchemaType.NUMBER,
            description:
               "Sentiment score from -10 (very negative) to 10 (very positive).",
         },
      },
      required: [
         "mood",
         "subject",
         "negative",
         "summary",
         "color",
         "sentimentScore",
      ],
   },
};

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");

// ...

const generativeModel = genAI.getGenerativeModel({
   // Use a model that supports function calling, like a Gemini 1.5 model
   model: "gemini-1.5-flash",

   // Specify the function declaration.

   tools: [
      {
         functionDeclarations: [analyzeSchema],
      },
   ],
});

import type { AnalysisData } from "@/src/types/analysis";

export const analyze = async (entry = ""): Promise<AnalysisData> => {
   const chat = generativeModel.startChat();
   const prompt = `Analyze this journal entry:` + entry;

   const result = await chat.sendMessage(prompt);

   const calls = result.response.functionCalls?.();
   const call = calls?.[0];

   if (!call || !call.args) {
      throw new Error("No function call or arguments returned by model.");
   }

   const args = call.args as Partial<AnalysisData>;

   // ✅ Validate and fill missing fields with defaults
   return {
      mood: args.mood ?? "neutral",
      subject: args.subject ?? "General",
      negative: args.negative ?? false,
      summary: args.summary ?? "No summary available.",
      color: args.color ?? "#cccccc",
      sentimentScore: args.sentimentScore ?? 0,
   };
};

export const qa = async (
   question: string,
   entries: {
      id: string;
      content: string;
      createdAt: Date;
   }[]
) => {
   const docs = entries.map((entry) => {
      return new Document({
         pageContent: entry.content,
         metadata: { source: entry.id, date: entry.createdAt },
      });
   });

   const model = new ChatGoogleGenerativeAI({
      modelName: "gemini-pro",
      maxOutputTokens: 2048,
   });

   const prompt = ChatPromptTemplate.fromTemplate(
      "Answer the question based on these journal entries:\n{entries}\n\nQuestion: {question}\nAnswer in 100 words or less."
   );

   const chain = prompt.pipe(model).pipe(new StringOutputParser());

   const embeddings = new GoogleGenerativeAIEmbeddings();
   const store = await MemoryVectorStore.fromDocuments(docs, embeddings);

   const relevantDocs = await store.similaritySearch(question);

   const res = await chain.invoke({
      question,
      entries: relevantDocs.map((doc) => doc.pageContent).join("\n\n"),
   });

   return res;
};
