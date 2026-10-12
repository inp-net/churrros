<script lang="ts">
    import type { GroupInfos } from '#lib/api/index.ts';

    interface Props {
        groupInfo: GroupInfos;
    }
    let { groupInfo }: Props = $props();
</script>

<div>
    {groupInfo.roomIsOpen}
    {groupInfo.email}
    {groupInfo.color}
    {groupInfo.address}
</div>
