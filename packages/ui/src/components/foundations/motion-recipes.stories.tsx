import type { Meta, StoryObj } from "@storybook/react-vite";
import { DocPage, DocParagraph, DocRows, DocSection } from "../templates/doc";

const meta = {
    title: "Foundations/Motion",
    parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Recipes: Story = {
    name: "Recipes",
    render: () => (
        <DocPage title="Motion recipes" intro="The roles stay here. The component plays them. Open the component to see the motion.">
            <DocSection title="How to choose">
                <DocParagraph>A control that only changes color stays on Examples. These are changes of place, confirmation, selection, size, or arrival.</DocParagraph>
                <DocRows
                    headers={["Job", "Open"]}
                    rows={[
                        { label: "A panel from the edge", detail: "Layout/Overlays, Drawer." },
                        { label: "A yes or no", detail: "Layout/Overlays, Dialog." },
                        { label: "Another tab", detail: "Components/Tabs, Motion." },
                        { label: "More on the same card", detail: "Modules/Detail, Expandable." },
                        { label: "Content replacing a skeleton", detail: "Components/Placeholder." },
                    ]}
                />
            </DocSection>
            <DocSection title="Source">
                <DocParagraph>
                    Tokens, roles, and code are this catalog. The idea of a live preview, a when-to-use line, and an example together follows{" "}
                    <a className="text-ink" href="https://transitions.dev/">
                        transitions.dev
                    </a>
                    . Nothing from that site is imported.
                </DocParagraph>
            </DocSection>
        </DocPage>
    ),
};
