"use server"

export async function fetchOpsStatus() {
    try {
        const res = await fetch(`${process.env.BACKEND_URL}/api/ops/status`, {
            headers: {
                "x-api-key": process.env.BACKEND_API_KEY || "",
            },
            next: { revalidate: 10 }
        });
        if (!res.ok) throw new Error("Failed");
        return await res.json();
    } catch (error) {
        return { status: "offline", agent_initialized: false };
    }
}

export async function fetchOpsLogs() {
    try {
        const res = await fetch(`${process.env.BACKEND_URL}/api/ops/logs`, {
            headers: {
                "x-api-key": process.env.BACKEND_API_KEY || "",
            },
            cache: 'no-store'
        });
        if (!res.ok) throw new Error("Failed");
        const data = await res.json();
        return data.logs || [];
    } catch (error) {
        return [];
    }
}
