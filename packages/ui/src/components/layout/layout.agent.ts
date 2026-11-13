import type { AgentGuidance } from "../../../.storybook/addons/agent/types";

/** Pilot agent guidance for Layout/Frames — mirrors the story's when/avoid forks. */
export const framesAgentGuidance = {
    goal: "Pick one Layout frame from how people move. A product keeps one primary frame; a public page may use another.",
    cases: [
        {
            name: "Side, then header",
            when: "People return often and switch areas from a stable product menu. The header names the current area and holds that area's actions.",
            use: "Layout with sider + header, siderPlacement full-height. Side = product menu. Header = area path/actions. Content = the work.",
            avoid: "Do not repeat the product menu in the header. Do not use a full-height side for a public page with a handful of links.",
        },
        {
            name: "Header, content, footer",
            when: "The page is read top to bottom and first-level links fit in one bar (marketing, simple home, stable-width document).",
            use: "Layout with header + footer + content. Top bar = product name and short links. Footer = secondary links only.",
            avoid: "Skip when the section menu is long or people switch areas all day — a top bar runs out of room.",
        },
        {
            name: "Header, then side",
            when: "Docs, settings, or help: people arrive from the product, then move within one section.",
            use: "Layout with header + sider. Top bar stays global. Side is the section menu.",
            avoid: "Do not put the product menu in the side and again in the header. Do not use this when switching areas is the main job.",
        },
        {
            name: "Side and content",
            when: "A focused tool — canvas, editor, or a list that is the whole job.",
            use: "Layout with sider + content only. Side = structure of the work (files, layers, sections).",
            avoid: "Do not add a header only to repeat the page title. Do not use for a public site that needs a brand bar and legal links.",
        },
    ],
    when: [
        "Few destinations → header, content, footer.",
        "Global bar + section menu → header, then side.",
        "Many areas, used often → side, then header.",
        "One tool → side and content.",
    ],
    avoid: [
        "Two equal product menus (side and top bar).",
        "A header that only repeats the page title.",
        "A full-height side on a public page with a handful of links.",
    ],
    decisions: [
        {
            title: "Where is the product menu?",
            choose: "Either the side or the top bar — one product menu.",
            insteadOf: "Duplicating the same destinations in both places.",
        },
        {
            title: "What does the header own?",
            choose: "In an app frame, the current area: path, area actions, invite.",
            insteadOf: "Repeating the product navigation.",
        },
        {
            title: "Public page vs app shell",
            choose: "Public/read pages lean header+footer; apps lean full-height side.",
            insteadOf: "Forcing one frame on every surface.",
        },
    ],
} as const satisfies AgentGuidance;
