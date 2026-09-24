<script lang="ts">
	import ChurrosBorderIcon from '$lib/assets/ChurrosBorderIcon.svelte';
	import { Button, Flex } from 'azucar-ui';
	import { PlusIcon } from '@lucide/svelte';
</script>

<Flex class="topbar" justify="space-between" align="center">
	<Flex gap="sm">
		<ChurrosBorderIcon />
		<h3 class="topbar-title">Churros</h3>
	</Flex>
	<Button variant="ghost" icon={PlusIcon} />
</Flex>

<style>
	:global(.topbar) {
		color: var(--color-fg-low);
	}

	.topbar-title {
		font-weight: normal;
	}
</style>
