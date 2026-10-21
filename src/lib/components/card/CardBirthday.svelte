<script lang="ts">
    import { Details, Flex, AvatarGroup, Avatar as AvatarUI } from 'azucar-ui';
    import { CakeIcon } from '@lucide/svelte';
    import { m } from '#lib/paraglide/messages.js';
    import type { Avatar } from '#lib/api/index.ts';

    type Props = {
        avatars: Avatar[] | undefined;
    };

    let { avatars }: Props = $props();

    let open = $state(false);
</script>

<Details shadow border bind:open>
    {#snippet summarySnippet()}
        <Flex align="center" justify="space-between" style="flex-grow: 1;">
            <Flex align="center">
                <CakeIcon />
                <h4>{m['birthdays']()}</h4>
            </Flex>
            {#if !open}
                <AvatarGroup size="lg" limit={3}>
                    {#if avatars}
                        {#each avatars as avatar}
                            <AvatarUI alt={avatar.name} src={avatar.pictureURL} size="lg" />
                        {/each}
                    {:else}
                        <p>{m['loading']()}</p>
                    {/if}
                </AvatarGroup>
            {/if}
        </Flex>
    {/snippet}

    {#if avatars?.length == 0}
        <p>{m['no_birthdays_today']()}</p>
    {/if}

    {#each avatars as avatar}
        <Flex align="center" gap="md">
            <AvatarUI alt={avatar.name} src={avatar.pictureURL} size="lg" />
            <p>{avatar.name}</p>
        </Flex>
    {/each}
</Details>
