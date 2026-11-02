import type { ArkError, ArkErrors } from 'arktype';
import { type Type, type } from 'arktype';

import { ApiValidationError } from '#lib/api/errors.ts';
import { m } from '#lib/paraglide/messages.js';

type FormErrors<T> = Partial<Record<keyof T & string, string>>;

/** Runtime check that `key` is an own property of `obj`, so TypeScript can narrow it to `keyof T` */
function isKeyOf<T extends object>(obj: T, key: string): key is keyof T & string {
    return Object.hasOwn(obj, key);
}

/**
 * Splits string-keyed messages into field errors (keys that exist on `values`)
 * and unmatched messages (everything else, to be shown as a general form error)
 */
function partitionErrors<T extends object>(source: Record<string, string>, values: T) {
    const errors: FormErrors<T> = {};
    const unmatched: string[] = [];

    for (const [key, message] of Object.entries(source)) {
        if (isKeyOf(values, key)) {
            errors[key] ??= message;
        } else {
            unmatched.push(message);
        }
    }

    return { errors, unmatched };
}

export function createForm<S extends Type<any>>(schema: S, initial: S['inferIn']) {
    type In = S['inferIn'];

    const values = $state<In>(initial);
    let errors = $state<FormErrors<In>>({}),
        formError = $state(''), // Error that is not related to a specific field
        submitting = $state(false);

    function setErrors(source: Record<string, string>) {
        const result = partitionErrors(source, values);
        errors = result.errors;
        formError = result.unmatched.join(', ');
    }

    function applyApiErrors(err: ApiValidationError) {
        const source: Record<string, string> = {};

        for (const { path, message } of err.fieldErrors) {
            source[path.join('.')] ??= message;
        }

        setErrors(source);
    }

    async function submit(handler: (data: S['infer']) => Promise<void>) {
        const result = schema(values);

        if (result instanceof type.errors) {
            console.error('Validation errors:', result);
            setErrors(translateErrors(result));
            return;
        }

        errors = {};
        formError = '';
        submitting = true;
        try {
            await handler(result);
        } catch (error) {
            if (error instanceof ApiValidationError) {
                applyApiErrors(error);
            } else {
                throw error;
            }
        } finally {
            submitting = false;
        }
    }

    return {
        get errors() {
            return errors;
        },
        get formError() {
            return formError;
        },
        submit,
        get submitting() {
            return submitting;
        },
        get values() {
            return values;
        },
    };
}

function translateErrors(errors: ArkErrors): Record<string, string> {
    const result: Record<string, string> = {};

    for (const [path, list] of Object.entries(errors.flatByPath)) {
        result[path] = getErrorMessage(list[0]);
    }

    return result;
}

/**
 * Translates an ArkError into a user-friendly error message
 * @param error the ArkError to translate
 * @returns A user-friendly error message
 */
function getErrorMessage(error: Readonly<ArkError>): string {
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
