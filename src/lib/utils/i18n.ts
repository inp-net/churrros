import { BookingStatus, PaymentMethod, WalletTarget } from "$lib/api";
import { m } from '$lib/paraglide/messages';

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
 * Renvoie la traduction d'une méthode de paiement
 * @param paymentMethod La méthode de paiement dont on veut la traduction
 * @returns le texte d'affichage en fonction de la locale 
 */
export function paymentMethodToLocalizedString(paymentMethod: PaymentMethod | null): string {
    switch (paymentMethod) {
        case null:
            return m["paymentMethod.none"]()
        case PaymentMethod.LYDIA: //Pas de traduction pour les noms d'applis
            return "Lydia";
        case PaymentMethod.PAYPAL:
            return "Paypal";
        case PaymentMethod.CARD:
            return m["paymentMethod.card"]();
        case PaymentMethod.CHECK:
            return m["paymentMethod.check"]();
        case PaymentMethod.CASH:
            return m["paymentMethod.cash"]();
        case PaymentMethod.EXTERNAL:
            return m["paymentMethod.external"]();
        case PaymentMethod.OTHER:
            return m["paymentMethod.other"]();
        case PaymentMethod.TRANSFER:
            return m["paymentMethod.transfer"]();
    }
}