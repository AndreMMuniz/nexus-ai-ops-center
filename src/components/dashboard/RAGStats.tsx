"use client";

import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Database } from "lucide-react";
import { getRagStats } from "@/app/dashboard/actions";

const COLORS = ["#00DC82", "#3B82F6", "#8B5CF6", "#EC4899", "#F59E0B", "#6B7280"];

interface RagSource {
    source: string;
    count: number;
}

export function RAGStats() {
    const [stats, setStats] = useState<{ total_chunks: number; sources: RagSource[] }>({
        total_chunks: 0,
        sources: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        const fetchStats = async () => {
            const data = await getRagStats();
            if (isMounted) {
                setStats(data);
                setLoading(false);
            }
        };
        fetchStats();
        const interval = setInterval(fetchStats, 10000);
        return () => {
            isMounted = false;
            clearInterval(interval);
        };
    }, []);

    const formatSourceName = (path: string) => {
        const parts = path.replace(/\\/g, "/").split("/");
        const filename = parts[parts.length - 1] || path;
        // Remove file extension for cleaner display
        return filename.replace(/\.\w+$/, "");
    };

    // Group: take top 5 sources, merge the rest into "Others"
    const groupedData = (() => {
        if (stats.sources.length === 0) return [];

        const sorted = [...stats.sources].sort((a, b) => b.count - a.count);
        const top = sorted.slice(0, 5);
        const rest = sorted.slice(5);

        const result = top.map(s => ({
            name: formatSourceName(s.source),
            value: s.count
        }));

        if (rest.length > 0) {
            const othersTotal = rest.reduce((sum, s) => sum + s.count, 0);
            result.push({ name: `Others (${rest.length})`, value: othersTotal });
        }

        return result;
    })();

    return (
        <div className="border border-[#1F2937] rounded-xl p-6 h-full flex flex-col" style={{ background: "rgba(17, 24, 39, 0.75)", backdropFilter: "blur(12px)" }}>
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <Database className="w-5 h-5 text-indigo-400" />
                    <h3 className="font-semibold text-gray-200">Knowledge Base</h3>
                </div>
                <div className="text-xs text-indigo-400 font-medium bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/20">
                    {stats.total_chunks.toLocaleString()} chunks
                </div>
            </div>

            <div className="flex-1 min-h-[200px] mt-2 relative">
                {loading && stats.sources.length === 0 ? (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-sm">
                        Loading RAG data...
                    </div>
                ) : groupedData.length > 0 ? (
                    <div className="flex items-center gap-4 h-full">
                        {/* Pie Chart */}
                        <div className="w-[160px] h-[160px] shrink-0">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={groupedData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={45}
                                        outerRadius={70}
                                        paddingAngle={3}
                                        dataKey="value"
                                        strokeWidth={0}
                                    >
                                        {groupedData.map((_entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', color: '#F3F4F6', borderRadius: '8px', fontSize: '12px' }}
                                        itemStyle={{ color: '#F3F4F6' }}
                                        formatter={(value: any) => [`${Number(value).toLocaleString()} chunks`, '']}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Custom Legend */}
                        <div className="flex-1 space-y-2.5 overflow-hidden">
                            {groupedData.map((item, index) => {
                                const percentage = stats.total_chunks > 0
                                    ? ((item.value / stats.total_chunks) * 100).toFixed(1)
                                    : "0";
                                return (
                                    <div key={index} className="flex items-center gap-2 text-xs text-gray-300">
                                        <span
                                            className="w-2.5 h-2.5 rounded-full shrink-0"
                                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                                        />
                                        <span className="truncate flex-1" title={item.name}>{item.name}</span>
                                        <span className="text-gray-500 tabular-nums shrink-0">{percentage}%</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-600 text-sm italic">
                        No vector data available
                    </div>
                )}
            </div>
        </div>
    );
}
