<script lang="ts">
	import { createQuery } from '@tanstack/svelte-query';
	import { eventRepository } from '$lib/api';

	const query = createQuery(() => ({
		queryKey: ['events'],
		queryFn: () => eventRepository.getEvents()
	}));
</script>

<div>
	{#if query.isPending}
		<p>Loading...</p>
	{:else if query.isError}
		<p>Error: {query.error.message}</p>
	{:else if query.isSuccess}
		<ul>
			{#each query.data as event}
				<li>{event.title}</li>
			{/each}
		</ul>
	{/if}
</div>
