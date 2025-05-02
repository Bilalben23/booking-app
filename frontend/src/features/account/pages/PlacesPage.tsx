import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants/routes';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import useHostPlaces from '../hooks/useHostPlaces';
import { Skeleton } from '@/components/ui/skeleton';
import { buildEditPlacePath, buildShowPlacePath } from '@/lib/helpers';
import { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import useDeleteHostPlace from '../hooks/useDeleteHostPlace';
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction
} from '@/components/ui/alert-dialog';
import toast from 'react-hot-toast';
import ErrorMessage from '@/components/ErrorMessage';

export default function PlacesPage() {
    const { data, isLoading, isError, error } = useHostPlaces();
    const { mutate: deleteHostPlace, isPending } = useDeleteHostPlace();
    const [deleteId, setDeleteId] = useState<string | null>(null);

    const handleDelete = (id: string) => {
        deleteHostPlace(id, {
            onSuccess: () => {
                toast.success('Place deleted successfully');
                setDeleteId(null);
            },
            onError: () => {
                toast.error('Failed to delete place');
            }
        });
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (isError) {
        return (
            <ErrorMessage
                message={(error as Error).message || "Failed to fetch places"}
            />
        );
    }

    const hasNoPlaces = data?.length === 0;

    return (
        <div>
            <h1 className="text-2xl text-center mb-9 font-bold">List of added places</h1>

            {isLoading ? (
                <div className="flex flex-col gap-y-8">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="grid grid-cols-1 sm:grid-cols-4 gap-4 bg-gray-100 p-4 sm:p-6 rounded-sm">
                            <Skeleton className="h-40 w-full rounded-sm" />
                            <div className="sm:col-span-3 space-y-2">
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
                            <div
                                key={place._id}
                                className="grid grid-cols-1 sm:grid-cols-4 gap-4 bg-gray-100 p-4 sm:p-6 rounded-sm"
                            >
                                {/* Wrap image with Link for navigation */}
                                <Link to={buildShowPlacePath(place._id)}>
                                    <img
                                        src={place.images[0]}
                                        alt={place.name || 'Place image'}
                                        className="w-full h-40 sm:h-full rounded-sm object-cover"
                                    />
                                </Link>
                                <div className="sm:col-span-3">
                                    <p className="font-bold mb-2 text-lg">{place.name}</p>
                                    <p className="text-muted-foreground">{place.description}</p>

                                    {/* Created Date */}
                                    <p className="text-sm text-muted-foreground mt-2">
                                        Added {formatDistanceToNow(new Date(place.createdAt))} ago
                                    </p>

                                    {/* Edit and Delete Buttons */}
                                    <div className="mt-3 flex gap-3">
                                        <Link to={buildEditPlacePath(place._id)}>
                                            <Button variant="outline">Edit</Button>
                                        </Link>
                                        <Button
                                            variant="destructive"
                                            onClick={() => setDeleteId(place._id)} // Trigger delete confirmation dialog
                                            disabled={isPending}
                                        >
                                            {isPending ? "Deleting..." : "Delete"}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}

            <div className="mt-10 text-center">
                <Link to={ROUTES.ACCOUNT.NEW_PLACE}>
                    <Button className="flex items-center gap-x-2 w-full sm:w-auto mx-auto">
                        <Plus className="h-4 w-4" />
                        Add new place
                    </Button>
                </Link>
            </div>

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure you want to delete this place?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => deleteId && handleDelete(deleteId)} // Call delete function
                            disabled={isPending}
                        >
                            {isPending ? "Deleting..." : "Delete"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
