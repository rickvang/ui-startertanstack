import type { Meta, StoryObj } from "@storybook/react-vite";
import { Grid } from "./grid";
import { LayoutPurpose } from "./layout-purpose";

const meta = {
    title: "Layout/Arrange/Split/Grid",
    component: Grid,
    args: {
        columns: 3,
        children: "Cells",
    },
} satisfies Meta<typeof Grid>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ThreeColumns: Story = {
    render: () => (
        <div className="max-w-xl">
            <LayoutPurpose>Use Grid when a region splits into equal columns.</LayoutPurpose>
            <Grid>
                <div className="bg-surface p-spacing-04 text-sm">One</div>
                <div className="bg-surface p-spacing-04 text-sm">Two</div>
                <div className="bg-surface p-spacing-04 text-sm">Three</div>
            </Grid>
        </div>
    ),
};
