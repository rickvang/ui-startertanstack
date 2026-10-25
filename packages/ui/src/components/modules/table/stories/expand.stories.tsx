import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "../../../base/badge";
import { DocDemo, DocPage, DocSection, DocWhenAvoid } from "../../../templates/doc";
import { Table } from "../table";
import { columns, directory } from "./fixtures";
import { tableStoryMeta } from "./meta";

const meta = { ...tableStoryMeta, title: "Modules/Table" } satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Expand: Story = {
    name: "Expand",
    render: () => (
        <DocPage title="Expand" intro="Open extra fields under a row without adding columns. Use renderDetail and renderCell for custom kinds.">
            <DocSection title="Example">
                <DocWhenAvoid
                    when="expandable opens a panel under the row with renderDetail. Use it for extra fields, not new columns. expansion controls how many panels stay open. renderCell handles custom column kinds."
                    avoid="Do not edit cells inline or add date, number, or combobox inputs in the table. Changing a record belongs in the modifying-record pattern or a detail view."
                />
                <DocDemo>
                    <Table
                        label="Directory detail"
                        items={directory}
                        columns={columns}
                        expandable
                        expansion="multiple"
                        renderDetail={(item) => <p>{item.values?.note ?? item.name}</p>}
                        renderCell={(column, item) => column.id === "note" ? <Badge>{item.values?.note}</Badge> : item.values?.[column.id]}
                        defaultValue="alex"
                    />
                </DocDemo>
            </DocSection>
        </DocPage>
    ),
};
