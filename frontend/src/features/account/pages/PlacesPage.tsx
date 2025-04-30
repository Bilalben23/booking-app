import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants/routes';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import useHostPlaces from '../hooks/useHostPlaces';
import { Skeleton } from '@/components/ui/skeleton'; // Optional - adjust to your setup
import { buildShowPlacePath } from '@/lib/helpers';

export default function PlacesPage() {
    const { data, isLoading, isError, error } = useHostPlaces();


    if (isError) {
        return (
            <div>
                <h1 className="text-2xl text-center mb-9 font-bold">List of added places</h1>
                <p className="text-center text-destructive font-semibold">
                    {(error as Error).message || 'Failed to fetch places.'}
                </p>
            </div>
        );
    }

    const hasNoPlaces = data?.length === 0;

    return (
        <div>
            <h1 className="text-2xl text-center mb-9 font-bold">List of added places</h1>

            {/* Loading state */}
            {isLoading ? (
                <div className="flex flex-col gap-y-8">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="grid grid-cols-4 gap-x-5 bg-gray-100 p-6 rounded-sm">
                            <Skeleton className="h-28 w-full rounded-sm" />
                            <div className="col-span-3 space-y-2">
                                <Skeleton className="h-6 w-3/4" />
                                <Skeleton className="h-4 w-full mt-3" />
                                <Skeleton className="h-4 w-3/4" />
                                <Skeleton className="h-4 w-1/2" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col gap-y-8">
                    {hasNoPlaces ? (
                        <p className="italic text-muted-foreground text-center">No places added yet</p>
                    ) : (
                        data?.map((place) => (
                            <Link
                                key={place._id}
                                to={buildShowPlacePath(place._id)}
                                className="grid grid-cols-4 gap-x-5 bg-gray-100 p-6 rounded-sm"
                            >
                                <img
                                    src={place.images[0]}
                                    alt={place.name || 'Place image'}
                                    className="size-full min-h-28 rounded-sm object-cover"
                                />
                                <div className="col-span-3">
                                    <p className="font-bold mb-2 text-lg">{place.name}</p>
                                    <p className="text-muted-foreground">{place.description}</p>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            )}

            <div className="mt-10 text-center">
                <Link to={ROUTES.ACCOUNT.NEW_PLACE}>
                    <Button className="flex items-center gap-x-2 mx-auto">
                        <Plus />
                        Add new place
                    </Button>
                </Link>
            </div>
        </div>
    );
}
