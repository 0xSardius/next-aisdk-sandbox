"use client";

import { experimental_useObject as useObject } from "@ai-sdk/react";
import { pokemonSchema } from "./schema";
import { useState } from "react";

export default function StructuredArrayPage() {
    const [ type, setType ] = useState("");
    const { object, submit, isLoading, error, stop } = useObject({
        api: "/api/structured-array",
        schema: pokemonSchema,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        submit({ type });
        setType("");
    };

return (
    <div className="flex flex-col w-full max-w-2xl pt-12 pb-24 mx-auto">
        {error && <div className="text-red-500 mb-4 px-4">Error: {error.message}</div> }
    </div>
)