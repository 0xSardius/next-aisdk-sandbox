"use client";

import { experimental_useObject as useObject } from "@ai-sdk/react";
import { pokemonUISchema } from "./schema";
import { useState } from "react";
import { z } from "zod";

export default function StructuredArrayPage() {
  const [type, setType] = useState("");
  const { object, submit, isLoading, error, stop } = useObject({
    api: "/api/structured-array",
    schema: pokemonUISchema,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submit({ type });
    setType("");
  };

  return (
    <div className="flex flex-col w-full max-w-2xl pt-12 pb-24 mx-auto">
      {error && (
        <div className="text-red-500 mb-4 px-4">Error: {error.message}</div>
      )}
      <div className="space-y-8">
        {(object as z.infer<typeof pokemonUISchema> | undefined)?.map(
          (pokemon) => (
            <div
              key={pokemon?.name}
              className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-4"
            >
              <h2 className="text-xl font-bold">{pokemon?.name}</h2>
              {pokemon?.abilities?.map((ability) => (
                <p
                  key={ability}
                  className="bg-zinc-100 dark:bg-zinc-700 p-3 rounded-md"
                >
                  {ability}
                </p>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
}
