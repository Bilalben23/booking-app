import { Button } from '@/components/ui/button'
import { ROUTES } from '@/router/routes'
import { Plus } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function PlacesPage() {
    return (
        <div>
            <div className='flex justify-center'>
                <Button>
                    <Link to={ROUTES.ACCOUNT.NEW_PLACE} className='flex items-center gap-x-2'>
                        <Plus />
                        Add new place
                    </Link>
                </Button>
            </div>

        </div>
    )
}
