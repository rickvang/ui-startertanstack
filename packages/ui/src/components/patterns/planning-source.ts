export type EvidenceKind = "illustration" | "assumption";

export type ReleaseSlice = "mvp" | "later";

export type StoryItem = {
    id: string;
    task: string;
    story: string;
    slice: ReleaseSlice;
    opportunity: string;
};

export type Activity = {
    id: string;
    label: string;
    stories: readonly StoryItem[];
};

export type JourneyStage = {
    id: string;
    label: string;
    action: string;
    touchpoint: string;
    need: string;
    pain: string;
    opportunity: string;
    thought?: { kind: EvidenceKind; text: string };
};

export type PlanningSource = {
    product: string;
    goal: string;
    persona: string;
    scenario: string;
    note: string;
    activities: readonly Activity[];
    stages: readonly JourneyStage[];
};

export const northVisitSource: PlanningSource = {
    product: "North visits (fictional illustration)",
    goal: "Ada can review a visit and mark it done without leaving the list.",
    persona: "Ada North, reviewer. She opens the list on a phone between visits.",
    scenario: "A visit is waiting. Ada needs the facts, a decision, and a way back to the list.",
    note: "Fictional illustration. Not client work. Thoughts below are labeled assumptions.",
    activities: [
        {
            id: "find",
            label: "Find the visit",
            stories: [
                { id: "open-list", task: "Open the queue", story: "See visits that need a review.", slice: "mvp", opportunity: "Keep the list in view." },
                { id: "filter-status", task: "Filter by status", story: "Show only visits waiting on me.", slice: "later", opportunity: "Keep the list in view." },
            ],
        },
        {
            id: "read",
            label: "Read the facts",
            stories: [
                { id: "open-beside", task: "Open one visit", story: "Read the visit beside the list.", slice: "mvp", opportunity: "Keep the list in view." },
                { id: "see-status", task: "See why it waits", story: "Show the status and who last touched it.", slice: "mvp", opportunity: "Name the wait." },
            ],
        },
        {
            id: "decide",
            label: "Decide",
            stories: [
                { id: "mark-done", task: "Mark done", story: "Mark the visit done without leaving the list.", slice: "mvp", opportunity: "Finish without leaving." },
                { id: "ask-more", task: "Ask for more", story: "Send it back with one note.", slice: "later", opportunity: "Finish without leaving." },
            ],
        },
        {
            id: "return",
            label: "Return",
            stories: [
                { id: "close-panel", task: "Close the visit", story: "Return to the same place in the list.", slice: "mvp", opportunity: "Keep the list in view." },
                { id: "next-visit", task: "Open the next", story: "Move to the next waiting visit.", slice: "later", opportunity: "Finish without leaving." },
            ],
        },
    ],
    stages: [
        {
            id: "arrive",
            label: "Arrive",
            action: "Opens the visits list.",
            touchpoint: "List on the phone.",
            need: "See what still needs a review.",
            pain: "The list and the visit compete for the same screen.",
            opportunity: "Keep the list in view.",
            thought: { kind: "assumption", text: "She will not switch to a desk for this." },
        },
        {
            id: "inspect",
            label: "Inspect",
            action: "Opens one visit.",
            touchpoint: "Visit beside the list.",
            need: "The facts and the status in one place.",
            pain: "It is not obvious why the visit is still waiting.",
            opportunity: "Name the wait.",
        },
        {
            id: "act",
            label: "Act",
            action: "Marks the visit done.",
            touchpoint: "Done on the visit.",
            need: "Finish without losing the list.",
            pain: "Leaving the list to save loses her place.",
            opportunity: "Finish without leaving.",
        },
        {
            id: "leave",
            label: "Leave",
            action: "Closes the visit.",
            touchpoint: "Close on the panel.",
            need: "The same scroll position, ready for the next row.",
            pain: "The list jumps to the top.",
            opportunity: "Keep the list in view.",
        },
    ],
};

export const slices: readonly { id: ReleaseSlice; label: string; outcome: string }[] = [
    { id: "mvp", label: "MVP", outcome: "Review one visit beside the list and mark it done." },
    { id: "later", label: "Later", outcome: "Filter the queue and move to the next visit." },
];

export function storiesFor(source: PlanningSource, opportunity: string): readonly StoryItem[] {
    return source.activities.flatMap((activity) => activity.stories.filter((story) => story.opportunity === opportunity));
}

export function parsePlanningSource(text: string): { source: PlanningSource | null; error: string | null } {
    try {
        const parsed: unknown = JSON.parse(text);
        const error = validatePlanningSource(parsed);
        if (error) {
            return { source: null, error };
        }
        return { source: parsed as PlanningSource, error: null };
    } catch {
        return { source: null, error: "The source is not valid JSON." };
    }
}

export function planningSourceText(source: PlanningSource): string {
    return `${JSON.stringify(source, null, 2)}\n`;
}

export function storyMapText(source: PlanningSource): string {
    const lines = [
        `Story map · ${source.product}`,
        `Goal: ${source.goal}`,
        `Note: ${source.note}`,
        "",
    ];

    for (const slice of slices) {
        lines.push(`${slice.label} — ${slice.outcome}`);
        for (const activity of source.activities) {
            const items = activity.stories.filter((story) => story.slice === slice.id);
            if (items.length === 0) {
                continue;
            }
            lines.push(`  ${activity.label}`);
            for (const item of items) {
                lines.push(`    ${item.task}: ${item.story} [${item.opportunity}]`);
            }
        }
        lines.push("");
    }

    return lines.join("\n").trimEnd();
}

export function journeyText(source: PlanningSource): string {
    const lines = [
        `Journey · ${source.product}`,
        `Persona: ${source.persona}`,
        `Scenario: ${source.scenario}`,
        `Goal: ${source.goal}`,
        `Note: ${source.note}`,
        "",
    ];

    for (const stage of source.stages) {
        lines.push(stage.label);
        lines.push(`  Action: ${stage.action}`);
        lines.push(`  Touchpoint: ${stage.touchpoint}`);
        lines.push(`  Need: ${stage.need}`);
        lines.push(`  Pain: ${stage.pain}`);
        lines.push(`  Opportunity: ${stage.opportunity}`);
        if (stage.thought) {
            lines.push(`  Thought (${stage.thought.kind}): ${stage.thought.text}`);
        }
        const mapped = storiesFor(source, stage.opportunity);
        if (mapped.length > 0) {
            lines.push(`  Stories: ${mapped.map((item) => item.story).join("; ")}`);
        }
        lines.push("");
    }

    return lines.join("\n").trimEnd();
}

export function mappingText(source: PlanningSource): string {
    const lines = [`Mapping · ${source.product}`, `Goal: ${source.goal}`, ""];
    const opportunities = [...new Set(source.stages.map((stage) => stage.opportunity))];

    for (const opportunity of opportunities) {
        const mapped = storiesFor(source, opportunity);
        lines.push(opportunity);
        if (mapped.length === 0) {
            lines.push("  None yet.");
        } else {
            for (const item of mapped) {
                lines.push(`  ${item.story}`);
            }
        }
        lines.push("");
    }

    return lines.join("\n").trimEnd();
}

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isSlice(value: unknown): value is ReleaseSlice {
    return value === "mvp" || value === "later";
}

function isKind(value: unknown): value is EvidenceKind {
    return value === "illustration" || value === "assumption";
}

function readString(record: Record<string, unknown>, key: string): string | null {
    const value = record[key];
    return typeof value === "string" && value.trim().length > 0 ? value : null;
}

function validatePlanningSource(value: unknown): string | null {
    if (!isRecord(value)) {
        return "The source must be an object.";
    }

    for (const key of ["product", "goal", "persona", "scenario", "note"] as const) {
        if (!readString(value, key)) {
            return `Missing ${key}.`;
        }
    }

    if (!Array.isArray(value.activities) || value.activities.length === 0) {
        return "Add at least one activity.";
    }

    if (!Array.isArray(value.stages) || value.stages.length === 0) {
        return "Add at least one journey stage.";
    }

    for (const activity of value.activities) {
        if (!isRecord(activity) || !readString(activity, "id") || !readString(activity, "label") || !Array.isArray(activity.stories) || activity.stories.length === 0) {
            return "Each activity needs an id, a label, and stories.";
        }
        for (const story of activity.stories) {
            if (
                !isRecord(story) ||
                !readString(story, "id") ||
                !readString(story, "task") ||
                !readString(story, "story") ||
                !isSlice(story.slice) ||
                !readString(story, "opportunity")
            ) {
                return "Each story needs id, task, story, slice (mvp or later), and opportunity.";
            }
        }
    }

    for (const stage of value.stages) {
        if (
            !isRecord(stage) ||
            !readString(stage, "id") ||
            !readString(stage, "label") ||
            !readString(stage, "action") ||
            !readString(stage, "touchpoint") ||
            !readString(stage, "need") ||
            !readString(stage, "pain") ||
            !readString(stage, "opportunity")
        ) {
            return "Each stage needs id, label, action, touchpoint, need, pain, and opportunity.";
        }
        if ("thought" in stage && stage.thought !== undefined) {
            if (!isRecord(stage.thought) || !isKind(stage.thought.kind) || !readString(stage.thought, "text")) {
                return "A thought needs kind (illustration or assumption) and text.";
            }
        }
    }

    return null;
}
