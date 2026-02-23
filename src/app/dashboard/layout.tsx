"use client";

import { signOut } from "next-auth/react";
import {
    Activity, LayoutDashboard, DatabaseBackup, Bug, Beaker, FileText,
    MessageSquare, Wrench, Database, Terminal, LogOut, Bell, HelpCircle
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
    { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/dashboard/traces", Icon: Activity, label: "ReAct Traces" },
    { href: "/dashboard/scraper", Icon: FileText, label: "Scraper" },
    { href: "/dashboard/ingestion", Icon: DatabaseBackup, label: "Data Ingestion" },
    { href: "/dashboard/tests", Icon: Beaker, label: "Tests & Eval" },
    { href: "/dashboard/debugger", Icon: Bug, label: "Agent Debugger" },
];

const settingsItems = [
    { href: "/dashboard/settings/llm", Icon: Terminal, label: "LLM & Providers" },
    { href: "/dashboard/settings/rag", Icon: Database, label: "RAG Configs" },
    { href: "/dashboard/settings/tools", Icon: Wrench, label: "Tools & Capabilities" },
    { href: "/dashboard/settings/prompts", Icon: MessageSquare, label: "Agent Prompts" },
];

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    interface NavItemProps {
        href: string;
        icon?: React.ElementType;
        Icon?: React.ElementType;
        label: string;
    }

    const NavItem = ({ href, icon: IconComponent, Icon: AltIcon, label }: NavItemProps) => {
        const isActive = pathname === href;
        const FinalIcon = (IconComponent || AltIcon) as React.ElementType;
        return (
            <Link
                href={href}
                className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-r-lg text-sm font-medium transition-all group border-l-[3px]",
                    isActive
                        ? "text-[#00DC82] border-[#00DC82]"
                        : "text-gray-400 hover:text-white hover:bg-white/5 border-transparent"
                )}
                style={isActive ? { background: "linear-gradient(90deg, rgba(0, 220, 130, 0.1) 0%, rgba(0, 220, 130, 0) 100%)" } : {}}
            >
                {FinalIcon && <FinalIcon className={cn("w-5 h-5 transition-colors", isActive ? "" : "group-hover:text-[#00DC82]")} />}
                {label}
            </Link>
        );
    };

    return (
        <div className="bg-[#0B0F19] text-gray-300 font-sans antialiased h-screen overflow-hidden flex selection:bg-[#00DC82] selection:text-black">

            {/* Sidebar */}
            <aside
                className="w-64 h-full flex flex-col border-r border-[#1F2937] z-20 relative"
                style={{ background: "rgba(17, 24, 39, 0.75)", backdropFilter: "blur(12px)" }}
            >
                {/* Logo Area */}
                <div className="p-6 flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-gradient-to-br from-[#00DC82] to-[#3B82F6] flex items-center justify-center shadow-[0_0_20px_-5px_rgba(0,220,130,0.3)]">
                        <Activity className="text-white w-5 h-5" />
                    </div>
                    <div>
                        <h1 className="font-bold text-lg tracking-tight text-white leading-none">Nexus AI</h1>
                        <p className="text-[10px] text-[#00DC82] font-semibold tracking-wider mt-0.5">OPS CENTER</p>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto py-4 space-y-1 custom-scrollbar">
                    <div className="px-4 mb-2">
                        <p className="text-[10px] uppercase font-bold text-gray-500 tracking-wider mb-2 px-2">Platform</p>
                        {navItems.map((item) => (
                            <NavItem key={item.href} {...item} />
                        ))}
                    </div>

                    <div className="px-4 mt-8">
                        <p className="text-[10px] uppercase font-bold text-gray-500 tracking-wider mb-2 px-2">Configuration</p>
                        {settingsItems.map((item) => (
                            <NavItem key={item.href} {...item} />
                        ))}
                    </div>
                </nav>

                {/* User / Status Area */}
                <div className="p-4 border-t border-[#1F2937] bg-black/20">
                    <div className="bg-black/40 rounded-lg p-3 border border-white/5 mb-3">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-semibold text-gray-500">API Status</span>
                            <div className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]"></span>
                                <span className="text-[10px] text-gray-400">High Load</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-gray-500">Nexus Node</span>
                            <div className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#00DC82] shadow-[0_0_8px_rgba(0,220,130,0.6)]"></span>
                                <span className="text-[10px] text-[#00DC82]">Active</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between px-1">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-gray-700 to-gray-600 flex items-center justify-center text-xs font-bold text-white border border-gray-500">
                                AD
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs font-medium text-white">Admin User</span>
                                <span className="text-[10px] text-gray-500">admin@nexus.local</span>
                            </div>
                        </div>
                        <button onClick={() => signOut({ callbackUrl: "/login" })} className="text-gray-500 hover:text-red-400 transition-colors">
                            <LogOut className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col relative overflow-hidden bg-[#0B0F19]">
                {/* Background Glows */}
                <div className="absolute inset-0 z-0 opacity-30 pointer-events-none overflow-hidden">
                    <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#3B82F6]/10 rounded-full blur-[100px]"></div>
                    <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-[#00DC82]/5 rounded-full blur-[100px]"></div>
                </div>

                {/* Header */}
                <header
                    className="h-16 border-b border-[#1F2937] flex items-center justify-between px-8 z-10 shrink-0"
                    style={{ background: "rgba(17, 24, 39, 0.75)", backdropFilter: "blur(12px)" }}
                >
                    <h2 className="text-xl font-semibold text-white tracking-tight capitalize">
                        {pathname?.split("/").pop()?.replace(/-/g, " ") || "Dashboard"}
                    </h2>
                    <div className="flex items-center gap-4">
                        <button className="relative p-2 rounded-lg text-gray-500 hover:bg-white/5 transition-colors">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-[#00DC82] rounded-full border-2 border-[#0B0F19]"></span>
                        </button>
                        <div className="h-6 w-px bg-gray-700"></div>
                        <button className="flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white transition-colors">
                            <HelpCircle className="w-5 h-5" />
                            Documentation
                        </button>
                    </div>
                </header>

                <div
                    className="flex-1 overflow-y-auto p-4 md:p-8 relative z-10 custom-scrollbar"
                    id="dashboard-scroll-area"
                >
                    {children}
                </div>
            </main>

            <style dangerouslySetInnerHTML={{
                __html: `
                .custom-scrollbar::-webkit-scrollbar { width: 6px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: rgba(31, 41, 55, 0.5); }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #374151; border-radius: 3px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #4B5563; }
            `}} />
        </div>
    );
}
