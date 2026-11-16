import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import type { CatalogIndex } from "./types";

const here = dirname(fileURLToPath(import.meta.url));
export const catalogIndexPath = join(here, "catalog-index.json");

export async function loadCatalogIndex(
    path: string = catalogIndexPath,
): Promise<CatalogIndex> {
    const raw = await readFile(path, "utf8");
    const parsed = JSON.parse(raw) as CatalogIndex;
    if (parsed.version !== 1 || !Array.isArray(parsed.entries)) {
        throw new Error(`Invalid catalog index at ${path}`);
    }
    return parsed;
}
