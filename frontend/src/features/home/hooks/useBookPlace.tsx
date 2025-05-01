import { useAxios } from '@/hooks/useAxios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';


const bookingResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: z.string()
})

interface BookPlaceInput {
    placeId: string;
    checkIn: Date;
    checkOut: Date;
    guests: number;
}


export default function useBookPlace() {
    const axios = useAxios();
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["bookPlace"],
        mutationFn: async (bookingData: BookPlaceInput) => {
            const { data } = await axios.post("/v1/bookings", bookingData);

            const parsed = bookingResponseSchema.safeParse(data);

            if (!parsed.success) {
                throw new Error('Invalid response format');
            }

            return parsed.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["bookings"] })
        }
    })

}
