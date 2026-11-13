import type { AuthFlow } from '../types';

export const authFlow: AuthFlow = {
    callbackUrl: (path) => new URL(path, window.location.origin),
    async start(loginUrl) {
        window.location.assign(loginUrl);
    },
    // No callback handling on web as it is useless
    onCallback: () => () => {},
};
