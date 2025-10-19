"use client";

import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [usage, setUsage] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!prompt.trim()) return;

    setLoading(true);
    setResult("");
    setUsage(null);

    try {
      const response = await fetch("/api/completion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data.text);
        setUsage(data.usage);
      } else {
        setResult(`Error: ${data.error}`);
      }
    } catch (error) {
      setResult(`Error: ${error instanceof Error ? error.message : "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2">AI SDK Sandbox</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Test your prompts with Claude 3.5 Sonnet
          </p>
        </header>

        <form onSubmit={handleSubmit} className="mb-8">
          <div className="mb-4">
            <label 
              htmlFor="prompt" 
              className="block text-sm font-medium mb-2"
            >
              Enter your prompt
            </label>
            <textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., Explain quantum computing in simple terms..."
              className="w-full h-32 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading || !prompt.trim()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Generating..." : "Generate"}
          </button>
        </form>

        {result && (
          <div className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-800">
              <h2 className="text-lg font-semibold mb-3">Result</h2>
              <div className="prose dark:prose-invert max-w-none">
                <p className="whitespace-pre-wrap">{result}</p>
              </div>
            </div>

            {usage && (
              <div className="bg-blue-50 dark:bg-blue-950/30 rounded-lg p-4 border border-blue-200 dark:border-blue-900">
                <h3 className="text-sm font-semibold mb-2">Token Usage</h3>
                <div className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <p>Prompt tokens: {usage.promptTokens}</p>
                  <p>Completion tokens: {usage.completionTokens}</p>
                  <p>Total tokens: {usage.totalTokens}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
