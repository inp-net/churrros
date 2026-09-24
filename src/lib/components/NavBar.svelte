<script lang="ts">
	import type { User } from '$lib/api/types';
	import { Flex, Tooltip } from 'azucar-ui';
	import { BlocksIcon, HouseIcon, SearchIcon, TicketIcon } from '@lucide/svelte';
	import { page } from '$app/state';
	import NavBarUser from './NavBarUser.svelte';
	import { MediaQuery } from 'svelte/reactivity';
	import type { Component } from 'svelte';

	const { user }: { user: User | null } = $props();

	type Link = {
		href: string;
		label: string;
		component: Component<any>;
		props?: Record<string, any>;
	};

	const links: Link[] = $derived([
		{ href: '/', label: 'Accueil', component: HouseIcon },
		{ href: '/search', label: 'Recherche', component: SearchIcon },
		{ href: '/events', label: 'Events', component: TicketIcon },
		{ href: '/services', label: 'Services', component: BlocksIcon },
		{ href: '/profile', label: 'Profile', component: NavBarUser, props: { user } }
	]);

	function isLinkSelected(linkHref: string, currentPath: string): boolean {
		if (linkHref === '/') {
			return currentPath === '/';
		} else {
			return currentPath.startsWith(linkHref);
		}
	}

	const isBigScreen = new MediaQuery('(min-width: 768px)');
</script>

{#snippet linkItem(link: Link)}
	{@const LinkComponent = link.component as any}
	<a class:navbar-selected={isLinkSelected(link.href, page.url.pathname)} href={link.href}>
		<LinkComponent {...link.props ?? {}} />
	</a>
{/snippet}

<Flex class="navbar" justify="space-evenly" align="center" gap="zero">
	{#each links as link}
		{#if isBigScreen.current}
			<Tooltip text={link.label} position="right" class="navbar-tooltip">
				{@render linkItem(link)}
			</Tooltip>
		{:else}
			{@render linkItem(link)}
		{/if}
	{/each}
</Flex>

<style>
	:global(.navbar) {
		position: fixed;
		left: 0;
		right: 0;
		bottom: var(--size-md);
		backdrop-filter: blur(var(--size-sm));
		background-color: color-mix(in oklch, var(--color-bg) 50%, transparent);
		border-radius: var(--corner-radius-full);
		margin: 0 var(--size-md);
		padding: var(--size-md) 0;
	}

	:global(.navbar a) {
		color: var(--color-fg-low);
		display: flex;
		text-decoration: none;
	}

	.navbar-selected {
		color: var(--color-fg-high);
		/* subtle glow */
		filter: drop-shadow(
			0 0 var(--size-xxs) color-mix(in oklch, var(--color-fg-high) 75%, transparent)
		);
	}

	:global(.navbar-tooltip) {
		display: none;
		flex-grow: 1;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	@media (min-width: 768px) {
		:global(.navbar) {
			flex-direction: column !important;
			left: var(--size-md);
			right: auto;
			top: 0;
			bottom: 0;
			margin: auto 0;
			padding: 0 var(--size-md);
			max-height: 325px;
		}

		:global(.navbar-tooltip) {
			display: block;
		}
	}
</style>
