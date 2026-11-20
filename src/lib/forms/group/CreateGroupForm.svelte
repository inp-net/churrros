<script lang="ts">
    import { ApiValidationError } from '#lib/api/errors.ts';
    import { type Avatar, GROUP_TYPES } from '#lib/api/types.ts';
    import FormField from '#lib/components/forms/FormField.svelte';
    import SelectAvatar from '#lib/components/forms/SelectAvatar.svelte';
    import { m } from '#lib/paraglide/messages.js';
    // For now, we need to separate creation and edition of groups, but with the future api we will be able to merge them into a single form.
    import { createForm } from '#lib/utils/forms.svelte.ts';
    import { groupTypeToLocalizedString } from '#lib/utils/i18n.ts';

    import { type CreateGroupInput, createGroupSchema } from './group.schema';

    interface Props {
        /**
         * The function to call when the form is submitted. It should handle the creation of the group with the provided data.
         * @param data The data from the form, validated against the CreateGroupInput schema.
         */
        onsubmit: (data: CreateGroupInput) => Promise<void>;
        /**
         * The list of student associations on which the currently authenticated user can create groups on.
         * This is used to populate the select input for choosing a student association when creating a group.
         */
        studentAssociations: Avatar[];
    }

    let { onsubmit, studentAssociations }: Props = $props();

    const form = createForm(createGroupSchema, {
        groupType: 'Club',
        name: '',
        studentAssociationId: '',
        uid: '',
    });
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
                submitError = m['form.group.create.error']();
            }
        });
    }
</script>

<form title={m['form.group.create.title']()} onsubmit={handleSubmit} novalidate>
    <FormField
        label={m['form.group.studentAssociation']()}
        error={form.errors.studentAssociationId}
    >
        <SelectAvatar
            avatars={studentAssociations}
            bind:selected={form.values.studentAssociationId}
        />
    </FormField>

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

    {#if form.formError}<p role="alert">{form.formError}</p>{/if}
    {#if submitError}<p role="alert">{submitError}</p>{/if}

    <button type="submit" disabled={form.submitting}>{m['form.group.create.submit']()}</button>
</form>
