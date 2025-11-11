"use client";

import { useState } from "react";

export default function StructuredDataPage() {
  const [dishName, setDishName] = useState("");

  return (
    <div className="flex flex-col w-full max-w-2xl pt-12 pb-24 mx-auto">
      <form
        action=""
        className="fixed bottom-0 w-full max-w-2xl mx-auto left-0 right-0 p-4 bg-zinc-500"
      >
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter dish name"
            className="flex-1 dark:bg-zinc-800 p-2 border border-zinc-300 dark:border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={dishName}
            onChange={(e) => setDishName(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Generate Recipe
          </button>
        </div>
      </form>
    </div>
  );
}
