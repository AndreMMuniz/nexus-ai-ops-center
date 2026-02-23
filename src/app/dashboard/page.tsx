"use client";

import { Terminal, Database, Play, StopCircle, RefreshCw, ScrollText } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { fetchOpsLogs, fetchOpsStatus, clearLogs } from "./actions";

export default function DashboardPage() {
    const [status, setStatus] = useState({ status: "loading", agent_initialized: false });
    const [apiLogs, setApiLogs] = useState<any[]>([]);

    useEffect(() => {
        const fetchAll = async () => {
            const [s, l] = await Promise.all([fetchOpsStatus(), fetchOpsLogs()]);
            setStatus(s);
            setApiLogs(l);
        };
        fetchAll();
        const interval = setInterval(fetchAll, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {/* API Monitor Panel */}
            <section className="col-span-1 md:col-span-2 bg-gray-900 border border-gray-800 rounded-xl p-5 flex flex-col max-h-[600px]">
                <div className="flex items-center gap-2 mb-4 shrink-0">
                    <Terminal className="text-gray-400" size={20} />
                    <h2 className="text-xl font-semibold">Live API Terminal</h2>
                    <div className="ml-auto flex items-center gap-3">
                        <button
                            onClick={async () => { await clearLogs(); setApiLogs([]); }}
                            className="text-xs text-gray-600 hover:text-gray-400 transition"
                        >Clear</button>
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                        </span>
                        <span className="text-xs text-emerald-500 font-medium tracking-wider">LISTENING</span>
                    </div>
                </div>
                <div className="bg-black border border-gray-800 rounded-lg p-4 font-mono text-xs flex-1 overflow-y-auto w-full leading-relaxed">
                    {apiLogs.length === 0 ? (
                        <p className="text-gray-500 italic">// Awaiting incoming API connections...</p>
                    ) : (
                        apiLogs.map((log, i) => (
                            <div key={i} className="py-1 border-b border-gray-900 last:border-0 flex flex-wrap gap-x-2">
                                <span className="text-gray-600">[{(log.timestamp || "").substring(0, 19)}]</span>
                                <span>{log.status === "success" ? "✅" : "❌"}</span>
                                <span className="text-gray-500">IP: <span className="text-gray-300">{log.ip || "?"}</span></span>
                                <span className="text-gray-500">User: <span className="text-blue-400">{log.user || "anon"}</span></span>
                                <span className="text-gray-500">Latency: <span className="text-yellow-400">{log.latency || "?"}s</span></span>
                                <span className="text-gray-500">Tools: <span className="text-emerald-400">{log.tools_used ?? 0}</span></span>
                                <span className="text-gray-400 truncate max-w-[300px]">Q: {(log.query || "").substring(0, 60)}...</span>
                            </div>
                        ))
                    )}
                </div>
            </section>

            {/* Status Panel */}
            <section className="bg-gray-900 border border-gray-800 rounded-xl p-5 shrink-0 max-h-[300px]">
                <div className="flex items-center gap-2 mb-4">
                    <ScrollText className="text-blue-400" size={20} />
                    <h2 className="text-xl font-semibold">System Status</h2>
                </div>
                <div className="space-y-3">
                    <div className="w-full flex items-center justify-between border border-gray-700 px-4 py-3 rounded-lg bg-black">
                        <div className="flex items-center gap-3">
                            <Database className={status.status === "online" ? "text-emerald-400" : "text-gray-400"} size={18} />
                            <span className={status.status === "online" ? "text-emerald-100" : "text-gray-300"}>Backend API</span>
                        </div>
                        <span className={cn("h-3 w-3 rounded-full", status.status === "online" ? "bg-emerald-500" : "bg-red-500")} />
                    </div>
                    <div className="w-full flex items-center justify-between border border-gray-700 px-4 py-3 rounded-lg bg-black">
                        <div className="flex items-center gap-3">
                            <Play className={status.agent_initialized ? "text-emerald-400" : "text-gray-400"} size={18} />
                            <span className={status.agent_initialized ? "text-emerald-100" : "text-gray-300"}>Agent Graph</span>
                        </div>
                        <span className={cn("h-3 w-3 rounded-full", status.agent_initialized ? "bg-emerald-500" : "bg-red-500")} />
                    </div>
                </div>
            </section>
        </div>
    );
}
