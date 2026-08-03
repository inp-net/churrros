import type { OAuthProvider } from "../../types";
import { setToken } from "$lib/auth/session";
import { env } from "$env/dynamic/public";

export const authentikProvider: OAuthProvider = {
    name: "Authentik",
    iconUrl: "https://git.inpt.fr/inp-net/visual-identity/-/raw/main/favicon-color.svg",
    loginUrl(url: URL) {
        const loginUrl = new URL(env.PUBLIC_API_AUTH_URL + "/oauth2"); //Dans l'ideal j'aimerais qu'on puisse spécifier le provider, mais pr le moment l'api gère pas ça.
        //TODO : Gestion des searchParams pour le from comme sur churros
        return loginUrl;
    },
    logoutUrl() {
        return new URL(env.PUBLIC_API_AUTH_URL + "/logout");
    }
};