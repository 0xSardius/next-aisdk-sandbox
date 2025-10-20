"use client";

import {useCompletion} from "@ai-sdk/react"

export default function StreamPage() {

    const {input, handleInputChange, handleSubmit} = useCompletion({
        api: "/api/stream",
    })
    return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
       {/* display area for streaming text */}



       <form onSubmit={handleSubmit} className="fixed bottom-0 w-full max-w-md mx-auto left-0 right-0 p-4 bg-zinc-500">
        <div className="flex gap-2">
            <input type="text" placeholder="Ask anything..." className="flex-1 px-4 py-2 rounded-md border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-blue-500" value={input} onChange={handleInputChange} />
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Send</button>
            
            
            
            </div>
       </form>
    </div>
    )
}