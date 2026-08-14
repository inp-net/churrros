<script lang="ts">
	import type { Avatar } from '$lib/api';

	interface Props {
		school: Avatar;
	}

	let { school }: Props = $props();
</script>

<div>
	{school.name}
	{school.uid}
	<img src={school.pictureURL} alt="Groupe" width="100" height="100" />
</div>
