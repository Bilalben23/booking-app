import { useSelector } from 'react-redux';
import useLogout from '../hooks/useLogout';
import { Button } from '@/components/ui/button';
import { BeatLoader } from 'react-spinners';
import { RootState } from '@/store/store';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut, User, Verified } from 'lucide-react';
import { useEffect } from 'react';

export default function ProfilePage() {
    const { user } = useSelector((state: RootState) => state.auth);
    const { mutate: signOut, isPending } = useLogout();

    const handleLogout = () => {
        signOut();
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className='max-w-4xl mx-auto p-6'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 bg-white rounded-2xl shadow-lg p-6'>
                {/* Profile Card */}
                <div className='flex flex-col items-center'>
                    <div className="relative">
                        <Avatar className='size-36'>
                            <AvatarImage
                                src={user?.image || ''}
                                alt={user?.name ? `${user.name}'s avatar` : 'User avatar'}
                            />
                            <AvatarFallback>
                                <User strokeWidth={2.3} />
                            </AvatarFallback>
                        </Avatar>
                        <div className='absolute bottom-2 right-4 bg-green-500 rounded-full p-1'>
                            <Verified className='text-white size-5' />
                        </div>
                    </div>
                    <h2 className='font-bold text-xl mt-4'>{user?.name || 'Unnamed User'}</h2>
                    <p className='text-sm text-muted-foreground'>{user?.email || 'No email provided'}</p>
                    <p className='text-xs text-gray-500 mt-1'>Role: User</p>
                </div>

                {/* About Section */}
                <div className='md:col-span-2 flex flex-col justify-between'>
                    <div>
                        <h3 className='text-lg font-semibold mb-2'>About</h3>
                        <p className='text-sm mb-4'>
                            This user has not provided a bio yet. You can add a short description here.
                        </p>
                        <Button variant="outline" size="sm" disabled>Edit Profile</Button>
                    </div>

                    <div className='mt-6 flex justify-end'>
                        <Button
                            onClick={handleLogout}
                            disabled={isPending}
                            className='bg-red-500 hover:bg-red-600 text-white'
                            aria-label='Logout'
                        >
                            {isPending ? (
                                <BeatLoader color='#fff' size={8} />
                            ) : (
                                <>
                                    Logout
                                    <LogOut className='ml-2 size-4' />
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </div >
    );
}
