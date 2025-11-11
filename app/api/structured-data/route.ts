import { streamObject } from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import { recipeSchema } from "./schema";

export async function POST(req: Request) {
  const { dish } = await req.json();

  const model = anthropic("claude-sonnet-4-5-20250929");

  try {
    const result = await streamObject({
      model,
      schema: recipeSchema,
      prompt: `Generate a recipe for ${dish}`,
    });
    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Error generating recipe:", error);
    return Response.json(
      { error: "Failed to generate recipe" },
      { status: 500 }
    );
  }
}
