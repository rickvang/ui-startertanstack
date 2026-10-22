import { Fieldset, type FieldsetProps } from "../base/fieldset";

export type FormGroupProps = FieldsetProps;

export function FormGroup(props: FormGroupProps) {
    return <Fieldset {...props} />;
}
