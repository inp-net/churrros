import type { BookingRepository } from "$lib/api/repositories";
import { request } from "$lib/api/graphql/client";
import { GetBookingByCode, GetMyBookings } from "$lib/api/graphql/queries/booking";
import { mapBookingDetail, mapBookings } from "../../mappers/booking";

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
    async getBookingByCode(code) {
        try {
            const response = await request(GetBookingByCode, { code, qrCodeURLTemplate: "" })
            return mapBookingDetail(response.booking);
        }
        catch (error) {
            console.error(error);
            throw error;
        }
        throw new Error("Not implemented");
    }
}