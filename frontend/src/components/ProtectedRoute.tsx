import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { openDialog, setRedirectPath } from '@/features/auth/state/authSlice';
import { ROUTES } from '@/router/routes';
import { useEffect } from 'react';

export default function ProtectedRoute() {
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch<AppDispatch>();
    const location = useLocation();


    useEffect(() => {
        if (!isAuthenticated) {
            dispatch(openDialog());
            dispatch(setRedirectPath(location.pathname as any));
        }
    }, [isAuthenticated, location.pathname, dispatch]);

    if (!isAuthenticated) {
        return <Navigate to={ROUTES.HOME} />;
    }

    return <Outlet />
}
