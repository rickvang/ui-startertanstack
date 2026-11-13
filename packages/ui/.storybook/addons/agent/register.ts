import { createElement } from "react";
import { addons, types } from "storybook/manager-api";
import { AgentPanel } from "./panel";
import { ADDON_ID, AGENT_PARAM_KEY, PANEL_ID } from "./types";

/** Register the Agent panel. Imported from manager.ts (manager bundle), not as a Node preset. */
export function registerAgentPanel() {
    addons.register(ADDON_ID, () => {
        addons.add(PANEL_ID, {
            type: types.PANEL,
            title: "Agent",
            paramKey: AGENT_PARAM_KEY,
            render: ({ active }) => createElement(AgentPanel, { active }),
        });
    });
}
