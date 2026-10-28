import type { Meta, StoryObj } from "@storybook/react-vite";
import { buttonSnippet, copyableDocs, libraryExportNote } from "../../../.storybook/copyable-snippets";
import { Button } from "./button";

const meta = {
    title: "Components/Button",
    component: Button,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `${libraryExportNote} Import \`theme.css\` once in the app or Storybook preview.`,
            },
        },
    },
    args: {
        children: "Save",
        variant: "primary",
        size: "standard",
    },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    parameters: {
        docs: copyableDocs(buttonSnippet, libraryExportNote),
    },
};

export const Secondary: Story = {
    args: { children: "Cancel", variant: "secondary" },
};

export const Ghost: Story = {
    args: { children: "Theme", variant: "ghost" },
};

export const Disabled: Story = {
    args: { children: "Save", disabled: true },
};

export const Wide: Story = {
    args: { size: "wide" },
};

export const Dense: Story = {
    args: { size: "dense" },
};

export const Variants: Story = {
    render: () => (
        <div className="flex items-center gap-spacing-04">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Remove</Button>
        </div>
    ),
};
