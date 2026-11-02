import { getTextDirection } from '#lib/paraglide/runtime.js';
import { paraglideMiddleware } from '#lib/paraglide/server.js';
import { sequence, type Handle } from '@sveltejs/kit/hooks';

//Solved by https://github.com/opral/paraglide-js/issues/737
const handleParaglide: Handle = ({ event, resolve }) =>
    paraglideMiddleware(event.request, ({ request, locale }) => {
        return resolve(
            { ...event, request },
            {
                transformPageChunk: ({ html }) =>
                    html
                        .replace('%paraglide.lang%', locale)
                        .replace('%paraglide.dir%', getTextDirection(locale))
            }
        );
    });

export const handle: Handle = sequence(handleParaglide);
