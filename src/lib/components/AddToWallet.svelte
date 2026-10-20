<script lang="ts">
    import type { WalletTarget } from '#lib/api/index.ts';
    import { walletTargetToLocalizedString } from '#lib/utils/i18n.ts';
    import { getWalletAsset } from '#lib/utils/icons.ts';

    interface Props {
        walletTarget: WalletTarget;
    }

    let { walletTarget }: Props = $props();
</script>

<img
    src={getWalletAsset(walletTarget)}
    alt={walletTargetToLocalizedString(walletTarget)}
    width="300"
    height="100"
/>
