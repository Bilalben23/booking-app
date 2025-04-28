import { logout } from '@/features/auth/state/authSlice';
import { useAxios } from '@/hooks/useAxios';
import { AppDispatch } from '@/store/store';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';

export default function useLogout() {
    const axios = useAxios();
    const dispatch = useDispatch<AppDispatch>();

    return useMutation({
        mutationKey: ["logout"],
        mutationFn: async () => {
            await axios.get("/v1/auth/logout");
        },
        onSuccess: () => {
            dispatch(logout())
            toast.success('Logged out successfully');
        },
        onError: (error) => {
            console.error("Logout failed: ", error)
            toast.error('Logout failed. Please try again.');
        }
    })

}
