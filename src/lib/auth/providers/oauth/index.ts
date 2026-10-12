import type { OAuthProvider } from '#lib/auth/types.d.ts';
import { authentikProvider } from './authentik';

export const oAuthProviders: OAuthProvider[] = [authentikProvider];
