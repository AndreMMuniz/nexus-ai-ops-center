import { signIn } from "@/auth";
import { Terminal } from "lucide-react";

export default function LoginPage() {
    return (
        <div className="flex h-screen w-full items-center justify-center bg-black">
            {/* Subtle grid background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />

            <div className="z-10 w-full max-w-md">
                {/* Header */}
                <div className="flex flex-col items-center mb-8">
                    <div className="h-16 w-16 rounded-2xl bg-emerald-950/50 border border-emerald-900/50 flex items-center justify-center mb-4">
                        <Terminal className="text-emerald-500" size={32} />
                    </div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">Nexus AI</h1>
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mt-1">Ops Center</p>
                </div>

                {/* Card */}
                <div className="rounded-2xl border border-gray-800 bg-gray-950 overflow-hidden shadow-2xl shadow-emerald-950/10">
                    <div className="px-8 pt-8 pb-6 text-center">
                        <h3 className="text-lg font-semibold text-white">Sign In</h3>
                        <p className="text-sm text-gray-500 mt-1">
                            Use your administrator password to access the panel.
                        </p>
                    </div>
                    <div className="px-8 pb-8">
                        <form
                            action={async (formData) => {
                                "use server";
                                await signIn("credentials", formData);
                            }}
                            className="flex flex-col space-y-5"
                        >
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-xs text-gray-400 uppercase tracking-wider font-semibold mb-2"
                                >
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="••••••••••••"
                                    autoComplete="current-password"
                                    required
                                    className="block w-full appearance-none rounded-lg border border-gray-800 bg-black px-4 py-3 text-sm text-gray-200 placeholder-gray-600 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-colors"
                                />
                            </div>
                            <button
                                type="submit"
                                className="flex h-11 w-full items-center justify-center rounded-lg bg-emerald-600 text-sm font-semibold text-white transition-all hover:bg-emerald-500 active:scale-[0.98]"
                            >
                                Sign In
                            </button>
                        </form>
                    </div>
                </div>

                <p className="text-center text-xs text-gray-700 mt-6">
                    Protected by Auth.js &bull; Nexus AI Ops
                </p>
            </div>
        </div>
    );
}
