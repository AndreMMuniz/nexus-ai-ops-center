"use client";

import { Key, Bot, Cpu, CheckCircle2, Lock, Save } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { fetchSettings, saveSettings } from "../../actions";

export default function SettingsLLMPage() {
    const [provider, setProvider] = useState("openai");
    const [keys, setKeys] = useState({ openai: "", claude: "", llama: "http://localhost:11434" });
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const load = async () => {
            const data = await fetchSettings();
            const s = data.settings || {};
            setKeys({
                openai: s.OPENAI_API_KEY || "",
                claude: s.ANTHROPIC_API_KEY || "",
                llama: s.OLLAMA_BASE_URL || "http://localhost:11434",
            });
            if (s.LLM_MODEL?.includes("llama")) setProvider("llama");
            else if (s.ANTHROPIC_API_KEY) setProvider("claude");
            else setProvider("openai");
        };
        load();
    }, []);

    const handleSave = async () => {
        setSaving(true);
        const settings: Record<string, string> = {
            OPENAI_API_KEY: keys.openai,
            ANTHROPIC_API_KEY: keys.claude,
            OLLAMA_BASE_URL: keys.llama,
            LLM_MODEL: provider === "openai" ? "gpt-4o" : provider === "claude" ? "claude-3-5-sonnet-20241022" : "llama3.1:8b",
        };
        await saveSettings(settings);
        setSaving(false);
    };

    const ProviderCard = ({ id, name, icon: Icon, desc }: any) => (
        <div
            onClick={() => setProvider(id)}
            className={cn(
                "p-4 border rounded-xl cursor-pointer transition-all",
                provider === id
                    ? "bg-blue-950/30 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.15)] relative overflow-hidden"
                    : "bg-black border-gray-800 hover:border-gray-700"
            )}
        >
            {provider === id && <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500" />}
            <div className="flex items-center gap-3 mb-2">
                <Icon className={provider === id ? "text-blue-400" : "text-gray-500"} size={22} />
                <h4 className={cn("font-semibold", provider === id ? "text-white" : "text-gray-400")}>{name}</h4>
                {provider === id && <CheckCircle2 className="text-blue-500 ml-auto" size={16} />}
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                <h2 className="text-2xl font-bold flex items-center gap-2 text-white"><Cpu className="text-blue-500" /> API Providers & Models</h2>
                <p className="text-gray-400 mt-1">Select the core LLM engine driving the Nexus AI reasoning and manage access tokens.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <ProviderCard id="openai" name="OpenAI API" icon={Bot} desc="GPT-4o standard tier. Deep reasoning, stable tool calling formats." />
                <ProviderCard id="claude" name="Anthropic" icon={Cpu} desc="Claude 3.5 Sonnet. Excellent for coding, context limits up to 200k." />
                <ProviderCard id="llama" name="Local Llama" icon={Lock} desc="Ollama running locally. Free, private, but limited by GPU vRAM." />
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-6">
                <h3 className="text-lg font-semibold flex items-center gap-2"><Key className="text-gray-400" size={18} /> Credentials & Tokens</h3>
                <div className="space-y-4 max-w-2xl">
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-300">OpenAI API Key</label>
                        <input type="password" value={keys.openai} onChange={(e) => setKeys({ ...keys, openai: e.target.value })} className="w-full bg-black border border-gray-700 rounded-lg px-4 py-2 text-sm text-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-300">Anthropic API Key</label>
                        <input type="password" value={keys.claude} onChange={(e) => setKeys({ ...keys, claude: e.target.value })} className="w-full bg-black border border-gray-700 rounded-lg px-4 py-2 text-sm text-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                    </div>
                </div>
                <div className="pt-4">
                    <button onClick={handleSave} disabled={saving} className="bg-white hover:bg-gray-200 text-black font-semibold px-6 py-2.5 rounded-lg flex items-center gap-2 transition">
                        {saving ? <div className="h-4 w-4 rounded-full border-2 border-black border-t-transparent animate-spin" /> : <Save size={18} />}
                        {saving ? "Saving..." : "Save Configuration"}
                    </button>
                </div>
            </div>
        </div>
    );
}
