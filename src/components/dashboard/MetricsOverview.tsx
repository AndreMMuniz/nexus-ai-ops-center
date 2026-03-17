import { Bot, Zap, CheckCircle, Database } from "lucide-react";

export function MetricsOverview({
    totalRequests = 0,
    apiLatency = 0,
    successRate = 0,
    tokensUsage = "0"
}: {
    totalRequests?: number;
    apiLatency?: number;
    successRate?: number;
    tokensUsage?: string;
}) {
    // Basic formatting helpers
    const formattedLatency = Math.round(apiLatency * 1000); // Usually these logs come in seconds, converting to ms
    const latencyStatus = formattedLatency < 100 ? "Optimal Performance" : (formattedLatency < 500 ? "Acceptable Latency" : "High Latency");
    const successStatus = successRate > 95 ? "Stable" : (successRate > 80 ? "Degraded" : "Critical");

    return (
        <section className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-4 shadow-sm hover:border-[#00DC82]/30 transition-colors group">
                <div className="flex items-start justify-between">
                    <div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Total Requests (24h)</p>
                        <h3 className="text-2xl font-bold text-white group-hover:text-[#00DC82] transition-colors">{totalRequests.toLocaleString()}</h3>
                    </div>
                    <div className="p-2 bg-[#00DC82]/10 rounded-lg text-[#00DC82]">
                        <ActivityIcon className="w-5 h-5" />
                    </div>
                </div>
                <div className="mt-3 flex items-center text-xs text-[#00DC82] font-medium">
                    <span className="w-3 h-3 mr-1 flex items-center justify-center">↑</span>
                    API Traffic
                </div>
            </div>

            <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-4 shadow-sm hover:border-[#3B82F6]/30 transition-colors group">
                <div className="flex items-start justify-between">
                    <div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">API Latency</p>
                        <h3 className="text-2xl font-bold text-white group-hover:text-[#3B82F6] transition-colors">{formattedLatency}ms</h3>
                    </div>
                    <div className="p-2 bg-[#3B82F6]/10 rounded-lg text-[#3B82F6]">
                        <Zap className="w-5 h-5" />
                    </div>
                </div>
                <div className="mt-3 flex items-center text-xs text-[#3B82F6] font-medium">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    {latencyStatus}
                </div>
            </div>

            <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-4 shadow-sm hover:border-purple-500/30 transition-colors group">
                <div className="flex items-start justify-between">
                    <div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Success Rate</p>
                        <h3 className="text-2xl font-bold text-white group-hover:text-purple-400 transition-colors">{successRate.toFixed(1)}%</h3>
                    </div>
                    <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
                        <CheckCircle className="w-5 h-5" />
                    </div>
                </div>
                <div className="mt-3 flex items-center text-xs text-gray-400 font-medium">
                    <span className="w-3 h-3 mr-1 flex items-center justify-center">-</span>
                    {successStatus}
                </div>
            </div>

            <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-4 shadow-sm hover:border-orange-500/30 transition-colors group">
                <div className="flex items-start justify-between">
                    <div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Tokens Usage</p>
                        <h3 className="text-2xl font-bold text-white group-hover:text-orange-400 transition-colors">{tokensUsage}</h3>
                    </div>
                    <div className="p-2 bg-orange-500/10 rounded-lg text-orange-400">
                        <Database className="w-5 h-5" />
                    </div>
                </div>
                <div className="mt-3 flex items-center text-xs text-orange-400 font-medium">
                    <AlertTriangleIcon className="w-3 h-3 mr-1" />
                    Active billing cycle
                </div>
            </div>
        </section>
    );
}

function ActivityIcon(props: any) {
    return (
        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" {...props}>
            <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
            <polyline points="16 7 22 7 22 13" />
        </svg>
    )
}

function AlertTriangleIcon(props: any) {
    return (
        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" {...props}>
            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
            <path d="M12 9v4" />
            <path d="M12 17h.01" />
        </svg>
    )
}
