import { useId, useState } from "react";
import { Button } from "../base/button";
import { DetailGroup } from "../base/detail-group";
import { Fieldset } from "../base/fieldset";
import { Form, FormSubmit } from "../base/form";
import { TextField } from "../base/text-field";

export type AccountFacts = {
    name: string;
    email: string;
};

export type AccountScreenProps = AccountFacts & {
    onSave: (facts: AccountFacts) => void;
};

export function AccountScreen({ name, email, onSave }: AccountScreenProps) {
    const titleId = useId();
    const [editing, setEditing] = useState(false);
    const [draftName, setDraftName] = useState(name);
    const [draftEmail, setDraftEmail] = useState(email);
    const [nameError, setNameError] = useState<string | undefined>();
    const [emailError, setEmailError] = useState<string | undefined>();

    function startEdit() {
        setDraftName(name);
        setDraftEmail(email);
        setNameError(undefined);
        setEmailError(undefined);
        setEditing(true);
    }

    function cancel() {
        setDraftName(name);
        setDraftEmail(email);
        setNameError(undefined);
        setEmailError(undefined);
        setEditing(false);
    }

    function save() {
        const nextName = draftName.trim();
        const nextEmail = draftEmail.trim();
        const missingName = nextName === "";
        const missingEmail = nextEmail === "";
        setNameError(missingName ? "Enter a name." : undefined);
        setEmailError(missingEmail ? "Enter an email." : undefined);
        if (missingName || missingEmail) {
            return;
        }

        onSave({ name: nextName, email: nextEmail });
        setEditing(false);
    }

    return (
        <section aria-labelledby={titleId} className="flex w-full min-w-0 max-w-xl flex-col gap-spacing-05">
            <header className="flex flex-col gap-spacing-02">
                <h2 id={titleId} className="text-lg font-semibold text-ink">
                    Account
                </h2>
                <p className="text-sm text-ink">This account belongs to the person. It stays when the domain or the organization changes.</p>
            </header>
            {editing ? (
                <Form label="Account" onSubmit={save}>
                    <Fieldset title="Profile">
                        <TextField label="Name" value={draftName} error={nameError} onChange={(event) => setDraftName(event.target.value)} />
                        <TextField label="Email" type="email" value={draftEmail} error={emailError} onChange={(event) => setDraftEmail(event.target.value)} />
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
                    <DetailGroup title="Profile">
                        <dl className="flex flex-col gap-spacing-04">
                            <div>
                                <dt className="text-sm font-medium text-muted">Name</dt>
                                <dd className="text-sm wrap-break-word text-ink">{name}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-muted">Email</dt>
                                <dd className="text-sm wrap-break-word text-ink">{email}</dd>
                            </div>
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
