<script lang="ts">
    import type { Avatar as AvatarType } from '#lib/api/index.ts';
    import Avatar from '../avatar/Avatar.svelte';

    interface Props {
        /**
         * The list of avatars to display in the select group avatar component
         */
        avatars: AvatarType[];
        /**
         * The uid of the selected avatar.
         */
        selected: string | null;
    }

    let { avatars, selected = $bindable() }: Props = $props();
</script>

<select bind:value={selected}>
    {#each avatars as avatar}
        <option value={avatar.uid}><Avatar {avatar} /></option>
    {/each}
</select>
