import {streamText} from "ai";
import { anthropic } from "@ai-sdk/anthropic";

export async function POST(req: Request) {
    try {
        const {prompt} = await req.json();
        const result = streamText({
            model: anthropic("claude-3-5-sonnet-20240620"),
            prompt,
        });
        return result.toUIMessageStreamResponse();
    } catch (error) {
        console.error("Error streamting text:", error);
        return Response.json({errr: "Failed to strean text"}, {status: 500});
    }
}