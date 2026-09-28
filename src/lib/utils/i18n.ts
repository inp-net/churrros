import { BookingStatus, type PaymentMethod, WalletTarget } from '$lib/api';
import { m } from '$lib/paraglide/messages';
import { getLocale } from '$lib/paraglide/runtime';

/**
 * Renvoie la traduction d'un status de booking
 * @param status le status de booking à traduire
 * @returns Le string d'affichage traduit du status de booking
 */
export function bookingStatusToLocalizedString(status: BookingStatus): string {
    switch (status) {
        case BookingStatus.OPPOSED:
            return m['booking.status.cancelled']();
        case BookingStatus.VERIFIED:
            return m['booking.status.verified']();
        case BookingStatus.CANCELLED:
            return m['booking.status.cancelled']();
        case BookingStatus.PAID:
            return m['booking.status.paid']();
        case BookingStatus.WAITING:
            return m['booking.status.waiting']();
    }
}

/**
 * Renvoie la traduction d'un wallet target
 * @param walletTarget Le wallet target à traduire
 * @returns Le string d'affichage traduit du wallet target
 */
export function walletTargetToLocalizedString(walletTarget: WalletTarget): string {
    switch (walletTarget) {
        case WalletTarget.APPLE:
            return m['apple.wallet']();
        case WalletTarget.GOOGLE:
            return m['google.wallet']();
    }
}

/**
 * Formatte un montant pour afficher la devise correctement
 * @param price Le prix à formatter
 * @param options Les options de formatage par défaut en euro
 * @returns Le montant formatté avec la bonne devise
 */
export function formatMoney(
    price: number,
    options: Intl.NumberFormatOptions = { style: 'currency', currency: 'EUR' }
): string {
    return formatNumber(price, options);
}

/**
 * Formatte un nombre en fonction des options données et de la locale de paraglide
 * @param num Le prix à formatter
 * @param options Les options de formattage
 * @returns Un string correspondant au nombre formatté
 */
export function formatNumber(num: number, options: Intl.NumberFormatOptions): string {
    const locale = getLocale();
    return Intl.NumberFormat(locale, options).format(num);
}
