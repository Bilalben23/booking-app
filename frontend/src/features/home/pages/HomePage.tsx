import { Button } from '@/components/ui/button';
import { useAxios } from '@/hooks/useAxios'
import { RootState } from '@/store/store';
import { useState } from 'react';
import { useSelector } from 'react-redux';

export default function HomePage() {
    const axios = useAxios();
    const [data, setData] = useState<{ success: boolean, message: string }>()
    const { user } = useSelector((state: RootState) => state.auth);
    async function getData() {
        const { data } = await axios.get("v1/auth/something");
        setData(data);
    }

    console.log(user?.image);

    return (
        <div>
            <p>Something from backend</p>
            <p>{data?.message}</p>
            <Button onClick={async () => await getData()}>Load data</Button>
            <p>user id: {user?.id}</p>
            <p>user name: {user?.name}</p>
            <p>user email: {user?.email}</p>
            <p>user image: <img src={user?.image} alt="avatar" /></p>
        </div>
    )
}
