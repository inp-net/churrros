import { type } from 'arktype';

export const loginSchema = type({
    password: type('string >= 1'), // TODO: Put back real value (>= 8) when the seeding is corrected
    username: type('string.email | string.alphanumeric >= 2'),
});

export type LoginInput = typeof loginSchema.infer;
