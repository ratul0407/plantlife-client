const PlantDetailsSkeleton = () => {
  return (
    <div className="animate-pulse pt-10 2xl:container 2xl:mx-auto">
      <div className="flex flex-col gap-4 lg:flex-row">
        {/* Images + thumbnails skeleton */}
        <div className="flex w-full flex-col-reverse items-center gap-3 lg:w-[50%] lg:flex-row lg:items-start 2xl:justify-start">
          {/* Thumbnails */}
          <div className="relative min-w-full lg:flex lg:min-w-auto lg:flex-col">
            <div className="flex min-w-full flex-row justify-center gap-2 lg:max-h-[700px] lg:min-w-auto lg:flex-col lg:justify-start lg:overflow-y-auto lg:py-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-24 w-24 rounded-md bg-gray-200" />
              ))}
            </div>
          </div>

          {/* Main image */}
          <div className="relative flex h-[350px] w-full overflow-hidden md:h-[600px] lg:h-[700px] lg:w-full">
            <div className="h-full w-full rounded-lg bg-gray-200" />
          </div>
        </div>

        {/* Plant details skeleton */}
        <div className="flex w-full flex-col justify-around gap-7 lg:w-[50%]">
          {/* Category pill */}
          <div className="h-6 w-32 rounded-full bg-gray-200" />

          {/* Name */}
          <div className="h-12 w-2/3 rounded-md bg-gray-200" />

          {/* Reviews */}
          <div className="h-5 w-40 rounded-md bg-gray-200" />

          {/* Price */}
          <div className="h-8 w-48 rounded-md bg-gray-200" />

          {/* Description */}
          <div className="space-y-2">
            <div className="h-4 w-full rounded-md bg-gray-200" />
            <div className="h-4 w-4/5 rounded-md bg-gray-200" />
            <div className="h-4 w-2/3 rounded-md bg-gray-200" />
          </div>

          {/* Variants */}
          <div className="space-y-4">
            <div className="h-6 w-24 rounded-md bg-gray-200" />
            <div className="flex gap-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-10 w-24 rounded-full bg-gray-200" />
              ))}
            </div>
          </div>

          {/* Cart + wishlist */}
          <div className="flex items-center gap-2">
            <div className="h-12 w-24 rounded-full bg-gray-200" />
            <div className="h-12 w-40 rounded-full bg-gray-200" />
            <div className="h-12 w-12 rounded-full bg-gray-200" />
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 gap-6 rounded-xl bg-gray-100 p-4 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="flex flex-col items-center space-y-2 text-center"
              >
                <div className="h-12 w-12 rounded-full bg-gray-200" />
                <div className="h-4 w-24 rounded-md bg-gray-200" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default PlantDetailsSkeleton;
