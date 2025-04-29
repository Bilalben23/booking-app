import { useMutation, useQueryClient } from '@tanstack/react-query'
import { z } from 'zod';
import { createPlaceSchema } from '../schema';
import { useAxios } from '@/hooks/useAxios';


type createPlaceInput = z.infer<typeof createPlaceSchema>;

export default function useCreatePlace() {
    const queryClient = useQueryClient();
    const axios = useAxios();

    return useMutation({
        mutationKey: ["create-place"],
        mutationFn: async (newPlace: createPlaceInput) => {
            const { data } = await axios.post("v1/places", newPlace);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["places"] })
        }

    })
}
