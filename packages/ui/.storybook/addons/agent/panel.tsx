import { createElement, type CSSProperties, type ReactNode } from "react";
import { AddonPanel } from "storybook/internal/components";
import { useParameter } from "storybook/manager-api";
import type { AgentCase, AgentDecision, AgentGuidance } from "./types";
import { AGENT_PARAM_KEY } from "./types";

const ink = "#2a2620";
const muted = "#6b655c";
const line = "#e5ded2";
const paper = "#fffefb";
const wash = "#efeae2";
const teal = "#0f766e";

const rootStyle: CSSProperties = {
    fontFamily: '"Instrument Sans", "Segoe UI", sans-serif',
    color: ink,
    padding: "1rem 1.15rem 1.5rem",
    height: "100%",
    overflow: "auto",
    background: paper,
};

const labelStyle: CSSProperties = {
    margin: "0 0 0.35rem",
    fontSize: "0.6875rem",
    fontWeight: 700,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: muted,
};

const sectionStyle: CSSProperties = {
    marginTop: "1.15rem",
};

const goalStyle: CSSProperties = {
    margin: 0,
    fontSize: "0.95rem",
    lineHeight: 1.55,
    fontWeight: 500,
};

const listStyle: CSSProperties = {
    margin: 0,
    paddingLeft: "1.15rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.4rem",
    fontSize: "0.875rem",
    lineHeight: 1.5,
    color: muted,
};

const caseStyle: CSSProperties = {
    borderTop: `1px solid ${line}`,
    padding: "0.75rem 0 0.15rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.35rem",
};

const caseTitleStyle: CSSProperties = {
    margin: 0,
    fontSize: "0.875rem",
    fontWeight: 600,
    color: ink,
};

const rowStyle: CSSProperties = {
    margin: 0,
    fontSize: "0.8125rem",
    lineHeight: 1.5,
    color: muted,
};

const keyStyle: CSSProperties = {
    color: teal,
    fontWeight: 600,
    marginRight: "0.35rem",
};

const emptyStyle: CSSProperties = {
    margin: "2rem auto",
    maxWidth: "28rem",
    textAlign: "center",
    color: muted,
    fontSize: "0.875rem",
    lineHeight: 1.55,
};

const washBoxStyle: CSSProperties = {
    background: wash,
    borderRadius: 4,
    padding: "0 0.85rem 0.65rem",
};

function row(label: string, body: string): ReactNode {
    return createElement(
        "p",
        { style: rowStyle },
        createElement("span", { style: keyStyle }, `${label} `),
        body,
    );
}

function CaseBlock({ item }: { item: AgentCase }) {
    return createElement(
        "article",
        { style: caseStyle },
        createElement("h4", { style: caseTitleStyle }, item.name),
        row("When", item.when),
        row("Use", item.use),
        item.avoid ? row("Avoid", item.avoid) : null,
    );
}

function DecisionBlock({ item }: { item: AgentDecision }) {
    return createElement(
        "article",
        { style: caseStyle },
        createElement("h4", { style: caseTitleStyle }, item.title),
        row("Choose", item.choose),
        item.insteadOf ? row("Instead of", item.insteadOf) : null,
    );
}

function AgentGuidanceView({ guidance }: { guidance: AgentGuidance }) {
    return createElement(
        "div",
        { style: rootStyle },
        createElement("p", { style: labelStyle }, "Goal"),
        createElement("p", { style: goalStyle }, guidance.goal),
        guidance.cases && guidance.cases.length > 0
            ? createElement(
                  "section",
                  { style: sectionStyle },
                  createElement("p", { style: labelStyle }, "Cases"),
                  createElement(
                      "div",
                      { style: washBoxStyle },
                      guidance.cases.map((item) => createElement(CaseBlock, { key: item.name, item })),
                  ),
              )
            : null,
        guidance.when && guidance.when.length > 0
            ? createElement(
                  "section",
                  { style: sectionStyle },
                  createElement("p", { style: labelStyle }, "When"),
                  createElement(
                      "ul",
                      { style: listStyle },
                      guidance.when.map((item) => createElement("li", { key: item }, item)),
                  ),
              )
            : null,
        guidance.avoid && guidance.avoid.length > 0
            ? createElement(
                  "section",
                  { style: sectionStyle },
                  createElement("p", { style: labelStyle }, "Avoid"),
                  createElement(
                      "ul",
                      { style: listStyle },
                      guidance.avoid.map((item) => createElement("li", { key: item }, item)),
                  ),
              )
            : null,
        guidance.decisions && guidance.decisions.length > 0
            ? createElement(
                  "section",
                  { style: sectionStyle },
                  createElement("p", { style: labelStyle }, "Decisions"),
                  createElement(
                      "div",
                      { style: washBoxStyle },
                      guidance.decisions.map((item) => createElement(DecisionBlock, { key: item.title, item })),
                  ),
              )
            : null,
    );
}

export function AgentPanel({ active }: { active?: boolean }) {
    const guidance = useParameter<AgentGuidance | undefined>(AGENT_PARAM_KEY, undefined);

    return createElement(
        AddonPanel,
        { active: Boolean(active) },
        guidance
            ? createElement(AgentGuidanceView, { guidance })
            : createElement(
                  "div",
                  { style: rootStyle },
                  createElement(
                      "p",
                      { style: emptyStyle },
                      "This story has no agent guidance. Add ",
                      createElement("code", null, "parameters.agent"),
                      " when the story encodes when / avoid / decision forks.",
                  ),
              ),
    );
}
