<!--
    @component FormField
    Simple wrapper component for form fields that provides a label and an error message.
-->
<script lang="ts">
    import type { Snippet } from 'svelte';

    interface Props {
        label: string;
        error?: string;
        children: Snippet;
    }

    // TODO : Add a11y attributes (aria-describedby, aria-invalid, etc.)

    let { label, error, children }: Props = $props();
</script>

<label>
    {label}
    {@render children()}
</label>
{#if error}<span role="alert">{error}</span>{/if}
