import { type } from 'arktype';

export const loginSchema = type({
    username: type('string.email | string.alphanumeric >= 2'),
    password: type('string >= 8')
});

export type LoginInput = typeof loginSchema.infer;
