import { Skeleton } from "@/components/ui/skeleton";

const PlaceCardSkeleton = () => (
    <div className="rounded-xl overflow-hidden shadow-sm border">
        <Skeleton className="w-full h-48 rounded-b-none" />
        <div className="p-3">
            <Skeleton className="w-full h-5 mb-2" />
            <Skeleton className="w-full h-4 mb-2" />
            <Skeleton className="w-24 h-7 mb-4" />
            <Skeleton className="w-24 h-4 mb-2" />
        </div>
    </div>
);

export default PlaceCardSkeleton;
