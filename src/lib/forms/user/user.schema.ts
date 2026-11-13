import { type } from 'arktype';

export const userSchema = type({
    firstName: type('string > 0'),
    lastName: type('string > 0'),
    nickname: type('string'),
    pronouns: type('string'),
    phone: type('string.digits > 10 | null'), //better phone type ?
});

export type UserInput = typeof userSchema.infer;
