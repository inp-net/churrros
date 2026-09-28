<script lang="ts">
    import { page } from '$app/state';
    import { setLocale, getLocale } from '$lib/paraglide/runtime';
    import { m } from '$lib/paraglide/messages';
    import { Button, ButtonGroup, Stack } from 'azucar-ui';
</script>

<Stack gap="xl">
    <Stack>
        <h1>Churros</h1>
    </Stack>

    {#if page.data.user}
        <h1>{m['hello_world']({ name: page.data.user.firstName })}</h1>
    {:else}
        <Button href="/login">{m['login']()}</Button>
    {/if}

    <ButtonGroup>
        <Button
            variant={getLocale() == 'en' ? 'outline' : 'default'}
            onclick={() => setLocale('en')}
        >
            en
        </Button>
        <Button
            variant={getLocale() == 'es' ? 'outline' : 'default'}
            onclick={() => setLocale('es')}
        >
            es
        </Button>
        <Button
            variant={getLocale() == 'fr' ? 'outline' : 'default'}
            onclick={() => setLocale('fr')}
        >
            fr
        </Button>
    </ButtonGroup>

    <a href="/events">{m['events']()}</a>
    <a href="/bookings">{m['bookings']()}</a>
</Stack>
