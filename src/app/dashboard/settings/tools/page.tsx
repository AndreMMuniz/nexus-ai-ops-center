"use client";

import { Wrench, Search, Code, Save } from "lucide-react";
import { useState } from "react";

export default function SettingsToolsPage() {
    const [saving, setSaving] = useState(false);
    const [tools, setTools] = useState({
        tavilyKey: "",
        serpapi: "",
        enableCodeEval: true,
    });

    const handleSave = () => {
        setSaving(true);
        setTimeout(() => setSaving(false), 1000);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                <h2 className="text-2xl font-bold flex items-center gap-2 text-white"><Wrench className="text-amber-500" /> External Tools & Capabilities</h2>
                <p className="text-gray-400 mt-1">Configure API keys for external search engines and capabilities available to the reasoning agent.</p>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-8">
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-200"><Search className="text-gray-400" size={18} /> Web Search APIs</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-gray-300">Tavily Search API Key</label>
                            <input type="password" value={tools.tavilyKey} onChange={(e) => setTools({ ...tools, tavilyKey: e.target.value })} className="w-full bg-black border border-gray-700 rounded-lg px-4 py-2 text-sm text-gray-300 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500" />
                            <p className="text-xs text-gray-500">Used by the search_knowledge_base tool fallback.</p>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-gray-300">Google SERP API Key</label>
                            <input type="password" value={tools.serpapi} onChange={(e) => setTools({ ...tools, serpapi: e.target.value })} className="w-full bg-black border border-gray-700 rounded-lg px-4 py-2 text-sm text-gray-300 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500" />
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-200"><Code className="text-gray-400" size={18} /> Execution Environment</h3>
                    <div className="flex items-center justify-between bg-black border border-gray-800 p-4 rounded-lg max-w-3xl">
                        <div>
                            <p className="font-medium text-gray-200">Enable Code Sandbox</p>
                            <p className="text-sm text-gray-500">Allow the agent to write and execute python code in a local temporary directory.</p>
                        </div>
                        <button
                            onClick={() => setTools({ ...tools, enableCodeEval: !tools.enableCodeEval })}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${tools.enableCodeEval ? "bg-amber-500" : "bg-gray-700"}`}
                        >
                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${tools.enableCodeEval ? "translate-x-6" : "translate-x-1"}`} />
                        </button>
                    </div>
                </div>

                <div className="pt-4">
                    <button onClick={handleSave} disabled={saving} className="bg-white hover:bg-gray-200 text-black font-semibold px-6 py-2.5 rounded-lg flex items-center gap-2 transition">
                        {saving ? <div className="h-4 w-4 rounded-full border-2 border-black border-t-transparent animate-spin" /> : <Save size={18} />}
                        {saving ? "Deploying..." : "Save Tools"}
                    </button>
                </div>
            </div>
        </div>
    );
}
