import { useAxios } from '@/hooks/useAxios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useDeleteHostPlace() {
    const axios = useAxios();
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["deletePlace"],
        mutationFn: async (id: string) => {
            await axios.delete(`/v1/places/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["hostPlaces"] })
        }
    })

}



