import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import type { Swiper as SwiperClass } from 'swiper/types';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import usePlace from '../hooks/usePlace';
import { formatDate } from '@/lib/helpers';
import ShowPlaceSkeleton from '../skeletons/ShowPlaceSkeleton';
import ErrorMessage from '@/components/ErrorMessage';

// @ts-ignore
import 'swiper/css';
// @ts-ignore
import 'swiper/css/free-mode';
// @ts-ignore
import 'swiper/css/navigation';
// @ts-ignore
import 'swiper/css/thumbs';


export default function ShowPlacePage() {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
    const { placeId } = useParams<{ placeId: string }>();
    const { data: place, isLoading, isError, error } = usePlace(placeId);


    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    if (isLoading) return <ShowPlaceSkeleton />;

    if (isError || !place) return <ErrorMessage
        message={error?.message || "Error loading place"}
    />



    return (
        <div className="max-w-6xl mx-auto px-4 py-8 space-y-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 line-clamp-2">{place.name}</h1>
                    <p className="text-muted-foreground line-clamp-2">{place.location}</p>
                </div>
                <Badge variant="outline">
                    ${place.pricePerNight} / night
                </Badge>
            </div>

            {/* Main Gallery */}
            <Swiper
                style={{
                    // @ts-ignore
                    '--swiper-navigation-color': '#000',
                    '--swiper-pagination-color': '#000',
                }}
                spaceBetween={10}
                navigation
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="rounded-xl overflow-hidden"
            >
                {place.images.map((img, idx) => (
                    <SwiperSlide key={idx}>
                        <img
                            src={img}
                            alt={`Image ${idx + 1}`}
                            className="w-full h-[450px] object-cover rounded-xl"
                            loading='lazy'
                        />
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Thumbnails */}
            <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={6}
                freeMode
                watchSlidesProgress
                modules={[FreeMode, Navigation, Thumbs]}
                className="mt-2"
            >
                {place.images.map((img, idx) => (
                    <SwiperSlide key={idx}>
                        <img
                            src={img}
                            alt={`Thumb ${idx + 1}`}
                            className="w-full h-20 object-cover rounded-md border hover:opacity-90 transition"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Info and Booking Section */}
            <div className="grid md:grid-cols-3 gap-8">
                {/* Left: Description and Perks */}
                <div className="md:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>About this place</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-700 leading-relaxed">{place.description}</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>What this place offers</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="grid grid-cols-2 gap-2 text-gray-700">
                                {place.perks.map((perk, idx) => (
                                    <li key={idx} className="flex items-center gap-2">
                                        <span className="text-primary">✓</span>
                                        {perk}
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </div>

                {/* Right: Booking Summary */}
                <Card className="shadow-md">
                    <CardHeader>
                        <CardTitle>Stay Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span>Max Guests:</span>
                                <span>{place.maxGuests}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Check-In:</span>
                                <span>{place.checkIn}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Check-Out:</span>
                                <span>{place.checkOut}</span>
                            </div>
                            <Separator />
                            <div className="flex justify-between font-semibold">
                                <span>Price Per Night:</span>
                                <span className="text-primary">${place.pricePerNight}</span>
                            </div>
                        </div>
                        <Button className="w-full" variant="destructive">
                            Book Now
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {/* Metadata */}
            <div className="text-sm text-muted-foreground pt-6 border-t">
                <p>
                    <span className="font-medium text-gray-600">Hosted by:</span>{' '}
                    {place.hostId?.name} ({place.hostId?._id})
                </p>
                <p>
                    <span className="font-medium text-gray-600">Created:</span>{' '}
                    {formatDate(place.createdAt)}
                </p>
                <p>
                    <span className="font-medium text-gray-600">Last updated:</span>{' '}
                    {formatDate(place.updatedAt)}
                </p>
            </div>
        </div>
    );
}
