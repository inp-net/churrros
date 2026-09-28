<script lang="ts">
    import { WalletTarget } from '$lib/api';
    import { walletTargetToLocalizedString } from '$lib/utils/i18n';
    import { getWalletAsset } from '$lib/utils/icons';

    interface Props {
        walletTarget: WalletTarget;
    }

    let { walletTarget }: Props = $props();

    //TODO : Ajouter le support pour un bouton qui exporte vers le wallet
</script>

<img
    src={getWalletAsset(walletTarget)}
    alt={walletTargetToLocalizedString(walletTarget)}
    width="300"
    height="100"
/>
