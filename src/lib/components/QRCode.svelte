<script lang="ts">
    import QRCode from 'qrcode';

    let { text, size = 200 }: { text: string; size?: number } = $props();

    let svg = $state('');

    $effect(() => {
        const current = text;
        QRCode.toString(current, {
            type: 'svg',
            errorCorrectionLevel: 'M',
            margin: 2,
            color: { dark: '#000000', light: '#ffffff' }
        })
            .then((result) => {
                if (current === text) svg = result;
            })
            .catch(console.error);
    });
</script>

<div style:width="{size}px" style:height="{size}px">
    {@html svg}
</div>
