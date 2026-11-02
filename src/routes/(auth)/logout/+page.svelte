<script lang="ts">
    import { goto, refreshAll } from "$app/navigation";
    import { clearToken } from "#lib/auth/session.ts";
    import { onMount } from "svelte";
    import { m } from "#lib/paraglide/messages.js";

    onMount(async () => {
        clearToken();
        await refreshAll();
        await goto("/");
    });
</script>

<p>{m["loading"]()}</p>
