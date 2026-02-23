"use client";

import { DatabaseBackup, AlertTriangle, CheckCircle2, RefreshCw } from "lucide-react";
import { useState, useEffect } from "react";
import { fetchIngestionStatus, runIngestion } from "../actions";

export default function IngestionPage() {
    const [needsIngestion, setNeedsIngestion] = useState(false);
    const [pendingItems, setPendingItems] = useState<{ title: string; url: string }[]>([]);
    const [loading, setLoading] = useState(false);
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        const check = async () => {
            const data = await fetchIngestionStatus();
            setNeedsIngestion(data.needsIngestion);
            setPendingItems(data.pendingItems || []);
            setChecking(false);
        };
        check();
    }, []);

    const handleIngest = async () => {
        setLoading(true);
        await runIngestion();
        setNeedsIngestion(false);
        setPendingItems([]);
        setLoading(false);
    };

    if (checking) {
        return <div className="max-w-5xl mx-auto py-20 text-center text-gray-500 animate-pulse">Checking ingestion status...</div>;
    }

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            <div>
                <h2 className="text-2xl font-bold flex items-center gap-2"><DatabaseBackup className="text-yellow-500" /> Data Ingestion</h2>
                <p className="text-gray-400 mt-1">Run the vector ingest process to update the database based on the latest scraped data and manuals.</p>
            </div>

            <div className={`p-6 border rounded-xl flex items-start gap-4 transition-colors ${needsIngestion ? "bg-yellow-950/20 border-yellow-900/50" : "bg-emerald-950/20 border-emerald-900/50"}`}>
                {needsIngestion ? <AlertTriangle className="text-yellow-500 shrink-0 mt-1" /> : <CheckCircle2 className="text-emerald-500 shrink-0 mt-1" />}
                <div className="flex-1">
                    <h3 className={`text-lg font-medium ${needsIngestion ? "text-yellow-400" : "text-emerald-400"}`}>
                        {needsIngestion ? "Pending Data Detected" : "All Data is up to date"}
                    </h3>
                    <p className="text-gray-400 mt-1">
                        {needsIngestion
                            ? `Attention: You have ${pendingItems.length} newly scraped forum topics that have not been ingested yet!`
                            : "No pending JSON or markdown files were found. The Vector DB is fully synced."}
                    </p>

                    {needsIngestion && pendingItems.length > 0 && (
                        <div className="mt-4 bg-black border border-gray-800 rounded-lg overflow-hidden">
                            <div className="bg-gray-900/50 px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-800">Pending Topics to Ingest</div>
                            <div className="divide-y divide-gray-800 max-h-60 overflow-y-auto">
                                {pendingItems.map((item, id) => (
                                    <div key={id} className="p-3 hover:bg-gray-900 flex justify-between items-center text-sm">
                                        <span className="text-gray-300">{item.title}</span>
                                        <a href={item.url} target="_blank" className="text-blue-500 hover:underline">{item.url.replace("https://", "")}</a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {needsIngestion && (
                        <button
                            disabled={loading}
                            onClick={handleIngest}
                            className="mt-6 bg-yellow-600 hover:bg-yellow-500 text-yellow-950 font-semibold px-6 py-2 rounded-lg flex items-center gap-2 disabled:opacity-50 transition"
                        >
                            {loading ? <RefreshCw className="animate-spin" size={18} /> : <DatabaseBackup size={18} />}
                            {loading ? "Ingesting into Vector DB..." : "Run Ingestion Pipeline"}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
