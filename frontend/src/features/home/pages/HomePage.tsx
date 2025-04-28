import { ROUTES } from '@/router/routes';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function HomePage() {
    const { user, redirectPath } = useSelector((state: RootState) => state.auth);


    return (
        <div>
            <p>Something from backend</p>
            <p>user id: {user?.id}</p>
            <p>user name: {user?.name}</p>
            <p>user email: {user?.email}</p>
            <p>user image: <img src={user?.image} alt="avatar" /></p>
            <hr />
            <Link to={ROUTES.ACCOUNT.ROOT}>ACCOUNT</Link>
            <p>Redirect path: {redirectPath}</p>
        </div>
    )
}
