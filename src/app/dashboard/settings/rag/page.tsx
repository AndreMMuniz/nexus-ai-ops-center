"use client";

import { Database, FileText, Globe, FolderTree, Trash2, Plus } from "lucide-react";
import { useState } from "react";

export default function SettingsRAGPage() {
    const [activeTab, setActiveTab] = useState("datasets");

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <div>
                <h2 className="text-2xl font-bold flex items-center gap-2 text-white"><Database className="text-emerald-500" /> RAG Configs & Knowledge Base</h2>
                <p className="text-gray-400 mt-1">Manage local knowledge datasets, active datalake connections, and scraped document embeddings.</p>
            </div>

            <div className="flex items-center gap-2 border-b border-gray-800 pb-1">
                {["datasets", "datalakes", "scraper"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 capitalize ${activeTab === tab ? "border-emerald-500 text-emerald-400" : "border-transparent text-gray-400 hover:text-gray-200"}`}
                    >
                        {tab === "datasets" ? "Local Datasets" : tab === "datalakes" ? "Vector Datalakes" : "Scraped Documents"}
                    </button>
                ))}
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden min-h-[400px]">
                {activeTab === "datasets" && (
                    <div>
                        <div className="p-4 border-b border-gray-800 bg-gray-950 flex justify-between items-center">
                            <h3 className="font-semibold text-gray-200 flex items-center gap-2"><FileText size={18} className="text-emerald-500" /> Local File Targets</h3>
                            <button className="text-xs bg-emerald-900/50 hover:bg-emerald-800 text-emerald-400 px-3 py-1.5 rounded flex items-center gap-1 transition border border-emerald-900"><Plus size={14} /> Add Dataset Folder</button>
                        </div>
                        <div className="divide-y divide-gray-800">
                            {[
                                { name: "manual.bubble.io.md", type: "markdown", size: "4.2 MB", path: "data/datasets/manual.bubble.io.md" },
                                { name: "bubble_forum_data.json", type: "json", size: "128 KB", path: "data/datasets/bubble_forum_data.json" },
                            ].map((doc, i) => (
                                <div key={i} className="p-4 hover:bg-black/30 flex items-center justify-between group">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 bg-gray-950 rounded border border-gray-800 flex items-center justify-center">
                                            <FileText className="text-gray-400" size={20} />
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-200 text-sm">{doc.name}</p>
                                            <p className="text-xs text-gray-500 mt-0.5">{doc.path} &bull; {doc.size}</p>
                                        </div>
                                    </div>
                                    <button className="text-gray-600 hover:text-red-400 p-2 opacity-0 group-hover:opacity-100 transition"><Trash2 size={16} /></button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === "datalakes" && (
                    <div className="p-8 text-center">
                        <Globe className="mx-auto text-gray-700 mb-4" size={48} />
                        <h3 className="text-lg font-medium text-gray-300">Pinecone Connection Missing</h3>
                        <p className="text-gray-500 max-w-sm mx-auto mt-2 text-sm">Currently using local Postgres PGVector. To scale, configure an external Pinecone or Weaviate cluster.</p>
                        <button className="mt-6 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg text-sm transition">Setup Cloud Vector Storage</button>
                    </div>
                )}

                {activeTab === "scraper" && (
                    <div className="p-8 text-center">
                        <FolderTree className="mx-auto text-gray-700 mb-4" size={48} />
                        <h3 className="text-lg font-medium text-gray-300">View Active Sub-trees</h3>
                        <p className="text-gray-500 max-w-sm mx-auto mt-2 text-sm">Visualize the document embeddings grouped by topic tags resulting from the forum web scraper.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
