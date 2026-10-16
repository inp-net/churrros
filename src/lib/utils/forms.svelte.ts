import { ApiValidationError } from '#lib/api/errors.ts';
import { m } from '#lib/paraglide/messages.js';
import { ArkError, ArkErrors, type, type Type } from 'arktype';

type FormErrors<T> = Partial<Record<keyof T & string, string>>;

export function createForm<S extends Type<any>>(schema: S, initial: S['inferIn']) {
    type In = S['inferIn'];

    let values = $state<In>(initial);
    let errors = $state<FormErrors<In>>({});
    let formError = $state(''); // Error that is not related to a specific field
    let submitting = $state(false);

    function applyApiErrors(err: ApiValidationError) {
        const next: Record<string, string> = {};
        const unmatched: string[] = [];

        for (const { path, message } of err.fieldErrors) {
            const key = path.join('.');
            if (key in values) {
                next[key] ??= message;
            } else {
                unmatched.push(message);
            }
        }

        errors = next as FormErrors<In>;
        formError = unmatched.join(', ');
    }

    async function submit(handler: (data: S['infer']) => Promise<void>) {
        const result = schema(values);

        if (result instanceof type.errors) {
            errors = translateErrors<In>(result);
            return;
        }

        errors = {};
        formError = '';
        submitting = true;
        try {
            await handler(result);
        } catch (err) {
            if (err instanceof ApiValidationError) {
                applyApiErrors(err);
            } else throw err;
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
        get formError() {
            return formError;
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
        if (error.rule === 1) {
            // Kind of a hack, for strings minLength 1 is the best way to say not empty string, but we want a different message for that case
            return m['form.error.required']();
        }
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
