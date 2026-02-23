"use client";

import { MetricsOverview } from "@/components/dashboard/MetricsOverview";
import { LiveTerminalPanel } from "@/components/dashboard/LiveTerminalPanel";
import { ServiceControls } from "@/components/dashboard/ServiceControls";
import { ClusterResources, RecentDeployments } from "@/components/dashboard/ClusterResources";

export default function DashboardPage() {
    return (
        <div className="max-w-[1600px] mx-auto w-full">
            <MetricsOverview />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Main Terminal Column */}
                <div className="lg:col-span-2">
                    <LiveTerminalPanel />
                </div>

                {/* Service Controls Column */}
                <div className="lg:col-span-1">
                    <ServiceControls />
                </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <RecentDeployments />
                <ClusterResources />
            </div>

            <footer className="mt-8 text-center pb-8">
                <p className="text-[10px] text-gray-600">Nexus Ops Dashboard v2.4.0 © 2026</p>
            </footer>
        </div>
    );
}
