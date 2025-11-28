"use client";

import { useState } from "react";
import { experimental_useObject as useObject } from "@ai-sdk/react";
import { recipeSchema } from "@/app/api/structured-data/schema";

export default function StructuredDataPage() {
  const [dishName, setDishName] = useState("");
  const { submit, object } = useObject({
    api: "/api/structured-data",
    schema: recipeSchema,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submit({ dish: dishName });
    setDishName("");
  };

  return (
    <div className="flex flex-col w-full max-w-2xl pt-12 pb-24 mx-auto">
      {object?.recipe && (
        <div className="space-y-6 px-4">
          <h2 className="text-2xl font-bold">{object.recipe.name}</h2>
          {object?.recipe?.ingredients && (
            <div>
              <h3>Ingredients</h3>
              <div>
                {object?.recipe?.ingredients.map((ingredient, index) => (
                  <div key={index}>
                    <p>{ingredient?.name}</p>
                    <p>{ingredient?.amount}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {object?.recipe?.steps && (
            <div>
              <h3>Steps</h3>
              <ol>
                {object.recipe.steps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </div>
          )}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
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
