"use client";

import { useState } from "react";
import { sentimentSchema } from "./schema";
import { z } from "zod";

type Sentiment = z.infer<typeof sentimentSchema>;

export default function StructuredEnumPage() {
  const [text, setText] = useState("");
  const [sentiment, setSentiment] = useState<Sentiment | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSentiment(null);

    try {
      const response = await fetch("/api/structured-enum", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error("Failed to classify sentiment");
      }

      const data = await response.json();
      const parsedSentiment = sentimentSchema.parse(data);
      setSentiment(parsedSentiment);
      setText("");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const getSentimentColor = (sentiment: Sentiment) => {
    switch (sentiment) {
      case "positive":
        return "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200";
      case "negative":
        return "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200";
      case "neutral":
        return "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200";
    }
  };

  const getSentimentIcon = (sentiment: Sentiment) => {
    switch (sentiment) {
      case "positive":
        return "😊";
      case "negative":
        return "😞";
      case "neutral":
        return "😐";
    }
  };

  return (
    <div className="flex flex-col w-full max-w-2xl pt-12 pb-24 mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8">Sentiment Classifier</h1>

      {error && (
        <div className="text-red-500 mb-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
          Error: {error}
        </div>
      )}

      {sentiment && (
        <div className="mb-8">
          <div
            className={`p-6 rounded-lg ${getSentimentColor(
              sentiment
            )} flex items-center gap-4`}
          >
            <span className="text-4xl">{getSentimentIcon(sentiment)}</span>
            <div>
              <p className="text-sm font-medium uppercase tracking-wide mb-1">
                Sentiment
              </p>
              <p className="text-2xl font-bold capitalize">{sentiment}</p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="text-input"
            className="block text-sm font-medium mb-2"
          >
            Enter text to classify:
          </label>
          <textarea
            id="text-input"
            placeholder="Type your text here..."
            className="w-full dark:bg-zinc-800 p-3 border border-zinc-300 dark:border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px]"
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-zinc-400 disabled:cursor-not-allowed transition-colors"
          disabled={!text.trim() || isLoading}
        >
          {isLoading ? "Classifying..." : "Classify Sentiment"}
        </button>
      </form>
    </div>
  );
}
