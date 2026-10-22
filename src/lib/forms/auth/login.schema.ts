import { type } from 'arktype';

export const loginSchema = type({
    username: type('string.email | string.alphanumeric >= 2'),
    password: type('string >= 1') // TODO: Put back real value (>= 8) when the seeding is corrected
});

export type LoginInput = typeof loginSchema.infer;
