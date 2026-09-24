import { getLocale } from '$lib/paraglide/runtime'; //Paraglide devient notre source de vérité pour la locale.

/**
 * Formate une date ISO en date locale selon la locale actuelle de paraglide.
 * @param date la date ISO en string à formater
 * @param options les options de formatage de date
 * @returns la date formatée selon la locale actuelle de paraglide et le format spécifié
 */
export function formatISODateToLocale(
	date: string,
	options: Intl.DateTimeFormatOptions = { dateStyle: 'long', timeStyle: 'short' }
): string {
	const locale = getLocale();

	return new Intl.DateTimeFormat(locale, options).format(new Date(date));
}

/**
 * Convertit un objet Date en une chaîne de caractères au format ISO (YYYY-MM-DD).
 * @param date la date à convertir
 * @returns la date au format ISO (YYYY-MM-DD)
 */
export function toISODate(date: Date): string {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');

	return `${year}-${month}-${day}`;
}
