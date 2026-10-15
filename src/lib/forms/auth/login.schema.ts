import { type } from 'arktype';

export const loginSchema = type({
    username: type('string.email | string >= 2'),
    password: type('string >= 8')
});

export type LoginInput = typeof loginSchema.infer;
