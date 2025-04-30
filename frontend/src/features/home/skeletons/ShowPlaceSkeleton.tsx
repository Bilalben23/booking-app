import { Skeleton } from "@/components/ui/skeleton";

export default function ShowPlaceSkeleton() {
    return (
        <div className="mt-10">
            <Skeleton className="w-full h-96 rounded-xl mx-auto" />
            <div className="grid grid-cols-4 gap-x-3 mt-4">
                {[...Array(3)].map((_, i) => (
                    <Skeleton key={i} className="w-full h-24 rounded-xl" />
                ))}
            </div>
            <div className="grid grid-cols-3 gap-5 mt-10">
                <div className="col-span-2 gap-y-5 grid grid-cols-1 grid-rows-3">
                    <Skeleton className="size-full rounded-xl p-14" />
                    <Skeleton className="size-full rounded-xl row-span-2" />
                </div>
                <Skeleton className="size-full rounded-xl" />
            </div>
            <div className="border-t mt-8 p-6 flex flex-col gap-y-2">
                {[...Array(3)].map((_, i) => (
                    <Skeleton key={i} className="h-4 w-1/2" />
                ))}
            </div>
        </div>
    );
}
