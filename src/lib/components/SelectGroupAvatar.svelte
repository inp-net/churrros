<script lang="ts">
    import type { Avatar } from '#lib/api/index.ts';

    interface Props {
        /**
         * Les groupes en options à selectionner
         */
        groups: Avatar[];
        /**
         * L'uid du groupe selectionné
         */
        selected: string | null;
    }

    let { groups, selected = $bindable() }: Props = $props();

    //Un select qui permet de choisir parmi plusieurs group avatars
</script>
