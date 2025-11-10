// Example: How you'd use the Zod schema with generateObject
import { generateObject } from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import { recipeSchema } from "./schema";

export async function POST(req: Request) {
  const { prompt } = await req.json();
  
  const result = await generateObject({
    model: anthropic("claude-sonnet-4-5-20250929"),
    schema: recipeSchema, // ← Zod schema, NOT a TypeScript type!
    prompt: `Create a recipe for: ${prompt}`,
  });

  // result.object is typed AND validated at runtime
  // TypeScript knows the shape, AND Zod validated it matches
  return Response.json(result.object);
}

// If you tried to use a TypeScript interface instead:
/*
interface Recipe {
  recipe: {
    name: string;
    ingredients: Array<{ name: string; amount: string }>;
    steps: string[];
  };
}

// This WON'T work - TypeScript types don't exist at runtime!
const result = await generateObject({
  model: anthropic("claude-sonnet-4-5-20250929"),
  schema: Recipe, // ❌ Error: Can't use TypeScript types
  prompt: "...",
});
*/

