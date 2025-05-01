import { useAxios } from '@/hooks/useAxios'
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';


const bookingSchema = z.object({
    _id: z.string(),
    placeId: z.object({
        _id: z.string(),
        name: z.string(),
        description: z.string(),
        location: z.string(),
        pricePerNight: z.number(),
        images: z.array(z.string().url()),
        hostId: z.string(),
        checkIn: z.string(),
        checkOut: z.string(),
        maxGuests: z.number(),
        perks: z.array(z.string()),
        createdAt: z.string(),
        updatedAt: z.string(),
        __v: z.number()
    }),
    userId: z.string(),
    checkIn: z.string(),
    checkOut: z.string(),
    guests: z.number(),
    totalPrice: z.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
    __v: z.number()
})

const bookingResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: z.array(bookingSchema)
})


export default function usePlaceBooking() {
    const axios = useAxios();

    return useQuery({
        queryKey: ["bookings"],
        queryFn: async () => {
            const { data } = await axios.get("v1/bookings");
            console.log(data)
            const parsed = bookingResponseSchema.safeParse(data);
            console.log(parsed.error);

            if (!parsed.success) {
                throw new Error('Invalid response format')
            }
            return parsed.data.data;
        }
    })
}
