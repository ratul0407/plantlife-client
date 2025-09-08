import { Skeleton } from "./ui/skeleton";

export function PlantCardSkeleton() {
  return (
    <div className="max-w-3xs overflow-hidden bg-white p-4 xl:max-w-xs">
      <div className="relative rounded-xl">
        {/* image skeleton */}
        <Skeleton className="h-72 w-[288px] rounded-xl" />
      </div>

      {/* name + price skeleton */}
      <div className="mt-4 mb-2 flex flex-col justify-between space-y-2">
        <Skeleton className="h-5 w-16" /> {/* price */}
        <Skeleton className="h-5 w-32" /> {/* name */}
      </div>
    </div>
  );
}
