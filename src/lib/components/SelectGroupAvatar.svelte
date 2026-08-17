<script lang="ts">
	import type { GroupAvatar } from '$lib/api';

	interface Props {
		/**
		 * Les groupes en options à selectionner
		 */
		groups: GroupAvatar[];
		/**
		 * L'uid du groupe selectionné
		 */
		selected: string | null;
	}

	let { groups, selected = $bindable() }: Props = $props();

	//Un select qui permet de choisir parmi plusieurs group avatars
</script>
