import { type Handle, sequence } from '@sveltejs/kit/hooks';

import { getTextDirection } from '#lib/paraglide/runtime.js';
import { paraglideMiddleware } from '#lib/paraglide/server.js';

//Solved by https://github.com/opral/paraglide-js/issues/737
const handleParaglide: Handle = async ({ event, resolve }) =>
    paraglideMiddleware(event.request, async ({ request, locale }) =>
        resolve(
            { ...event, request },
            {
                transformPageChunk: ({ html }) =>
                    html
                        .replace('%paraglide.lang%', locale)
                        .replace('%paraglide.dir%', getTextDirection(locale)),
            },
        ),
    );

export const handle: Handle = sequence(handleParaglide);
