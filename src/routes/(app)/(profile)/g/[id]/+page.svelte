<script lang="ts">
    import { page } from '$app/state';

    type Tab = 'info' | 'members' | 'see-also';

    const tab = $derived<Tab>((page.url.searchParams.get('tab') as Tab) || 'info');
</script>
