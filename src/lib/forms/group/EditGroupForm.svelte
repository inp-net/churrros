<script lang="ts">
    // For now, we need to separate creation and edition of groups, but with the future api we will be able to merge them into a single form.
    import { createForm } from '#lib/utils/forms.svelte.ts';
    import FormField from '#lib/components/forms/FormField.svelte';
    import { updateGroupSchema, type UpdateGroupInput } from './group.schema';
    import { m } from '#lib/paraglide/messages.js';
    import { GROUP_TYPES, type Avatar, type GroupPermissions } from '#lib/api/types.ts';
    import { groupTypeToLocalizedString } from '#lib/utils/i18n.ts';
    import { ApiValidationError } from '#lib/api/errors.ts';
    import SelectAvatar from '#lib/components/forms/SelectAvatar.svelte';
    import { untrack } from 'svelte';

    interface Props {
        /**
         * The group data to pre-fill the form with.
         */
        group: UpdateGroupInput;
        /**
         * The function to call when the form is submitted. It should handle the updating of the group with the provided data.
         * @param data The data from the form, validated against the UpdateGroupInput schema.
         */
        onsubmit: (data: UpdateGroupInput) => Promise<void>;
        /**
         * The list of student associations on which the currently authenticated user can create groups on.
         * This is used to populate the select input for choosing a student association when creating a group.
         */
        studentAssociations: Avatar[];
        /**
         * The permissions of the currently authenticated user on the group being edited.
         * Used to hide and disable certain fields in the form based on the user's permissions.
         */
        permissions: GroupPermissions;
    }

    let { group, onsubmit, studentAssociations, permissions }: Props = $props();

    const form = createForm(
        updateGroupSchema,
        untrack(() => group) // No need for reactivity here, we just want to pre-fill the form with the initial group data
    );
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
                submitError = m['form.group.error']();
            }
        });
    }
</script>

<form title={m['form.group.edit.title']()} onsubmit={handleSubmit} novalidate>
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
        <input type="text" bind:value={form.values.name} />
    </FormField>

    <FormField label={m['form.group.type']()} error={form.errors.groupType}>
        <select bind:value={form.values.groupType}>
            {#each GROUP_TYPES as groupType}
                <option value={groupType}>{groupTypeToLocalizedString(groupType)}</option>
            {/each}
        </select>
    </FormField>

    <FormField label={m['form.group.shortDescription']()} error={form.errors.shortDescription}>
        <input type="text" bind:value={form.values.shortDescription} />
    </FormField>

    <FormField label={m['form.group.longDescription']()} error={form.errors.longDescription}>
        <textarea bind:value={form.values.longDescription}></textarea>
    </FormField>

    <FormField label={m['form.group.email']()} error={form.errors.email}>
        <input
            type="email"
            bind:value={() => form.values.email ?? '', (v) => (form.values.email = v || null)}
        />
        <!-- To handle null values (To indicate unset)-->
    </FormField>

    <FormField label={m['form.group.room']()} error={form.errors.room}>
        <input type="text" bind:value={form.values.room} />
    </FormField>

    <FormField label={m['form.group.color']()} error={form.errors.color}>
        <input
            type="color"
            bind:value={() => form.values.color ?? '#000000', (v) => (form.values.color = v)}
        />
    </FormField>

    <FormField label={m['form.group.joinPolicy']()} error={form.errors.joinPolicy}>
        <select bind:value={form.values.joinPolicy}>
            <option value="Open">{m['form.group.joinPolicy.open']()}</option>
            <option value="Closed">{m['form.group.joinPolicy.closed']()}</option>
        </select>
    </FormField>

    <FormField label={m['form.group.unlisted']()} error={form.errors.unlisted}>
        <input type="checkbox" bind:checked={form.values.unlisted} />
    </FormField>

    <!-- TODO : Add parentUid and relateGroups with select of all groups -->
    <!-- Related groups is a multi select ?? -->

    {#if form.formError}<p role="alert">{form.formError}</p>{/if}
    {#if submitError}<p role="alert">{submitError}</p>{/if}

    <button type="submit" disabled={form.submitting}>{m['form.group.edit.submit']()}</button>
</form>
