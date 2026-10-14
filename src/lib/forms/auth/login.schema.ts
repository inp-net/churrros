import { m } from '#lib/paraglide/messages.js';
import { type } from 'arktype';

export const loginSchema = type({
    username: type('string.email | string.alphanumeric').configure({
        message: m['form.login.username.error']
    }),
    password: type('string >= 8').configure({ message: m['form.login.password.error'] })
});

export type LoginInput = typeof loginSchema.infer;
