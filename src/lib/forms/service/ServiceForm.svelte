<script lang="ts">
    import { untrack } from 'svelte';

    import { ApiValidationError } from '#lib/api/errors.ts';
    import type { Avatar } from '#lib/api/types.ts';
    import FormField from '#lib/components/forms/FormField.svelte';
    import SelectAvatar from '#lib/components/forms/SelectAvatar.svelte';
    import { m } from '#lib/paraglide/messages.js';
    import { createForm } from '#lib/utils/forms.svelte.ts';

    import { type ServiceInput, serviceSchema } from './service.schema';

    interface Props {
        /**
         * The service data to pre-fill the form with. If provided, the form will be in edit mode and will pre-fill the fields with the provided data.
         */
        service?: ServiceInput;
        /**
         * The function to call when the form is submitted. It should handle the creation of the group with the provided data.
         * @param data The data from the form, validated against the CreateGroupInput schema.
         */
        onsubmit: (data: ServiceInput) => Promise<void>;

        /**
         * The list of student associations on which the currently authenticated user can create services on.
         * This is used to populate the select input for choosing a student association when creating a service
         */
        studentAssociations: Avatar[];

        /**
         * The list of groups on which the currently authenticated user can create services on.
         * This is used to populate the select input for choosing a group when creating a service
         */
        groups: Avatar[];

        /**
         * The list of schools on which the currently authenticated user can create services on.
         * This is used to populate the select input for choosing a school when creating a service
         */
        schools: Avatar[];
    }

    let { onsubmit, service, studentAssociations, groups, schools }: Props = $props();

    function getInitialValues(data?: ServiceInput): ServiceInput {
        return {
            name: data?.name ?? '',
            url: data?.url ?? '',
            description: data?.description ?? '',
            importance: data?.importance ?? 0,
            hide: data?.hide ?? false,
            iconUrl: data?.iconUrl ?? null,
            schoolId: data?.schoolId ?? null,
            groupId: data?.groupId ?? null,
            studentAssociationId: data?.studentAssociationId ?? null,
        };
    }

    const form = createForm(serviceSchema, getInitialValues(untrack(() => service)));

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
                submitError = service
                    ? m['form.service.edit.error']()
                    : m['form.service.create.error']();
            }
        });
    }
</script>

<form
    title={service ? m['form.service.edit.title']() : m['form.service.create.title']()}
    onsubmit={handleSubmit}
    novalidate
>
    <FormField label={m['form.service.name']()} error={form.errors.name}>
        <input
            type="text"
            placeholder={m['form.service.name.placeholder']()}
            bind:value={form.values.name}
        />
    </FormField>
    <FormField label={m['form.service.url']()} error={form.errors.url}>
        <input
            type="text"
            placeholder={m['form.service.url.placeholder']()}
            bind:value={form.values.url}
        />
    </FormField>
    <FormField label={m['form.service.description']()} error={form.errors.description}>
        <input
            type="text"
            placeholder={m['form.service.description.placeholder']()}
            bind:value={form.values.description}
        />
    </FormField>
    <FormField label={m['form.service.importance']()} error={form.errors.importance}>
        <input
            type="number"
            placeholder={m['form.service.importance.placeholder']()}
            bind:value={form.values.importance}
        />
    </FormField>
    <FormField label={m['form.service.hide']()} error={form.errors.hide}>
        <input type="checkbox" bind:checked={form.values.hide} />
    </FormField>
    <FormField label={m['form.service.iconUrl']()} error={form.errors.iconUrl}>
        <input
            type="text"
            placeholder={m['form.service.iconUrl.placeholder']()}
            bind:value={form.values.iconUrl}
        />
    </FormField>
    <FormField
        label={m['form.service.studentAssociationId']()}
        error={form.errors.studentAssociationId}
    >
        <SelectAvatar
            avatars={studentAssociations}
            bind:selected={form.values.studentAssociationId}
        />
    </FormField>
    <FormField label={m['form.service.groupId']()} error={form.errors.groupId}>
        <SelectAvatar avatars={groups} bind:selected={form.values.groupId} />
    </FormField>
    <FormField label={m['form.service.schoolId']()} error={form.errors.schoolId}>
        <SelectAvatar avatars={schools} bind:selected={form.values.schoolId} />
    </FormField>
    {#if submitError || form.formError}
        <p role="alert">
            {submitError || form.formError}
        </p>
    {/if}

    <button type="submit" disabled={form.submitting}>
        {service ? m['form.service.edit.submit']() : m['form.service.create.submit']()}
    </button>
</form>
