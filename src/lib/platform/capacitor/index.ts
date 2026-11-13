import type { Platform } from '../types';
import { authFlow } from './authFlow';

export const capacitorPlatform: Platform = {
    authFlow: authFlow,
};
