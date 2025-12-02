import { streamObject } from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import { pokemonSchema } from "./schema";

export async function POST(req: Request) {
  const { type } = await req.json();
}
