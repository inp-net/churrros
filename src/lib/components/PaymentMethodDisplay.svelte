<script lang="ts">
	import type { PaymentMethod } from '$lib/api';
	import { paymentMethodToLocalizedString } from '$lib/utils/i18n';
	import { getPaymentMethodIcon } from '$lib/utils/icons';

	interface Props {
		paymentMethod: PaymentMethod | null;
	}
	let { paymentMethod }: Props = $props();
</script>

{getPaymentMethodIcon(paymentMethod)}
<p>{paymentMethodToLocalizedString(paymentMethod)}</p>
