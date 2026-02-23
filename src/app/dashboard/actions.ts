"use server";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8000";
const API_KEY = process.env.BACKEND_API_KEY || "";

async function backendFetch(path: string, options?: RequestInit) {
    return fetch(`${BACKEND_URL}${path}`, {
        ...options,
        headers: {
            "x-api-key": API_KEY,
            "Content-Type": "application/json",
            ...options?.headers,
        },
    });
}

export async function fetchOpsStatus() {
    try {
        const res = await backendFetch("/api/ops/status", { next: { revalidate: 10 } } as RequestInit & { next?: any });
        if (!res.ok) throw new Error("Failed");
        return await res.json();
    } catch {
        return { status: "offline", agent_initialized: false };
    }
}

export async function fetchOpsMetrics() {
    try {
        const res = await backendFetch("/api/ops/metrics", { next: { revalidate: 10 } } as RequestInit & { next?: any });
        if (!res.ok) throw new Error("Failed");
        return await res.json();
    } catch {
        return {
            total_agents: 0,
            tokens_usage: "0",
            cpu_usage: 0,
            memory_usage: 0,
            storage_usage: 0
        };
    }
}

export async function fetchOpsLogs() {
    try {
        const res = await backendFetch("/api/ops/logs", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed");
        const data = await res.json();
        return data.logs || [];
    } catch {
        return [];
    }
}

export async function fetchBackendLogs(full = false, since = 0) {
    try {
        const params = full ? "?full=true" : `?since=${since}`;
        const res = await backendFetch(`/api/ops/backend-logs${params}`, { cache: "no-store" });
        if (!res.ok) throw new Error("Failed");
        return await res.json();
    } catch {
        return { lines: [], size: 0 };
    }
}

export async function runScraper(topics: number) {
    try {
        const res = await backendFetch("/api/ops/scraper", {
            method: "POST",
            body: JSON.stringify({ topics }),
        });
        return await res.json();
    } catch {
        return { status: "error", detail: "Failed to connect to backend" };
    }
}

export async function fetchIngestionStatus() {
    try {
        const res = await backendFetch("/api/ops/ingestion-status", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed");
        return await res.json();
    } catch {
        return { needsIngestion: false, pendingItems: [] };
    }
}

export async function runIngestion() {
    try {
        const res = await backendFetch("/api/ops/ingest", { method: "POST" });
        return await res.json();
    } catch {
        return { status: "error" };
    }
}

export async function runTests(mode: string) {
    try {
        const res = await backendFetch("/api/ops/tests", {
            method: "POST",
            body: JSON.stringify({ mode }),
        });
        return await res.json();
    } catch (e: any) {
        return { output: "ERROR: " + e.toString() };
    }
}

export async function fetchSettings() {
    try {
        const res = await backendFetch("/api/ops/settings", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed");
        return await res.json();
    } catch {
        return { settings: {} };
    }
}

export async function saveSettings(settings: Record<string, string>) {
    try {
        const res = await backendFetch("/api/ops/settings", {
            method: "POST",
            body: JSON.stringify({ settings }),
        });
        return await res.json();
    } catch {
        return { status: "error" };
    }
}

export async function fetchPrompts() {
    try {
        const res = await backendFetch("/api/ops/prompts", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed");
        return await res.json();
    } catch {
        return { prompts: {} };
    }
}

export async function savePrompts(prompts: Record<string, string>) {
    try {
        const res = await backendFetch("/api/ops/prompts", {
            method: "POST",
            body: JSON.stringify({ prompts }),
        });
        return await res.json();
    } catch {
        return { status: "error" };
    }
}

export async function clearLogs() {
    try {
        const res = await backendFetch("/api/ops/logs", { method: "DELETE" });
        return await res.json();
    } catch {
        return { status: "error" };
    }
}

export async function getTerminalOutput() {
    try {
        const res = await backendFetch("/api/ops/terminal", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed");
        return await res.json();
    } catch {
        return { running: false, output: [] };
    }
}

export async function startTerminal() {
    try {
        const res = await backendFetch("/api/ops/terminal", {
            method: "POST",
            body: JSON.stringify({ action: "start" }),
        });
        return await res.json();
    } catch {
        return { status: "error" };
    }
}

export async function stopTerminal() {
    try {
        const res = await backendFetch("/api/ops/terminal", {
            method: "POST",
            body: JSON.stringify({ action: "stop" }),
        });
        return await res.json();
    } catch {
        return { status: "error" };
    }
}

export async function sendTerminalInput(input: string) {
    try {
        const res = await backendFetch("/api/ops/terminal", {
            method: "POST",
            body: JSON.stringify({ action: "input", input }),
        });
        return await res.json();
    } catch {
        return { status: "error" };
    }
}
