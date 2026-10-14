import { type, type Type } from 'arktype';

export function createForm<S extends Type<any>>(schema: S, initial: S['inferIn']) {
    let values = $state(initial);
    let errors = $state<Record<string, string>>({});
    let submitting = $state(false);

    async function submit(handler: (data: S['infer']) => Promise<void>) {
        const result = schema(values);

        if (result instanceof type.errors) {
            errors = Object.fromEntries(result.map((e) => [e.path.join('.'), e.message]));
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
