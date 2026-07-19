<script lang="ts">
  import { createQuery } from "@tanstack/svelte-query";
  import { request } from "$lib/graphql/client";
  import { TEST_EVENTS_QUERY } from "$lib/graphql/queries";

  const query = createQuery(() => ({
    queryKey: ["events"],
    queryFn: () => request(TEST_EVENTS_QUERY),
    //Solution pour avoir les objets dans query.data et pas les edges,...
    //TODO : Voir si on peut pas faire mieux
    select: (data) => data.events.edges.map((edge) => edge.node),
  }));
</script>

<div>
  {#if query.isPending}
    <p>Loading...</p>
  {:else if query.isError}
    <p>Error: {query.error.message}</p>
  {:else if query.isSuccess}
    <ul>
      {#each query.data as event}
        <li>{event.title}</li>
      {/each}
    </ul>
  {/if}
</div>
