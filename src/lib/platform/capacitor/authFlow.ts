import { PUBLIC_APP_ID } from '$app/env/public';
import { App } from '@capacitor/app';
import { Browser } from '@capacitor/browser';

import type { AuthFlow } from '../types';

export const authFlow: AuthFlow = {
    callbackUrl: (path) => new URL(`${PUBLIC_APP_ID}://${path.replace(/^\//, '')}`),
    async start(loginUrl) {
        await Browser.open({ url: loginUrl.toString() });
    },
    onCallback(handler) {
        const handle = App.addListener('appUrlOpen', async ({ url }) => {
            if (!url.startsWith(`${PUBLIC_APP_ID}://`)) return;
            await Browser.close();
            handler(new URL(url));
        });
        // cleanup function to remove the listener when no longer needed
        return () => void handle.then((h) => h.remove());
    },
};
