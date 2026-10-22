import { Badge, type BadgeProps } from "../base/badge";
import { Button } from "../base/button";
import { ExampleGroup, ExamplePage, ExampleSpecimen } from "./example-layout";

const members = [
    { name: "Alex Kim", role: "Owner", status: "Active", selected: true },
    { name: "Jordan Lee", role: "Editor", status: "Review", selected: false },
    { name: "Sam Patel", role: "Viewer", status: "Active", selected: false },
] as const;

const statusVariant: Record<(typeof members)[number]["status"], BadgeProps["variant"]> = {
    Active: "success",
    Review: "warning",
};

export function ColorExamples() {
    return (
        <ExamplePage intro="Each context uses the same semantic colors. Compare the role, then the token.">
            <ExampleGroup title="Dense productive UI" purpose="Structure is neutral. Status uses its own fill. Accent stays on the action.">
                <ExampleSpecimen
                    name="List"
                    uses={[
                        ["Panel", "bg-surface"],
                        ["Divider", "border-line"],
                        ["Text", "text-ink"],
                        ["Secondary", "text-muted"],
                        ["Selected row", "bg-selected"],
                        ["Status", "text-success bg-success-subtle"],
                        ["Action", "bg-accent"],
                    ]}
                >
                    <div className="max-w-sm overflow-hidden rounded-md border border-line bg-surface">
                        <div className="flex items-center justify-between gap-spacing-03 border-b border-line px-spacing-04 py-spacing-03">
                            <h3 className="text-sm font-semibold text-ink">Members</h3>
                            <Button>Invite</Button>
                        </div>
                        {members.map((member) => (
                            <div
                                key={member.name}
                                className={`flex items-center justify-between gap-spacing-03 border-b border-line px-spacing-04 py-spacing-02 ${member.selected ? "bg-selected" : ""}`}
                            >
                                <span className="text-sm font-medium text-ink">{member.name}</span>
                                <span className="text-sm text-muted">{member.role}</span>
                                <Badge variant={statusVariant[member.status]}>{member.status}</Badge>
                            </div>
                        ))}
                    </div>
                </ExampleSpecimen>
            </ExampleGroup>
            <ExampleGroup title="Web interface" purpose="The page is canvas. A card is surface. A note is accent-subtle, separate from the action.">
                <ExampleSpecimen
                    name="Page"
                    uses={[
                        ["Page", "bg-canvas"],
                        ["Card", "bg-surface border-line"],
                        ["Title", "text-ink"],
                        ["Support", "text-muted"],
                        ["Note", "bg-accent-subtle"],
                        ["Action", "bg-accent text-accent-fg"],
                    ]}
                >
                    <div className="flex max-w-xl flex-col gap-spacing-05">
                        <div className="flex flex-col gap-spacing-03 rounded-md border border-line bg-surface p-spacing-05">
                            <p className="text-sm font-medium text-muted">Studio</p>
                            <h3 className="text-display-sm font-semibold text-ink">Build on your own components.</h3>
                            <p className="text-md text-muted">Tokens and controls live in the UI package. This page owns the route and the task.</p>
                            <div>
                                <Button size="wide">Save</Button>
                            </div>
                        </div>
                        <div className="rounded-md bg-accent-subtle p-spacing-04">
                            <p className="text-sm font-medium text-ink">Shared library</p>
                            <p className="text-sm text-muted">The tint marks a note. It is not a second accent button.</p>
                        </div>
                    </div>
                </ExampleSpecimen>
            </ExampleGroup>
            <ExampleGroup title="Graphic asset" purpose="The field is ink and the type is canvas. Accent is only the mark.">
                <ExampleSpecimen
                    name="Poster"
                    uses={[
                        ["Field", "bg-ink"],
                        ["Type", "text-canvas"],
                        ["Mark", "bg-accent text-accent-fg"],
                    ]}
                >
                    <div className="flex max-w-xl flex-col gap-spacing-06 bg-ink p-spacing-07">
                        <p className="text-sm font-medium text-canvas">Spring release</p>
                        <p className="text-display-2xl font-bold text-canvas">Open the work.</p>
                        <p className="text-display-xs font-normal text-canvas">A cover line under the title.</p>
                        <span className="inline-flex w-fit bg-accent px-spacing-03 py-spacing-02 text-sm font-medium text-accent-fg">New</span>
                    </div>
                </ExampleSpecimen>
            </ExampleGroup>
        </ExamplePage>
    );
}
