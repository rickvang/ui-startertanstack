import type { Meta, StoryObj } from "@storybook/react-vite";
import { DocDemo, DocPage, DocSection, DocWhenAvoid } from "../../../templates/doc";
import { Table } from "../table";
import { columns, roster } from "./fixtures";
import { tableStoryMeta } from "./meta";

const meta = { ...tableStoryMeta, title: "Modules/Table" } satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const LongList: Story = {
    name: "Long list",
    render: () => (
        <DocPage title="Long list" intro="Virtualize long lists with steady row height, or paginate when you prefer pages over scrolling.">
            <DocSection title="Example">
                <DocWhenAvoid
                    when="virtualize is for long lists with steady row height. pageSize and pageSizeOptions slice parents and compose Pagination when you prefer pages over scrolling."
                    avoid="Do not virtualize short lists or rows whose height changes a lot from expanded panels."
                />
                <DocDemo>
                    <Table label="Roster" items={roster} columns={columns} searchable sortable virtualize stickyHeader defaultValue="person-1" />
                </DocDemo>
            </DocSection>
        </DocPage>
    ),
};
