<script lang="ts">
	import type { LightEvent } from '$lib/api';
	import Avatar from '../avatar/Avatar.svelte';

	interface Props {
		event: LightEvent;
	}

	let { event }: Props = $props();
</script>

<Avatar avatar={event.organizer} />
{event.title}
{event.startsAt}
{event.endsAt}
{event.location}
