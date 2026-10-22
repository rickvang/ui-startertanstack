import { Button } from "../base/button";
import { TextField } from "../base/text-field";
import { ExampleGroup, ExamplePage, ExampleSpecimen } from "./example-layout";

export function RadiusExamples() {
    return (
        <ExamplePage intro="Each context uses the same radius scale. Compare the role, then the step.">
            <ExampleGroup title="Dense productive UI" purpose="Controls and panels use md. An avatar uses full. Larger steps stay out of a tool.">
                <ExampleSpecimen
                    name="Controls"
                    uses={[
                        ["Button and field", "rounded-md"],
                        ["Panel", "rounded-md"],
                        ["Avatar", "rounded-full"],
                    ]}
                >
                    <div className="flex max-w-sm flex-col gap-spacing-04 rounded-md border border-line bg-surface p-spacing-04">
                        <div className="flex items-center gap-spacing-03">
                            <div className="size-spacing-07 shrink-0 rounded-full bg-selected" />
                            <span className="text-sm font-medium text-ink">Alex Kim</span>
                        </div>
                        <TextField label="Project name" defaultValue="ui-starter" />
                        <div>
                            <Button>Invite</Button>
                        </div>
                    </div>
                </ExampleSpecimen>
            </ExampleGroup>
            <ExampleGroup title="Web interface" purpose="A card and a media band use lg. The button inside stays md, so the control does not grow with the card.">
                <ExampleSpecimen
                    name="Card"
                    uses={[
                        ["Card and media", "rounded-lg"],
                        ["Action", "rounded-md"],
                    ]}
                >
                    <div className="flex max-w-xl flex-col gap-spacing-05 rounded-lg border border-line bg-surface p-spacing-05">
                        <div className="flex h-spacing-11 items-end rounded-lg bg-selected p-spacing-04">
                            <p className="text-sm font-medium text-ink">Media</p>
                        </div>
                        <div>
                            <Button size="wide">Save</Button>
                        </div>
                    </div>
                </ExampleSpecimen>
            </ExampleGroup>
            <ExampleGroup title="Graphic asset" purpose="A poster is sharp. A framed mark uses 2xl. Full is a pill, not a poster corner.">
                <ExampleSpecimen
                    name="Poster and mark"
                    uses={[
                        ["Poster", "rounded-none"],
                        ["Mark", "rounded-2xl"],
                    ]}
                >
                    <div className="flex items-start gap-spacing-05">
                        <div className="flex h-spacing-13 w-spacing-12 items-end bg-ink p-spacing-04">
                            <span className="text-sm font-medium text-canvas">Sharp</span>
                        </div>
                        <div className="flex size-spacing-12 items-end rounded-2xl bg-accent p-spacing-04">
                            <span className="text-sm font-medium text-accent-fg">2xl</span>
                        </div>
                    </div>
                </ExampleSpecimen>
            </ExampleGroup>
        </ExamplePage>
    );
}
