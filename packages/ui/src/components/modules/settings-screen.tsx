import { useId, useState } from "react";
import { Button } from "../base/button";
import { DetailGroup } from "../base/detail-group";
import { Fieldset } from "../base/fieldset";
import { Form, FormSubmit } from "../base/form";
import { TextField } from "../base/text-field";

export type SettingsScreenProps = {
    name: string;
    onNameChange: (name: string) => void;
};

export function SettingsScreen({ name, onNameChange }: SettingsScreenProps) {
    const titleId = useId();
    const [editing, setEditing] = useState(false);
    const [draft, setDraft] = useState(name);
    const [error, setError] = useState<string | undefined>();

    function startEdit() {
        setDraft(name);
        setError(undefined);
        setEditing(true);
    }

    function cancel() {
        setDraft(name);
        setError(undefined);
        setEditing(false);
    }

    function save() {
        const next = draft.trim();
        if (next === "") {
            setError("Enter a product name.");
            return;
        }

        setError(undefined);
        onNameChange(next);
        setEditing(false);
    }

    return (
        <section aria-labelledby={titleId} className="flex w-full min-w-0 max-w-xl flex-col gap-spacing-05">
            <header className="flex flex-col gap-spacing-02">
                <h2 id={titleId} className="text-lg font-semibold text-ink">
                    Settings
                </h2>
                <p className="text-sm text-ink">Product settings stay out of the domain menu. They remain available on every page.</p>
            </header>
            {editing ? (
                <Form label="Product" onSubmit={save}>
                    <Fieldset title="Product">
                        <TextField label="Name" value={draft} error={error} onChange={(event) => setDraft(event.target.value)} />
                    </Fieldset>
                    <div className="flex gap-spacing-03">
                        <FormSubmit>Save</FormSubmit>
                        <Button variant="secondary" type="button" onClick={cancel}>
                            Cancel
                        </Button>
                    </div>
                </Form>
            ) : (
                <div className="flex flex-col items-start gap-spacing-04">
                    <DetailGroup title="Product">
                        <dl>
                            <dt className="text-sm font-medium text-muted">Name</dt>
                            <dd className="text-sm wrap-break-word text-ink">{name}</dd>
                        </dl>
                    </DetailGroup>
                    <Button variant="secondary" onClick={startEdit}>
                        Edit
                    </Button>
                </div>
            )}
        </section>
    );
}
