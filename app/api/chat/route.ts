import { streamText, convertToModelMessages } from "ai";
import { anthropic } from "@ai-sdk/anthropic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      return Response.json(
        { error: "Messages array is required" },
        { status: 400 }
      );
    }

    const model = anthropic("claude-sonnet-4-5-20250929");

    const result = streamText({
      model,
      // system example
      // messages: [
      //   {
      //     role: "system",
      //     // Note our content gives a role, provides guidance to the model, and a
      //     content:
      //       "You are a helpful coding assistant. Keep responses under 3 sentences, and focus on practical examples",
      //   },
      //   ...convertToModelMessages(messages),
      // ],
      // Few Shot learning example
      messages: [
        {
          role: "system",
          // Note our content gives a role, provides guidance to the model, and a focus on practical examples
          content: "Convert user questions about react into code examples",
        },
        {
          role: "user",
          content: "How do I create a new component in React?",
        },
        {
          role: "assistant",
          content:
            "Here's a simple example of how to create a new component in React:",
        },
        ...convertToModelMessages(messages),
      ],
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Error streaming chat:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    return Response.json(
      { error: `Failed to stream chat: ${errorMessage}` },
      { status: 500 }
    );
  }
}
