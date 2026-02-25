"use client";

import { useState } from 'react';
import { Mail, Lock, LogIn, Fingerprint, Building2, ShieldCheck } from "lucide-react";
import { NexusLogo } from "@/components/NexusLogo";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [errorMessage, setErrorMessage] = useState("");
    const [isPending, setIsPending] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsPending(true);
        setErrorMessage("");

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        try {
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                setErrorMessage("Invalid credentials.");
            } else if (result?.ok) {
                router.push("/dashboard");
                router.refresh();
            }
        } catch (error) {
            setErrorMessage("Something went wrong.");
        } finally {
            setIsPending(false);
        }
    };

    return (
        <div className="bg-[#0B0F19] font-sans antialiased h-screen overflow-hidden flex items-center justify-center relative selection:bg-[#00DC82] selection:text-black">

            {/* Background elements */}
            <div className="absolute inset-0 z-0 bg-[#050B14]">
                <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-[#3B82F6]/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[800px] bg-[#00DC82]/5 rounded-full blur-[120px]"></div>
                <div className="absolute top-[40%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[100px]"></div>

                {/* Cyber Grid Pattern */}
                <div
                    className="absolute inset-0 opacity-[0.07]"
                    style={{
                        backgroundImage: `linear-gradient(to right, #1f2937 1px, transparent 1px), linear-gradient(to bottom, #1f2937 1px, transparent 1px)`,
                        backgroundSize: '40px 40px',
                        maskImage: 'linear-gradient(to bottom, transparent, 10%, white, 90%, transparent)',
                        WebkitMaskImage: 'linear-gradient(to bottom, transparent, 10%, white, 90%, transparent)'
                    }}
                />
            </div>

            <main className="w-full max-w-md mx-4 relative z-10">
                <div className="flex flex-col items-center justify-center mb-8">
                    <div className="mb-4" style={{ filter: 'drop-shadow(0 0 25px rgba(0, 220, 130, 0.3))' }}>
                        <NexusLogo size={64} className="rounded-2xl" />
                    </div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Nexus AI</h1>
                    <p className="text-sm text-gray-400 font-mono mt-1 tracking-wider uppercase">Ops Center Access</p>
                </div>

                <div className="rounded-2xl p-8" style={{ background: 'rgba(13, 18, 30, 0.65)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255, 255, 255, 0.08)', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-white mb-1">Welcome Back</h2>
                        <p className="text-sm text-gray-400">Authenticate to access deep agent controls.</p>
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >
                        <div className="group">
                            <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wide transition-colors group-focus-within:text-[#3B82F6]" htmlFor="email">Email Address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="text-gray-500 w-5 h-5 transition-colors group-focus-within:text-[#3B82F6]" />
                                </div>
                                <input
                                    className="block w-full pl-10 pr-3 py-2.5 rounded-lg text-gray-200 placeholder-gray-600 sm:text-sm focus:outline-none focus:ring-1 focus:ring-[#3B82F6]/50 transition-all duration-300"
                                    style={{ background: 'rgba(0, 0, 0, 0.2)', border: '1px solid rgba(75, 85, 99, 0.4)' }}
                                    id="email"
                                    name="email"
                                    placeholder="your@email.com"
                                    type="email"
                                    required
                                />
                            </div>
                        </div>

                        <div className="group">
                            <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wide transition-colors group-focus-within:text-[#3B82F6]" htmlFor="password">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="text-gray-500 w-5 h-5 transition-colors group-focus-within:text-[#3B82F6]" />
                                </div>
                                <input
                                    className="block w-full pl-10 pr-3 py-2.5 rounded-lg text-gray-200 placeholder-gray-600 sm:text-sm focus:outline-none focus:ring-1 focus:ring-[#3B82F6]/50 transition-all duration-300"
                                    style={{ background: 'rgba(0, 0, 0, 0.2)', border: '1px solid rgba(75, 85, 99, 0.4)' }}
                                    id="password"
                                    name="password"
                                    placeholder="••••••••••••"
                                    type="password"
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input className="h-4 w-4 rounded border-gray-600 bg-black/40 text-[#00DC82] focus:ring-[#00DC82]/50 focus:ring-offset-0 focus:ring-offset-transparent outline-none" id="remember-me" name="remember-me" type="checkbox" />
                                <label className="ml-2 block text-xs text-gray-400" htmlFor="remember-me">Remember device</label>
                            </div>
                            <div className="text-xs">
                                <a className="font-medium text-[#3B82F6] hover:text-[#3B82F6]/80 hover:underline transition-colors" href="#">Forgot password?</a>
                            </div>
                        </div>

                        {errorMessage && (
                            <div className="text-sm text-red-500 text-center font-medium bg-red-500/10 py-2 rounded-lg border border-red-500/20">
                                {errorMessage}
                            </div>
                        )}

                        <div>
                            <button
                                className="group relative w-full flex justify-center py-2.5 px-4 text-sm font-semibold rounded-lg text-white transition-all shadow-lg hover:shadow-blue-500/25 active:scale-[0.98]"
                                style={{ background: 'linear-gradient(to right, #059669, #2563eb)' }}
                                type="submit"
                                aria-disabled={isPending}
                            >
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                    <LogIn className="text-white/50 group-hover:text-white transition-colors w-5 h-5" />
                                </span>
                                {isPending ? "Authenticating..." : "Sign In"}
                                <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-white/20 group-hover:ring-white/30"></div>
                            </button>
                        </div>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-700/50"></div>
                            </div>
                            <div className="relative flex justify-center text-xs">
                                <span className="px-2 bg-[#121826] text-gray-500 rounded text-[10px] uppercase tracking-wider">Or continue with</span>
                            </div>
                        </div>
                        <div className="mt-6 grid grid-cols-2 gap-3">
                            <button className="flex items-center justify-center w-full px-4 py-2 border border-gray-700 rounded-lg shadow-sm bg-black/20 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white hover:border-gray-500 transition-all group" type="button">
                                <Building2 className="w-5 h-5 mr-2 text-gray-500 group-hover:text-white" />
                                <span className="text-xs">SSO Login</span>
                            </button>
                            <button className="flex items-center justify-center w-full px-4 py-2 border border-gray-700 rounded-lg shadow-sm bg-black/20 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white hover:border-gray-500 transition-all group" type="button">
                                <Fingerprint className="w-5 h-5 mr-2 text-gray-500 group-hover:text-white" />
                                <span className="text-xs">Passkey</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-8 text-center space-y-2">
                    <p className="text-[10px] text-gray-600 font-mono">
                        <span className="w-2 h-2 rounded-full bg-emerald-500/50 inline-block mr-1"></span>
                        System Status: Operational
                    </p>
                    <p className="text-[10px] text-gray-700 flex items-center justify-center gap-1">
                        <ShieldCheck className="w-3 h-3" />
                        Protected by Nexus Shield v2.4.0
                    </p>
                </div>
            </main>
        </div>
    );
}
