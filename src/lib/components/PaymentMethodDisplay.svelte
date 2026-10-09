<script lang="ts">
    import type { PaymentMethod } from '#lib/api/index.ts';
    import { m } from '#lib/paraglide/messages.js';
    import { PAYMENT_PROVIDERS } from '#lib/utils/payment.ts';

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
