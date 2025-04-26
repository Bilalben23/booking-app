import { setCredentials } from "@/features/auth/state/authSlice";
import { axiosInstance } from "@/lib/axiosInstance";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { z } from "zod";


const RefreshResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    accessToken: z.string(),
    user: z.object({
        id: z.string(),
        name: z.string(),
        email: z.string(),
        image: z.string().optional()
    })
})

const useRefreshToken = () => {
    const dispatch = useDispatch<AppDispatch>();

    const refresh = async () => {
        try {
            const { data } = await axiosInstance.get("v1/auth/refresh-token");

            const parsed = RefreshResponseSchema.safeParse(data);

            if (!parsed.success) {
                console.error("Invalid refresh response: ", parsed.error.format());
                return null;
            }

            dispatch(setCredentials({
                user: parsed.data.user,
                accessToken: parsed.data.accessToken
            }));

            return parsed.data.accessToken;
        } catch (err) {
            console.error(err);
            return null;
        }
    }

    return refresh;
}

export default useRefreshToken;