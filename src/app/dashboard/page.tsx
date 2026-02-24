"use client";

import { useState, useEffect } from "react";
import { fetchOpsLogs, fetchOpsStatus, fetchOpsMetrics, clearLogs, getTokenUsage } from "./actions";

// Components
import { MetricsOverview } from "@/components/dashboard/MetricsOverview";
import { LiveTerminalPanel } from "@/components/dashboard/LiveTerminalPanel";
import { ServiceControls } from "@/components/dashboard/ServiceControls";
import { ClusterResources, ActiveEndpoints } from "@/components/dashboard/ClusterResources";
import { RAGStats } from "@/components/dashboard/RAGStats";
import { TopicAnalytics } from "@/components/dashboard/TopicAnalytics";

interface LogEntry {
    timestamp: string;
    status: string | number;
    latency?: number;
    query?: string;
    tools_used?: number;
    user?: string;
    ip?: string;
    [key: string]: any; // fallback
}

export default function DashboardPage() {
    const [status, setStatus] = useState({ status: "loading", agent_initialized: false });
    const [apiLogs, setApiLogs] = useState<LogEntry[]>([]);
    const [metrics, setMetrics] = useState({
        total_agents: 0,
        tokens_usage: "0",
        cpu_usage: 0,
        memory_usage: 0,
        storage_usage: 0
    });
    const [tokenStats, setTokenStats] = useState({ total_tokens: 0 });

    useEffect(() => {
        const fetchAll = async () => {
            const [s, l, m, t] = await Promise.all([
                fetchOpsStatus(),
                fetchOpsLogs(),
                fetchOpsMetrics(),
                getTokenUsage()
            ]);
            setStatus(s);
            setApiLogs(l);
            setMetrics(m);
            setTokenStats(t);
        };
        fetchAll();
        const interval = setInterval(fetchAll, 3000); // Polling every 3 seconds
        return () => clearInterval(interval);
    }, []);

    const handleClearLogs = async () => {
        await clearLogs();
        setApiLogs([]);
        setTokenStats({ total_tokens: 0 });
    };

    // Calculate dynamic data based on logs
    const calculateStats = () => {
        if (!apiLogs || apiLogs.length === 0) {
            return {
                latency: 0,
                successRate: 100,
                topEndpoints: []
            };
        }

        // Latency & Success
        let totalLatency = 0;
        let successCount = 0;
        const endpointCounts: Record<string, number> = {};

        apiLogs.forEach(log => {
            if (log.latency) totalLatency += Number(log.latency);
            if (log.status === "success" || log.status === 200) successCount++;

            // Extract a pseudo-endpoint or route from exactly what was queried
            let route = log.query || "/v1/chat";
            if (route.length > 25) route = route.substring(0, 25) + "...";
            endpointCounts[route] = (endpointCounts[route] || 0) + 1;
        });

        const avgLatency = totalLatency / apiLogs.length;
        const successRate = (successCount / apiLogs.length) * 100;

        // Top Endpoints logic
        const topEndpoints = Object.entries(endpointCounts)
            .map(([endpoint, count]) => ({ endpoint, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 5); // Take top 5

        return {
            latency: avgLatency,
            successRate,
            topEndpoints
        };
    };

    const stats = calculateStats();

    // Format Tokens Usage (e.g., 12500 -> 12.5k)
    let formattedTokens = "0";
    const totalTokens = tokenStats?.total_tokens || 0;
    if (totalTokens >= 1000000) {
        formattedTokens = (totalTokens / 1000000).toFixed(1) + "M";
    } else if (totalTokens >= 1000) {
        formattedTokens = (totalTokens / 1000).toFixed(1) + "k";
    } else {
        formattedTokens = totalTokens.toString();
    }

    return (
        <div className="max-w-[1600px] mx-auto w-full">
            <MetricsOverview
                totalRequests={apiLogs.length}
                apiLatency={stats.latency}
                successRate={stats.successRate}
                tokensUsage={formattedTokens}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Main Terminal Column */}
                <div className="lg:col-span-2">
                    <LiveTerminalPanel
                        logs={apiLogs}
                        onClearLogs={handleClearLogs}
                    />
                </div>

                {/* Service Controls Column */}
                <div className="lg:col-span-1 flex flex-col gap-6">
                    <ActiveEndpoints topEndpoints={stats.topEndpoints} />
                    <ServiceControls statusData={status} />
                </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-2">
                    <RAGStats />
                </div>
                <div className="lg:col-span-1">
                    <TopicAnalytics />
                </div>
                <div className="lg:col-span-1">
                    <ClusterResources />
                </div>
            </div>

            <footer className="mt-8 text-center pb-8">
                <p className="text-[10px] text-gray-600">Nexus Ops Dashboard v2.4.0 © 2026</p>
            </footer>
        </div>
    );
}
