"use client";

import { Bug, Terminal as TerminalIcon, Play, Square, Send, Loader2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { startTerminal, stopTerminal, sendTerminalInput, getTerminalOutput } from "../actions";

export default function DebuggerPage() {
    const [running, setRunning] = useState(false);
    const [output, setOutput] = useState<string[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Initial check and Polling
    useEffect(() => {
        let interval: NodeJS.Timeout;

        const poll = async () => {
            const data = await getTerminalOutput();
            setRunning(data.running);
            if (data.output && data.output.length > 0) {
                setOutput(data.output);
            }
        };

        poll(); // Initial check
        interval = setInterval(poll, 1500);

        return () => clearInterval(interval);
    }, []);

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [output]);

    const handleStart = async () => {
        setLoading(true);
        await startTerminal();
        setLoading(false);
    };

    const handleStop = async () => {
        setLoading(true);
        await stopTerminal();
        setLoading(false);
    };

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || !running) return;

        const text = input.trim();
        setInput("");
        await sendTerminalInput(text);
    };

    const colorize = (line: string) => {
        if (line.startsWith(">")) return "text-cyan-400";
        if (line.includes("✅")) return "text-emerald-400";
        if (line.includes("❌")) return "text-red-400";
        if (line.includes("🔧")) return "text-orange-400";
        if (line.includes("🤖")) return "text-blue-400";
        if (line.includes("👤")) return "text-gray-300";
        if (line.includes("debug>")) return "text-yellow-400";
        if (line.includes("[Process exited")) return "text-gray-500 italic";
        if (line.includes("[Process terminated")) return "text-red-500/70 italic";
        return "text-gray-400";
    };

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold flex items-center gap-2 text-white">
                        <Bug className="text-orange-500" /> Agent Debugger
                    </h2>
                    <p className="text-gray-400 mt-1">Interactive terminal — talk to the local LangGraph agent and watch its thought process line-by-line.</p>
                </div>
                <div className="flex items-center gap-2">
                    {!running ? (
                        <button
                            disabled={loading}
                            onClick={handleStart}
                            className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-5 py-2 rounded-lg flex items-center gap-2 disabled:opacity-50 transition"
                        >
                            {loading ? <Loader2 className="animate-spin" size={16} /> : <Play size={16} />}
                            {loading ? "Starting..." : "Launch Agent"}
                        </button>
                    ) : (
                        <button
                            disabled={loading}
                            onClick={handleStop}
                            className="bg-red-600 hover:bg-red-500 text-white font-semibold px-5 py-2 rounded-lg flex items-center gap-2 transition disabled:opacity-50"
                        >
                            {loading ? <Loader2 className="animate-spin" size={16} /> : <Square size={16} />}
                            Stop
                        </button>
                    )}
                </div>
            </div>

            <div className="bg-gray-950 border border-gray-800 rounded-xl overflow-hidden flex flex-col shadow-2xl shadow-black/50" style={{ height: "550px" }}>
                <div className="bg-black px-4 py-3 border-b border-gray-800 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="flex gap-1.5">
                            <span className={`h-3 w-3 rounded-full ${running ? "bg-emerald-500 animate-pulse" : "bg-gray-700"}`} />
                            <span className={`h-3 w-3 rounded-full ${running ? "bg-emerald-500/50" : "bg-gray-700"}`} />
                            <span className={`h-3 w-3 rounded-full ${running ? "bg-emerald-500/20" : "bg-gray-700"}`} />
                        </div>
                        <span className="text-xs text-gray-400 font-mono ml-2 flex items-center gap-2">
                            <TerminalIcon size={12} className="text-gray-600" />
                            {running ? "debug_interactive.py — ACTIVE" : "agent-debugger — idle"}
                        </span>
                    </div>
                </div>

                <div
                    ref={scrollRef}
                    className="flex-1 overflow-y-auto p-5 font-mono text-[13px] leading-relaxed scrollbar-thin scrollbar-thumb-gray-800 selection:bg-emerald-500/30"
                >
                    {output.length === 0 && !running ? (
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                            <div className="p-4 rounded-full bg-gray-900/50 border border-gray-800">
                                <TerminalIcon className="text-gray-700" size={32} />
                            </div>
                            <div className="text-gray-600 italic max-w-sm">
                                Terminal session is ready. Click &quot;Launch Agent&quot; to start the interactive debugger.<br />
                                You can then inspect every thought and tool call the agent makes.
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-0.5">
                            {output.map((line, i) => (
                                <div key={i} className={colorize(line)}>{line}</div>
                            ))}
                        </div>
                    )}
                </div>

                <form
                    onSubmit={handleSend}
                    className="border-t border-gray-800 px-4 py-4 bg-black flex items-center gap-3 shrink-0"
                >
                    <span className={`font-mono text-sm select-none transition-colors ${running ? "text-yellow-500" : "text-gray-700"}`}>
                        debug&gt;
                    </span>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        disabled={!running}
                        placeholder={running ? "Type a prompt for the agent..." : "Start the agent to debug interaction"}
                        className="flex-1 bg-transparent border-none outline-none text-gray-200 font-mono text-[13px] placeholder:text-gray-700 disabled:opacity-40"
                    />
                    <button
                        type="submit"
                        disabled={!running || !input.trim()}
                        className="text-emerald-500 hover:text-emerald-400 disabled:opacity-20 transition-all p-1.5 rounded-lg hover:bg-emerald-500/10"
                    >
                        <Send size={18} />
                    </button>
                </form>
            </div>
        </div>
    );
}
