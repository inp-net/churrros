<script lang="ts">
    // For now, we need to separate creation and edition of groups, but with the future api we will be able to merge them into a single form.
    import { createForm } from '#lib/utils/forms.svelte.ts';
    import FormField from '#lib/components/forms/FormField.svelte';
    import { updateGroupSchema, type UpdateGroupPatch } from './group.schema';
    import { m } from '#lib/paraglide/messages.js';
    import {
        GROUP_TYPES,
        type Avatar,
        type GroupEditInfo,
        type GroupPermissions
    } from '#lib/api/types.ts';
    import { groupTypeToLocalizedString } from '#lib/utils/i18n.ts';
    import { ApiValidationError } from '#lib/api/errors.ts';
    import SelectAvatar from '#lib/components/forms/SelectAvatar.svelte';
    import { untrack } from 'svelte';
    import { diffPatch } from '#lib/utils/diff.ts';

    interface Props {
        /**
         * The group data to pre-fill the form with.
         */
        group: GroupEditInfo;
        /**
         * The function to call when the form is submitted. It should handle the updating of the group with the provided data.
         * @param data The data from the form, validated against the schema.
         */
        onsubmit: (data: UpdateGroupPatch) => Promise<void>;
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

    function groupEditInfoToDefaultValues(group: GroupEditInfo): UpdateGroupPatch {
        return {
            name: group.avatar?.name,
            shortDescription: group.shortDescription ?? '',
            longDescription: group.longDescription ?? '',
            color: group.color ?? '#000000',
            email: group.email ?? null,
            room: group.address ?? '',
            relatedGroups: group.relatedGroups?.map((g) => g.uid) ?? [],
            studentAssociationId: group.studentAssociation?.uid ?? undefined,
            parentUid: group.parent?.uid ?? null,
            joinPolicy: group.selfJoinable ? 'Open' : 'Closed',
            groupType: group.type,
            unlisted: group.unlisted
            // TODO : Handle accounts because i didn't want to do it
        };
    }

    const initialValues = groupEditInfoToDefaultValues(untrack(() => group)); // No need for reactivity here, we just want to pre-fill the form with the initial group data

    const form = createForm(updateGroupSchema, initialValues);
    let submitError = $state('');

    function handleSubmit(e: SubmitEvent) {
        e.preventDefault();
        submitError = '';
        form.submit(async (data) => {
            const patch = diffPatch(initialValues, data);
            console.log('Patch : ', patch);
            if (Object.keys(patch).length === 0) return;
            try {
                await onsubmit(patch);
            } catch (err) {
                console.error('Error submitting form:', err);
                if (err instanceof ApiValidationError) {
                    throw err; // We need to throw those error so createForm catches them
                }
                submitError = m['form.group.edit.error']();
            }
        });
    }
</script>

<form title={m['form.group.edit.title']()} onsubmit={handleSubmit} novalidate>
    {#if permissions.canEditStudentAssociation}
        <FormField
            label={m['form.group.studentAssociation']()}
            error={form.errors.studentAssociationId}
        >
            <SelectAvatar
                avatars={studentAssociations}
                bind:selected={form.values.studentAssociationId!}
            />
        </FormField>
    {/if}

    {#if permissions.canEditDetails}
        <FormField label={m['form.group.name']()} error={form.errors.name}>
            <input type="text" bind:value={form.values.name} />
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

        <!-- Right now it's room but when we change the good name will be address -->
        <FormField label={m['form.group.address']()} error={form.errors.room}>
            <input type="text" bind:value={form.values.room} />
        </FormField>

        <FormField label={m['form.group.color']()} error={form.errors.color}>
            <input
                type="color"
                bind:value={() => form.values.color ?? '#000000', (v) => (form.values.color = v)}
            />
        </FormField>

        <FormField label={m['form.group.parent']()} error={form.errors.parentUid}>
            <input type="string" value={form.values.parentUid} />
        </FormField>

        <!-- TODO : Add parentUid and relatedGroups with select of all groups -->
        <!-- Related groups is a multi select ?? -->
    {/if}

    {#if permissions.canEditType}
        <FormField label={m['form.group.type']()} error={form.errors.groupType}>
            <select bind:value={form.values.groupType}>
                {#each GROUP_TYPES as groupType}
                    <option value={groupType}>{groupTypeToLocalizedString(groupType)}</option>
                {/each}
            </select>
        </FormField>
    {/if}

    {#if permissions.canEditJoinPolicy}
        <FormField label={m['form.group.joinPolicy']()} error={form.errors.joinPolicy}>
            <select bind:value={form.values.joinPolicy}>
                <option value="Open">{m['form.group.joinPolicy.open']()}</option>
                <option value="Closed">{m['form.group.joinPolicy.closed']()}</option>
            </select>
        </FormField>
    {/if}

    {#if permissions.canEditUnlisted}
        <FormField label={m['form.group.unlisted']()} error={form.errors.unlisted}>
            <input type="checkbox" bind:checked={form.values.unlisted} />
        </FormField>
    {/if}

    {#if permissions.canEditLydiaAccounts}
        <!-- TODO : Add lydia accounts management -->
    {/if}

    {#if form.formError}<p role="alert">{form.formError}</p>{/if}
    {#if submitError}<p role="alert">{submitError}</p>{/if}

    <button type="submit" disabled={form.submitting}>{m['form.group.edit.submit']()}</button>
</form>
