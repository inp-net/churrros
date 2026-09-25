<script lang="ts">
	import ChurrosBorderIcon from '$lib/assets/ChurrosBorderIcon.svelte';
	import { Button, Flex } from 'azucar-ui';
	import { PlusIcon } from '@lucide/svelte';
</script>

<Flex class="header" justify="space-between" align="center">
	<Flex gap="sm">
		<ChurrosBorderIcon />
		<h3 class="header-title">Churros</h3>
	</Flex>
	<Button variant="ghost" icon={PlusIcon} />
</Flex>

<style>
	:global(.header) {
		color: var(--color-fg-low);
	}

	.header-title {
		font-weight: normal;
	}
</style>
