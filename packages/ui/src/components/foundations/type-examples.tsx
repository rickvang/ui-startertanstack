import { Button } from "../base/button";
import { ExampleGroup, ExamplePage, ExampleSpecimen } from "./example-layout";

const members = [
    ["Alex Kim", "Owner"],
    ["Jordan Lee", "Editor"],
    ["Sam Patel", "Viewer"],
] as const;

export function TypeExamples() {
    return (
        <ExamplePage intro="Each context uses the same type scale. Compare the role, then the step.">
            <ExampleGroup title="Dense productive UI" purpose="Tools and settings stay on xs and sm. Display sizes stay out.">
                <ExampleSpecimen
                    name="List"
                    uses={[
                        ["Title", "text-sm font-semibold"],
                        ["Name", "text-sm font-medium"],
                        ["Meta", "text-xs text-muted"],
                    ]}
                >
                    <div className="max-w-sm overflow-hidden rounded-md border border-line bg-surface">
                        <div className="flex items-center justify-between gap-spacing-03 border-b border-line px-spacing-04 py-spacing-03">
                            <h3 className="text-sm font-semibold">Members</h3>
                            <Button>Invite</Button>
                        </div>
                        {members.map(([name, role]) => (
                            <div key={name} className="flex items-center justify-between gap-spacing-03 border-b border-line px-spacing-04 py-spacing-02">
                                <span className="text-sm font-medium">{name}</span>
                                <span className="text-sm text-muted">{role}</span>
                            </div>
                        ))}
                        <p className="px-spacing-04 py-spacing-03 text-xs text-muted">3 people can edit this project.</p>
                    </div>
                </ExampleSpecimen>
                <ExampleSpecimen
                    name="Details"
                    uses={[
                        ["Title", "text-sm font-semibold"],
                        ["Label", "text-sm font-medium text-muted"],
                        ["Value", "text-sm text-ink"],
                    ]}
                >
                    <div className="flex max-w-3xl flex-col gap-spacing-05">
                        <div className="flex items-center justify-between gap-spacing-03">
                            <h3 className="text-sm font-semibold text-ink">User info</h3>
                            <Button variant="secondary">
                                Edit
                            </Button>
                        </div>
                        <div className="grid grid-cols-6 gap-px bg-line text-sm">
                            <div className="bg-canvas px-spacing-04 py-spacing-03 font-medium text-muted">User name</div>
                            <div className="bg-surface px-spacing-04 py-spacing-03 text-ink">Alex Kim</div>
                            <div className="bg-canvas px-spacing-04 py-spacing-03 font-medium text-muted">Telephone</div>
                            <div className="bg-surface px-spacing-04 py-spacing-03 text-ink">1810000000</div>
                            <div className="bg-canvas px-spacing-04 py-spacing-03 font-medium text-muted">Live</div>
                            <div className="bg-surface px-spacing-04 py-spacing-03 text-ink">Hangzhou</div>
                            <div className="bg-canvas px-spacing-04 py-spacing-03 font-medium text-muted">Remark</div>
                            <div className="bg-surface px-spacing-04 py-spacing-03 text-ink">empty</div>
                            <div className="bg-canvas px-spacing-04 py-spacing-03 font-medium text-muted">Address</div>
                            <div className="col-span-3 bg-surface px-spacing-04 py-spacing-03 text-ink">No. 18, Wantang Road, Xihu District, Hangzhou</div>
                        </div>
                    </div>
                </ExampleSpecimen>
            </ExampleGroup>
            <ExampleGroup title="Web interface" purpose="A page title is display-sm. Reading text is md. A section title is lg. Controls stay on sm.">
                <ExampleSpecimen
                    name="Page"
                    uses={[
                        ["Kicker", "text-sm font-medium text-muted"],
                        ["Page title", "text-display-sm font-semibold"],
                        ["Reading", "text-md"],
                        ["Section", "text-lg font-semibold"],
                    ]}
                >
                    <div className="flex max-w-xl flex-col gap-spacing-06">
                        <div className="flex flex-col gap-spacing-03">
                            <p className="text-sm font-medium text-muted">Studio</p>
                            <h3 className="text-display-sm font-semibold">Build on your own components.</h3>
                            <p className="text-md text-muted">Tokens and controls live in the UI package. This page owns the route and the task.</p>
                        </div>
                        <div className="flex flex-col gap-spacing-03">
                            <h4 className="text-lg font-semibold">Start a project</h4>
                            <p className="text-md">Reading text uses md. Buttons stay on sm so a control does not grow with the page title.</p>
                            <div>
                                <Button size="wide">Save</Button>
                            </div>
                        </div>
                    </div>
                </ExampleSpecimen>
            </ExampleGroup>
            <ExampleGroup title="Graphic asset" purpose="A poster title is display-2xl and bold. A cover line is display-xs regular. The kicker stays sm medium.">
                <ExampleSpecimen
                    name="Poster"
                    uses={[
                        ["Kicker", "text-sm font-medium"],
                        ["Title", "text-display-2xl font-bold"],
                        ["Cover line", "text-display-xs font-normal"],
                    ]}
                >
                    <div className="flex max-w-xl flex-col gap-spacing-06 bg-ink p-spacing-07 text-canvas">
                        <p className="text-sm font-medium">Spring release</p>
                        <p className="text-display-2xl font-bold">Open the work.</p>
                        <p className="text-display-xs font-normal">A cover line under the title.</p>
                    </div>
                </ExampleSpecimen>
            </ExampleGroup>
        </ExamplePage>
    );
}
