<script lang="ts">
    import { m } from '#lib/paraglide/messages.js';
    import type { PaymentFollowUpProps } from '#lib/utils/payment.ts';

    let { onBack, onDone }: PaymentFollowUpProps = $props();
</script>

<div>
    <p>{m['payment.manual']()}</p>
    <button onclick={onBack}>{m['back']()}</button>
    <button onclick={onDone}>{m['next']()}</button>
</div>
