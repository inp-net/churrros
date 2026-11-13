import type { Platform } from '../types';
import { authFlow } from './authFlow';

export const webPlatform: Platform = {
    authFlow: authFlow,
};
