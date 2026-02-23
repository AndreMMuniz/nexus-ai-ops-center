import { Terminal } from "lucide-react";

export function LiveTerminalPanel() {
    return (
        <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="rounded-xl border border-[#1F2937] overflow-hidden flex flex-col h-[500px] shadow-lg" style={{ background: "rgba(17, 24, 39, 0.75)", backdropFilter: "blur(12px)" }}>

                <div className="bg-[#1A2333] px-4 py-3 border-b border-[#1F2937] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Terminal className="text-gray-400 w-5 h-5" />
                        <h3 className="font-medium text-sm text-gray-200">Live API Terminal</h3>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="text-xs text-gray-500 hover:text-white transition-colors">Clear</button>
                        <div className="flex items-center gap-2 px-2 py-1 bg-[#00DC82]/10 rounded border border-[#00DC82]/20">
                            <span className="w-2 h-2 rounded-full bg-[#00DC82] animate-pulse"></span>
                            <span className="text-[10px] font-bold text-[#00DC82] tracking-wide">LISTENING</span>
                        </div>
                    </div>
                </div>

                <div className="flex-1 bg-[#090C13] p-4 font-mono text-xs md:text-sm text-gray-300 overflow-y-auto custom-scrollbar relative">
                    <div className="space-y-2">
                        <div className="text-gray-500 italic mb-4">// Awaiting incoming API connections...</div>

                        <div className="flex gap-2 opacity-80">
                            <span className="text-gray-600 select-none">14:02:23</span>
                            <span className="text-blue-400">INFO</span>
                            <span>Initialized agent wrapper <span className="text-yellow-300">"CustomerSupport_v2"</span></span>
                        </div>

                        <div className="flex gap-2">
                            <span className="text-gray-600 select-none">14:02:25</span>
                            <span className="text-[#00DC82]">SUCCESS</span>
                            <span>Database connection established (Postgres:5432)</span>
                        </div>

                        <div className="flex gap-2 opacity-60">
                            <span className="text-gray-600 select-none">14:02:45</span>
                            <span className="text-gray-400">DEBUG</span>
                            <span>Vector store sync starting...</span>
                        </div>

                        <div className="flex gap-2">
                            <span className="text-gray-600 select-none">14:03:01</span>
                            <span className="text-purple-400">POST</span>
                            <span>/v1/chat/completions <span className="text-gray-500">- 200 OK - 342ms</span></span>
                        </div>

                        <div className="pl-20 text-gray-500 text-xs font-mono">
                            {'{ "model": "gpt-4-turbo", "tokens": 128, "status": "completed" }'}
                        </div>

                        <div className="flex gap-2 mt-4">
                            <span className="text-gray-600 select-none">14:03:12</span>
                            <span className="text-blue-400">INFO</span>
                            <span>Recalibrating context window for session <span className="text-white underline decoration-dashed">#88219</span></span>
                        </div>

                        <div className="flex gap-2 mt-1">
                            <span className="text-gray-600 select-none">14:03:15</span>
                            <span className="text-[#00DC82]"> {'>'} </span>
                            <span className="w-2 h-5 bg-[#00DC82] block animate-pulse"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
