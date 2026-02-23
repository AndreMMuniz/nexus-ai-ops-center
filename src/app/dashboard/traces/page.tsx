"use client";

import { Activity, Trash2 } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { fetchBackendLogs } from "../actions";

export default function TracesPage() {
    const [lines, setLines] = useState<string[]>([]);
    const [fileSize, setFileSize] = useState(0);
    const [connected, setConnected] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const init = async () => {
            const data = await fetchBackendLogs(true);
            setLines(data.lines || []);
            setFileSize(data.size || 0);
            setConnected(true);
        };
        init();
    }, []);

    useEffect(() => {
        if (!connected) return;
        const interval = setInterval(async () => {
            const data = await fetchBackendLogs(false, fileSize);
            if (data.lines && data.lines.length > 0) {
                setLines((prev) => [...prev, ...data.lines].slice(-200));
            }
            if (data.size) setFileSize(data.size);
        }, 2000);
        return () => clearInterval(interval);
    }, [connected, fileSize]);

    useEffect(() => {
        if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, [lines]);

    const colorize = (line: string) => {
        if (line.includes("ERROR") || line.includes("error") || line.includes("Traceback")) return "text-red-400";
        if (line.includes("WARNING") || line.includes("UserWarning")) return "text-yellow-400";
        if (line.includes("INFO") && line.includes("POST /chat")) return "text-cyan-400";
        if (line.includes("INFO") && (line.includes("GET") || line.includes("POST"))) return "text-blue-400";
        if (line.includes("search") || line.includes("Searching")) return "text-orange-400";
        if (line.includes("startup") || line.includes("Application")) return "text-emerald-400";
        if (line.includes("Database") || line.includes("migration")) return "text-purple-400";
        return "text-gray-400";
    };

    return (
        <div className="max-w-6xl mx-auto space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold flex items-center gap-2 text-white">
                        <Activity className="text-blue-500" /> Backend Live Terminal
                    </h2>
                    <p className="text-gray-400 mt-1">Real-time log stream from the FastAPI backend.</p>
                </div>
                <button onClick={() => setLines([])} className="text-gray-600 hover:text-gray-400 p-2 transition" title="Clear">
                    <Trash2 size={18} />
                </button>
            </div>

            <div className="bg-gray-950 border border-gray-800 rounded-xl overflow-hidden flex flex-col" style={{ height: "600px" }}>
                <div className="bg-black px-4 py-2.5 border-b border-gray-800 flex items-center gap-3 shrink-0">
                    <div className="flex gap-1.5">
                        <span className={`h-3 w-3 rounded-full ${connected ? "bg-emerald-500" : "bg-gray-700"}`} />
                        <span className={`h-3 w-3 rounded-full ${connected ? "bg-yellow-500" : "bg-gray-700"}`} />
                        <span className={`h-3 w-3 rounded-full ${connected ? "bg-red-500" : "bg-gray-700"}`} />
                    </div>
                    <span className="text-xs text-gray-500 font-mono ml-2">uvicorn — backend_run.log</span>
                    {connected && (
                        <span className="ml-auto text-xs text-emerald-500 flex items-center gap-1.5">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                            </span>
                            STREAMING
                        </span>
                    )}
                </div>
                <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 font-mono text-xs leading-relaxed space-y-0.5">
                    {lines.length === 0 ? (
                        <div className="text-gray-600 italic">Waiting for backend logs...</div>
                    ) : (
                        lines.map((line, i) => (
                            <div key={i} className={colorize(line)}>{line}</div>
                        ))
                    )}
                </div>
                <div className="border-t border-gray-800 px-4 py-2 bg-black flex items-center justify-between shrink-0">
                    <span className="text-xs text-gray-600 font-mono">{lines.length} lines</span>
                    <span className="text-xs text-gray-600 font-mono">{(fileSize / 1024).toFixed(1)} KB read</span>
                </div>
            </div>
        </div>
    );
}
