import { useAxios } from '@/hooks/useAxios'
import { useMutation, useQueryClient } from '@tanstack/react-query'


export default function useDeleteBooking() {
    const axios = useAxios();
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["deleteBooking"],
        mutationFn: async (id: string) => {
            await axios.delete(`/v1/bookings/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["bookings"] })
        }
    })
}
