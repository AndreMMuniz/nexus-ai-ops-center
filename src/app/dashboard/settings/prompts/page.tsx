"use client";

import { MessageSquare, Save, RotateCcw } from "lucide-react";
import { useState, useEffect } from "react";
import { fetchPrompts, savePrompts } from "../../actions";

export default function SettingsPromptsPage() {
    const [prompts, setPrompts] = useState<Record<string, string>>({});
    const [original, setOriginal] = useState<Record<string, string>>({});
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            const data = await fetchPrompts();
            setPrompts(data.prompts || {});
            setOriginal(data.prompts || {});
            setLoading(false);
        };
        load();
    }, []);

    const handleSave = async () => {
        setSaving(true);
        setSaved(false);
        const res = await savePrompts(prompts);
        if (res.status !== "error") {
            setSaved(true);
            setOriginal({ ...prompts });
            setTimeout(() => setSaved(false), 3000);
        }
        setSaving(false);
    };

    const handleReset = (key: string) => {
        setPrompts((prev) => ({ ...prev, [key]: original[key] || "" }));
    };

    const hasChanges = (key: string) => prompts[key] !== original[key];

    const promptLabels: Record<string, { title: string; desc: string }> = {
        SYSTEM_PROMPT_TEMPLATE: {
            title: "System Prompt (Agent Persona)",
            desc: "The main system instruction that defines the agent's behavior. Supports {language} and {user_context} placeholders.",
        },
        VISION_PROMPT: {
            title: "Vision Prompt (Image Analysis)",
            desc: "Instruction sent to the LLM when the user attaches a screenshot for visual analysis.",
        },
    };

    if (loading) {
        return <div className="max-w-4xl mx-auto py-20 text-center text-gray-500 animate-pulse">Loading prompts from app/agent/prompts.py...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold flex items-center gap-2 text-white"><MessageSquare className="text-amber-500" /> Agent Prompts</h2>
                    <p className="text-gray-400 mt-1">View and edit the system prompts that drive the agent&apos;s reasoning. Changes are saved directly to <code className="text-gray-300 bg-gray-800 px-1.5 py-0.5 rounded text-xs">app/agent/prompts.py</code></p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saving || !Object.keys(prompts).some((k) => hasChanges(k))}
                    className="bg-amber-600 hover:bg-amber-500 disabled:opacity-40 text-white font-semibold px-5 py-2 rounded-lg flex items-center gap-2 transition"
                >
                    {saving ? <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" /> : <Save size={16} />}
                    {saving ? "Saving..." : saved ? "Saved!" : "Save All"}
                </button>
            </div>

            {Object.entries(prompts).map(([key, value]) => {
                const meta = promptLabels[key] || { title: key, desc: "" };
                const changed = hasChanges(key);

                return (
                    <div key={key} className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
                        <div className="bg-gray-950 px-5 py-3 border-b border-gray-800 flex items-center justify-between">
                            <div>
                                <h3 className="font-semibold text-white flex items-center gap-2">
                                    {meta.title}
                                    {changed && <span className="text-xs bg-amber-600/20 text-amber-400 px-2 py-0.5 rounded-full">modified</span>}
                                </h3>
                                {meta.desc && <p className="text-xs text-gray-500 mt-0.5">{meta.desc}</p>}
                            </div>
                            {changed && (
                                <button onClick={() => handleReset(key)} className="text-gray-500 hover:text-gray-300 transition p-1" title="Reset to original">
                                    <RotateCcw size={14} />
                                </button>
                            )}
                        </div>
                        <div className="p-1">
                            <textarea
                                value={value}
                                onChange={(e) => setPrompts((prev) => ({ ...prev, [key]: e.target.value }))}
                                rows={key === "VISION_PROMPT" ? 3 : 18}
                                spellCheck={false}
                                className="w-full bg-black text-gray-300 font-mono text-sm p-4 border-none outline-none resize-y rounded-lg leading-relaxed"
                                style={{ minHeight: "80px" }}
                            />
                        </div>
                        <div className="px-5 py-2 border-t border-gray-800 flex justify-between">
                            <span className="text-xs text-gray-600 font-mono">{key}</span>
                            <span className="text-xs text-gray-600">{value.length} chars</span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
