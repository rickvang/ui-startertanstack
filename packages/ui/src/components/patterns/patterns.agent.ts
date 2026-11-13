import type { AgentGuidance } from "../../../.storybook/addons/agent/types";

export const patternsOverviewAgentGuidance = {
    goal: "Pick a workflow pattern by job, then copy that story. Keep Shell as the frame.",
    cases: [
        { name: "Navigating domains", when: "Another part of the product.", use: "Shell stays; the page inside changes." },
        { name: "Switching organizations", when: "Another organization.", use: "Pick it in the product slot. The domain menu stays." },
        { name: "Product settings", when: "The product's settings.", use: "Name, who can invite, and removing the product. The domain menu stays." },
        { name: "Account information", when: "The person's account.", use: "Profile, password, notices, and removing the account." },
        { name: "Create a record", when: "Make one object.", use: "Create a record. Use a wizard when a later answer depends on an earlier one." },
        { name: "Modifying a record", when: "Change one object.", use: "Modifying a record. Inline edit is for one fact where it sits." },
        { name: "Onboarding", when: "First run.", use: "Name the workspace and offer one invite." },
        { name: "Task management", when: "A queue.", use: "Status first, then the record or why it cannot continue." },
        { name: "Visualization page", when: "A set of numbers.", use: "Summary first. It stays its own page until there is a chart module." },
        { name: "Planning", when: "A path and the work it implies.", use: "A journey names friction. A story map slices the first release." },
    ],
    avoid: ["Treating patterns as package exports — they are compositions to copy.", "Dropping Shell when copying a pattern into the app."],
} as const satisfies AgentGuidance;

export const createRecordAgentGuidance = {
    goal: "Create one object inside Shell. Use a wizard only when a later answer depends on an earlier one.",
    when: ["Make one object.", "Fields belong to the new record.", "Save and Cancel sit at the end of one form."],
    avoid: ["Editing an existing record — use Modifying a record.", "A single fact where it sits — use Inline edit.", "A later answer depends on an earlier one — use Wizard."],
    decisions: [
        {
            title: "Flat form vs wizard",
            choose: "Create a record when every field can sit on one page.",
            insteadOf: "Wizard when answers are independent.",
        },
    ],
} as const satisfies AgentGuidance;

export const modifyingRecordAgentGuidance = {
    goal: "Change one existing object in a focused form or detail flow inside Shell.",
    when: ["Change one object.", "Edit opens the form from the detail; Save returns to the detail."],
    avoid: ["One fact edited where it sits — use Inline edit.", "Creating a new object — use Create a record."],
} as const satisfies AgentGuidance;

export const inlineEditAgentGuidance = {
    goal: "Edit one fact where it already sits without opening a full form. Keep Shell as the frame.",
    when: ["One fact changes in place.", "The change commits from the field."],
    avoid: ["Several related fields at once — use Modifying a record."],
} as const satisfies AgentGuidance;

export const wizardAgentGuidance = {
    goal: "Step through creation inside Shell when later answers depend on earlier ones.",
    when: ["A later answer depends on an earlier one.", "The person should not see the whole form at once."],
    avoid: ["A flat form with independent fields — use Create a record.", "First run of the product — use Onboarding."],
} as const satisfies AgentGuidance;

export const onboardingAgentGuidance = {
    goal: "Run first-run setup: name the workspace and offer one invite.",
    when: ["First run."],
    avoid: ["Everyday product settings after setup — use Product settings."],
} as const satisfies AgentGuidance;

export const taskManagementAgentGuidance = {
    goal: "Present a queue inside Shell with status first, then the record or why it cannot continue.",
    when: ["A queue of work items.", "A blocked item must explain why, not look like an empty detail."],
    avoid: ["A plain member directory with no workflow status — use Table Members.", "One record with no list beside it — use a detail."],
} as const satisfies AgentGuidance;

export const navigatingDomainsAgentGuidance = {
    goal: "Move to another part of the product while Shell stays.",
    when: ["Another part of the product."],
    avoid: ["Switching organization — use Switching organizations."],
} as const satisfies AgentGuidance;

export const switchingOrganizationsAgentGuidance = {
    goal: "Switch organization from the product slot while the domain menu stays.",
    when: ["Another organization."],
    avoid: ["Navigating to another domain page — use Navigating domains."],
} as const satisfies AgentGuidance;

export const productSettingsAgentGuidance = {
    goal: "Edit the product's settings without losing the domain menu.",
    when: ["Name, who can invite, and removing the product."],
    avoid: ["Account profile work — use Account information."],
} as const satisfies AgentGuidance;

export const accountInformationAgentGuidance = {
    goal: "Edit the person's account information inside Shell.",
    when: ["Profile, password, notices, and removing the account."],
    avoid: ["Product settings — use Product settings."],
} as const satisfies AgentGuidance;

export const visualizationPageAgentGuidance = {
    goal: "Show a set of numbers with summary first on its own page inside Shell.",
    when: ["A set of numbers. Summary first.", "Decision makers need the whole picture, and a way to open one number for more."],
    avoid: ["A list of records — use a table.", "One object's facts — use a detail.", "Waiting for a chart module before shipping a summary page — keep it its own page until then."],
} as const satisfies AgentGuidance;

export const planningAgentGuidance = {
    goal: "Name friction on a journey and slice the first release on a story map.",
    when: ["A path and the work it implies."],
    avoid: ["Treating planning boards as day-to-day task queues — use Task management for queues."],
} as const satisfies AgentGuidance;
