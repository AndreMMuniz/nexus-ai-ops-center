export default function DashboardStatusPage() {
    return (
        <div className="space-y-6">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">System Status</h1>
                <p className="mt-2 text-sm text-gray-500">Overview of the Nexus AI application state.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col justify-center items-center">
                    <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                        <div className="h-4 w-4 rounded-full bg-green-500 animate-pulse"></div>
                    </div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Backend Connection</h3>
                    <p className="text-2xl font-bold text-gray-900">Online</p>
                </div>

                {/* Placeholder for future status metrics */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col justify-center items-center">
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Active Agents</h3>
                    <p className="text-2xl font-bold text-gray-900">4</p>
                </div>
            </div>
        </div>
    );
}
