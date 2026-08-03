<script lang="ts">
	import { goto } from '$app/navigation';
	import { credentialsProvider } from '$lib/auth/providers';
	import { oAuthProviders } from '$lib/auth/providers/oauth';
	import { page } from '$app/state';

	async function handleSubmit(event: Event) {
		event.preventDefault();
		const form = event.target as HTMLFormElement;
		const formData = new FormData(form);
		const username = formData.get('username') as string;
		const password = formData.get('password') as string;

		try {
			await credentialsProvider.login(username, password);
			await goto('/login/done');
		} catch (error) {
			console.error('Login failed:', error);
		}
	}
</script>

<form title="Se connecter" method="POST" onsubmit={handleSubmit}>
	<input type="text" name="username" placeholder="Email ou uid" required />
	<input type="password" name="password" placeholder="Mot de passe" required />
	<button type="submit">Se connecter</button>
</form>

{#each oAuthProviders as provider}
	<a href={provider.loginUrl(new URL(page.url)).toString()}>
		<img src={provider.iconUrl} alt={provider.name} />
		Se connecter avec {provider.name}
	</a>
{/each}
