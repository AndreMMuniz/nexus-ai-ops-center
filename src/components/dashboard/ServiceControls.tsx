import { Play, MoreHorizontal, Database, CloudOff, Cloud, AlertTriangle } from "lucide-react";

export function ServiceControls({
    statusData = {}
}: {
    statusData: any
}) {
    const isOnline = statusData?.status === "online" || statusData?.status === "degraded";
    const isFullyOnline = statusData?.status === "online";
    const debugUrl = statusData?.debug_url || "Unknown";
    const errorMsg = statusData?.error || null;

    // Postgres DB status from the real backend health check
    const dbStatus = statusData?.db_status || "unknown";
    const dbHealthy = dbStatus === "healthy";
    const dbError = statusData?.db_error || null;

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
                    {/* Postgres DB — Real-time status */}
                    <div className={`bg-black/40 border ${dbHealthy ? 'border-emerald-900/30' : 'border-[#1F2937]'} rounded-lg p-4 relative overflow-hidden group ${dbHealthy ? 'hover:border-[#00DC82]/50' : ''} transition-colors`}>
                        <div className={`absolute left-0 top-0 bottom-0 w-1 ${dbHealthy ? 'bg-[#00DC82]' : 'bg-red-500'}`}></div>
                        <div className="flex justify-between items-center mb-2 relative z-10">
                            <div className="flex items-center gap-3">
                                <div className={`p-1.5 rounded ${dbHealthy ? 'bg-[#00DC82]/10 text-[#00DC82]' : 'bg-red-500/10 text-red-400'}`}>
                                    {dbHealthy ? <Database className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
                                </div>
                                <span className="font-medium text-sm text-gray-200">Postgres DB</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-500 relative z-10">
                            <span>{dbHealthy ? 'Connected' : 'Disconnected'}</span>
                            <span className={`flex items-center gap-1 ${dbHealthy ? 'text-[#00DC82]' : 'text-red-400'}`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${dbHealthy ? 'bg-[#00DC82]' : 'bg-red-500 animate-pulse'}`}></span> {dbHealthy ? 'Healthy' : 'Unreachable'}
                            </span>
                        </div>
                        {!dbHealthy && dbError && (
                            <div className="text-[10px] text-red-400 relative z-10 truncate mt-1" title={dbError}>
                                {dbError}
                            </div>
                        )}
                        {dbHealthy && (
                            <div className="absolute bottom-0 right-0 left-0 h-8 opacity-10">
                                <svg className="w-full h-full text-[#00DC82] fill-current" preserveAspectRatio="none" viewBox="0 0 100 20">
                                    <path d="M0,15 Q10,5 20,10 T40,12 T60,5 T80,8 T100,15 V20 H0 Z"></path>
                                </svg>
                            </div>
                        )}
                    </div>

                    {/* FastAPI Backend */}
                    <div className={`bg-black/40 border ${isOnline ? 'border-emerald-900/30' : 'border-[#1F2937]'} rounded-lg p-4 relative overflow-hidden group transition-colors`}>
                        <div className={`absolute left-0 top-0 bottom-0 w-1 ${isOnline ? (isFullyOnline ? 'bg-[#00DC82]' : 'bg-yellow-500') : 'bg-gray-600'}`}></div>
                        <div className="flex justify-between items-center mb-2 relative z-10">
                            <div className="flex items-center gap-3">
                                <div className={`p-1.5 rounded ${isOnline ? (isFullyOnline ? 'bg-[#00DC82]/10 text-[#00DC82]' : 'bg-yellow-500/10 text-yellow-400') : 'bg-gray-700/50 text-gray-300'}`}>
                                    {isOnline ? <Cloud className="w-5 h-5" /> : <CloudOff className="w-5 h-5" />}
                                </div>
                                <span className="font-medium text-sm text-gray-200">FastAPI Backend</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between text-[10px] text-gray-500 relative z-10 mb-1">
                            <span className="truncate max-w-[120px]" title={debugUrl}>{debugUrl}</span>
                            <span className={`flex items-center gap-1 ${isFullyOnline ? 'text-[#00DC82]' : isOnline ? 'text-yellow-400' : 'text-gray-500'}`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${isFullyOnline ? 'bg-[#00DC82]' : isOnline ? 'bg-yellow-500 animate-pulse' : 'bg-gray-500'}`}></span> {isFullyOnline ? 'Online' : isOnline ? 'Degraded' : 'Offline'}
                            </span>
                        </div>
                        {!isOnline && errorMsg && (
                            <div className="text-[10px] text-red-400 relative z-10 truncate mt-1" title={errorMsg}>
                                {errorMsg}
                            </div>
                        )}
                        {isOnline && (
                            <div className="absolute bottom-0 right-0 left-0 h-8 opacity-10">
                                <svg className={`w-full h-full ${isFullyOnline ? 'text-[#00DC82]' : 'text-yellow-500'} fill-current`} preserveAspectRatio="none" viewBox="0 0 100 20">
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
