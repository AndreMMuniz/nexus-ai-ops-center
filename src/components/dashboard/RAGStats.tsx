"use client";

import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Database, Filter } from "lucide-react";
import { getRagStats } from "@/app/dashboard/actions";

const COLORS = ["#00DC82", "#3B82F6", "#8B5CF6", "#EC4899", "#F59E0B"];

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
        const interval = setInterval(fetchStats, 10000); // Poll every 10 seconds
        return () => {
            isMounted = false;
            clearInterval(interval);
        };
    }, []);

    // Format source names to look cleaner
    const formatSourceName = (path: string) => {
        const parts = path.split("/");
        return parts[parts.length - 1] || path;
    };

    const chartData = stats.sources.map(s => ({
        name: formatSourceName(s.source),
        value: s.count
    }));

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
                ) : chartData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', color: '#F3F4F6' }}
                                itemStyle={{ color: '#F3F4F6' }}
                                formatter={(value: number) => [`${value.toLocaleString()} chunks`, 'Records']}
                            />
                            <Legend
                                verticalAlign="bottom"
                                height={36}
                                iconType="circle"
                                wrapperStyle={{ fontSize: '12px', color: '#9CA3AF' }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-600 text-sm italic">
                        No vector data available
                    </div>
                )}
            </div>
        </div>
    );
}
