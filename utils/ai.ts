// // import { StructuredTool } from "@langchain/core/tools";
// // import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
// // import { z } from "zod";

// // const model = new ChatGoogleGenerativeAI({
// //   model: "gemini-pro",
// //   temperature: 0.5,
// // });

// // // Define your tool
// // class MoodAnalyzer extends StructuredTool {
// //   schema = z.object({
// //     mood: z
// //       .string()
// //       .describe("the mood of the person who wrote the journal entry."),
// //     subject: z.string().describe("the subject of the journal entry."),
// //     negative: z
// //       .boolean()
// //       .describe(
// //         "is the journal entry negative? (i.e. does it contain negative emotions?)."
// //       ),
// //     summary: z.string().describe("quick summary of the entire entry."),
// //     color: z
// //       .string()
// //       .describe(
// //         "a hexidecimal color code that represents the mood of the entry. Example #0101fe for blue representing happiness."
// //       ),
// //     sentimentScore: z
// //       .number()
// //       .describe(
// //         "sentiment of the text and rated on a scale from -10 to 10, where -10 is extremely negative, 0 is neutral, and 10 is extremely positive."
// //       ),
// //   });

// //   name = "mood_analyzer";

// //   description =
// //     "useful for when you need to find something on the web or summarize a webpage.";

// //   async _call(_: z.infer<this["schema"]>): Promise<string> {
// //     return "mood_analyzer";
// //   }
// // }
// // const tool = new MoodAnalyzer();

// // // Bind your tools to the model
// // const modelWithTools = model.withStructuredOutput(tool.schema, {
// //   name: tool.name, // this is optional
// // });

// // export const analyze = async (entry = "") => {
// //   const res = await modelWithTools.invoke([["human", entry]]);
// //   return res;
// // };

// import { ChatVertexAI } from "@langchain/google-vertexai";
// import { type GeminiTool } from "@langchain/google-vertexai/types";
// import { zodToGeminiParameters } from "@langchain/google-vertexai/utils";
// import { z } from "zod";

// const calculatorSchema = z.object({
//   operation: z
//     .enum(["add", "subtract", "multiply", "divide"])
//     .describe("The type of operation to execute"),
//   number1: z.number().describe("The first number to operate on."),
//   number2: z.number().describe("The second number to operate on."),
// });

// const geminiCalculatorTool: GeminiTool = {
//   functionDeclarations: [
//     {
//       name: "calculator",
//       description: "A simple calculator tool",
//       parameters: zodToGeminiParameters(calculatorSchema),
//     },
//   ],
// };

// const model = new ChatVertexAI({
//   authOptions: {
//     credentials: {
//       type: "service_account",
//       project_id: `${process.env.VERTEXAI_PROJECT_ID}`,
//     },
//   },
//   temperature: 0.7,
//   model: "gemini-1.5-flash-001",
// }).bind({
//   tools: [geminiCalculatorTool],
// });

// export const analyze = async (entry = "") => {
//   const response = await model.invoke(entry);
//   console.log(JSON.stringify(response.additional_kwargs, null, 2));
// };
// /*
// {
//   "tool_calls": [
//     {
//       "id": "calculator",
//       "type": "function",
//       "function": {
//         "name": "calculator",
//         "arguments": "{\"number2\":81623836,\"number1\":1628253239,\"operation\":\"multiply\"}"
//       }
//     }
//   ],
// }
//  */

async function makeApiRequest(mood, subject, negative, summary, color) {
  // This hypothetical API returns a JSON such as:
  // {"base":"USD","rates":{"SEK": 0.091}}
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
        description: "The summary of the journal entry.",
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

import { GoogleGenerativeAI } from "@google/generative-ai";
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
