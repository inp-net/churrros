import type { WalletTarget } from '#lib/api/index.ts';
import { getLocale } from '#lib/paraglide/runtime.js';

//#region Wallets

// DO not factorize the parameters or it will break the type which vite doesn't like
const appleWalletAssets = import.meta.glob('#lib/assets/wallet/apple/*.svg', {
    eager: true,
    query: '?url',
    import: 'default'
}); // To find apple wallet assetss : https://developer.apple.com/wallet/add-to-apple-wallet-guidelines/
const googleWalletAssets = import.meta.glob('#lib/assets/wallet/google/*.svg', {
    eager: true,
    query: '?url',
    import: 'default'
}); // To find google wallet assets : https://developers.google.com/wallet/generic/resources/brand-guidelines?hl=fr

function findAsset(assets: Record<string, string>, locale: string): string | undefined {
    const entry = Object.entries(assets).find(([key]) => key.endsWith(`/${locale}.svg`));
    return entry ? entry[1] : undefined;
}

export function getWalletAsset(walletTarget: WalletTarget): string | undefined {
    const locale = getLocale();

    switch (walletTarget) {
        case 'Apple':
            return findAsset(appleWalletAssets, locale);
        case 'Google':
            return findAsset(googleWalletAssets, locale);
    }
}
//#endregion
