import type { Handle } from '@sveltejs/kit';
import { getTextDirection } from '$lib/paraglide/runtime';
import { paraglideMiddleware } from '$lib/paraglide/server';
import { meRepository } from '$lib/api';
import { sequence } from '@sveltejs/kit/hooks';

const handleParaglide: Handle = ({ event, resolve }) =>
	paraglideMiddleware(event.request, ({ request, locale }) => {
		event.request = request;

		return resolve(event, {
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
