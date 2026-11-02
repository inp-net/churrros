export interface FieldError {
    path: (string | number)[];
    message: string;
}

export class ApiValidationError extends Error {
    constructor(public readonly fieldErrors: FieldError[]) {
        super(fieldErrors.map((e) => `${e.path.join('.')}: ${e.message}`).join(', '));
        this.name = 'ApiValidationError';
    }
}
