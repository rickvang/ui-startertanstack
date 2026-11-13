import type { AgentGuidance } from "./types";

declare module "storybook/internal/csf" {
    interface Parameters {
        /** Structured agent instructions for this story. */
        agent?: AgentGuidance;
    }
}

export {};
