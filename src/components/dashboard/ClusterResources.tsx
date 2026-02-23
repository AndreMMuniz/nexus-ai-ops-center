import { MoreVertical, Activity } from "lucide-react";

export function ActiveEndpoints({
    topEndpoints = []
}: {
    topEndpoints: { endpoint: string; count: number }[]
}) {
    // If no endpoints are passed yet, just show a loading/empty state gracefully
    return (
        <div className="border border-[#1F2937] rounded-xl p-6" style={{ background: "rgba(17, 24, 39, 0.75)", backdropFilter: "blur(12px)" }}>
            <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-semibold text-gray-200 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-[#3B82F6]" />
                    Top Active Endpoints
                </h4>
                <a className="text-xs text-[#00DC82] hover:underline cursor-pointer">Live</a>
            </div>

            <div className="space-y-3">
                {topEndpoints.length === 0 ? (
                    <div className="text-xs text-gray-500 italic">No endpoint data captured yet...</div>
                ) : (
                    topEndpoints.slice(0, 4).map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between text-sm py-2 border-b border-gray-700/20 last:border-0">
                            <div className="flex items-center gap-3">
                                <span className="w-2 h-2 rounded-full bg-[#3B82F6]"></span>
                                <span className="text-gray-300 truncate max-w-[150px]">{item.endpoint}</span>
                            </div>
                            <span className="text-xs text-gray-500 bg-gray-800 px-2 py-0.5 rounded-full border border-gray-700">{item.count} reqs</span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export function ClusterResources({
    cpu = 0,
    memory = 0,
    storage = 0
}) {
    return (
        <div className="border border-[#1F2937] rounded-xl p-6" style={{ background: "rgba(17, 24, 39, 0.75)", backdropFilter: "blur(12px)" }}>
            <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-semibold text-gray-200">Cluster Resources</h4>
                <MoreVertical className="text-gray-500 w-4 h-4 cursor-pointer" />
            </div>

            <div className="space-y-4">
                <div>
                    <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-400">CPU Usage</span>
                        <span className="text-white">{cpu}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-1.5">
                        <div className="bg-[#3B82F6] h-1.5 rounded-full transition-all duration-1000" style={{ width: `${Math.min(100, cpu)}%` }}></div>
                    </div>
                </div>

                <div>
                    <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-400">Memory</span>
                        <span className="text-white">{memory}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-1.5">
                        <div className="bg-purple-500 h-1.5 rounded-full transition-all duration-1000" style={{ width: `${Math.min(100, memory)}%` }}></div>
                    </div>
                </div>

                <div>
                    <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-400">Storage</span>
                        <span className="text-white">{storage}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-1.5">
                        <div className="bg-[#00DC82] h-1.5 rounded-full transition-all duration-1000" style={{ width: `${Math.min(100, storage)}%` }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
