<script lang="ts">
	import { createQuery } from '@tanstack/svelte-query';
	import { eventRepository } from '$lib/api';
	import { setLocale } from '$lib/paraglide/runtime';
	import { m } from '$lib/paraglide/messages.js';

	const query = createQuery(() => ({
		queryKey: ['events'],
		queryFn: () => eventRepository.getEvents()
	}));
</script>

<h1>{m.hello_world({ name: 'SvelteKit User' })}</h1>

<div>
	<button onclick={() => setLocale('en')}>en</button>
	<button onclick={() => setLocale('es')}>es</button>
	<button onclick={() => setLocale('fr')}>fr</button>
</div>

<div>
	{#if query.isPending}
		<p>{m.loading()}</p>
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
