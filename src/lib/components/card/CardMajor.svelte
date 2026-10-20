<script lang="ts">
    import type { MajorInfos } from '#lib/api/index.ts';
    import { m } from '#lib/paraglide/messages.js';
    import Avatar from '../avatar/Avatar.svelte';

    interface Props {
        major: MajorInfos;
    }

    let { major }: Props = $props();
</script>

<Avatar avatar={major.avatar} link={`/m/${major.avatar.uid}`} />
{major.fullName}
{#if major.discontinued}
    <span>{m['major.discontinued']()}</span>
{/if}
