import { generateText } from "ai";
import { anthropic } from "@ai-sdk/anthropic";

export async function POST(req: Request) {
    try {
        const { prompt } = await req.json();

        if (!prompt) {
            return Response.json(
                { error: "Prompt is required" },
                { status: 400 }
            );
        }

        const result = await generateText({
            model: anthropic("claude-3-5-sonnet-20240620"),
            prompt,
        });

        return Response.json({ 
            text: result.text,
            usage: result.usage,
        });
    } catch (error) {
        console.error("Error generating text:", error);
        return Response.json(
            { error: "Failed to generate text" },
            { status: 500 }
        );
    }
}