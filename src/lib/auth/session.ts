import { browser } from '$app/env';
import { type } from 'arktype';

import type { SessionToken } from '#lib/api/index.ts';

import { platform } from '../platform';

export const SESSION_TOKEN_NAME = 'session_token';
export const AUTHED_VIA_COOKIE_NAME = 'authed_via';

const StoredSession = type({
    token: 'string',
    expiresAt: 'string',
});

function isTokenExpired(sessionToken: SessionToken) {
    return (
        Number.isNaN(sessionToken.expiresAt.getTime()) ||
        sessionToken.expiresAt.getTime() <= Date.now()
    );
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
        const out = StoredSession(JSON.parse(raw));
        if (out instanceof type.errors) return null;
        return { expiresAt: new Date(out.expiresAt), token: out.token };
    } catch (error) {
        console.error('deserializeToken error:', error);
        return null;
    }
}

export async function getToken(): Promise<SessionToken | null> {
    const raw = await platform.storage.get(SESSION_TOKEN_NAME);
    const currentSessionToken = deserializeToken(raw);
    if (currentSessionToken && isTokenExpired(currentSessionToken)) {
        await clearToken();
        return null;
    }

    return currentSessionToken;
}

export async function setToken(newSessionToken: SessionToken | null) {
    if (!browser) {
        return;
    }

    if (!newSessionToken) {
        await platform.storage.remove(SESSION_TOKEN_NAME);
        return;
    }

    await platform.storage.set(SESSION_TOKEN_NAME, JSON.stringify(newSessionToken));
}

/**
 * Clears the session token from the store and deletes the corresponding cookie
 * Also deletes the authed_via cookie if it exists
 * Only client-side as it deletes the cookie via document.cookie
 */
export async function clearToken() {
    await setToken(null);
    if (browser) {
        deleteCookie(AUTHED_VIA_COOKIE_NAME);
    }
}
