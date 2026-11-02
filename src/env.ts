import { defineEnvVars } from '@sveltejs/kit/env';

// @migration-task Review usage of dynamic environment variables. They fall back to the empty string if not present, which may not be what you want.
export const variables = defineEnvVars({
    PUBLIC_API_AUTH_URL: {
        public: true,
        description: 'The base URL for the API authentication endpoint',
        schema: (value) => {
            if (!value) throw new Error('PUBLIC_API_AUTH_URL is required');
            return value;
        },
    },
    PUBLIC_API_URL: {
        public: true,
        description: 'The base URL for the API',
        schema: (value) => {
            if (!value) throw new Error('PUBLIC_API_URL is required');
            return value;
        },
    },
});
