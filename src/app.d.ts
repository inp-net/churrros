// See https://svelte.dev/docs/kit/types#app.d.ts

import type { LightUser } from "$lib/api";

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: LightUser | null;
		}
		interface PageData {
			user: LightUser | null;
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export { };
