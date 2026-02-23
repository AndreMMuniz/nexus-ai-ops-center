"use client";

import { signOut } from "next-auth/react";
import { Terminal, Database, LayoutDashboard, Activity, DatabaseBackup, Bug, Beaker, FileText, MessageSquare, LogOut, Wrench } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
    { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/dashboard/traces", icon: Activity, label: "ReAct Traces" },
    { href: "/dashboard/scraper", icon: FileText, label: "Scraper" },
    { href: "/dashboard/ingestion", icon: DatabaseBackup, label: "Data Ingestion" },
    { href: "/dashboard/tests", icon: Beaker, label: "Tests & Eval" },
    { href: "/dashboard/debugger", icon: Bug, label: "Agent Debugger" },
];

const settingsItems = [
    { href: "/dashboard/settings/llm", icon: Terminal, label: "LLM & Providers" },
    { href: "/dashboard/settings/rag", icon: Database, label: "RAG Configs" },
    { href: "/dashboard/settings/tools", icon: Wrench, label: "Tools & Capabilities" },
    { href: "/dashboard/settings/prompts", icon: MessageSquare, label: "Agent Prompts" },
];

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    const NavItem = ({ href, icon: Icon, label }: { href: string; icon: any; label: string }) => {
        const isActive = pathname === href;
        return (
            <Link
                href={href}
                className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm font-medium",
                    isActive
                        ? "bg-emerald-900/20 text-emerald-400 border border-emerald-900/50"
                        : "text-gray-400 hover:text-gray-200 hover:bg-gray-800/50 border border-transparent"
                )}
            >
                <Icon size={18} />
                {label}
            </Link>
        );
    };

    return (
        <div className="min-h-screen flex bg-black text-white font-sans">
            {/* Sidebar */}
            <aside className="w-64 border-r border-gray-800 bg-gray-950 flex flex-col shrink-0">
                <div className="p-6 border-b border-gray-800">
                    <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                        <Terminal className="text-emerald-500" size={24} />
                        Nexus AI
                    </h1>
                    <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider font-semibold">Ops Center</p>
                </div>

                <div className="flex-1 overflow-y-auto py-6 px-4 space-y-6">
                    <div className="space-y-2">
                        {navItems.map((item) => (
                            <NavItem key={item.href} {...item} />
                        ))}
                    </div>

                    <div className="space-y-2">
                        <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Settings</h3>
                        {settingsItems.map((item) => (
                            <NavItem key={item.href} {...item} />
                        ))}
                    </div>
                </div>

                <div className="p-4 border-t border-gray-800">
                    <button
                        onClick={() => signOut({ callbackUrl: "/login" })}
                        className="flex w-full items-center justify-center space-x-2 rounded-md bg-gray-900 border border-gray-800 px-4 py-2 text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
                    >
                        <LogOut className="w-4 h-4" />
                        <span>Log out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                <header className="h-16 border-b border-gray-800 flex items-center px-8 shrink-0">
                    <h2 className="text-lg font-semibold capitalize bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                        {pathname?.split("/").pop()?.replace(/-/g, " ") || "Dashboard"}
                    </h2>
                </header>

                <main className="flex-1 overflow-y-auto p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
