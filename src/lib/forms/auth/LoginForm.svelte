<script lang="ts">
    import { createForm } from '#lib/utils/forms.svelte.ts';
    import FormField from '#lib/components/FormField.svelte';
    import { loginSchema, type LoginInput } from './login.schema';
    import { m } from '#lib/paraglide/messages.js';

    let { onsubmit }: { onsubmit: (data: LoginInput) => Promise<void> } = $props();

    const form = createForm(loginSchema, { username: '', password: '' });
    let submitError = $state('');

    function handleSubmit(e: SubmitEvent) {
        e.preventDefault();
        submitError = '';
        form.submit(async (data) => {
            try {
                await onsubmit(data);
            } catch {
                submitError = 'Identifiants incorrects ou erreur serveur';
            }
        });
    }
</script>

<form title="Se connecter" onsubmit={handleSubmit} novalidate>
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

    {#if submitError}<p role="alert">{submitError}</p>{/if}

    <button type="submit" disabled={form.submitting}>{m['form.login.submit']()}</button>
</form>
