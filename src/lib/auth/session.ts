//J'ai fait avec le local storage pour stocker le token, jsp si c'est le mieux en vrai
//Sur churros c'est des cookies non securisés donc c'est kif-kif 
import { browser } from '$app/environment';
import { get, writable } from 'svelte/store';
import type { SessionToken } from '$lib/api';

const SESSION_TOKEN_STORAGE_KEY = 'token-temp';

type SessionTokenSerializable = {
    token: string;
    expiresAt: string;
};

const initialSessionToken = loadToken();
const sessionTokenStore = writable<SessionToken | null>(initialSessionToken);

function serializeToken(sessionToken: SessionToken): string {
    return JSON.stringify({
        token: sessionToken.token,
        expiresAt: sessionToken.expiresAt.toISOString()
    });
}

function deserializeToken(serializedToken: string | null): SessionToken | null {
    if (!serializedToken) {
        return null;
    }

    try {
        const parsedToken = JSON.parse(serializedToken) as SessionTokenSerializable;
        return {
            token: parsedToken.token,
            expiresAt: new Date(parsedToken.expiresAt)
        };
    } catch {
        return null;
    }
}

function isTokenExpired(sessionToken: SessionToken) {
    return Number.isNaN(sessionToken.expiresAt.getTime()) || sessionToken.expiresAt.getTime() <= Date.now();
}

function loadToken(): SessionToken | null {
    if (!browser) {
        return null;
    }

    const storedSessionToken = deserializeToken(localStorage.getItem(SESSION_TOKEN_STORAGE_KEY));

    if (!storedSessionToken || isTokenExpired(storedSessionToken)) {
        localStorage.removeItem(SESSION_TOKEN_STORAGE_KEY);
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
    const currentSessionToken = get(sessionTokenStore);
    sessionTokenStore.set(newSessionToken);

    if (!browser) {
        return;
    }

    if (!newSessionToken) {
        localStorage.removeItem(SESSION_TOKEN_STORAGE_KEY);
        return;
    }

    localStorage.setItem(
        SESSION_TOKEN_STORAGE_KEY,
        serializeToken(newSessionToken)
    );
}

export function clearToken() {
    setToken(null);
}