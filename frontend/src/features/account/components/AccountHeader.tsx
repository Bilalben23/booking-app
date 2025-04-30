import { Button } from '@/components/ui/button'
import { ROUTES } from '@/constants/routes'
import { Building, CalendarDays, User } from 'lucide-react'
import { NavLink } from 'react-router-dom'

export default function AccountHeader() {
    return (
        <nav className='w-full mt-4'>
            <ul className='flex items-center gap-x-4 w-fit mx-auto'>
                <li>
                    <NavLink
                        end
                        to={ROUTES.ACCOUNT.ROOT}
                    >
                        {({ isActive }) => <Button variant={isActive ? "destructive" : "outline"}>
                            <User />
                            My profile
                        </Button>}
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to={ROUTES.ACCOUNT.BOOKINGS}
                    >
                        {({ isActive }) => <Button variant={isActive ? "destructive" : "outline"}>
                            <CalendarDays />
                            My Bookings
                        </Button>}
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to={ROUTES.ACCOUNT.PLACES}
                    >
                        {({ isActive }) => <Button variant={isActive ? "destructive" : "outline"}>
                            <Building />
                            My accommodations
                        </Button>}
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}
