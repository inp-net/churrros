import type { Platform } from '../types';
import { authFlow } from './authFlow';
import { storage } from './storage';

export const webPlatform: Platform = {
    authFlow: authFlow,
    storage: storage,
};
