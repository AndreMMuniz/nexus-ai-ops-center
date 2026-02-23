import { MoreVertical } from "lucide-react";

export function RecentDeployments() {
    return (
        <div className="border border-[#1F2937] rounded-xl p-6" style={{ background: "rgba(17, 24, 39, 0.75)", backdropFilter: "blur(12px)" }}>
            <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-semibold text-gray-200">Recent Deployments</h4>
                <a className="text-xs text-[#00DC82] hover:underline" href="#">View All</a>
            </div>

            <div className="space-y-3">
                <div className="flex items-center justify-between text-sm py-2 border-b border-gray-700/20 last:border-0">
                    <div className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-[#00DC82]"></span>
                        <span className="text-gray-300">v2.4.0 - Hotfix</span>
                    </div>
                    <span className="text-xs text-gray-500">2h ago</span>
                </div>

                <div className="flex items-center justify-between text-sm py-2 border-b border-gray-700/20 last:border-0">
                    <div className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-[#00DC82]"></span>
                        <span className="text-gray-300">v2.3.9 - Model Update</span>
                    </div>
                    <span className="text-xs text-gray-500">1d ago</span>
                </div>

                <div className="flex items-center justify-between text-sm py-2 border-b border-gray-700/20 last:border-0">
                    <div className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-gray-500"></span>
                        <span className="text-gray-400 line-through">v2.3.8 - Failed</span>
                    </div>
                    <span className="text-xs text-gray-500">2d ago</span>
                </div>
            </div>
        </div>
    );
}

export function ClusterResources() {
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
                        <span className="text-white">78%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-1.5">
                        <div className="bg-[#3B82F6] h-1.5 rounded-full" style={{ width: "78%" }}></div>
                    </div>
                </div>

                <div>
                    <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-400">Memory</span>
                        <span className="text-white">42%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-1.5">
                        <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: "42%" }}></div>
                    </div>
                </div>

                <div>
                    <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-400">Storage</span>
                        <span className="text-white">12%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-1.5">
                        <div className="bg-[#00DC82] h-1.5 rounded-full" style={{ width: "12%" }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
