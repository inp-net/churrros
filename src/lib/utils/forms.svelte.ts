import { m } from '#lib/paraglide/messages.js';
import { ArkError, ArkErrors, type, type Type } from 'arktype';

type FormErrors<T> = Partial<Record<keyof T & string, string>>;

export function createForm<S extends Type<any>>(schema: S, initial: S['inferIn']) {
    type In = S['inferIn'];

    let values = $state<In>(initial);
    let errors = $state<FormErrors<In>>({});
    let submitting = $state(false);

    async function submit(handler: (data: S['infer']) => Promise<void>) {
        const result = schema(values);

        if (result instanceof type.errors) {
            errors = translateErrors<In>(result);
            return;
        }

        errors = {};
        submitting = true;
        try {
            await handler(result);
        } finally {
            submitting = false;
        }
    }

    return {
        get values() {
            return values;
        },
        get errors() {
            return errors;
        },
        get submitting() {
            return submitting;
        },
        submit
    };
}

function translateErrors<T>(errors: ArkErrors): FormErrors<T> {
    const result: Record<string, string> = {};

    for (const [path, list] of Object.entries(errors.flatByPath)) {
        result[path] = getErrorMessage(list[0]);
    }

    return result as FormErrors<T>;
}

function getErrorMessage(error: ArkError): string {
    if (error.hasCode('union')) {
        return getErrorMessage(error.errors[0]); // We only take the first error because all errors would be unreadable
    }
    if (error.hasCode('required')) {
        return m['form.error.required']();
    }
    if (error.hasCode('domain')) {
        return m['form.error.invalid_type']();
    }
    if (error.hasCode('minLength')) {
        return m['form.error.min_length']({ min: error.rule });
    }
    if (error.hasCode('maxLength')) {
        return m['form.error.max_length']({ max: error.rule });
    }
    if (error.hasCode('pattern')) {
        return m['form.error.invalid_format']();
    }
    return m['form.error.invalid']();
}
