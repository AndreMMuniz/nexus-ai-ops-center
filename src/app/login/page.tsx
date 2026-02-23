import { signIn } from "@/auth";
import { Lock, LogIn } from "lucide-react";

export default function LoginPage() {
    return (
        <div className="relative flex h-screen w-full items-center justify-center overflow-hidden" style={{ background: "linear-gradient(145deg, #0a1628 0%, #0d1117 40%, #0f1923 100%)" }}>
            {/* Subtle radial glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-emerald-600/5 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />

            {/* Subtle grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.015)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

            <div className="z-10 w-full max-w-[440px] px-6">
                {/* Logo */}
                <div className="flex flex-col items-center mb-8">
                    <div className="relative mb-5">
                        <div className="absolute inset-0 rounded-2xl bg-emerald-500/15 blur-xl scale-150" />
                        <div className="relative h-16 w-16 rounded-2xl border border-emerald-500/30 flex items-center justify-center" style={{ background: "linear-gradient(135deg, #0f1f2e 0%, #0a1628 100%)" }}>
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                                <path d="M8 16C8 11.582 11.582 8 16 8C20.418 8 24 11.582 24 16C24 20.418 20.418 24 16 24" stroke="url(#grad)" strokeWidth="2.5" strokeLinecap="round" />
                                <path d="M24 16C24 20.418 20.418 24 16 24C11.582 24 8 20.418 8 16C8 11.582 11.582 8 16 8" stroke="url(#grad)" strokeWidth="2.5" strokeLinecap="round" transform="translate(0, 0)" />
                                <defs>
                                    <linearGradient id="grad" x1="8" y1="8" x2="24" y2="24">
                                        <stop offset="0%" stopColor="#10b981" />
                                        <stop offset="100%" stopColor="#06b6d4" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>
                    </div>
                    <h1 className="text-[26px] font-bold text-white tracking-tight">Nexus AI</h1>
                    <p className="text-[11px] text-gray-500 uppercase tracking-[0.35em] font-medium mt-1">Ops Center Access</p>
                </div>

                {/* Card — dashed border style */}
                <div className="relative rounded-2xl border border-dashed border-gray-700/60 p-8" style={{ background: "rgba(13, 17, 23, 0.6)", backdropFilter: "blur(12px)" }}>
                    <div className="mb-6">
                        <h3 className="text-xl font-bold text-white">Welcome Back</h3>
                        <p className="text-[13px] text-gray-500 mt-1">Authenticate to access deep agent controls.</p>
                    </div>

                    <form
                        action={async (formData) => {
                            "use server";
                            await signIn("credentials", formData);
                        }}
                        className="flex flex-col space-y-5"
                    >
                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-[11px] text-gray-400 uppercase tracking-[0.15em] font-semibold mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500">
                                    <Lock size={16} />
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="••••••••••••"
                                    autoComplete="current-password"
                                    required
                                    className="block w-full rounded-xl border border-gray-700/70 bg-[#0a1628]/80 pl-11 pr-4 py-3.5 text-[14px] text-gray-200 placeholder-gray-600 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/20 transition-all duration-300"
                                />
                            </div>
                        </div>

                        {/* Sign In Button */}
                        <button
                            type="submit"
                            className="relative flex h-[50px] w-full items-center justify-center gap-2 rounded-xl text-[14px] font-semibold text-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.2)] active:scale-[0.98]"
                            style={{ background: "linear-gradient(135deg, #10b981 0%, #0891b2 100%)" }}
                        >
                            <LogIn size={18} />
                            Sign In
                        </button>
                    </form>
                </div>

                {/* Footer */}
                <div className="flex flex-col items-center gap-2 mt-8">
                    <div className="flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-50" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                        </span>
                        <span className="text-[11px] text-gray-600 font-mono tracking-wide">System Status: Operational</span>
                    </div>
                    <p className="text-[10px] text-gray-700 tracking-wide">Protected by Nexus Shield v2.4.0</p>
                </div>
            </div>
        </div>
    );
}
