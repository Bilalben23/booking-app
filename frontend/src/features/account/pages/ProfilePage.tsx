import { useSelector } from 'react-redux'
import useLogout from '../hooks/useLogout';
import { Button } from '@/components/ui/button';
import { BeatLoader } from 'react-spinners';
import { RootState } from '@/store/store';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from 'lucide-react';
import { Verified } from 'lucide-react';
export default function ProfilePage() {
    const { user } = useSelector((state: RootState) => state.auth);
    const { mutate: signOut, isPending } = useLogout();


    const handleLogout = () => {
        signOut();
    }

    return (
        <div className='flex flex-col gap-y-5'>
            <div className='flex gap-x-10'>
                <div>
                    <div className="relative">
                        <Avatar className='size-36'>
                            <AvatarImage src={user?.image} alt="avatar" />
                            <AvatarFallback>
                                <User strokeWidth={2.3} />
                            </AvatarFallback>
                        </Avatar>
                        <div className='absolute bottom-2 right-4 bg-destructive rounded-full p-0.5'>
                            <Verified className='text-white' />
                        </div>
                    </div>
                    <p className='font-black text-lg text-center mt-2'>{user?.name}</p>
                    <p className='text-sm text-center'>Guest</p>
                </div>
                <div>
                    <p className='text-lg font-black mb-2'>About {user?.name}</p>
                    <Button variant="outline" size="sm">Edit Profile</Button>
                </div>
            </div>

            <div className='self-end'>
                <Button
                    onClick={handleLogout}
                    disabled={isPending}
                >
                    Logout {isPending && <BeatLoader color='#fff' size={7} />}
                </Button>
            </div>
        </div>
    )
}
