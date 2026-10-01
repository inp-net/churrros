import { browser } from '$app/environment';
import { get, writable } from 'svelte/store';
import { parseCookie, stringifySetCookie } from 'cookie';
import type { SessionToken } from '$lib/api';

export const SESSION_TOKEN_COOKIE_NAME = 'session_token';

const initialSessionToken = loadToken();
const sessionTokenStore = writable<SessionToken | null>(initialSessionToken);

function isTokenExpired(sessionToken: SessionToken) {
    return (
        Number.isNaN(sessionToken.expiresAt.getTime()) ||
        sessionToken.expiresAt.getTime() <= Date.now()
    );
}

/**
 * Recupère le cookie avec le nom donné si il existe, sinon retourne null
 * Uniquement coté browser car recupère le cookie via document.cookie
 */
function readCookie(name: string): string | null {
    const cookies = parseCookie(document.cookie);
    return cookies[name] ?? null;
}

/**
 * Ecrit un cookie dans le navigateur avec le nom, la valeur et la date d'expiration donnée
 * Uniquement coté browser car ecrit le cookie via document.cookie
 * @param name Nom du cookie
 * @param value Valeur du cookie
 * @param expiresAt date d'expiration du cookie
 */
export function writeCookie(name: string, value: string, expiresAt?: Date) {
    document.cookie = stringifySetCookie({
        name,
        value,
        path: '/',
        expires: expiresAt,
        sameSite: 'lax',
        secure: location.protocol === 'https:'
    });
}

/**
 * Supprime le cookie avec le nom donné en le réécrivant avec une date d'expiration passée
 * Uniquement coté browser car supprime le cookie via document.cookie
 * @param name le nom du cookie à supprimer
 */
export function deleteCookie(name: string) {
    document.cookie = stringifySetCookie({ name, value: '', path: '/', maxAge: 0 });
}

/**
 * Désérialise un token de session à partir d'une chaîne de caractères
 * @param raw La chaine de caractères représentant le token de session
 * @returns Le token de session désérialisé ou null si la chaîne est invalide
 */
export function deserializeToken(raw: string | null | undefined): SessionToken | null {
    if (!raw) return null;

    try {
        const parsed = JSON.parse(raw) as { token: string; expiresAt: string };
        return { token: parsed.token, expiresAt: new Date(parsed.expiresAt) };
    } catch {
        return null;
    }
}

function loadToken(): SessionToken | null {
    if (!browser) {
        return null;
    }

    const storedSessionToken = deserializeToken(readCookie(SESSION_TOKEN_COOKIE_NAME));

    if (!storedSessionToken || isTokenExpired(storedSessionToken)) {
        deleteCookie(SESSION_TOKEN_COOKIE_NAME);
        return null;
    }

    return storedSessionToken;
}

export function getToken(): SessionToken | null {
    const currentSessionToken = get(sessionTokenStore);
    if (currentSessionToken && isTokenExpired(currentSessionToken)) {
        clearToken();
        return null;
    }

    return get(sessionTokenStore);
}

export function setToken(newSessionToken: SessionToken | null) {
    sessionTokenStore.set(newSessionToken);

    if (!browser) {
        return;
    }

    if (!newSessionToken) {
        deleteCookie(SESSION_TOKEN_COOKIE_NAME);
        return;
    }

    writeCookie(
        SESSION_TOKEN_COOKIE_NAME,
        JSON.stringify({
            token: newSessionToken.token,
            expiresAt: newSessionToken.expiresAt.toISOString()
        }),
        newSessionToken.expiresAt
    );
}

export function clearToken() {
    setToken(null);
}
