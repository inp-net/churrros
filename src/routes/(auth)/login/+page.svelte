<script lang="ts">
    import { goto } from '$app/navigation';
    import { page } from '$app/state';

    import { credentialsProvider } from '#lib/auth/providers/index.ts';
    import { oAuthProviders } from '#lib/auth/providers/oauth/index.ts';
    import type { LoginInput } from '#lib/forms/auth/login.schema.ts';
    import LoginForm from '#lib/forms/auth/LoginForm.svelte';
    import { m } from '#lib/paraglide/messages.js';

    async function login({ username, password }: LoginInput) {
        await credentialsProvider.login(username, password);
        await goto('/login/done');
    }

    const currentUrl = $derived(new URL(page.url.href));
</script>

<LoginForm onsubmit={login} />

{#each oAuthProviders as provider}
    <a href={provider.loginUrl(currentUrl).toString()}>
        <img src={provider.iconUrl} alt={provider.name} />
        {m['login.with']({ provider: provider.name })}
    </a>
{/each}
