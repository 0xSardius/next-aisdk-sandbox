"use client";

import { useState } from "react";

export default function CompletionPage() {
    const [prompt, setPrompt] = useState("");
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!prompt.trim()) return;

        setLoading(true);
        setResult("");

        try {
            const response = await fetch("/api/completion", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt }),
            });

            const data = await response.json();
            if (response.ok) {
                setResult(data.text);
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
        <div className="min-h-screen bg-[#f5e6d3] p-8">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="bg-[#fff9e6] border-4 border-black p-6 mb-6" style={{ boxShadow: "8px 8px 0px #000" }}>
                    <h1 className="text-4xl font-black uppercase mb-2 text-black">AI Completion</h1>
                    <p className="text-lg font-bold text-gray-800">Neobrutalist Testing Playground</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="mb-6">
                    <div className="bg-[#a8dadc] border-4 border-black p-6" style={{ boxShadow: "8px 8px 0px #000" }}>
                        <label htmlFor="prompt" className="block text-xl font-black uppercase mb-3 text-black">
                            Your Prompt
                        </label>
                        <input
                            id="prompt"
                            type="text"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="How can I help you today?"
                            className="w-full px-4 py-3 text-lg font-bold border-4 border-black mb-4 focus:outline-none focus:ring-0 bg-white text-black placeholder:text-gray-500"
                            disabled={loading}
                            style={{ boxShadow: "4px 4px 0px #000" }}
                        />
                        <button
                            type="submit"
                            disabled={loading || !prompt.trim()}
                            className="w-full bg-[#e63946] text-white font-black text-xl uppercase py-4 border-4 border-black hover:translate-x-1 hover:translate-y-1 transition-transform disabled:bg-gray-400 disabled:cursor-not-allowed"
                            style={{ boxShadow: "6px 6px 0px #000" }}
                        >
                            {loading ? "GENERATING..." : "GENERATE"}
                        </button>
                    </div>
                </form>

                {/* Result */}
                {result && (
                    <div className="bg-white border-4 border-black p-6" style={{ boxShadow: "8px 8px 0px #000" }}>
                        <h2 className="text-2xl font-black uppercase mb-4 border-b-4 border-black pb-2 text-black">
                            Result
                        </h2>
                        <p className="text-lg leading-relaxed font-medium whitespace-pre-wrap text-gray-900">
                            {result}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
