import { getTextDirection } from '#lib/paraglide/runtime.js';
import { paraglideMiddleware } from '#lib/paraglide/server.js';
import { meRepository } from '#lib/api/index.ts';
import { sequence, type Handle } from '@sveltejs/kit/hooks';

//Solved by https://github.com/opral/paraglide-js/issues/737 
const handleParaglide: Handle = ({ event, resolve }) =>
    paraglideMiddleware(event.request, ({ request, locale }) => {
        return resolve(({ ...event, request }), {
            transformPageChunk: ({ html }) =>
                html
                    .replace('%paraglide.lang%', locale)
                    .replace('%paraglide.dir%', getTextDirection(locale))
        });
    });

const handleAuth: Handle = async ({ event, resolve }) => {
    event.locals.user = null;
    try {
        const authed_via = event.cookies.get('authed_via');
        switch (authed_via) {
            case 'credentials':
            case 'oauth2': //Valeur prise direct de churros
                event.locals.user = await meRepository.getMe({
                    fetch: event.fetch,
                    cookies: event.cookies
                });
                break;
            default:
                //Valeur inconnue ou pas de cookie pour authed_via, on ignore
                break;
        }
    } catch (error) {
        //Impossible de se connecter à l'API, on ne fait rien et on laisse user à null
        console.error('Error in auth handle:', error);
    }

    return resolve(event);
};

export const handle: Handle = sequence(handleAuth, handleParaglide);
