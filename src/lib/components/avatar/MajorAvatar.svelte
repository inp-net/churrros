<script lang="ts">
	import type { Avatar } from '$lib/api';

	interface Props {
		major: Avatar;
	}

	let { major }: Props = $props();
</script>

<div>
	{major.name}
	{major.uid}
	<img src={major.pictureURL} alt="Groupe" width="100" height="100" />
</div>
