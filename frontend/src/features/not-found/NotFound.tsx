import { Link } from 'react-router-dom';
import airbnbLogoGray from "@/assets/logo-full-gray.svg";
import { ROUTES } from '@/constants/routes';
import NotFoundGif from '@/assets/404-Airbnb_final.gif';


export default function NotFound() {
    return (
        <div className='px-18 py-4'>
            <header>
                <Link to={ROUTES.HOME}>
                    <img src={airbnbLogoGray} alt="airbnb-logo" className='w-24' />
                </Link>
            </header>

            <div className='flex flex-col md:flex-row items-center justify-between gap-x-10'>
                <div className='flex-1'>
                    <h1 className='text-8xl font-bold text-black/70 mb-2 tracking-wide'>Oops!</h1>
                    <p className='text-black/70 text-2xl'>We can't seem to find the page you're looking for.</p>
                    <p className='my-4 text-black/70'>Error code: 404</p>

                    <div>
                        <p>Here are some helpful links instead:</p>
                        <ul className='list-disc pl-5'>
                            <li>
                                <Link to={ROUTES.HOME} className='text-blue-500 hover:underline'>Home</Link>
                            </li>
                            <li>
                                <Link to="#" className='text-blue-500 hover:underline'>Search</Link>
                            </li>
                            <li>
                                <Link to="#" className='text-blue-500 hover:underline'>Help</Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className='flex-1 flex items-center justify-center'>
                    <img
                        src={NotFoundGif}
                        alt="Girl has dropped her ice cream."
                        className='w-64 h-auto'
                    />
                </div>
            </div>
        </div>
    );
}
