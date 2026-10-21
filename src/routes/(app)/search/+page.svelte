<script lang="ts">
    import { searchRepository } from '#lib/api/graphql/repositories/search/index.ts';
    import type { Searchable } from '#lib/api/types.ts';
    import SearchResult from '#lib/components/SearchResult.svelte';
    import { m } from '#lib/paraglide/messages.js';
    import { createQuery, keepPreviousData } from '@tanstack/svelte-query';
    import { debounced } from '#lib/utils/debounce.svelte.ts';

    let searchQuery = $state('');
    let searchCategories = $state<Searchable[]>(['Events', 'Groups', 'Users']);

    const debouncedSearchQuery = debounced(() => searchQuery, 300);

    const query = createQuery(() => ({
        queryKey: ['search', debouncedSearchQuery, searchCategories],
        queryFn: () => searchRepository.search(debouncedSearchQuery, searchCategories),
        enabled: debouncedSearchQuery.trim().length > 0,
        placeholderData: keepPreviousData,
        staleTime: 0 //We disable caching
    }));
</script>

<input type="text" bind:value={searchQuery} placeholder={m['search_placeholder']()} />
{#if query.isPending}
    <p>{m['loading']()}</p>
{:else if query.isError}
    <p>Error: {query.error.message}</p>
{:else if query.isSuccess}
    {#each query.data as searchResult (searchResult.id)}
        <SearchResult {searchResult} />
    {/each}
{/if}
