import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { logout } from "@/features/auth/state/authSlice";
import useRefreshToken from "./useRefreshToken";
import { axiosInstance } from "@/lib/axiosInstance";


export const useAxios = () => {
    const { accessToken } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch<AppDispatch>();
    const refresh = useRefreshToken();

    useEffect(() => {
        // Add request interceptor
        const requestInterceptor = axiosInstance.interceptors.request.use(
            (config) => {
                if (accessToken) {
                    config.headers["Authorization"] = `Bearer ${accessToken}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        // Add response interceptor
        const responseInterceptor = axiosInstance.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config;

                // Prevent infinite retries by checking a custom flag
                if (error.response?.status === 401) {

                    try {
                        // Attempt to refresh the access token
                        const newAccessToken = await refresh()
                        console.log("Generate new access token: " + newAccessToken)

                        if (!newAccessToken) {
                            // Token refresh failed, log the user out
                            dispatch(logout());
                            return Promise.reject(error); // Reject and stop retrying
                        }

                        // Retry the original request with the new token
                        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
                        return axiosInstance(originalRequest);
                    } catch (refreshError) {
                        // If token refresh fails, log out and redirect to login
                        console.error("Token refresh failed", refreshError);
                        dispatch(logout());
                    }
                }

                // If not a 401 error, reject the promise as usual
                return Promise.reject(error);
            }
        );

        // Cleanup interceptors when the component unmounts
        return () => {
            axiosInstance.interceptors.request.eject(requestInterceptor);
            axiosInstance.interceptors.response.eject(responseInterceptor);
        };
    }, [accessToken, dispatch, refresh]);

    return axiosInstance;
};
