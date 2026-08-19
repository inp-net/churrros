<script lang="ts">
	import type { Ticket } from '$lib/api';

	//Pris direct de churros v2 quasiment donc ptet des trucs à revoir

	type BookingPayload = {
		churrosBeneficiary: string;
		beneficiary: string;
		authorName: string;
		authorEmail: string;
	};

	interface Props {
		ticket: Ticket;
	}

	let {
		ticket,
		onBook,
		open = $bindable(false)
	}: {
		ticket: Ticket;
		onBook: (payload: BookingPayload) => Promise<{ ok: boolean; error?: string }>;
		open: boolean;
	} = $props();

	type Step = 'start' | 'beneficiary-external' | 'beneficiary-internal' | 'confirm';

	let historyStack = $state<Step[]>(['start']);
	let step = $derived(historyStack.at(-1)!);

	let churrosBeneficiary = $state('');
	let beneficiary = $state('');
	let authorName = $state('');
	let authorEmail = $state('');

	let booking = $state(false);
	let error = $state('');

	let dialog: HTMLDialogElement | undefined;
	$effect(() => {
		if (open) dialog?.showModal();
		else dialog?.close();
	});

	function back() {
		if (historyStack.length > 1) historyStack = historyStack.slice(0, -1);
	}

	function advance(next: Step) {
		historyStack = [...historyStack, next];
	}

	async function createBooking() {
		booking = true;
		error = '';
		const result = await onBook({
			churrosBeneficiary,
			beneficiary,
			authorName,
			authorEmail
		});
		booking = false;
		if (result.ok) close();
		else error = result.error ?? 'Impossible de réserver la place';
	}
</script>

<dialog bind:this={dialog} onclose={() => (open = false)}>
	<h2>
		{#if step.startsWith('beneficiary')}
			Choisir le.a bénéficiaire
		{:else}
			Réserver une place
		{/if}
	</h2>

	{#if step === 'start'}
		<button onclick={() => createBooking()}> Pour moi </button>
		<button onclick={() => advance('beneficiary-internal')}>
			Pour quelqu'un qui a un compte Churros
		</button>
		<button onclick={() => advance('beneficiary-external')}> Pour quelqu'un d'autre </button>
		<button onclick={close}>Annuler</button>
	{:else if step === 'beneficiary-external'}
		<form
			onsubmit={(e) => {
				e.preventDefault();
				churrosBeneficiary = '';
				advance('confirm');
			}}
		>
			<label>
				Nom de la personne
				<input bind:value={beneficiary} required />
			</label>
			<button type="button" onclick={back}>Retour</button>
			<button type="submit">Réserver</button>
		</form>
	{:else if step === 'beneficiary-internal'}
		<form
			onsubmit={(e) => {
				e.preventDefault();
				beneficiary = '';
				advance('confirm');
			}}
		>
			<label>
				@ de la personne
				<input bind:value={churrosBeneficiary} required />
			</label>
			<button type="button" onclick={back}>Retour</button>
			<button type="submit">Réserver</button>
		</form>
	{:else if step === 'confirm'}
		<form
			onsubmit={(e) => {
				e.preventDefault();
				createBooking();
			}}
		>
			{#if churrosBeneficiary}
				<!--Fetch l'user repository pr chopper les infos -->
				<p>Réservation d'une place pour @{churrosBeneficiary}</p>
			{:else if beneficiary}
				<p>Réservation d'une place pour {beneficiary}</p>
			{/if}
			{#if error}
				<p>Erreur : {error}</p>
			{/if}
			<button type="button" onclick={back}>Retour</button>
			<button type="submit" disabled={booking}>
				{booking ? 'Réservation…' : 'Confirmer'}
			</button>
		</form>
	{/if}
</dialog>

<style>
	dialog {
		padding: 1.5rem;
		border: none;
		border-radius: 0.5rem;
	}
	form,
	dialog {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}
</style>
