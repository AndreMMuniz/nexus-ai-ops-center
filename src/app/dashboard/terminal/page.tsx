"use client";

import { useEffect, useRef, useState } from "react";
import { Copy, Check } from "lucide-react";
import { fetchOpsLogs } from "../actions";

export default function TerminalPage() {
    const [logs, setLogs] = useState<any[]>([]);
    const bottomRef = useRef<HTMLDivElement>(null);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        async function load() {
            const data = await fetchOpsLogs();
            setLogs(data);
        }
        load();
        const interval = setInterval(load, 5000); // Poll every 5 seconds
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        // Auto scroll to bottom
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [logs]);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(logs.map(l => JSON.stringify(l)).join('\n'));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex flex-col h-[calc(100vh-4rem)] space-y-4">
            <header className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Live Terminal</h1>
                    <p className="text-sm text-gray-500">Real-time output from the Nexus backend.</p>
                </div>
                <div className="flex items-center space-x-2">
                    <button
                        onClick={copyToClipboard}
                        className="flex items-center space-x-2 px-3 py-1.5 bg-white border border-gray-200 rounded-md text-sm shadow-sm hover:bg-gray-50 transition-colors"
                    >
                        {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-gray-500" />}
                        <span>{copied ? 'Copied' : 'Copy'}</span>
                    </button>
                </div>
            </header>

            {/* Terminal Window */}
            <div className="flex-1 bg-gray-900 rounded-xl shadow-lg border border-gray-800 overflow-hidden flex flex-col font-mono text-sm">
                <div className="flex items-center space-x-2 px-4 py-2 border-b border-gray-800 bg-gray-950">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="ml-2 text-gray-500 text-xs">nexus-ops-terminal</span>
                </div>

                <div className="flex-1 p-4 overflow-y-auto w-full">
                    {logs.length === 0 ? (
                        <div className="text-gray-500 italic">Waiting for connection to backend... // Polling active</div>
                    ) : (
                        logs.map((log, i) => (
                            <div key={i} className={`mb-1 break-words w-full ${log.status === 'error' ? 'text-red-400' : 'text-gray-300'}`}>
                                <span className="text-gray-500 mr-2 md:inline hidden">[{new Date(log.timestamp).toLocaleTimeString()}]</span>
                                <span className="text-blue-400">[{log.ip}]</span> {log.user}: {log.query}
                                {log.status === 'error' && <span className="ml-2">({log.error})</span>}
                            </div>
                        ))
                    )}
                    <div ref={bottomRef} />
                </div>
            </div>
        </div>
    );
}
