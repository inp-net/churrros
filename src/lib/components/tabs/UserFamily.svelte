<script lang="ts">
    import type { UserFamily } from '#lib/api/index.ts';

    interface Props {
        userFamily: UserFamily;
    }

    let { userFamily }: Props = $props();
    //TODO Voir comment faire pour que le graphe soit bien affiché
</script>

{userFamily}
