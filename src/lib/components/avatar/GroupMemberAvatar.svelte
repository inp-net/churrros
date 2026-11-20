<script lang="ts">
    import type { GroupMember } from '#lib/api/index.ts';
    import { Frame, Stack, Flex, Avatar } from 'azucar-ui';

    interface Props {
        groupMember: GroupMember;
        showMember: boolean; //If true the link will go to the member profile, if false it will go to the group profile
    }

    let { groupMember, showMember }: Props = $props();
</script>

<Frame interactive>
    <!-- NOTE : In Churros V2 there is a roleemojis property that gives the users emoji for their role-->
    <!--I believe this should only be client side and has nothing to do with the server -->
    <!-- <Avatar -->
    <!--     avatar={groupMember.avatar} -->
    <!--     link={showMember ? `/u/${groupMember.avatar.uid}` : `/g/${groupMember.avatar.uid}`} -->
    <!-- /> -->
    <!--For the link it just works, but there might be a better way to do it -->

    <a
        target="_blank"
        href={showMember ? `/u/${groupMember.avatar.uid}` : `/g/${groupMember.avatar.uid}`}
        rel="noopener noreferrer"
    >
        <Flex wrap={false}>
            <div class="avatar-wrapper">
                <Avatar
                    src={groupMember.avatar.pictureURL}
                    size="xl"
                    alt={groupMember.avatar.name}
                />

                <div class="roles">
                    {#if groupMember.secretary}
                        <span class="role" title="Secretary">📝</span>
                    {/if}
                    {#if groupMember.treasurer}
                        <span class="role" title="Treasurer">💰</span>
                    {/if}
                    {#if groupMember.vicePresident}
                        <span class="role" title="Vice President">⭐</span>
                    {/if}
                    {#if groupMember.president}
                        <span class="role" title="President">👑</span>
                    {/if}
                </div>
            </div>
            <Stack gap="xs">
                <h4>{groupMember.avatar.name}</h4>
                <p class="ghost">{groupMember.title}</p>
            </Stack>
        </Flex>
    </a>
</Frame>

<style>
    .ghost {
        color: var(--color-fg-low);
    }

    .avatar-wrapper {
        position: relative;
        display: inline-flex;
        flex-shrink: 0;
    }

    .roles {
        position: absolute;
        top: -0.25rem;
        right: -0.25rem;
        display: flex;
        line-height: 1;
    }

    .role {
        width: 0.9rem;
        display: inline-flex;
        transform: rotate(25deg);
    }

    a {
        text-decoration: none;
        color: inherit;
    }
</style>
