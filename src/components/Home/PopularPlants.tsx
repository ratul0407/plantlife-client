// eslint-disable-next-line no-unused-vars

import { Link } from "react-router";
import plantImg from "../../assets/popular-plant.jpg";
import { useRef } from "react";
export const PopularPlants = () => {
  const container = useRef(null);
  return (
    <div className="bg-popular-plant relative flex flex-col space-y-8 rounded-lg bg-cover bg-top px-8 pt-8 pb-20 sm:flex-row sm:justify-between md:pb-40 lg:pb-72">
      <div className="flex flex-col gap-6">
        <h3 className="heading">
          Explore our most <span className="plant-text">popular</span> plants
        </h3>
        <p className="font-bold">#BOOSTPRODUCTIVITY #GREENWORKSPACE</p>
      </div>
      <div ref={container} className="relative basis-1/2">
        <div className="relative">
          <div className="absolute top-0 left-52 flex h-30 w-30 cursor-pointer items-center justify-center rounded-full bg-[#BBD8A3]">
            <Link
              to="/plants/68bd7486047fe570a31a1ba2"
              className="translate-x-1/6 font-bold uppercase underline"
            >
              View this product
            </Link>
          </div>
          <img
            src={plantImg}
            className="h-[400px] max-w-72 rounded-lg object-cover"
          />
        </div>
      </div>
      <p className="absolute bottom-10 left-1/2 mx-auto hidden max-w-[100ch] -translate-x-1/2 text-center font-bold uppercase md:block">
        Plants boost productivity and creativity by inviting and inspiring
        atmosphere where at home or in the office, adding greenery can help you
        stay focused, energized and motivated throughout the day.
      </p>
    </div>
  );
};
