"use client";

import {useCompletion} from "@ai-sdk/react"

export default function StreamPage() {

    const {input, handleInputChange, handleSubmit, completion, isLoading, error, setInput, stop} = useCompletion({
        api: "/api/stream",
    })
    return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
        {error && <div className="whitespace-pre-wrap">Error: {error.message}</div> }
        {isLoading && !completion && <div className="whitespace-pre-wrap">Loading...</div> }
       {completion && <div className="whitespace-pre-wrap">{completion}</div> }



       <form onSubmit={(e) => {e.preventDefault(); handleSubmit(e)}} className="fixed bottom-0 w-full max-w-md mx-auto left-0 right-0 p-4 bg-zinc-500">
        <div className="flex gap-2">
            <input type="text" placeholder="Ask anything..." className="flex-1 px-4 py-2 rounded-md border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-blue-500" value={input} onChange={handleInputChange} />
            {isLoading ? (
                <button type="button" className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600" onClick={stop}>Stop</button>
            ) : (
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" disabled={!input.trim()}>Send</button>
            )}
            </div>
       </form>
    </div>
    )
}