import { useAxios } from '@/hooks/useAxios'
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';
import { placeSchema } from '../schema';


const placeResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: placeSchema
})


export default function usePlace(placeId?: string) {
    const axios = useAxios();

    return useQuery({
        queryKey: ["place", placeId],
        queryFn: async () => {
            const { data } = await axios.get(`v1/places/${placeId}`);

            const parsed = placeResponseSchema.safeParse(data);

            if (!parsed.success) {
                throw new Error('Invalid response format')
            }
            return parsed.data.data;
        },
        enabled: !!placeId
    })
}
