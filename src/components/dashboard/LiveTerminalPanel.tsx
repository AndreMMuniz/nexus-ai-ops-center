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
                                <div key={i} className="flex gap-2">
                                    <span className="text-gray-600 select-none">{(log.timestamp || "").substring(11, 19)}</span>
                                    {log.status === "success" ? (
                                        <span className="text-[#00DC82]">200 OK</span>
                                    ) : (
                                        <span className="text-red-400">ERROR</span>
                                    )}
                                    <span className="text-purple-400">POST {log.query || "?"}</span>
                                    <span className="text-gray-500">- Tools: {log.tools_used ?? 0} - User: <span className="text-blue-400">{log.user || "anon"}</span></span>
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
