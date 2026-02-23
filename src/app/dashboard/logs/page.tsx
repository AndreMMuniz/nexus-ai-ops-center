"use client";

import { useEffect, useState } from "react";
import { Download, Trash2, Search, RefreshCcw } from "lucide-react";
import { fetchOpsLogs } from "../actions";

export default function LogsPage() {
    const [logs, setLogs] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);

    async function load() {
        setLoading(true);
        const data = await fetchOpsLogs();
        setLogs(data);
        setLoading(false);
    }

    useEffect(() => {
        load();
    }, []);

    const filteredLogs = logs.filter(log =>
        JSON.stringify(log).toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex flex-col h-[calc(100vh-4rem)] space-y-4">
            <header className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">System Logs</h1>
                    <p className="text-sm text-gray-500">View and export historical API and system logs.</p>
                </div>
                <div className="flex items-center space-x-2">
                    <button
                        onClick={load}
                        className="flex items-center space-x-2 px-3 py-1.5 bg-white border border-gray-200 rounded-md text-sm shadow-sm hover:bg-gray-50 transition-colors"
                    >
                        <RefreshCcw className={`w-4 h-4 text-gray-500 ${loading ? 'animate-spin' : ''}`} />
                        <span>Refresh</span>
                    </button>
                    <button className="flex items-center space-x-2 px-3 py-1.5 bg-white border border-gray-200 rounded-md text-sm shadow-sm hover:bg-gray-50 transition-colors">
                        <Download className="w-4 h-4 text-gray-500" />
                        <span>Export</span>
                    </button>
                    <button className="flex items-center space-x-2 px-3 py-1.5 bg-red-50 border border-red-200 text-red-600 rounded-md text-sm shadow-sm hover:bg-red-100 transition-colors">
                        <Trash2 className="w-4 h-4" />
                        <span>Clear</span>
                    </button>
                </div>
            </header>

            {/* Filter */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex items-center space-x-3">
                <Search className="w-5 h-5 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search logs by keyword, type, or message..."
                    className="flex-1 bg-transparent border-none focus:ring-0 text-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Log Table */}
            <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
                <div className="overflow-x-auto flex-1">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50 sticky top-0">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Latency</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 text-sm">
                            {filteredLogs.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-sm text-gray-500">
                                        {loading ? 'Loading logs...' : 'No logs found.'}
                                    </td>
                                </tr>
                            ) : (
                                filteredLogs.map((log, i) => (
                                    <tr key={i} className="hover:bg-gray-50 cursor-pointer transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                                            {new Date(log.timestamp).toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${log.status === 'error' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                                                {log.status === 'error' ? 'ERROR' : 'INFO'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-900 truncate max-w-xs">
                                            {log.query || log.error || 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                                            {log.latency ? `${log.latency}s` : '-'}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
