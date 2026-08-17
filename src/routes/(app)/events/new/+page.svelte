<script lang="ts">
	//Je vais focus surtout sur faire un client pour les utilisateurs lambda et pas les formulaires
	//et tout

	import { meRepository } from '$lib/api';
	import SelectGroupAvatar from '$lib/components/SelectGroupAvatar.svelte';
	import { m } from '$lib/paraglide/messages';
	import { createQuery } from '@tanstack/svelte-query';

	//Dans churros v2 le formulaire de création d'event n'existe quasi pas c'est juste un modal
	//Avec choix du groupe crée un event vide et te redirige vers sa page d'edition
	//J'aime vraiment pas ce système mais il faut modifier l'API pour faire autrement donc pour le moment on va faire pareil

	const query = createQuery(() => ({
		queryKey: ['canCreateEventsOn'],
		queryFn: () => meRepository.getCanCreateEventsOn()
	}));
</script>

<div>
	{#if query.isPending}
		<p>{m.loading()}</p>
	{:else if query.isError}
		<p>Error: {query.error.message}</p>
	{:else if query.isSuccess}
		{#if query.data.length == 0}
			<!--Si y a aucun groupe on ne peut pas créer d'event-->
			Redirection automatique + Message droits manquants ?
		{/if}
		<!-- <SelectGroupAvatar groups={query.data} /> -->
	{/if}
</div>
