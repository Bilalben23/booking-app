import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants/routes';
import { Building, CalendarDays, User } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export default function AccountHeader() {
    return (
        <nav className="w-full mt-4">
            <ul className="flex flex-wrap justify-center gap-2 sm:gap-4 mx-auto">
                <li className="flex-grow sm:flex-grow-0">
                    <NavLink end to={ROUTES.ACCOUNT.ROOT}>
                        {({ isActive }) => (
                            <Button
                                variant={isActive ? 'destructive' : 'outline'}
                                className="w-full sm:w-auto flex items-center justify-center gap-1 px-2 sm:px-4"
                            >
                                <User className="h-4 w-4" />
                                My Profile
                            </Button>
                        )}
                    </NavLink>
                </li>
                <li className="flex-grow sm:flex-grow-0">
                    <NavLink to={ROUTES.ACCOUNT.BOOKINGS}>
                        {({ isActive }) => (
                            <Button
                                variant={isActive ? 'destructive' : 'outline'}
                                className="w-full sm:w-auto flex items-center justify-center gap-1 px-2 sm:px-4"
                            >
                                <CalendarDays className="h-4 w-4" />
                                My Bookings
                            </Button>
                        )}
                    </NavLink>
                </li>
                <li className="flex-grow sm:flex-grow-0">
                    <NavLink to={ROUTES.ACCOUNT.PLACES}>
                        {({ isActive }) => (
                            <Button
                                variant={isActive ? 'destructive' : 'outline'}
                                className="w-full sm:w-auto flex items-center justify-center gap-1 px-2 sm:px-4"
                            >
                                <Building className="h-4 w-4" />
                                My Accommodations
                            </Button>
                        )}
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}
