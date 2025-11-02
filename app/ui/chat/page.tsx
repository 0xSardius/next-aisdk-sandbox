"use client";

import { useState } from "react";
import { useChat } from "@ai-sdk/react";

export default function ChatPage() {
  const [input, setInput] = useState("");

  const { messages, sendMessage, status, error, stop } = useChat({
    api: "/api/chat",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage({ text: input });
    setInput("");
  };
  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {error && (
        <div className="whitespace-pre-wrap">Error: {error.message}</div>
      )}
      {messages.map((message) => (
        <div key={message.id} className="mb-4">
          <div>{message.role === "user" ? "You" : "AI"}</div>
          {message.parts.map((part, index) => {
            switch (part.type) {
              case "text":
                return (
                  <div key={`${message.id}-${index}-text`}>{part.text}</div>
                );
              default:
                return null;
            }
          })}
        </div>
      ))}

      {(status === "submitted" || status === "streaming") && (
        <div className="mb-4">
          <div className="flex items-center gap-2">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent"></div>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="fixed bottom-0 w-full max-w-md mx-auto left-0 right-0 p-4 bg-zinc-500"
      >
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Ask anything..."
            className="flex-1 px-4 py-2 rounded-md border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          {status === "submitted" || status === "streaming" ? (
            <button
              type="button"
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              onClick={stop}
            >
              Stop
            </button>
          ) : (
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              disabled={!input.trim()}
            >
              Send
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

