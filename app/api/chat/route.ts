import { UIMessage, streamText, convertToModelMessages } from "ai";
import { anthropic } from "@ai-sdk/anthropic";

export async function POST(req: Request) {
  try {
    const { messages }: { messages: UIMessage[] } = await req.json();
    const model = anthropic("claude-3-5-sonnet-20240620");

    const result = streamText({
      model,
      messages: convertToModelMessages(messages),
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Error streaming chat:", error);
    return Response.json({ error: "Failed to stream chat" }, { status: 500 });
  }
}
