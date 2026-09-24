import type { OAuthProvider } from '$lib/auth/types';
import { authentikProvider } from './authentik';

export const oAuthProviders: OAuthProvider[] = [authentikProvider];
