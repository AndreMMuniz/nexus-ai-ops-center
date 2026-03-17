"use client";

import { useState, useEffect } from "react";
import { MessageSquareWarning } from "lucide-react";
import { getAnalyticsTopics } from "@/app/dashboard/actions";

interface Topic {
    topic: string;
    count: number;
}

export function TopicAnalytics() {
    const [topics, setTopics] = useState<Topic[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        const fetchTopics = async () => {
            const data = await getAnalyticsTopics();
            if (isMounted) {
                setTopics(data.topics || []);
                setLoading(false);
            }
        };
        fetchTopics();
        const interval = setInterval(fetchTopics, 10000); // Poll every 10 seconds
        return () => {
            isMounted = false;
            clearInterval(interval);
        };
    }, []);

    // Find the max count to calculate relative widths for the bar visualization
    const maxCount = topics.length > 0 ? Math.max(...topics.map(t => t.count)) : 1;

    return (
        <div className="border border-[#1F2937] rounded-xl p-6 h-full flex flex-col" style={{ background: "rgba(17, 24, 39, 0.75)", backdropFilter: "blur(12px)" }}>
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <MessageSquareWarning className="w-5 h-5 text-rose-400" />
                    <h3 className="font-semibold text-gray-200">Pain Points (AI Analytics)</h3>
                </div>
            </div>

            <div className="flex-1 mt-2">
                {loading && topics.length === 0 ? (
                    <div className="h-full flex items-center justify-center text-gray-500 text-sm">
                        Analyzing negative feedback...
                    </div>
                ) : topics.length > 0 ? (
                    <div className="space-y-4">
                        {topics.slice(0, 5).map((item, index) => {
                            const percent = Math.max(10, (item.count / maxCount) * 100);
                            return (
                                <div key={index} className="space-y-1">
                                    <div className="flex justify-between text-xs text-gray-300">
                                        <span className="truncate max-w-[80%] pr-2">{item.topic}</span>
                                        <span className="font-medium text-gray-400">{item.count}</span>
                                    </div>
                                    <div className="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
                                        <div
                                            className="bg-rose-500/80 h-1.5 rounded-full"
                                            style={{ width: `${percent}%` }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-gray-600 text-sm italic">
                        <span className="text-2xl mb-2 text-gray-700">🎉</span>
                        No pain points identified
                    </div>
                )}
            </div>
            {topics.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-800/50 text-right">
                    <span className="text-[10px] text-gray-500 uppercase tracking-wider">Derived from Thumbs Down feedback</span>
                </div>
            )}
        </div>
    );
}
