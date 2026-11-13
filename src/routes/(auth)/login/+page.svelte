<script lang="ts">
    import { goto } from '$app/navigation';
    import { page } from '$app/state';

    import { credentialsProvider } from '#lib/auth/providers/index.ts';
    import { oAuthProviders } from '#lib/auth/providers/oauth/index.ts';
    import type { OAuthProvider } from '#lib/auth/types.js';
    import type { LoginInput } from '#lib/forms/auth/login.schema.ts';
    import LoginForm from '#lib/forms/auth/LoginForm.svelte';
    import { m } from '#lib/paraglide/messages.js';
    import { platform } from '#lib/platform/index.ts';

    async function login({ username, password }: LoginInput) {
        await credentialsProvider.login(username, password);
        await goto('/login/done');
    }

    async function loginWith(provider: OAuthProvider) {
        const callback = platform.authFlow.callbackUrl('/login/done');
        await platform.authFlow.start(provider.loginUrl(callback));
    }

    const currentUrl = $derived(new URL(page.url.href));
</script>

<LoginForm onsubmit={login} />

{#each oAuthProviders as provider}
    <button type="button" onclick={() => loginWith(provider)}>
        <img src={provider.iconUrl} alt="" />
        {m['login.with']({ provider: provider.name })}
    </button>
{/each}
