import type { AgentGuidance } from "../../../.storybook/addons/agent/types";

export const shellAgentGuidance = {
    goal: "Keep Shell as the product frame: navigation, settings, help, and account stay while page content changes.",
    when: ["Building any app page that lives inside the product chrome."],
    avoid: ["Replacing Shell with a one-off header for ordinary product pages.", "Duplicating product navigation inside page content."],
    decisions: [
        {
            title: "Where does area content go?",
            choose: "Inside Shell's content region for the current area.",
            insteadOf: "Rebuilding navigation, settings, help, or account around the page.",
        },
    ],
} as const satisfies AgentGuidance;

export const settingsAgentGuidance = {
    goal: "Edit product settings inside Shell without inventing a second product menu.",
    when: ["Name, invite policy, and removing the product."],
    avoid: ["Putting account profile fields here — use Account information.", "Hiding the domain menu while editing product settings."],
} as const satisfies AgentGuidance;

export const accountAgentGuidance = {
    goal: "Edit the person's account: profile, password, notices, and removing the account.",
    when: ["The work is about the signed-in person, not the product."],
    avoid: ["Product name or invite policy — use Product settings."],
} as const satisfies AgentGuidance;

export const detailCardAgentGuidance = {
    goal: "Present one record for reading, split into groups, tabs, or steps as the content needs.",
    when: [
        "The person is reading one record, and the content is one level. Groups split the facts.",
        "The parts are weakly related, such as profile, access, and activity — use tabs.",
        "The record has a process — use steps, and put the decision with the record.",
    ],
    avoid: ["Many records of the same kind — use a table.", "The person is changing the record — use a form."],
} as const satisfies AgentGuidance;

export const expandableAgentGuidance = {
    goal: "Reveal a few more facts on the same card without leaving the page.",
    when: ["A few more facts belong on the same card.", "The title and status should stay put while the body grows."],
    avoid: ["A new page of fields — use a record pattern.", "A table row expand — that expand is separate from this region."],
} as const satisfies AgentGuidance;

export const formGroupAgentGuidance = {
    goal: "Create or change one record with fields that belong to that record.",
    when: ["The person is creating a record, or changing one.", "The fields belong to that one record."],
    avoid: ["The person is reading the record — use a detail.", "Many records of the same kind — use a table."],
} as const satisfies AgentGuidance;
