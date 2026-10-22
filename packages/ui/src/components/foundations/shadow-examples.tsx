import { Button } from "../base/button";
import { ExampleGroup, ExamplePage, ExampleSpecimen } from "./example-layout";

export function ShadowExamples() {
    return (
        <ExamplePage intro="Each context uses the same shadow scale. Compare the role, then the step.">
            <ExampleGroup title="Dense productive UI" purpose="A tool uses a border to separate a panel. Shadow stays off the row, the field, and the button.">
                <ExampleSpecimen
                    name="Panel"
                    uses={[
                        ["Panel", "border-line"],
                        ["Control", "no shadow"],
                    ]}
                >
                    <div className="flex max-w-sm flex-col gap-spacing-04 rounded-md border border-line bg-surface p-spacing-04">
                        <p className="text-sm font-semibold text-ink">Members</p>
                        <div className="flex items-center justify-between gap-spacing-03 border-t border-line pt-spacing-03">
                            <span className="text-sm font-medium text-ink">Alex Kim</span>
                            <Button>Invite</Button>
                        </div>
                    </div>
                </ExampleSpecimen>
            </ExampleGroup>
            <ExampleGroup title="Web interface" purpose="A card on the page uses sm. A menu above the page uses lg. The page itself has no shadow.">
                <ExampleSpecimen
                    name="Card and menu"
                    uses={[
                        ["Card", "shadow-sm"],
                        ["Menu", "shadow-lg"],
                    ]}
                >
                    <div className="flex max-w-xl items-start gap-spacing-06">
                        <div className="flex flex-1 flex-col gap-spacing-04 rounded-lg bg-surface p-spacing-05 shadow-sm">
                            <p className="text-sm font-medium text-muted">Studio</p>
                            <p className="text-lg font-semibold text-ink">Build on your own components.</p>
                            <div>
                                <Button size="wide">Save</Button>
                            </div>
                        </div>
                        <div className="flex w-spacing-12 flex-col gap-spacing-02 rounded-md bg-surface p-spacing-03 shadow-lg">
                            <p className="text-sm text-ink">Edit</p>
                            <p className="text-sm text-ink">Duplicate</p>
                            <p className="text-sm text-muted">Delete</p>
                        </div>
                    </div>
                </ExampleSpecimen>
            </ExampleGroup>
            <ExampleGroup title="Graphic asset" purpose="An object sitting on a page uses xl. A full-bleed poster does not, because it has no surface behind it.">
                <ExampleSpecimen
                    name="Object"
                    uses={[["Object on a page", "shadow-xl"]]}
                >
                    <div className="flex max-w-sm flex-col gap-spacing-04 bg-ink p-spacing-06 shadow-xl">
                        <p className="text-sm font-medium text-canvas">Spring release</p>
                        <p className="text-display-sm font-bold text-canvas">Open the work.</p>
                    </div>
                </ExampleSpecimen>
            </ExampleGroup>
        </ExamplePage>
    );
}
