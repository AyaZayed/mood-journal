import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  ChatGoogleGenerativeAI,
  GoogleGenerativeAIEmbeddings,
} from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { Document } from "langchain/document";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";

async function makeApiRequest(mood, subject, negative, summary, color) {
  return {
    mood: mood,
    summary: summary,
    color: color,
    negative: negative,
    subject: subject,
  };
}

// Function declaration, to pass to the model.
const analyzeSchema = {
  name: "analyzeMood",
  parameters: {
    type: "OBJECT",
    description: "Analyze the mood of the person who wrote the journal entry.",
    properties: {
      mood: {
        type: "STRING",
        description: "The mood of the person who wrote the journal entry.",
      },
      subject: {
        type: "STRING",
        description: "The subject of the journal entry.",
      },
      negative: {
        type: "BOOLEAN",
        description:
          "Whether the mood of the person who wrote the journal entry is negative.",
      },
      summary: {
        type: "STRING",
        description:
          "The summary of the journal entry from the perspective of the author",
      },
      color: {
        type: "STRING",
        description:
          "A hexidecimal color code representing The color of the mood of the person who wrote the journal entry.",
      },
    },
    required: ["mood", "subject", "negative", "summary", "color"],
  },
};

// Executable function code. Put it in a map keyed by the function name
// so that you can call it once you get the name string from the model.
const functions = {
  analyzeMood: async ({ mood, subject, negative, summary, color }) => {
    return makeApiRequest(mood, subject, negative, summary, color);
  },
};

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// ...

const generativeModel = genAI.getGenerativeModel({
  // Use a model that supports function calling, like a Gemini 1.5 model
  model: "gemini-1.5-flash",

  // Specify the function declaration.
  tools: {
    functionDeclarations: [analyzeSchema],
  },
});

export const analyze = async (entry = "") => {
  console.log(GoogleGenerativeAI);
  const chat = generativeModel.startChat();
  const prompt = `Analyze this journal entry :` + entry;

  // Send the message to the model.
  const result = await chat.sendMessage(prompt);

  // For simplicity, this uses the first function call found.
  const call = result.response.functionCalls()[0];

  try {
    return call.args;
  } catch (e) {
    console.log(e);
  }
};

export const qa = async (question, entries) => {
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
    "Answer the question based on the {entries} and the question is {question}" +
      "Answer in 100 words or less."
  );

  const chain = prompt.pipe(model).pipe(new StringOutputParser());
  console.log(chain);
  const embeddings = new GoogleGenerativeAIEmbeddings();

  const store = await MemoryVectorStore.fromDocuments(docs, embeddings);

  const relevantDocs = await store.similaritySearch(question);

  const res = await chain.invoke({
    question,
    entries: relevantDocs.map((doc) => doc.pageContent),
  });

  return res;
};
