import type { Meta, StoryObj } from "@storybook/react-vite";
import { FoundationPage, FoundationSection } from "./catalog";
import { themeSheetAgentGuidance } from "./foundations.agent";

const semanticColors = [
    ["Canvas", "--canvas", "bg-canvas"],
    ["Surface", "--surface", "bg-surface"],
    ["Ink", "--ink", "bg-ink"],
    ["Muted", "--muted", "bg-muted"],
    ["Line", "--line", "bg-line"],
    ["Selected", "--selected", "bg-selected"],
    ["Accent", "--accent", "bg-accent"],
    ["Accent subtle", "--accent-subtle", "bg-accent-subtle"],
    ["Danger", "--danger", "bg-danger"],
    ["Warning", "--warning", "bg-warning"],
    ["Success", "--success", "bg-success"],
    ["Focus", "--focus", "bg-focus"],
] as const;

const spacing = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "05.5",
    "06",
    "07",
    "08",
    "09",
    "10",
] as const;

const radii = ["xs", "sm", "md", "lg", "xl", "2xl"] as const;

const typeRoles = [
    { label: "Display sm", className: "text-display-sm font-semibold" },
    { label: "Title lg", className: "text-lg font-semibold" },
    { label: "Body md", className: "text-md" },
    { label: "Label sm", className: "text-sm font-medium" },
    { label: "Mono xs", className: "font-mono text-xs" },
] as const;

const meta = {
    title: "Foundations/Theme sheet",
    parameters: {
        layout: "fullscreen",
        agent: themeSheetAgentGuidance,
    },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const ThemeSheet: Story = {
    name: "Theme sheet",
    render: () => (
        <FoundationPage
            title="Theme sheet"
            intro="One place for semantic color, type, space, and radius. Product UI uses these tokens only — never hard-coded hex, rem, or px for theme values. Toggle light/dark in the toolbar."
        >
            <FoundationSection title="Semantic color">
                <div className="grid grid-cols-2 gap-spacing-03 sm:grid-cols-3 md:grid-cols-4">
                    {semanticColors.map(([label, variable, swatch]) => (
                        <div key={variable} className="flex flex-col gap-spacing-02">
                            <div
                                className={`h-spacing-10 rounded-md border border-line ${swatch}`}
                            />
                            <div className="flex flex-col gap-spacing-01">
                                <span className="text-sm font-medium text-ink">{label}</span>
                                <span className="font-mono text-xs text-muted">{variable}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </FoundationSection>

            <FoundationSection title="Type roles">
                <div className="flex flex-col gap-spacing-04 rounded-lg border border-line bg-surface p-spacing-05">
                    {typeRoles.map((role) => (
                        <div key={role.label} className="flex flex-col gap-spacing-01">
                            <span className="font-mono text-xs text-muted">{role.label}</span>
                            <span className={`${role.className} text-ink`}>
                                The quick catalog token
                            </span>
                        </div>
                    ))}
                </div>
            </FoundationSection>

            <FoundationSection title="Spacing scale">
                <div className="flex flex-col gap-spacing-03">
                    {spacing.map((step) => (
                        <div key={step} className="flex items-center gap-spacing-04">
                            <span className="w-spacing-08 shrink-0 font-mono text-xs text-muted">
                                {step}
                            </span>
                            <div
                                className="h-spacing-04 rounded-sm bg-accent"
                                style={{ width: `var(--spacing-spacing-${step})` }}
                            />
                        </div>
                    ))}
                </div>
            </FoundationSection>

            <FoundationSection title="Radius">
                <div className="flex flex-wrap gap-spacing-04">
                    {radii.map((step) => (
                        <div key={step} className="flex flex-col items-center gap-spacing-02">
                            <div
                                className="h-spacing-09 w-spacing-09 border border-line bg-accent-subtle"
                                style={{ borderRadius: `var(--radius-${step})` }}
                            />
                            <span className="font-mono text-xs text-muted">{step}</span>
                        </div>
                    ))}
                </div>
            </FoundationSection>

            <FoundationSection title="Tokens-only rule">
                <ul className="flex list-disc flex-col gap-spacing-02 pl-spacing-05 text-sm text-muted">
                    <li>Prefer semantic utilities (`bg-surface`, `text-ink`, `gap-spacing-04`).</li>
                    <li>Primitive ramps (`--neutral-*`, `--brand-*`) stay in theme.css — do not invent new hex in product UI.</li>
                    <li>Change a product look by retargeting semantic tokens under `:root` / `.dark`, not by painting components.</li>
                </ul>
            </FoundationSection>
        </FoundationPage>
    ),
};
