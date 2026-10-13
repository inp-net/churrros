<script lang="ts">
    import type { Avatar } from '#lib/api/index.ts';

    interface Props {
        /**
         * The list of avatars to display in the select group avatar component
         */
        groups: Avatar[];
        /**
         * The uid of the selected avatar.
         */
        selected: string | null;
    }

    let { groups, selected = $bindable() }: Props = $props();
</script>

<!-- NOT IMPLEMENTED -->
