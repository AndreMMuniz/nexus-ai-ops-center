"use server"

export async function fetchOpsStatus() {
    try {
        const res = await fetch(`${process.env.BACKEND_URL}/api/ops/status`, {
            headers: {
                "x-api-key": process.env.AUTH_SECRET || "A3B49E7C0F12D58A9B48E67F1C98D20E", // In a real app we'll sync this key
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
                "x-api-key": process.env.AUTH_SECRET || "A3B49E7C0F12D58A9B48E67F1C98D20E",
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
