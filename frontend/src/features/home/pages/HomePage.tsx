import { Link } from "react-router-dom";
import usePlaces from "../hooks/usePlaces";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Badge } from "@/components/ui/badge";

// @ts-ignore
import "swiper/css";
// @ts-ignore
import "swiper/css/navigation";

import { buildShowPlacePath } from "@/lib/helpers";

export default function HomePage() {
    const { data: places, isLoading, isError } = usePlaces();

    if (isLoading) return <p className="text-center mt-8 text-lg">Loading places...</p>;
    if (isError || !places) return <p className="text-center mt-8 text-red-500">Failed to load places</p>;

    return (
        <section className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-gray-900">Explore Stays</h1>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {places.map((place) => (
                    <div key={place._id} className="rounded-xl overflow-hidden shadow-sm border">
                        {/* Image Swiper */}
                        <Swiper
                            navigation
                            modules={[Navigation]}
                            className="h-48 w-full rounded-t-xl"
                        >
                            {place.images.map((img, index) => (
                                <SwiperSlide key={index}>
                                    <img
                                        src={img}
                                        alt={place.name}
                                        className="h-48 w-full object-cover"
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        {/* Info */}
                        <div className="p-4 space-y-1">
                            <h2 className="text-lg font-semibold text-gray-800">{place.name}</h2>
                            <p className="text-sm text-gray-500">{place.location}</p>
                            <Badge variant="secondary">${place.pricePerNight} / night</Badge>
                            <Link
                                to={buildShowPlacePath(place._id)}
                                className="block text-indigo-600 text-sm mt-2 hover:underline"
                            >
                                View Details
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
