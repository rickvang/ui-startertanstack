import { Badge } from "../base/badge";
import { Card } from "../layout/card";
import { type PlanningSource, slices, storiesFor, type StoryItem } from "./planning-source";

function sliceBadge(slice: StoryItem["slice"]) {
    return slice === "mvp" ? <Badge variant="success">MVP</Badge> : <Badge>Later</Badge>;
}

export function StoryMap({ source }: { source: PlanningSource }) {
    return (
        <div className="flex flex-col gap-spacing-04 overflow-x-auto">
            <p className="text-sm text-muted">
                <span className="font-medium text-ink">{source.product}.</span> {source.goal}
            </p>
            <div className="min-w-[40rem]">
                <div className="grid gap-spacing-03" style={{ gridTemplateColumns: `repeat(${source.activities.length}, minmax(0, 1fr))` }}>
                    {source.activities.map((activity) => (
                        <Card key={activity.id} className="gap-spacing-02 p-spacing-04">
                            <p className="text-xs text-muted">Activity</p>
                            <h3 className="text-sm font-semibold text-ink">{activity.label}</h3>
                        </Card>
                    ))}
                </div>
                {slices.map((slice) => (
                    <div key={slice.id} className="mt-spacing-04 flex flex-col gap-spacing-03">
                        <div className="flex items-baseline justify-between gap-spacing-03 border-t border-line pt-spacing-03">
                            <p className="text-sm font-medium text-ink">{slice.label}</p>
                            <p className="text-xs text-muted">{slice.outcome}</p>
                        </div>
                        <div className="grid gap-spacing-03" style={{ gridTemplateColumns: `repeat(${source.activities.length}, minmax(0, 1fr))` }}>
                            {source.activities.map((activity) => {
                                const items = activity.stories.filter((story) => story.slice === slice.id);
                                return (
                                    <div key={`${slice.id}-${activity.id}`} className="flex flex-col gap-spacing-02">
                                        {items.length === 0 ? <p className="text-xs text-muted">None in this slice.</p> : null}
                                        {items.map((item) => (
                                            <Card key={item.id} variant="quiet" className="gap-spacing-02 p-spacing-04">
                                                <div className="flex items-start justify-between gap-spacing-02">
                                                    <p className="text-sm font-medium text-ink">{item.task}</p>
                                                    {sliceBadge(item.slice)}
                                                </div>
                                                <p className="text-sm text-muted">{item.story}</p>
                                                <p className="text-xs text-muted">Opportunity: {item.opportunity}</p>
                                            </Card>
                                        ))}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function Journey({ source }: { source: PlanningSource }) {
    return (
        <div className="flex flex-col gap-spacing-04">
            <div className="flex flex-col gap-spacing-02">
                <p className="text-sm font-medium text-ink">{source.persona}</p>
                <p className="text-sm text-muted">{source.scenario}</p>
            </div>
            <ol className="grid gap-spacing-03 md:grid-cols-2 xl:grid-cols-4">
                {source.stages.map((stage, index) => {
                    const mapped = storiesFor(source, stage.opportunity);
                    return (
                        <li key={stage.id}>
                            <Card className="h-full gap-spacing-03 p-spacing-04">
                                <p className="text-xs text-muted">
                                    {index + 1}. {stage.label}
                                </p>
                                <p className="text-sm text-ink">{stage.action}</p>
                                <p className="text-xs text-muted">Touchpoint: {stage.touchpoint}</p>
                                <p className="text-sm text-muted">Need: {stage.need}</p>
                                <p className="text-sm text-muted">Pain: {stage.pain}</p>
                                <p className="text-sm font-medium text-ink">Opportunity: {stage.opportunity}</p>
                                {stage.thought ? (
                                    <p className="text-xs text-muted">
                                        Thought ({stage.thought.kind}): {stage.thought.text}
                                    </p>
                                ) : null}
                                {mapped.length > 0 ? (
                                    <ul className="flex flex-col gap-spacing-01">
                                        {mapped.map((item) => (
                                            <li key={item.id} className="text-xs text-muted">
                                                Story: {item.story}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-xs text-muted">No story maps to this opportunity yet.</p>
                                )}
                            </Card>
                        </li>
                    );
                })}
            </ol>
        </div>
    );
}

export function Mapping({ source }: { source: PlanningSource }) {
    const opportunities = [...new Set(source.stages.map((stage) => stage.opportunity))];

    return (
        <div className="overflow-x-auto">
            <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
                <thead>
                    <tr className="border-b border-line text-ink">
                        <th scope="col" className="py-spacing-03 pr-spacing-05 font-medium">
                            Opportunity from the journey
                        </th>
                        <th scope="col" className="py-spacing-03 font-medium">
                            Stories on the map
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {opportunities.map((opportunity) => (
                        <tr key={opportunity} className="border-b border-line last:border-b-0">
                            <th scope="row" className="py-spacing-03 pr-spacing-05 align-top font-medium text-ink">
                                {opportunity}
                            </th>
                            <td className="py-spacing-03 align-top text-muted">
                                {storiesFor(source, opportunity)
                                    .map((item) => item.story)
                                    .join("; ") || "None yet."}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
