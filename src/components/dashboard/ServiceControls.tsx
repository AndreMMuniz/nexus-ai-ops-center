import { Play, MoreHorizontal, Database, CloudOff, Cloud } from "lucide-react";

export function ServiceControls({
    backendStatus = "offline"
}: {
    backendStatus: string
}) {
    const isOnline = backendStatus === "online";

    return (
        <div className="flex flex-col gap-6">
            <div className="rounded-xl border border-[#1F2937] p-1 shadow-lg h-full flex flex-col" style={{ background: "rgba(17, 24, 39, 0.75)", backdropFilter: "blur(12px)" }}>
                <div className="p-4 border-b border-[#1F2937] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Play className="text-[#3B82F6] w-5 h-5" />
                        <h3 className="font-semibold text-white">Service Controls</h3>
                    </div>
                    <button className="p-1 hover:bg-white/10 rounded transition">
                        <MoreHorizontal className="text-gray-500 w-4 h-4" />
                    </button>
                </div>

                <div className="p-4 space-y-4 flex-1">
                    {/* Postgres DB - Hardcoded or fetched if there's a specific route */}
                    <div className="bg-black/40 border border-emerald-900/30 rounded-lg p-4 relative overflow-hidden group hover:border-[#00DC82]/50 transition-colors">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#00DC82]"></div>
                        <div className="flex justify-between items-center mb-2 relative z-10">
                            <div className="flex items-center gap-3">
                                <div className="p-1.5 rounded bg-[#00DC82]/10 text-[#00DC82]">
                                    <Database className="w-5 h-5" />
                                </div>
                                <span className="font-medium text-sm text-gray-200">Postgres DB</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-500 relative z-10">
                            <span>Uptime: Active</span>
                            <span className="flex items-center gap-1 text-[#00DC82]">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#00DC82]"></span> Healthy
                            </span>
                        </div>
                        <div className="absolute bottom-0 right-0 left-0 h-8 opacity-10">
                            <svg className="w-full h-full text-[#00DC82] fill-current" preserveAspectRatio="none" viewBox="0 0 100 20">
                                <path d="M0,15 Q10,5 20,10 T40,12 T60,5 T80,8 T100,15 V20 H0 Z"></path>
                            </svg>
                        </div>
                    </div>

                    {/* FastAPI Backend */}
                    <div className={`bg-black/40 border ${isOnline ? 'border-emerald-900/30' : 'border-[#1F2937]'} rounded-lg p-4 relative overflow-hidden group transition-colors`}>
                        <div className={`absolute left-0 top-0 bottom-0 w-1 ${isOnline ? 'bg-[#00DC82]' : 'bg-gray-600'}`}></div>
                        <div className="flex justify-between items-center mb-2 relative z-10">
                            <div className="flex items-center gap-3">
                                <div className={`p-1.5 rounded ${isOnline ? 'bg-[#00DC82]/10 text-[#00DC82]' : 'bg-gray-700/50 text-gray-300'}`}>
                                    {isOnline ? <Cloud className="w-5 h-5" /> : <CloudOff className="w-5 h-5" />}
                                </div>
                                <span className="font-medium text-sm text-gray-200">FastAPI Backend</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-500 relative z-10">
                            <span>Status: {isOnline ? 'Running' : 'Stopped'}</span>
                            <span className={`flex items-center gap-1 ${isOnline ? 'text-[#00DC82]' : 'text-gray-500'}`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${isOnline ? 'bg-[#00DC82]' : 'bg-gray-500'}`}></span> {isOnline ? 'Online' : 'Offline'}
                            </span>
                        </div>
                        {isOnline && (
                            <div className="absolute bottom-0 right-0 left-0 h-8 opacity-10">
                                <svg className="w-full h-full text-[#00DC82] fill-current" preserveAspectRatio="none" viewBox="0 0 100 20">
                                    <path d="M0,15 Q10,5 20,10 T40,12 T60,5 T80,8 T100,15 V20 H0 Z"></path>
                                </svg>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
