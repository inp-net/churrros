<script lang="ts">
    import { m } from '$lib/paraglide/messages';
    import { PAYMENT_PROVIDERS, type PaymentWaitingProps } from '$lib/utils/payment';

    let { onBack, onRecheck }: PaymentWaitingProps = $props();
</script>

<div>
    <p>{m['payment.waiting']()} Lydia</p>
    <button onclick={onBack}>{m['back']()}</button>
    <a href="https://go.lydia.me">{m['open']()} Lydia</a>
    <button onclick={onRecheck}>{m['recheck']()}</button>
</div>
