<script lang="ts">
	import { goto } from '$app/navigation';
	import { credentialsProvider } from '$lib/auth/providers';

	async function handleSubmit(event: Event) {
		event.preventDefault();
		const form = event.target as HTMLFormElement;
		const formData = new FormData(form);
		const username = formData.get('username') as string;
		const password = formData.get('password') as string;

		try {
			const result = await credentialsProvider.login(username, password);
			console.log('Login successful:', result);
			//TODO : Le stocker
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
