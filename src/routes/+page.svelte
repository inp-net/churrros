<script lang="ts">
	import { page } from '$app/state';
	import { setLocale } from '$lib/paraglide/runtime';
	import { m } from '$lib/paraglide/messages';
</script>

{#if page.data.user}
	<h1>{m.hello_world({ name: page.data.user.firstName })}</h1>
{:else}
	<h1><a href="/login">{m.login()}</a></h1>
{/if}

<div>
	<button onclick={() => setLocale('en')}>en</button>
	<button onclick={() => setLocale('es')}>es</button>
	<button onclick={() => setLocale('fr')}>fr</button>
</div>

<a href="/events">{m.events()}</a>
