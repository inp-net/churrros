<script lang="ts">
	import { browser } from '$app/environment';
	import type { PaymentMethod } from '$lib/api';
	import { m } from '$lib/paraglide/messages';
	import { formatMoney } from '$lib/utils/i18n';
	import { PAYMENT_PROVIDERS } from '$lib/utils/payment';
	import PaymentMethodDisplay from '../PaymentMethodDisplay.svelte';

	type Step =
		'payment-options' | 'provider-form' | 'provider-waiting' | 'follow-up' | 'links' | 'end';

	//TODO Après modif de l'api l'objectif serait de modifier ce composant pour qu'il marche pour tous les types de paiements
	interface Props {
		//Code de associé au paiement (Actuellement celui de la réservation)
		code: string;
		isOpen: boolean;
		//Prix minimum du ticket
		minimumPrice: number;
		//Prix maximum du ticket, undefined si le ticket est à prix fixe
		maximumPrice: number | undefined;
		//Montant que l'utilisateur veut payer, par défaut minimumPrice
		wantsToPay: number;
		//Méthode de paiement autorisé pour le paiement
		allowedPaymentMethods: PaymentMethod[];
		//Méthode de paiement déjà choisie
		selectedPaymentMethod: PaymentMethod | undefined;
		//Callback quand l'utilisateur a choisi une méthode de paiement et un montant, renvoie true si le changement a bien marché, false sinon
		//Dans l'ideal on ferait ça mais l'api permet pas donc bon ;(
		//onSelectPaymentInfo: (paymentMethod: PaymentMethod, wantsToPay: number) => Promise<boolean>;
		//Liens à afficher à la fin du paiement, si y en a
		links: { name: string; url: string }[];
	}

	let {
		code,
		isOpen = $bindable(false),
		minimumPrice,
		maximumPrice,
		wantsToPay,
		allowedPaymentMethods,
		selectedPaymentMethod,
		links
	}: Props = $props();

	let dialog: HTMLDialogElement | undefined;
	let historyStack = $state<Step[]>(loadStoredSteps());
	let step = $derived(historyStack.at(-1)!);

	$effect(() => {
		if (isOpen) {
			dialog?.showModal();
		} else dialog?.close();
	});

	//Ptet un peu too much mais en gros si on reload on perd tout ce qui est chiant en vrai
	//Donc je sauvegarde en sessionStorage la stack d'etat pr pouvoir faire un reload
	//C'est utile pour le waiting (ex: Lydia)
	function savePersistedStep(stack: Step[]) {
		if (!browser) return;
		try {
			if (stack.length > 1) {
				sessionStorage.setItem(`PaymentModal${code}`, JSON.stringify(stack));
			} else {
				sessionStorage.removeItem(`PaymentModal${code}`);
			}
		} catch {
			return;
		}
	}

	function loadStoredSteps(): Step[] {
		if (!browser) return ['payment-options'];
		try {
			const raw = sessionStorage.getItem(`PaymentModal${code}`);
			if (!raw) return ['payment-options'];
			const parsed = JSON.parse(raw);
			if (Array.isArray(parsed) && parsed.length > 0) return parsed as Step[];
		} catch {
			return ['payment-options'];
		}
		return ['payment-options'];
	}

	function clearStoredSteps(): void {
		if (!browser) return;
		try {
			sessionStorage.removeItem(`PaymentModal${code}`);
		} catch {
			return; //C'est pas grave si on peut pas clear
		}
	}

	function getNextStep(current: Step, selectedPaymentMethod: PaymentMethod): Step {
		const provider = PAYMENT_PROVIDERS[selectedPaymentMethod];

		switch (current) {
			case 'payment-options':
				if (provider.automated) {
					if (!provider.FormComponent) {
						throw new Error(
							'Provider incorrectly configured: automated provider has no FormComponent'
						);
					}
					return 'provider-form';
				}
				if (provider.FollowUpComponent) return 'follow-up';
				if (links.length > 0) return 'links';
				return 'end';

			case 'provider-form':
				if (provider.WaitingComponent) return 'provider-waiting';
				if (provider.FollowUpComponent) return 'follow-up';
				if (links.length > 0) return 'links';
				return 'end';

			case 'provider-waiting':
				if (provider.FollowUpComponent) return 'follow-up';
				if (links.length > 0) return 'links';
				return 'end';

			case 'follow-up':
				if (links.length > 0) return 'links';
				return 'end';

			case 'links':
				return 'end';
			default:
				throw new Error(`Unknown step: ${current}`);
		}
	}

	function back() {
		if (historyStack.length > 1) historyStack = historyStack.slice(0, -1);
	}

	function advance(current: Step, selectedPaymentMethod: PaymentMethod) {
		const next = getNextStep(current, selectedPaymentMethod);
		if (next === 'end') {
			finish();
		} else {
			historyStack = [...historyStack, next];
			savePersistedStep(historyStack);
		}
	}

	function finish() {
		isOpen = false;
		historyStack = ['payment-options'];
		clearStoredSteps();
	}
</script>

<dialog bind:this={dialog} onclose={() => (isOpen = false)}>
	{#if step == 'payment-options'}
		<p>{formatMoney(wantsToPay)}</p>
		{#if maximumPrice}
			<input type="number" min={minimumPrice} max={maximumPrice} bind:value={wantsToPay} required />
		{/if}
		<ul>
			{#each allowedPaymentMethods as method}
				<li>
					{#if method == selectedPaymentMethod}
						X
					{/if}
					<button onclick={() => (selectedPaymentMethod = method)}>
						<PaymentMethodDisplay paymentMethod={method} />
					</button>
				</li>
			{/each}
		</ul>
		<button onclick={() => (isOpen = false)}>{m['cancel']()}</button>
		<button onclick={() => advance('payment-options', selectedPaymentMethod!)}>{m['next']()}</button
		>
	{:else if step == 'provider-form'}
		{@const provider = PAYMENT_PROVIDERS[selectedPaymentMethod!]}
		{@const FormComponent = provider.FormComponent!}
		<FormComponent
			{code}
			amount={wantsToPay}
			onBack={back}
			onPaid={() => advance('provider-form', selectedPaymentMethod!)}
		/>
	{:else if step == 'provider-waiting'}
		{@const provider = PAYMENT_PROVIDERS[selectedPaymentMethod!]}
		{@const WaitingComponent = provider.WaitingComponent!}
		<!--TODO : Meilleur reload si possible ? -->
		<WaitingComponent onBack={back} onRecheck={() => globalThis.location.reload()} />
	{:else if step == 'follow-up'}
		{@const provider = PAYMENT_PROVIDERS[selectedPaymentMethod!]}
		{@const FollowUpComponent = provider.FollowUpComponent!}
		<FollowUpComponent onBack={back} onDone={() => advance('follow-up', selectedPaymentMethod!)} />
	{:else if step == 'links'}
		{#each links as link}
			<a href={link.url}>{link.name}</a>
		{/each}
	{/if}
</dialog>
