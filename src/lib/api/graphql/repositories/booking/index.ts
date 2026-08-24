import type { BookingRepository } from "$lib/api/repositories";
import { request } from "$lib/api/graphql/client";
import { GetMyBookings } from "$lib/api/graphql/queries/booking";
import { mapBookings } from "../../mappers/booking";

export const bookingRepository: BookingRepository = {
    async getMyBookings(args) {
        try {
            const response = await request(GetMyBookings, args);
            if (!response.me) {
                //On est pas connecté
                throw new Error("Not connected");
            }
            return mapBookings(response.me.bookings);
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    },
}