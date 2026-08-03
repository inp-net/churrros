import type { AuthRepository } from "$lib/api/repositories";
import { request } from "$lib/api/graphql/client";
import { LoginMutation } from "$lib/api/graphql/queries/auth";
import { mapSessionToken } from "$lib/api/graphql/mappers/auth";


export const authRepository: AuthRepository = {
    async login(emailOrUid: string, password: string) {
        try {
            const response = await request(LoginMutation, { emailOrUid, password });
            return mapSessionToken(response.login);
        }
        catch (error) {
            //TODO : Vrai gestion d'erreur
            console.error('Error logging in:', error);
            throw error;
        }
    }
}