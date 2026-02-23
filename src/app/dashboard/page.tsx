"use client";

import { useEffect, useState } from "react";
import { fetchOpsStatus } from "./actions";

export default function DashboardStatusPage() {
    const [status, setStatus] = useState<any>({ status: "offline", agent_initialized: false });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            const data = await fetchOpsStatus();
            setStatus(data);
            setLoading(false);
        }
        load();
        const interval = setInterval(load, 10000); // 10s polling
        return () => clearInterval(interval);
    }, []);

    const isOnline = status.status === "online";

    return (
        <div className="space-y-6">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">System Status</h1>
                <p className="mt-2 text-sm text-gray-500">Overview of the Nexus AI application state.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col justify-center items-center">
                    {loading ? (
                        <div className="animate-pulse h-12 w-12 rounded-full bg-gray-200 mb-4"></div>
                    ) : (
                        <div className={`h-12 w-12 rounded-full flex items-center justify-center mb-4 ${isOnline ? 'bg-green-100' : 'bg-red-100'}`}>
                            <div className={`h-4 w-4 rounded-full ${isOnline ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                        </div>
                    )}
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Backend Connection</h3>
                    <p className="text-2xl font-bold text-gray-900">
                        {loading ? '...' : (isOnline ? 'Online' : 'Offline')}
                    </p>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col justify-center items-center">
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Agent Initialized</h3>
                    <p className={`text-2xl font-bold ${status.agent_initialized ? 'text-green-600' : 'text-orange-500'}`}>
                        {loading ? '...' : (status.agent_initialized ? 'Yes' : 'No')}
                    </p>
                </div>
            </div>
        </div>
    );
}
