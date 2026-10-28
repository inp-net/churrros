import { browser } from '$app/env';
import { get, writable } from 'svelte/store';

import type { SessionToken } from '#lib/api/index.ts';

export const SESSION_TOKEN_COOKIE_NAME = 'session_token';

const initialSessionToken = loadToken(),
    sessionTokenStore = writable<SessionToken | null>(initialSessionToken);

function isTokenExpired(sessionToken: SessionToken) {
    return (
        Number.isNaN(sessionToken.expiresAt.getTime()) ||
        sessionToken.expiresAt.getTime() <= Date.now()
    );
}

/**
 * Fetches the cookie with the given name if it exists, otherwise returns null
 * Only client-side as it reads the cookie via document.cookie
 */
function readCookie(name: string): string | null {
    const match = document.cookie.split('; ').find((row) => row.startsWith(`${name}=`));
    return match ? decodeURIComponent(match.slice(name.length + 1)) : null;
}

/**
 * Writes a cookie with the given name and value, and optional expiration date
 * Only client-side as it writes the cookie via document.cookie
 * @param name name of the cookie
 * @param value value of the cookie
 * @param expiresAt expiration date of the cookie (optional)
 */
export function writeCookie(name: string, value: string, expiresAt?: Date) {
    const parts = [`${name}=${encodeURIComponent(value)}`, 'path=/', 'SameSite=Lax'];
    if (expiresAt) {
        parts.push(`expires=${expiresAt.toUTCString()}`);
    }
    if (location.protocol === 'https:') {
        parts.push('Secure');
    }
    document.cookie = parts.join('; ');
}

/**
 * Deletes a cookie with the given name by setting its max-age to 0
 * Only client-side as it deletes the cookie via document.cookie
 * @param name the name of the cookie to delete
 */
export function deleteCookie(name: string) {
    document.cookie = `${name}=; path=/; max-age=0`;
}

/**
 * Deserializes a session token from a string
 * @param raw the string to deserialize
 * @returns the deserialized session token or null if the string is invalid
 */
export function deserializeToken(raw: string | null | undefined): SessionToken | null {
    if (!raw) {
        return null;
    }

    try {
        const parsed = JSON.parse(raw) as { token: string; expiresAt: string };
        return { expiresAt: new Date(parsed.expiresAt), token: parsed.token };
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
            expiresAt: newSessionToken.expiresAt.toISOString(),
            token: newSessionToken.token,
        }),
        newSessionToken.expiresAt,
    );
}

export function clearToken() {
    setToken(null);
}
