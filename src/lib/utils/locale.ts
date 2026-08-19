import { getLocale } from "$lib/paraglide/runtime"; //Paraglide devient notre source de vérité pour la locale.
import { format, parseISO, type Locale } from "date-fns";
import { fr, es, enUS } from "date-fns/locale";

/**
 * Convertit la locale de paraglide en locale de date-fns
 */
const localesMap: Record<string, Locale> = {
    fr,
    es,
    en: enUS
};

const DEFAULT_LOCALE = 'fr';

/**
 * Formate une date ISO en date locale selon la locale actuelle de paraglide.
 * @param date la date ISO en string à formater
 * @param formatString le format de date à utiliser voir : https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table (par défaut 'PPPp') exemple : 10 janvier 2023 à 14:30 avec la locale fr
 * @returns la date formatée selon la locale actuelle de paraglide et le format spécifié
 */
export function formatISODateToLocale(date: string, formatString: string = 'PPPp'): string {
    const locale = getLocale();

    return format(parseISO(date), formatString, { locale: localesMap[locale] || DEFAULT_LOCALE });
}