import { useAxios } from '@/hooks/useAxios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPlaceSchema } from '../schema';
import { z } from 'zod';

type updatePlaceInput = Partial<z.infer<typeof createPlaceSchema>>


export default function useUpdatePlace() {
    const axios = useAxios();
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["update-place"],
        mutationFn: async ({ placeId, values }: { placeId?: string, values: updatePlaceInput }) => {
            console.log(values);

            const { data } = await axios.patch(`v1/places/${placeId}`, values);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["places"] })
        }
    })
}
