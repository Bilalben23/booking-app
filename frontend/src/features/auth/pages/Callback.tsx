import { AppDispatch } from '@/store/store';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { openDialog, setCredentials, User } from '../state/authSlice';
import { useNavigate } from 'react-router-dom';
import { BeatLoader, ClipLoader } from 'react-spinners';

const Callback = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const called = useRef(false);

    useEffect(() => {
        if (called.current) return;
        called.current = true;

        const urlParams = new URLSearchParams(window.location.search);
        const accessToken = urlParams.get("accessToken");
        const userString = urlParams.get("user");

        try {
            if (accessToken && userString) {
                const user = JSON.parse(userString) as User;
                dispatch(setCredentials({ user, accessToken }))
                navigate("/")
            } else {
                console.log("Something went wrong!")
                dispatch(openDialog());
            }
        } catch (err) {
            console.error("Authentication failed or missing data.", err);
            dispatch(openDialog());
        }

    }, [dispatch, navigate])

    return (
        <div className="flex h-screen w-screen flex-col items-center justify-center bg-gray-50">
            <div className="flex items-center gap-x-2">
                <p className='text-xl font-semibold'>Redirecting</p>
                <BeatLoader size={15} />
            </div>
        </div>
    );
}

export default Callback;
