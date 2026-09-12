<script lang="ts">
	import type { QrCode } from '$lib/api';

	interface Props {
		qrCode: QrCode;
	}

	let { qrCode }: Props = $props();
</script>

<svg viewBox={qrCode.viewbox} stroke="white" fill="black"><path d={qrCode.path} /></svg>
