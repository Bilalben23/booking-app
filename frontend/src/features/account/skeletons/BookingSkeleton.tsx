import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

const BookingSkeleton = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, idx) => (
                <Card key={idx} className="flex flex-col shadow rounded-lg pt-0">
                    <Skeleton className="w-full h-56 rounded-t-lg" />
                    <CardContent className="p-4 space-y-3 flex-1">
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-4 w-1/2" />
                            <Skeleton className="h-4 w-1/3" />
                            <Skeleton className="h-4 w-1/2" />
                            <Skeleton className="h-6 w-full" />
                        </div>
                        <div className="flex justify-between items-center mt-4">
                            <Skeleton className="h-8 w-24" />
                            <div className="flex gap-3">
                                <Skeleton className="h-8 w-20" />
                                <Skeleton className="h-8 w-20" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default BookingSkeleton;
