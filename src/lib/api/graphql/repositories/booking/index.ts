import type { BookingRepository } from '#lib/api/repositories.ts';
import { request } from '#lib/api/graphql/client.ts';
import {
    CancelBooking,
    GetAppleWalletPass,
    GetBookingByCode,
    GetGoogleWalletPass,
    GetMyBookings,
    PayBooking
} from '#lib/api/graphql/queries/booking/index.ts';
import {
    mapAppleWalletPass,
    mapBookingDetail,
    mapBookings,
    mapGoogleWalletPass,
    mapPayBooking
} from '#lib/api/graphql/mappers/booking/index.ts';
import { page } from '$app/state';

export const bookingRepository: BookingRepository = {
    async getMyBookings(args) {
        try {
            const response = await request(GetMyBookings, args);
            if (!response.me) {
                //On est pas connecté
                throw new Error('Not connected');
            }
            return mapBookings(response.me.bookings);
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    async getBookingByCode(code) {
        try {
            if (!code) {
                throw new Error('Not found');
            }
            const response = await request(GetBookingByCode, {
                code,
                qrCodeURLTemplate: `${page.url.origin}/bookings/[code]`
            });
            return mapBookingDetail(response.booking);
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    async cancelBooking(code) {
        try {
            if (!code) {
                throw new Error('Not found');
            }
            await request(CancelBooking, { code: code });
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    async getGoogleWalletPass(code) {
        try {
            if (!code) {
                throw new Error('Not found');
            }
            const response = await request(GetGoogleWalletPass, { code: code });
            return mapGoogleWalletPass(response.createGoogleWalletPass);
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    async getAppleWalletPass(code) {
        try {
            if (!code) {
                throw new Error('Not found');
            }
            const response = await request(GetAppleWalletPass, { code: code });
            return mapAppleWalletPass(response.createAppleWalletPass);
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    async payBooking(code, paymentMethodmentMethod, callbackUrl, amount, phone) {
        try {
            const response = await request(PayBooking, {
                code,
                paymentMethod: paymentMethodmentMethod,
                phone,
                callbackUrl,
                amount
            });
            return mapPayBooking(response.payBooking);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
};
