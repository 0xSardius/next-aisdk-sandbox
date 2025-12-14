import { z } from "zod";

export const sentimentSchema = z.enum(["positive", "negative", "neutral"]);
