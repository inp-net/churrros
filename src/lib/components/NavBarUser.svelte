<script lang="ts">
    import type { User } from '$lib/api';
    import { UserIcon } from '@lucide/svelte';
    import { Avatar } from 'azucar-ui';

    const { user }: { user: User | null } = $props();
</script>

{#if user}
    <Avatar size="lg" src={user.pictureURL} alt={[user.firstName, user.lastName].join(' ')} />
{:else}
    <UserIcon />
{/if}
