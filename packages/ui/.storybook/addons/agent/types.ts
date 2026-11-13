/** Structured guidance for how an agent should choose and apply a catalog piece. */
export type AgentCase = {
    /** Short name of the use case or variation. */
    name: string;
    /** When this case is the right choice. */
    when: string;
    /** What to do / which API shape to apply. */
    use: string;
    /** What to skip for this case. */
    avoid?: string;
};

export type AgentDecision = {
    /** The fork the agent is resolving. */
    title: string;
    /** The preferred path. */
    choose: string;
    /** The tempting wrong path. */
    insteadOf?: string;
};

export type AgentGuidance = {
    /** One-sentence job for the agent on this story. */
    goal: string;
    /** Concrete use cases with when / use / avoid. */
    cases?: readonly AgentCase[];
    /** Cross-cutting “prefer this” rules. */
    when?: readonly string[];
    /** Cross-cutting “do not” rules. */
    avoid?: readonly string[];
    /** Named decision forks. */
    decisions?: readonly AgentDecision[];
};

export const AGENT_PARAM_KEY = "agent" as const;
export const ADDON_ID = "ui-starter/agent";
export const PANEL_ID = `${ADDON_ID}/panel`;
