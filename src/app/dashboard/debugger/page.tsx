"use client";

import { Bug, Terminal as TerminalIcon, Play, Square, Send } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function DebuggerPage() {
    const [running, setRunning] = useState(false);
    const [output, setOutput] = useState<string[]>([]);
    const [input, setInput] = useState("");
    const [starting, setStarting] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, [output]);

    const colorize = (line: string) => {
        if (line.startsWith(">")) return "text-cyan-400";
        if (line.includes("✅")) return "text-emerald-400";
        if (line.includes("❌")) return "text-red-400";
        if (line.includes("🔧")) return "text-orange-400";
        if (line.includes("🤖")) return "text-blue-400";
        if (line.includes("👤")) return "text-gray-300";
        if (line.includes("debug>")) return "text-yellow-400";
        return "text-gray-400";
    };

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold flex items-center gap-2 text-white">
                        <Bug className="text-orange-500" /> Agent Debugger
                    </h2>
                    <p className="text-gray-400 mt-1">Interactive embedded terminal — send queries to the LangGraph agent and inspect reasoning steps live.</p>
                </div>
                <div className="flex items-center gap-2">
                    {!running ? (
                        <button
                            disabled={starting}
                            onClick={() => { setStarting(true); setOutput(["Agent debugger requires local backend connection.", "This feature works when the backend is running locally."]); setTimeout(() => { setStarting(false); }, 1000); }}
                            className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-5 py-2 rounded-lg flex items-center gap-2 disabled:opacity-50 transition"
                        >
                            {starting ? <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" /> : <Play size={16} />}
                            {starting ? "Starting..." : "Launch"}
                        </button>
                    ) : (
                        <button
                            onClick={() => setRunning(false)}
                            className="bg-red-600 hover:bg-red-500 text-white font-semibold px-5 py-2 rounded-lg flex items-center gap-2 transition"
                        >
                            <Square size={16} /> Stop
                        </button>
                    )}
                </div>
            </div>

            <div className="bg-gray-950 border border-gray-800 rounded-xl overflow-hidden flex flex-col" style={{ height: "520px" }}>
                <div className="bg-black px-4 py-2.5 border-b border-gray-800 flex items-center gap-3 shrink-0">
                    <div className="flex gap-1.5">
                        <span className={`h-3 w-3 rounded-full ${running ? "bg-emerald-500" : "bg-gray-700"}`} />
                        <span className={`h-3 w-3 rounded-full ${running ? "bg-yellow-500" : "bg-gray-700"}`} />
                        <span className={`h-3 w-3 rounded-full ${running ? "bg-red-500" : "bg-gray-700"}`} />
                    </div>
                    <span className="text-xs text-gray-500 font-mono ml-2">
                        {running ? "debug_interactive.py — RUNNING" : "agent-debugger — idle"}
                    </span>
                </div>

                <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 font-mono text-sm leading-relaxed">
                    {output.length === 0 && !running ? (
                        <div className="text-gray-600 italic">
                            Click &quot;Launch&quot; to start the interactive agent debugger.<br />
                            You will be able to type queries and see the agent&apos;s reasoning in real-time.
                        </div>
                    ) : (
                        output.map((line, i) => (
                            <span key={i} className={colorize(line)}>{line}<br /></span>
                        ))
                    )}
                </div>

                <div className="border-t border-gray-800 px-4 py-3 bg-black flex items-center gap-3 shrink-0">
                    <span className="text-yellow-500 font-mono text-sm select-none">debug&gt;</span>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        disabled={!running}
                        placeholder={running ? "Type a query for the agent..." : "Start the debugger first"}
                        className="flex-1 bg-transparent border-none outline-none text-gray-200 font-mono text-sm placeholder:text-gray-600 disabled:opacity-40"
                    />
                    <button disabled={!running || !input.trim()} className="text-gray-500 hover:text-white disabled:opacity-30 transition p-1">
                        <Send size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
}
