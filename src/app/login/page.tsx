import { signIn } from "@/auth";
import { Terminal } from "lucide-react";

export default function LoginPage() {
    return (
        <div className="relative flex h-screen w-full items-center justify-center bg-[#0D0D0D] overflow-hidden">
            {/* Animated gradient orb behind the card */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-emerald-600/10 via-transparent to-cyan-600/5 blur-3xl pointer-events-none" />

            {/* Subtle grid overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.02)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />

            {/* Scan line effect */}
            <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.03)_2px,rgba(0,0,0,0.03)_4px)] pointer-events-none" />

            <div className="z-10 w-full max-w-[420px] px-6">
                {/* Logo / Brand */}
                <div className="flex flex-col items-center mb-10">
                    <div className="relative mb-5">
                        <div className="absolute inset-0 rounded-2xl bg-emerald-500/20 blur-xl" />
                        <div className="relative h-[72px] w-[72px] rounded-2xl bg-gradient-to-br from-[#151515] to-[#1a1a1a] border border-emerald-500/30 flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.15)]">
                            <Terminal className="text-emerald-400" size={34} />
                        </div>
                    </div>
                    <h1 className="text-[28px] font-bold text-white tracking-tight">
                        Nexus <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">AI</span>
                    </h1>
                    <p className="text-[11px] text-gray-500 uppercase tracking-[0.3em] font-semibold mt-1.5">Operations Center</p>
                </div>

                {/* Glass Card */}
                <div className="relative rounded-2xl border border-gray-800/80 bg-[#111111]/90 backdrop-blur-xl overflow-hidden shadow-2xl shadow-black/50">
                    {/* Top accent line */}
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />

                    <div className="p-8">
                        <div className="text-center mb-8">
                            <h3 className="text-[17px] font-semibold text-white">Welcome back</h3>
                            <p className="text-[13px] text-gray-500 mt-1.5">
                                Enter your administrator password to continue.
                            </p>
                        </div>

                        <form
                            action={async (formData) => {
                                "use server";
                                await signIn("credentials", formData);
                            }}
                            className="flex flex-col space-y-6"
                        >
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-[11px] text-gray-400 uppercase tracking-[0.15em] font-medium mb-2.5"
                                >
                                    Password
                                </label>
                                <div className="relative group">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        placeholder="••••••••••••"
                                        autoComplete="current-password"
                                        required
                                        className="block w-full appearance-none rounded-xl border border-gray-800 bg-[#0D0D0D] px-4 py-3.5 text-[14px] text-gray-200 placeholder-gray-700 focus:border-emerald-500/60 focus:outline-none focus:ring-1 focus:ring-emerald-500/30 focus:shadow-[0_0_15px_rgba(16,185,129,0.08)] transition-all duration-300"
                                    />
                                    {/* Focus glow effect */}
                                    <div className="absolute inset-0 rounded-xl opacity-0 group-focus-within:opacity-100 bg-emerald-500/5 pointer-events-none transition-opacity duration-300" />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="relative flex h-12 w-full items-center justify-center rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 text-[14px] font-semibold text-white transition-all duration-200 hover:from-emerald-500 hover:to-emerald-400 hover:shadow-[0_0_25px_rgba(16,185,129,0.25)] active:scale-[0.98]"
                            >
                                <span className="relative z-10">Sign In</span>
                            </button>
                        </form>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-center gap-2 mt-8">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500/50" />
                    <p className="text-[11px] text-gray-600 tracking-wide">
                        Secured by Auth.js &bull; Nexus AI Ops
                    </p>
                </div>
            </div>
        </div>
    );
}
