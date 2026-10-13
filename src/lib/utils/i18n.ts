import type { BookingStatus, WalletTarget } from '#lib/api/index.ts';
import { m } from '#lib/paraglide/messages.js';
import { getLocale } from '#lib/paraglide/runtime.js';

//#region Localized strings

/**
 * Returns the localized string representation of a booking status.
 * @param status the booking status to translate
 * @returns  the localized string representation of the booking status
 */
export function bookingStatusToLocalizedString(status: BookingStatus): string {
    switch (status) {
        case 'Opposed':
            return m['booking.status.cancelled']();
        case 'Verified':
            return m['booking.status.verified']();
        case 'Cancelled':
            return m['booking.status.cancelled']();
        case 'Paid':
            return m['booking.status.paid']();
        case 'Waiting':
            return m['booking.status.waiting']();
    }
}

/**
 * Returns the localized string representation of a wallet target.
 * @param walletTarget the wallet target to translate
 * @returns the localized string representation of the wallet target
 */
export function walletTargetToLocalizedString(walletTarget: WalletTarget): string {
    switch (walletTarget) {
        case 'Apple':
            return m['apple.wallet']();
        case 'Google':
            return m['google.wallet']();
    }
}

//#endregion

/**
 * Formats an amount to display the currency correctly
 * @param price The price to format
 * @param options The formatting options, defaulting to currency style with EUR currency
 * @returns The formatted amount with the correct currency
 */
export function formatMoney(
    price: number,
    options: Intl.NumberFormatOptions = { style: 'currency', currency: 'EUR' }
): string {
    return formatNumber(price, options);
}

/**
 * Formats a number according to the given options and the locale of Paraglide
 * @param num the number to format
 * @param options the formatting options for the number
 * @returns the formatted number as a string taking the locale of Paraglide into account
 */
export function formatNumber(num: number, options: Intl.NumberFormatOptions): string {
    const locale = getLocale();
    return Intl.NumberFormat(locale, options).format(num);
}
