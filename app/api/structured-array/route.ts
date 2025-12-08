import { streamObject } from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import { pokemonSchema } from "./schema";

export async function POST(req: Request) {
  try {
    const { type } = await req.json();

    const result = await streamObject({
      model: anthropic("claude-sonnet-4-5-20250929"),
      output: "array",
      schema: pokemonSchema,
      prompt: `Generate a list of 10 ${type} pokemon.`,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Error generating pokemon:", error);
    return new Response("Failed to generate pokemon", { status: 500 });
  }
}
