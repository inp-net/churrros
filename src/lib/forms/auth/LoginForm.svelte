<script lang="ts">
    import { createForm } from '#lib/utils/forms.svelte.ts';
    import FormField from '#lib/components/forms/FormField.svelte';
    import { loginSchema, type LoginInput } from './login.schema';
    import { m } from '#lib/paraglide/messages.js';
    import { ApiValidationError } from '#lib/api/errors.ts';

    let { onsubmit }: { onsubmit: (data: LoginInput) => Promise<void> } = $props();

    const form = createForm(loginSchema, { username: '', password: '' });
    let submitError = $state('');

    function handleSubmit(e: SubmitEvent) {
        e.preventDefault();
        submitError = '';
        form.submit(async (data) => {
            try {
                await onsubmit(data);
            } catch (err) {
                if (err instanceof ApiValidationError) {
                    throw err; // We need to throw those error so createForm catches them
                }
                submitError = m['form.login.error']();
            }
        });
    }
</script>

<form title={m['login']()} onsubmit={handleSubmit} novalidate>
    <FormField label={m['form.login.username']()} error={form.errors.username}>
        <input
            type="text"
            autocomplete="username"
            placeholder={m['form.login.username.placeholder']()}
            bind:value={form.values.username}
        />
    </FormField>

    <FormField label={m['form.login.password']()} error={form.errors.password}>
        <input
            type="password"
            autocomplete="current-password"
            placeholder={m['form.login.password.placeholder']()}
            bind:value={form.values.password}
        />
    </FormField>

    {#if submitError || form.formError}
        <p role="alert">
            {submitError || form.formError}
        </p>
    {/if}

    <button type="submit" disabled={form.submitting}>{m['form.login.submit']()}</button>
</form>
