import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogCancel,
    AlertDialogAction,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import usePlaceBooking from '../hooks/usePlaceBooking';
import ErrorMessage from '@/components/ErrorMessage';
import { buildShowPlacePath, formatDate } from '@/lib/helpers';
import { Link, useNavigate } from 'react-router-dom';
import useDeleteBooking from '../hooks/useDeleteBooking';
import toast from 'react-hot-toast';
import { ROUTES } from '@/constants/routes';
import { Skeleton } from '@/components/ui/skeleton';
import BookingSkeleton from '../skeletons/BookingSkeleton';

export default function BookingsPage() {
    const { data: bookingPlaces, isLoading, isError, error } = usePlaceBooking();
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [editId, setEditId] = useState<string | null>(null); // NEW for edit dialog
    const { mutate: deleteBooking, isPending } = useDeleteBooking();
    const navigate = useNavigate();

    const handleDeleteAndRebook = (id: string) => {
        deleteBooking(id, {
            onSuccess: () => {
                toast.success('Booking deleted successfully');
                setEditId(null);
                navigate(ROUTES.ACCOUNT.NEW_PLACE);
            },
            onError: () => {
                toast.error('Failed to delete booking');
            }
        });
    };

    const handleDelete = (id: string) => {
        deleteBooking(id, {
            onSuccess: () => {
                toast.success('Booking deleted successfully');
                setDeleteId(null);
            },
            onError: () => {
                toast.error('Failed to delete booking');
            }
        });
    };

    const calculateBookingDays = (checkIn: string, checkOut: string) => {
        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);
        const diffTime = Math.abs(checkOutDate.getTime() - checkInDate.getTime());
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    if (isError) {
        return <ErrorMessage
            message={error?.message || "Error loading place"} />;
    }

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h1 className="text-4xl font-bold mb-8 text-center text-gray-900">Your Bookings</h1>
            {isLoading ? (
                <BookingSkeleton />
            ) : bookingPlaces && bookingPlaces.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {bookingPlaces.map((booking) => {
                        const numberOfDays = calculateBookingDays(booking.checkIn, booking.checkOut);
                        const pricePerNight = booking.totalPrice / numberOfDays;

                        return (
                            <Card key={booking._id} className="flex flex-col shadow rounded-lg pt-0">
                                <div className="relative">
                                    <img
                                        src={booking.placeId.images[0]}
                                        alt={booking.placeId.name}
                                        className="w-full h-56 object-cover rounded-t-lg"
                                    />
                                    <div className="absolute top-0 left-0 p-4 bg-gradient-to-b from-transparent to-black opacity-70 w-full h-full rounded-t-lg">
                                        <div className="text-white font-bold text-xl line-clamp-1">{booking.placeId.name}</div>
                                        <div className="text-white text-sm mt-1 line-clamp-1">{booking.placeId.location}</div>
                                    </div>
                                    <div className="absolute bottom-4 right-4">
                                        <Link to={buildShowPlacePath(booking.placeId._id)}>
                                            <Button variant="secondary" size="sm">
                                                See More
                                            </Button>
                                        </Link>
                                    </div>
                                </div>

                                <CardContent className="p-4 space-y-3 flex-1">
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="font-medium">Check-in:</span>
                                            <span>{formatDate(booking.checkIn)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="font-medium">Check-out:</span>
                                            <span>{formatDate(booking.checkOut)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="font-medium">Guests:</span>
                                            <span>{booking.guests}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="font-medium">Days Booked:</span>
                                            <span>{numberOfDays} days</span>
                                        </div>
                                        <div className="flex justify-between text-sm font-semibold">
                                            <span className="text-gray-600">Price per Night:</span>
                                            <span className="text-primary">${pricePerNight.toFixed(2)} USD</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center mt-4">
                                        <div className="text-right font-bold text-primary">
                                            <span className="text-lg">${booking.totalPrice.toFixed(2)} USD</span>
                                        </div>
                                        <div className="flex gap-3">
                                            {/* EDIT DIALOG */}
                                            <AlertDialog open={editId === booking._id} onOpenChange={(open) => setEditId(open ? booking._id : null)}>
                                                <AlertDialogTrigger asChild>
                                                    <Button variant="outline">Edit</Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Editing Not Available</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            Editing an existing booking is not supported at this time.
                                                            <br />
                                                            If you want to make changes, please delete this booking and create a new one.
                                                            <br />
                                                            Are you sure you want to continue?
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction onClick={() => handleDeleteAndRebook(booking._id)}>
                                                            Delete & Rebook
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>

                                            {/* DELETE BUTTON */}
                                            <Button variant="destructive" onClick={() => setDeleteId(booking._id)} disabled={isPending}>
                                                {isPending ? "Deleting..." : "Delete"}
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            ) : (
                <p className="text-center text-muted-foreground">You don’t have any bookings yet.</p>
            )}

            <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure you want to delete this booking?</AlertDialogTitle>
                        <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => deleteId && handleDelete(deleteId)}
                            disabled={isPending}
                        >{isPending ? "Deleting..." : "Delete"}</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
