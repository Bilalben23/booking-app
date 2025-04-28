import type { AppDispatch, RootState } from '@/store/store';
import { useDispatch, useSelector } from 'react-redux'
import useLogout from '../hooks/useLogout';
import { Button } from '@/components/ui/button';
import { BeatLoader } from 'react-spinners';

export default function ProfilePage() {
    const { user } = useSelector((state: RootState) => state.auth);
    const { mutate: signOut, isPending } = useLogout();


    const handleLogout = () => {
        signOut();
    }

    return (
        <div>
            <p>Logged in as {user?.name} {user?.email}</p>
            <Button size="sm" onClick={handleLogout} disabled={isPending}>
                Logout {isPending && <BeatLoader color='#fff' size={7} />}
            </Button>
        </div>
    )
}
