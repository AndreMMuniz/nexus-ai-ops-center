"use client";

import { FileText, Play, Server } from "lucide-react";
import { useState } from "react";
import { runScraper } from "../actions";

export default function ScraperPage() {
    const [loading, setLoading] = useState(false);
    const [limit, setLimit] = useState(10);
    const [logs, setLogs] = useState<string | null>(null);

    const handleRunScraper = async () => {
        setLoading(true);
        setLogs("Starting scraper with " + limit + " topics...\n");
        const data = await runScraper(limit);
        if (data.status === "success") {
            setLogs(data.output || "Scraper completed successfully.");
        } else {
            setLogs("ERROR: " + (data.detail || data.error || "Unknown error"));
        }
        setLoading(false);
    };

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            <div>
                <h2 className="text-2xl font-bold flex items-center gap-2"><FileText className="text-purple-500" /> Forum Scraper</h2>
                <p className="text-gray-400 mt-1">Trigger the playwright scraper to find new resolved topics on the Bubble forum.</p>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 flex flex-col gap-6">
                <div className="flex items-center gap-6">
                    <div className="flex flex-col gap-2 flex-1">
                        <label className="text-sm font-medium text-gray-300">Number of topics to search for:</label>
                        <input
                            type="number"
                            min={1}
                            max={200}
                            value={limit}
                            onChange={(e) => setLimit(Number(e.target.value))}
                            className="bg-black border border-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500 transition-colors"
                        />
                    </div>
                    <button
                        disabled={loading}
                        onClick={handleRunScraper}
                        className="mt-6 bg-purple-600 hover:bg-purple-500 text-white font-semibold px-8 py-2 rounded-lg flex items-center gap-2 disabled:opacity-50 transition"
                    >
                        {loading ? <Server className="animate-spin" size={18} /> : <Play size={18} />}
                        {loading ? "Running Playwright..." : "Run Scraper"}
                    </button>
                </div>

                {logs && (
                    <div className="mt-4 border border-gray-800 rounded-lg overflow-hidden flex flex-col h-64">
                        <div className="bg-gray-950 px-4 py-2 border-b border-gray-800 flex justify-between items-center">
                            <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Execution Logs</span>
                            {loading && <span className="text-xs text-purple-400 flex items-center gap-1"><Server className="animate-spin" size={12} /> Running</span>}
                        </div>
                        <div className="bg-black p-4 font-mono text-sm text-gray-300 flex-1 overflow-y-auto whitespace-pre-wrap">{logs}</div>
                    </div>
                )}
            </div>
        </div>
    );
}
