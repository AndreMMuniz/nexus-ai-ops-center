import { signOut } from "@/auth";
import { FormEvent } from "react";
import { LogOut, Terminal, Activity, FileText } from "lucide-react";
import Link from "next/link";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen overflow-hidden bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md flex flex-col">
                <div className="p-4 border-b border-gray-200">
                    <h1 className="text-xl font-bold font-mono tracking-tighter text-black">
                        NEXUS <span className="text-blue-600">OPS</span>
                    </h1>
                </div>

                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    <Link href="/dashboard" className="flex items-center space-x-3 text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md transition-colors">
                        <Activity className="w-5 h-5 text-gray-500" />
                        <span className="font-medium">Status</span>
                    </Link>
                    <Link href="/dashboard/terminal" className="flex items-center space-x-3 text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md transition-colors">
                        <Terminal className="w-5 h-5 text-gray-500" />
                        <span className="font-medium">Terminal</span>
                    </Link>
                    <Link href="/dashboard/logs" className="flex items-center space-x-3 text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md transition-colors">
                        <FileText className="w-5 h-5 text-gray-500" />
                        <span className="font-medium">Logs</span>
                    </Link>
                </nav>

                <div className="p-4 border-t border-gray-200">
                    <form
                        action={async () => {
                            "use server";
                            await signOut({ redirectTo: "/login" });
                        }}
                    >
                        <button
                            type="submit"
                            className="flex w-full items-center justify-center space-x-2 rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors"
                        >
                            <LogOut className="w-4 h-4" />
                            <span>Log out</span>
                        </button>
                    </form>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
