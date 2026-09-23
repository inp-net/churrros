<script lang="ts">
	import type { PaymentMethod } from '$lib/api';
	import { m } from '$lib/paraglide/messages';
	import { PAYMENT_PROVIDERS } from '$lib/utils/payment';

	interface Props {
		paymentMethod: PaymentMethod | null;
	}
	let { paymentMethod }: Props = $props();
</script>

{#if paymentMethod}
	{PAYMENT_PROVIDERS[paymentMethod]?.icon}
	<p>{PAYMENT_PROVIDERS[paymentMethod]?.label}</p>
{:else}
	<p>{m['paymentMethod.none']()}</p>
{/if}
