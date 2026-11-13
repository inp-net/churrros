import { PUBLIC_API_AUTH_URL } from '$app/env/public';

import type { OAuthProvider } from '../../types';

export const authentikProvider: OAuthProvider = {
    iconUrl: 'https://git.inpt.fr/inp-net/visual-identity/-/raw/main/favicon-color.svg',
    loginUrl(redirectUri: URL) {
        const loginUrl = new URL(`${PUBLIC_API_AUTH_URL}/oauth2`); // I would like to use a parameter to specify the provider, but the api doesn't allow it as of now.
        loginUrl.searchParams.set('redirect', redirectUri.toString());
        return loginUrl;
    },
    logoutUrl() {
        return new URL(`${PUBLIC_API_AUTH_URL}/logout`);
    },
    name: 'Authentik',
};
