import { Button } from "../base/button";
import { TextField } from "../base/text-field";
import { ExampleGroup, ExamplePage, ExampleSpecimen } from "./example-layout";

export function SizingExamples() {
    return (
        <ExamplePage intro="Width and height use the spacing steps. Compare the role, then the step.">
            <ExampleGroup title="Dense productive UI" purpose="Standard control and field are 32px. Dense is 24px. Wide and a list row are 40px. The type inside a standard control stays text-sm.">
                <ExampleSpecimen
                    name="Controls"
                    uses={[
                        ["Dense", "h-spacing-06"],
                        ["Standard", "h-spacing-07"],
                        ["Wide and row", "h-spacing-08"],
                    ]}
                >
                    <div className="flex max-w-sm flex-col gap-spacing-04">
                        <div className="flex items-center gap-spacing-03">
                            <div className="size-spacing-07 shrink-0 rounded-full bg-selected" />
                            <div className="flex h-spacing-08 min-w-0 flex-1 items-center border border-line bg-selected px-spacing-04">
                                <span className="text-sm font-medium text-ink">Alex Kim</span>
                            </div>
                            <Button>Invite</Button>
                        </div>
                        <TextField label="Project name" defaultValue="ui-starter" />
                    </div>
                </ExampleSpecimen>
            </ExampleGroup>
            <ExampleGroup title="Web interface" purpose="The action stays 40px. A media band is 160px, the largest step. A hero is taller than the scale.">
                <ExampleSpecimen
                    name="Page"
                    uses={[
                        ["Media", "h-spacing-13"],
                        ["Action", "h-spacing-08"],
                    ]}
                >
                    <div className="flex max-w-xl flex-col gap-spacing-05">
                        <div className="flex h-spacing-13 items-end bg-selected p-spacing-05">
                            <p className="text-sm font-medium text-ink">Media</p>
                        </div>
                        <div>
                            <Button size="wide">Save</Button>
                        </div>
                    </div>
                </ExampleSpecimen>
            </ExampleGroup>
            <ExampleGroup title="Graphic asset" purpose="160px sizes the mark. The poster is type plus padding, so it grows past the scale.">
                <ExampleSpecimen
                    name="Mark and poster"
                    uses={[
                        ["Mark", "size-spacing-13"],
                        ["Poster title", "text-display-2xl"],
                    ]}
                >
                    <div className="flex items-start gap-spacing-05">
                        <div className="flex size-spacing-13 shrink-0 items-end bg-ink p-spacing-04">
                            <span className="text-sm font-medium text-canvas">160px</span>
                        </div>
                        <div className="flex max-w-xs flex-col gap-spacing-04 bg-ink p-spacing-07">
                            <p className="text-display-2xl font-bold text-canvas">Open the work.</p>
                            <span className="inline-flex w-fit bg-accent px-spacing-03 py-spacing-02 text-sm font-medium text-accent-fg">New</span>
                        </div>
                    </div>
                </ExampleSpecimen>
            </ExampleGroup>
        </ExamplePage>
    );
}
