import { getLocale } from '#lib/paraglide/runtime.js'; // Paraglide becomes our source of truth for the locale.

/**
 * Format an ISO date string to a localized date string according to the current locale of Paraglide.
 * @param date the ISO date string to format
 * @param options the options for formatting the date, defaulting to long date style and short time style
 * @returns the formatted date string according to the current locale of Paraglide and the specified format
 */
export function formatISODateToLocale(
    date: string | null,
    options: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        hour: 'numeric',
        minute: 'numeric',
        month: 'short',
    },
): string {
    if (!date) {
        return 'N/A';
    }
    const locale = getLocale();
    return Intl.DateTimeFormat(locale, options).format(new Date(date));
}
