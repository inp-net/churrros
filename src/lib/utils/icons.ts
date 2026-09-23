import { WalletTarget } from "$lib/api";
import { getLocale } from "$lib/paraglide/runtime";

//#region Wallets

//Ne pas factoriser les params sinon vite ne resolve pas le type 
const appleWalletAssets = import.meta.glob('$lib/assets/wallet/apple/*.svg', { eager: true, query: '?url', import: 'default' }); //Pour trouver les assets de wallet apple : https://developer.apple.com/wallet/add-to-apple-wallet-guidelines/
const googleWalletAssets = import.meta.glob('$lib/assets/wallet/google/*.svg', { eager: true, query: '?url', import: 'default' }); //Pour trouver les assets de wallet google : https://developers.google.com/wallet/generic/resources/brand-guidelines?hl=fr

function findAsset(assets: Record<string, string>, locale: string): string | undefined {
    const entry = Object.entries(assets).find(([key]) => key.endsWith(`/${locale}.svg`));
    return entry ? entry[1] : undefined;
}

export function getWalletAsset(walletTarget: WalletTarget): string | undefined {
    const locale = getLocale();

    switch (walletTarget) {
        case WalletTarget.APPLE:
            return findAsset(appleWalletAssets, locale);
        case WalletTarget.GOOGLE:
            return findAsset(googleWalletAssets, locale);
    }
}
//#endregion