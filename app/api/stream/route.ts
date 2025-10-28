import {streamText} from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import { openai } from "@ai-sdk/openai";

export async function POST(req: Request) {
    const model = anthropic("claude-3-5-sonnet-20240620");
    try {
        const {prompt} = await req.json();
        const result = streamText({
            model,
            prompt,
        });
        return result.toUIMessageStreamResponse();
    } catch (error) {
        console.error("Error streamting text:", error);
        return Response.json({errr: "Failed to strean text"}, {status: 500});
    }
}