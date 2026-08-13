<script lang="ts">
	import type { GroupAvatar } from '$lib/api';

	interface Props {
		groupInfo: GroupAvatar;
	}

	let { groupInfo }: Props = $props();
</script>

<div>
	{groupInfo.name}
	<img src={groupInfo.pictureURL} alt="Groupe" width="100" height="100" />
</div>
