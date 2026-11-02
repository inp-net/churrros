<script lang="ts">
    import { ApiValidationError } from '#lib/api/errors.ts';
    import FormField from '#lib/components/forms/FormField.svelte';
    import { m } from '#lib/paraglide/messages.js';
    import { createForm } from '#lib/utils/forms.svelte.ts';

    import { type LoginInput, loginSchema } from './login.schema';

    let { onsubmit }: { onsubmit: (data: LoginInput) => Promise<void> } = $props();

    const form = createForm(loginSchema, { password: '', username: '' });
    let submitError = $state('');

    function handleSubmit(e: SubmitEvent) {
        e.preventDefault();
        submitError = '';
        form.submit(async (data) => {
            try {
                await onsubmit(data);
            } catch (error) {
                if (error instanceof ApiValidationError) {
                    throw error; // We need to throw those error so createForm catches them
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
