import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { BeatLoader } from "react-spinners"
import useRefreshToken from "../hooks/useRefreshToken";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { accessToken } = useSelector((state: RootState) => state.auth);
    const refresh = useRefreshToken();

    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                await refresh();

            } catch (err) {
                console.error((err as Error).message);
            }
            finally {
                setIsLoading(false);
            }
        }

        !accessToken ? verifyRefreshToken() : setIsLoading(false);
    }, [])



    return (
        <>
            {
                isLoading
                    ? <div className="flex items-center justify-center w-full h-screen">
                        <BeatLoader size={20} />
                    </div>
                    : <Outlet />
            }
        </>
    )

}

export default PersistLogin;