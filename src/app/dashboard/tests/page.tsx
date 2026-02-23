"use client";

import { Beaker, RefreshCw, AlertTriangle, Play, Terminal, FlaskConical } from "lucide-react";
import { useState } from "react";
import { runTests } from "../actions";

export default function TestsPage() {
    const [running, setRunning] = useState(false);
    const [mode, setMode] = useState<"pytest" | "eval">("pytest");
    const [results, setResults] = useState<any>(null);
    const [rawOutput, setRawOutput] = useState<string | null>(null);

    const handleRun = async () => {
        setRunning(true);
        setResults(null);
        setRawOutput(null);
        const data = await runTests(mode);
        if (mode === "pytest") {
            setResults({ total: data.total || 0, passed: data.passed || 0, failed: data.failed || 0, failures: data.failures || [] });
        }
        setRawOutput(data.output || "No output.");
        setRunning(false);
    };

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            <div>
                <h2 className="text-2xl font-bold flex items-center gap-2"><Beaker className="text-pink-500" /> Tests & Evaluation</h2>
                <p className="text-gray-400 mt-1">Run real pytest tests or the LLM Judge evaluation against the golden dataset.</p>
            </div>

            <div className="flex gap-3">
                <button onClick={() => setMode("pytest")} className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 border transition ${mode === "pytest" ? "bg-pink-600/20 border-pink-600 text-pink-400" : "border-gray-800 text-gray-400 hover:border-gray-600"}`}>
                    <Terminal size={16} /> Pytest (Unit Tests)
                </button>
                <button onClick={() => setMode("eval")} className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 border transition ${mode === "eval" ? "bg-amber-600/20 border-amber-600 text-amber-400" : "border-gray-800 text-gray-400 hover:border-gray-600"}`}>
                    <FlaskConical size={16} /> LLM Judge (Evaluation)
                </button>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 flex items-center justify-between">
                <div className="space-y-1">
                    <h3 className="text-lg font-semibold text-gray-200">{mode === "pytest" ? "Run Unit Tests" : "Run LLM Judge Evaluation"}</h3>
                    <p className="text-sm text-gray-400">{mode === "pytest" ? "Execute test_*.py files with pytest" : "Run the golden dataset evaluation with the LLM Judge"}</p>
                </div>
                <button disabled={running} onClick={handleRun} className="bg-pink-600 hover:bg-pink-500 text-white font-semibold px-6 py-2 rounded-lg flex items-center gap-2 disabled:opacity-50 transition">
                    {running ? <RefreshCw className="animate-spin" size={18} /> : <Play size={18} />}
                    {running ? "Running..." : mode === "pytest" ? "Run Tests" : "Run Eval"}
                </button>
            </div>

            {results && mode === "pytest" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-black border border-gray-800 rounded-xl flex flex-col items-center justify-center p-6">
                        <span className="text-4xl font-bold text-gray-200">{results.total}</span>
                        <span className="text-xs text-gray-500 uppercase font-semibold mt-2 tracking-wider">Total Tests</span>
                    </div>
                    <div className="bg-emerald-950/20 border border-emerald-900/50 rounded-xl flex flex-col items-center justify-center p-6">
                        <span className="text-4xl font-bold text-emerald-500">{results.passed}</span>
                        <span className="text-xs text-emerald-700 uppercase font-semibold mt-2 tracking-wider">Passed</span>
                    </div>
                    <div className="bg-red-950/20 border border-red-900/50 rounded-xl flex flex-col items-center justify-center p-6">
                        <span className="text-4xl font-bold text-red-500">{results.failed}</span>
                        <span className="text-xs text-red-700 uppercase font-semibold mt-2 tracking-wider">Failed</span>
                    </div>
                    {results.failed > 0 && (
                        <div className="col-span-1 md:col-span-3 mt-2 bg-red-950/10 border border-red-900/50 rounded-xl p-4">
                            <h4 className="text-red-400 flex items-center gap-2 font-medium mb-4"><AlertTriangle size={18} /> Failed Tests</h4>
                            <ul className="space-y-3">
                                {results.failures.map((f: any, idx: number) => (
                                    <li key={idx} className="bg-black/50 border border-red-900/30 p-3 rounded-lg text-sm flex flex-col gap-1">
                                        <strong className="text-gray-300 font-mono text-xs">{f.test}</strong>
                                        {f.error && <span className="text-red-300 mt-1 pl-4 border-l-2 border-red-800">{f.error}</span>}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}

            {rawOutput && (
                <div className="bg-gray-950 border border-gray-800 rounded-xl overflow-hidden">
                    <div className="bg-black px-4 py-2 border-b border-gray-800">
                        <span className="text-xs text-gray-500 font-mono uppercase tracking-widest">Raw Output</span>
                    </div>
                    <div className="p-4 font-mono text-xs text-gray-400 overflow-y-auto whitespace-pre-wrap max-h-80 leading-relaxed">{rawOutput}</div>
                </div>
            )}
        </div>
    );
}
