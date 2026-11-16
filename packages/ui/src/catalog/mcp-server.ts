#!/usr/bin/env bun
/**
 * Minimal stdio MCP server for catalog search/get/list.
 *
 *   bun run packages/ui/src/catalog/mcp-server.ts
 *
 * Cursor / Claude Desktop: point an MCP server command at this script.
 */
import { denseEntry, denseIndex } from "./dense";
import { loadCatalogIndex } from "./load";
import { getCatalogEntry, listCatalog, searchCatalog } from "./search";
import type { CatalogKind } from "./types";

type JsonRpcId = string | number | null;
type JsonRpcRequest = {
    jsonrpc?: "2.0";
    id?: JsonRpcId;
    method?: string;
    params?: Record<string, unknown>;
};

const KINDS = new Set<CatalogKind>([
    "docs",
    "foundation",
    "layout",
    "component",
    "module",
    "pattern",
]);

function respond(id: JsonRpcId, result: unknown) {
    process.stdout.write(`${JSON.stringify({ jsonrpc: "2.0", id, result })}\n`);
}

function respondError(id: JsonRpcId, code: number, message: string) {
    process.stdout.write(
        `${JSON.stringify({ jsonrpc: "2.0", id, error: { code, message } })}\n`,
    );
}

function textContent(text: string) {
    return { content: [{ type: "text", text }] };
}

async function handleToolsCall(name: string, args: Record<string, unknown>) {
    const index = await loadCatalogIndex();
    const dense = Boolean(args.dense);
    const kind =
        typeof args.kind === "string" && KINDS.has(args.kind as CatalogKind)
            ? (args.kind as CatalogKind)
            : undefined;
    const limit =
        typeof args.limit === "number" && Number.isFinite(args.limit)
            ? Math.max(1, Math.floor(args.limit))
            : undefined;

    switch (name) {
        case "catalog_search": {
            const query = String(args.query ?? "").trim();
            if (!query) throw new Error("query is required");
            const hits = searchCatalog(index.entries, query, {
                kind,
                limit: limit ?? 20,
            });
            return textContent(
                dense
                    ? denseIndex(hits)
                    : JSON.stringify(
                          hits.map((entry) => ({
                              id: entry.id,
                              kind: entry.kind,
                              title: entry.title,
                              storyId: entry.storyId,
                              goal: entry.agent.goal,
                          })),
                          null,
                          2,
                      ),
            );
        }
        case "catalog_get": {
            const id = String(args.id ?? "").trim();
            if (!id) throw new Error("id is required");
            const entry = getCatalogEntry(index.entries, id);
            if (!entry) throw new Error(`Not found: ${id}`);
            return textContent(dense ? denseEntry(entry) : JSON.stringify(entry, null, 2));
        }
        case "catalog_list": {
            const rows = listCatalog(index.entries, { kind, limit });
            return textContent(
                dense
                    ? denseIndex(rows)
                    : JSON.stringify(
                          rows.map((entry) => ({
                              id: entry.id,
                              kind: entry.kind,
                              title: entry.title,
                              storyId: entry.storyId,
                          })),
                          null,
                          2,
                      ),
            );
        }
        default:
            throw new Error(`Unknown tool: ${name}`);
    }
}

const tools = [
    {
        name: "catalog_search",
        description:
            "Search the ui-starter catalog index (patterns, components, modules, foundations). Prefer --dense for agent context.",
        inputSchema: {
            type: "object",
            properties: {
                query: { type: "string" },
                kind: {
                    type: "string",
                    enum: [...KINDS],
                },
                limit: { type: "number" },
                dense: { type: "boolean" },
            },
            required: ["query"],
        },
    },
    {
        name: "catalog_get",
        description: "Get one catalog entry by id (e.g. button, table-overview, theme-sheet).",
        inputSchema: {
            type: "object",
            properties: {
                id: { type: "string" },
                dense: { type: "boolean" },
            },
            required: ["id"],
        },
    },
    {
        name: "catalog_list",
        description: "List catalog entries, optionally filtered by kind.",
        inputSchema: {
            type: "object",
            properties: {
                kind: {
                    type: "string",
                    enum: [...KINDS],
                },
                limit: { type: "number" },
                dense: { type: "boolean" },
            },
        },
    },
];

async function handle(message: JsonRpcRequest) {
    const id = message.id ?? null;
    const method = message.method ?? "";
    try {
        switch (method) {
            case "initialize":
                respond(id, {
                    protocolVersion: "2024-11-05",
                    capabilities: { tools: {} },
                    serverInfo: { name: "ui-starter-catalog", version: "1.0.0" },
                });
                break;
            case "notifications/initialized":
            case "initialized":
                break;
            case "tools/list":
                respond(id, { tools });
                break;
            case "tools/call": {
                const params = message.params ?? {};
                const name = String(params.name ?? "");
                const args = (params.arguments ?? {}) as Record<string, unknown>;
                const result = await handleToolsCall(name, args);
                respond(id, result);
                break;
            }
            case "ping":
                respond(id, {});
                break;
            default:
                if (id !== null && id !== undefined) {
                    respondError(id, -32601, `Method not found: ${method}`);
                }
        }
    } catch (error) {
        const messageText = error instanceof Error ? error.message : String(error);
        if (id !== null && id !== undefined) {
            respondError(id, -32000, messageText);
        }
    }
}

let buffer = "";
process.stdin.setEncoding("utf8");
process.stdin.on("data", (chunk) => {
    buffer += chunk;
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";
    for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed) continue;
        void handle(JSON.parse(trimmed) as JsonRpcRequest);
    }
});
