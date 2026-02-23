import { Terminal } from "lucide-react";

export function LiveTerminalPanel({
    logs = [],
    onClearLogs
}: {
    logs: any[],
    onClearLogs: () => void
}) {
    return (
        <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="rounded-xl border border-[#1F2937] overflow-hidden flex flex-col h-[500px] shadow-lg" style={{ background: "rgba(17, 24, 39, 0.75)", backdropFilter: "blur(12px)" }}>

                <div className="bg-[#1A2333] px-4 py-3 border-b border-[#1F2937] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Terminal className="text-gray-400 w-5 h-5" />
                        <h3 className="font-medium text-sm text-gray-200">Live API Terminal</h3>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={onClearLogs}
                            className="text-xs text-gray-500 hover:text-white transition-colors"
                        >Clear</button>
                        <div className="flex items-center gap-2 px-2 py-1 bg-[#00DC82]/10 rounded border border-[#00DC82]/20">
                            <span className="w-2 h-2 rounded-full bg-[#00DC82] animate-pulse"></span>
                            <span className="text-[10px] font-bold text-[#00DC82] tracking-wide">LISTENING</span>
                        </div>
                    </div>
                </div>

                <div className="flex-1 bg-[#090C13] p-4 font-mono text-xs md:text-sm text-gray-300 overflow-y-auto custom-scrollbar relative">
                    <div className="space-y-2">
                        {logs.length === 0 ? (
                            <div className="text-gray-500 italic mb-4">{"// Awaiting incoming API connections..."}</div>
                        ) : (
                            logs.map((log, i) => (
                                <div key={i} className="flex flex-col gap-1 border-b border-gray-800/50 pb-2 mb-2">
                                    <div className="flex gap-2 items-center flex-wrap">
                                        <span className="text-gray-600 select-none">{(log.timestamp || "").substring(11, 19)}</span>
                                        {log.status === "success" || log.status === 200 ? (
                                            <span className="text-[#00DC82]">200 OK</span>
                                        ) : (
                                            <span className="text-red-400">ERROR</span>
                                        )}
                                        <span className="text-purple-400">POST {log.query || "?"}</span>
                                        <span className="text-blue-400 select-none">[{log.user || "anon"}]</span>

                                        {log.latency && (
                                            <span className="text-yellow-500 ml-auto">{log.latency.toFixed(2)}s</span>
                                        )}
                                    </div>

                                    <div className="flex gap-4 pl-[72px] text-xs text-gray-500 flex-wrap">
                                        {log.tokens !== undefined && (
                                            <span>Tokens: <span className="text-gray-300">{log.tokens.toLocaleString()}</span></span>
                                        )}
                                        {log.tools_names && log.tools_names.length > 0 && (
                                            <span>
                                                Tools: <span className="text-gray-300">
                                                    {Object.entries(
                                                        log.tools_names.reduce((acc: Record<string, number>, curr: string) => {
                                                            acc[curr] = (acc[curr] || 0) + 1;
                                                            return acc;
                                                        }, {})
                                                    ).map(([name, count]: [string, any]) => count > 1 ? `${name} [${count}]` : name).join(", ")}
                                                </span>
                                            </span>
                                        )}
                                        {log.doc_consulted && (
                                            <span>Doc: <span className="text-indigo-300">{log.doc_consulted}</span></span>
                                        )}
                                        {log.llm_grade !== undefined && (
                                            <span>Grade: <span className={log.llm_grade >= 8 ? "text-green-400" : log.llm_grade >= 6 ? "text-yellow-400" : "text-red-400"}>{log.llm_grade}/10</span></span>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                        <div className="flex gap-2 mt-4">
                            <span className="text-[#00DC82]"> {'>'} </span>
                            <span className="w-2 h-5 bg-[#00DC82] block animate-pulse"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
