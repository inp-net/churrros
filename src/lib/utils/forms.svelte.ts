import { m } from '#lib/paraglide/messages.js';
import { ArkErrors, type, type Type } from 'arktype';

export function createForm<S extends Type<any>>(schema: S, initial: S['inferIn']) {
    let values = $state(initial);
    let errors = $state<Record<string, string>>({});
    let submitting = $state(false);

    async function submit(handler: (data: S['infer']) => Promise<void>) {
        const result = schema(values);

        if (result instanceof type.errors) {
            errors = translateErrors(result);
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

function translateErrors(errors: ArkErrors): Record<string, string> {
    const result: Record<string, string> = {};

    for (const [path, list] of Object.entries(errors.flatByPath)) {
        // TODO : This looks awful
        const e = list[0];
        result[path] = e.hasCode('required')
            ? m['form.error.required']()
            : e.hasCode('domain')
              ? m['form.error.invalid_type']()
              : e.hasCode('minLength')
                ? m['form.error.min_length']({ min: e.rule })
                : e.hasCode('maxLength')
                  ? m['form.error.max_length']({ max: e.rule })
                  : e.hasCode('pattern')
                    ? m['form.error.invalid_format']()
                    : m['form.error.invalid']();
    }

    return result;
}
