import type { Platform } from '../types';
import { authFlow } from './authFlow';
import { storage } from './storage';

export const capacitorPlatform: Platform = {
    authFlow: authFlow,
    storage: storage,
};
