<script lang="ts">
    // For now, we need to separate creation and edition of groups, but with the future api we will be able to merge them into a single form.
    import { createForm } from '#lib/utils/forms.svelte.ts';
    import FormField from '#lib/components/FormField.svelte';
    import { createGroupSchema, type CreateGroupInput } from './group.schema';
    import { m } from '#lib/paraglide/messages.js';
    import { GROUP_TYPES } from '#lib/api/types.ts';
    import { groupTypeToLocalizedString } from '#lib/utils/i18n.ts';

    let { onsubmit }: { onsubmit: (data: CreateGroupInput) => Promise<void> } = $props();

    const form = createForm(createGroupSchema, { name: '', uid: '', groupType: 'Club' });
    let submitError = $state('');

    function handleSubmit(e: SubmitEvent) {
        e.preventDefault();
        submitError = '';
        form.submit(async (data) => {
            try {
                await onsubmit(data);
            } catch {
                submitError = m['form.group.error']();
            }
        });
    }
</script>

<form title={m['form.group.title']()} onsubmit={handleSubmit} novalidate>
    <FormField label={m['form.group.name']()} error={form.errors.name}>
        <input
            type="text"
            autocomplete="username"
            placeholder={m['form.group.name.placeholder']()}
            bind:value={form.values.name}
        />
    </FormField>

    <FormField label={m['form.group.uid']()} error={form.errors.uid}>
        <input
            type="text"
            autocomplete="username"
            placeholder={m['form.group.uid.placeholder']()}
            bind:value={form.values.uid}
        />
    </FormField>

    <FormField label={m['form.group.type']()} error={form.errors.groupType}>
        <select bind:value={form.values.groupType}>
            {#each GROUP_TYPES as groupType}
                <option value={groupType}>{groupTypeToLocalizedString(groupType)}</option>
            {/each}
        </select>
    </FormField>

    {#if submitError}<p role="alert">{submitError}</p>{/if}

    <button type="submit" disabled={form.submitting}>{m['form.group.submit']()}</button>
</form>
