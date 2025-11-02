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
      messages: convertToModelMessages(messages),
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
