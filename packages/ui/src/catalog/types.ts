import type { AgentGuidance } from "../../.storybook/addons/agent/types";

export type CatalogKind =
    | "docs"
    | "foundation"
    | "layout"
    | "component"
    | "module"
    | "pattern";

export type CatalogEntry = {
    /** Stable machine id, e.g. `button` or `table-overview`. */
    id: string;
    kind: CatalogKind;
    /** Human title from the Storybook story (or leaf of the story title). */
    title: string;
    /** Storybook `meta.title` path. */
    storyTitle: string;
    /** Storybook story export / display name. */
    storyName: string;
    /** Storybook story id for `?path=/story/...`. */
    storyId: string;
    /** Relative path to the story file from `packages/ui`. */
    source: string;
    keywords: readonly string[];
    agent: AgentGuidance;
};

export type CatalogIndex = {
    version: 1;
    generatedAt: string;
    entries: CatalogEntry[];
};
