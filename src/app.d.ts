// See https://svelte.dev/docs/kit/types#app.d.ts

import type { User } from '#lib/api/index.ts';

// For information about these interfaces
declare global {
    namespace App {
        // Interface Error {}
        interface Locals {
            user: User | null;
        }
        interface PageData {
            user: User | null;
        }
        // Interface PageState {}
        // Interface Platform {}
    }
}
