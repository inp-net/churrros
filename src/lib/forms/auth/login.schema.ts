import { type } from 'arktype';

export const loginSchema = type({
    password: type('string >= 8'),
    username: type('string.email | string.alphanumeric >= 2'),
});

export type LoginInput = typeof loginSchema.infer;
