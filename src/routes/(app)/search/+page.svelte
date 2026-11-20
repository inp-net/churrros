<script lang="ts">
    import { SearchIcon } from '@lucide/svelte';
    import { createQuery, keepPreviousData } from '@tanstack/svelte-query';
    import { Skeleton, Stack, TextInput } from 'azucar-ui';

    import { searchRepository } from '#lib/api/graphql/repositories/search/index.ts';
    import type { Searchable } from '#lib/api/types.ts';
    import SearchResult from '#lib/components/SearchResult.svelte';
    import { m } from '#lib/paraglide/messages.js';
    import { debounced } from '#lib/utils/debounce.svelte.ts';

    let searchQuery = $state('');
    let searchCategories = $state<Searchable[]>(['Events', 'Groups', 'Users']);

    const debouncedSearchQuery = debounced(() => searchQuery, 300);

    const query = createQuery(() => ({
        enabled: debouncedSearchQuery.current.trim().length > 0,
        placeholderData: keepPreviousData,
        queryFn: () => searchRepository.search(debouncedSearchQuery.current, searchCategories),
        queryKey: ['search', debouncedSearchQuery.current, searchCategories],
        staleTime: 0, //We disable caching
    }));
</script>

<TextInput
    type="text"
    bind:value={searchQuery}
    placeholder={m['search_placeholder']()}
    icon={SearchIcon}
/>

{#if query.isEnabled && query.isPending}
    {#each Array(4) as _}
        <Skeleton height={`calc(var(--size-xl))`} />
    {/each}
{:else if query.isError}
    <p>Error: {query.error.message}</p>
{:else if query.isSuccess}
    {#if query.data.length === 0}
        <p>{m['search_no_results']()}</p>
    {:else}
        <Stack>
            {#each query.data as searchResult (searchResult.id)}
                <SearchResult {searchResult} />
            {/each}
        </Stack>
    {/if}
{/if}
