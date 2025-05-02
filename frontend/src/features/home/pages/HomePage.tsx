import { Link } from "react-router-dom";
import usePlaces from "../hooks/usePlaces";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Badge } from "@/components/ui/badge";
import { buildShowPlacePath } from "@/lib/helpers";
import { Button } from "@/components/ui/button";
import ErrorMessage from "@/components/ErrorMessage";
import PlaceCardSkeleton from "../skeletons/PlaceCardSkeleton";

// @ts-ignore
import "swiper/css";
// @ts-ignore
import "swiper/css/navigation";
import { ROUTES } from "@/constants/routes";

export default function HomePage() {
    const { data: places, isLoading, isError, error } = usePlaces();

    if (isError) return <ErrorMessage message={error?.message || "Error loading places"} />;

    return (
        <section className="max-w-7xl mx-auto px-4 py-8">
            {/* Hero Section */}
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Explore Amazing Stays</h1>
                <p className="text-lg text-gray-600">
                    Find your perfect getaway. Discover unique stays around the world and make memories.
                </p>
            </div>

            {/* Places Grid */}
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {
                    isLoading
                        ? Array.from({ length: 10 }).map((_, i) => <PlaceCardSkeleton key={i} />)
                        : places?.map((place) => (
                            <div key={place._id} className="group rounded-xl overflow-hidden shadow-lg border hover:shadow-2xl transition-shadow duration-300">
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
                                                className="h-48 w-full object-cover transition-transform transform group-hover:scale-105"
                                                loading="lazy"
                                            />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>

                                {/* Info */}
                                <div className="p-4 space-y-1">
                                    <h2 className="text-lg font-semibold text-gray-800 group-hover:text-indigo-600">{place.name}</h2>
                                    <p className="text-sm text-gray-500">{place.location}</p>
                                    <Badge variant="secondary">${place.pricePerNight} / night</Badge>

                                    <Link to={buildShowPlacePath(place._id)} className="block">
                                        <Button variant="link" className="text-blue-500 hover:text-blue-700 transition-colors duration-300">
                                            View Details
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        ))
                }
            </div>

            {/* Call to Action */}
            <div className="mt-12 text-center border rounded-xl p-6 bg-gray-50 dark:bg-gray-900 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                    Ready to share your place with the world?
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Add a new listing or visit your profile to manage your places.
                </p>
                <div className="flex justify-center gap-4">
                    <Link to={ROUTES.ACCOUNT.ROOT}>
                        <Button variant="secondary">Go to your account</Button>
                    </Link>
                    <Link to={ROUTES.ACCOUNT.NEW_PLACE}>
                        <Button>Add New Place</Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
