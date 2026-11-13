import process from 'node:process';

import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: process.env.PUBLIC_APP_ID || 'app.churros',
    appName: 'churros',
    webDir: 'build',
};

export default config;
