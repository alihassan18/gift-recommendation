import { AssistantResponse } from "ai";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  // Parse the request body
  const input: {
    threadId: string | null;
    message: string;
  } = await req.json();
  console.log(input, "input");

  // Create a thread if needed
  const threadId = input.threadId ?? (await openai.beta.threads.create({})).id;

  // Add a message to the thread
  const createdMessage = await openai.beta.threads.messages.create(threadId, {
    role: "user",
    content: input.message,
  });

  return AssistantResponse(
    { threadId, messageId: createdMessage.id },
    async ({ forwardStream, sendDataMessage }) => {
      // Run the assistant on the thread
      const runStream = openai.beta.threads.runs.stream(threadId, {
        tools: [
          {
            type: "function",
            function: {
              name: "recommend_product",
              description:
                "Generate function to recommend product from the attached files",
              // strict: true,
              parameters: {
                type: "object",
                required: ["product"],
                properties: {
                  product: {
                    type: "object",
                    required: [
                      "title",
                      "url",
                      "image_url",
                      "last_modified",
                      "change_frequency",
                    ],
                    properties: {
                      title: {
                        type: "string",
                        description: "Title of the product",
                      },
                      url: {
                        type: "string",
                        description: "URL to the product page",
                      },
                      image_url: {
                        type: "string",
                        description: "URL to the product image",
                      },
                      last_modified: {
                        type: "string",
                        description:
                          "Timestamp of the last modification of the product information in ISO 8601 format",
                      },
                      change_frequency: {
                        type: "string",
                        description:
                          "Frequency of updates to product information",
                      },
                    },
                    additionalProperties: false,
                  },
                },
                additionalProperties: false,
              },
            },
          },
        ],
        assistant_id:
          process.env.OPENAI_ASSISTANT_ID ??
          (() => {
            throw new Error("ASSISTANT_ID is not set");
          })(),
      });

      // forward run status would stream message deltas
      let runResult = await forwardStream(runStream);

      // status can be: queued, in_progress, requires_action, cancelling, cancelled, failed, completed, or expired
      while (
        runResult?.status === "requires_action" &&
        runResult.required_action?.type === "submit_tool_outputs"
      ) {
        const tool_outputs =
          runResult.required_action.submit_tool_outputs.tool_calls.map(
            (toolCall: any) => {
              const parameters = JSON.parse(toolCall.function.arguments);
              console.log(parameters, "parameters");

              switch (toolCall.function.name) {
                case "recommend_product":
                  // Assume parameters include details about the recommendation
                  const { product } = parameters; // Example parameter
                  // Handle the recommend_product function logic here
                  return {
                    tool_call_id: toolCall.id,
                    // Provide a sample response based on the tool's requirements
                    output: `I recommend the product "${product.title}" available at ${product.url}.`,
                  };

                default:
                  console.log(
                    `Unknown tool call function: ${toolCall.function.name}`
                  );
                  return { tool_call_id: toolCall.id, output: null };

                // throw new Error(
                //   `Unknown tool call function: ${toolCall.function.name}`
                // );
              }
            }
          );

        try {
          runResult = await forwardStream(
            openai.beta.threads.runs.submitToolOutputsStream(
              threadId,
              runResult.id,
              { tool_outputs }
            )
          );
        } catch (error) {
          console.log(error, "error");
        }
      }
    }
  );
}
