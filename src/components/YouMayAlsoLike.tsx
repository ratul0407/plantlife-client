import { IoChevronUp } from "react-icons/io5";
import { Button } from "./ui/button";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Link } from "react-router";

import { useGetAllPlantsQuery } from "@/redux/features/plant.api";
import { Spinner } from "./ui/spinner";
import { Plant } from "@/types/plant";

const YouMayAlsoLike = () => {
  const { data: morePlants, isLoading } = useGetAllPlantsQuery(undefined);
  const plants = morePlants?.data?.data;

  if (isLoading) return <Spinner />;
  return (
    <section className="pt-12">
      <div className="flex items-center justify-between">
        <h3 className="font-metal pb-12 text-2xl italic sm:text-3xl md:text-4xl lg:text-5xl">
          You may Also like
        </h3>
        <div className="flex h-10 w-20 rounded-full bg-white">
          <Button
            variant={"outline"}
            className="custom-prev h-10 rounded-full border-none"
          >
            <IoChevronUp className="h-10 w-10 rotate-270" />
          </Button>
          <Button
            variant={"outline"}
            className="custom-next h-10 rounded-full border-none"
          >
            <IoChevronUp className="h-10 w-10 rotate-90" />
          </Button>
        </div>
      </div>
      <Swiper
        modules={[Navigation]}
        spaceBetween={30}
        slidesPerView={4}
        slidesPerGroup={4}
        breakpoints={{
          0: {
            slidesPerView: 2,
            slidesPerGroup: 2,
          },
          640: {
            slidesPerView: 2,
            slidesPerGroup: 2,
          },
          960: {
            slidesPerView: 3,
            slidesPerGroup: 3,
          },
          1230: {
            slidesPerView: 4,
            slidesPerGroup: 4,
          },
        }}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
      >
        {plants?.slice(0, plants.length - 1).map((item: Plant) => (
          <SwiperSlide key={item._id} className="min-h-full">
            <Link
              to={`/plants/${item._id}`}
              onClick={() => window.scrollTo(0, 0)}
            >
              <div className="space-y-3">
                <div className="xl:max-w-xs">
                  <img
                    className="size-60 object-cover md:size-72"
                    src={item.variants?.[0]?.image}
                    alt={item.variants?.[0]?.variantName}
                  />
                </div>
                <div>
                  <h3 className="font-metal text-3xl">{item.name}</h3>
                  <p className="text-xl font-bold text-green-800">
                    ${item?.variants?.[0].price}
                  </p>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default YouMayAlsoLike;
