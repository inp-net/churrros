import { Capacitor } from '@capacitor/core';

import { capacitorPlatform } from './capacitor';
import type { Platform } from './types';
import { webPlatform } from './web';

export const platform: Platform = Capacitor.isNativePlatform() ? capacitorPlatform : webPlatform;
