import { useAxios } from '@/hooks/useAxios'
import { placeSchema } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';


const placeResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: z.array(placeSchema)
})


export default function useHostPlaces() {
    const axios = useAxios();

    return useQuery({
        queryKey: ["hostPlaces"],
        queryFn: async () => {
            const { data } = await axios.get("v1/places/host");

            const parsed = placeResponseSchema.safeParse(data);

            if (!parsed.success) {
                throw new Error('Invalid response format')
            }
            return parsed.data.data;
        }
    })
}
