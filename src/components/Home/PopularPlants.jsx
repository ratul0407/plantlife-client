import React from "react";
import plantImg2 from "../../assets/popular-plant2.jpg";
export const PopularPlants = () => {
  return (
    <div className="bg-popular-plant relative flex flex-col space-y-8 rounded-lg bg-cover bg-top px-8 pt-8 pb-20 sm:flex-row sm:justify-between md:pb-40 lg:pb-72">
      <div className="flex flex-col gap-6">
        <h3 className="heading">
          Explore our most <span className="plant-text">popular</span> plants
        </h3>
        <p className="font-bold">#BOOSTPRODUCTIVITY #GREENWORKSPACE</p>
      </div>
      <div className="relative basis-1/2">
        <div className="relative">
          <div className="absolute top-5 left-32 flex h-30 w-30 items-center justify-center rounded-full bg-[#BBD8A3]">
            <p className="translate-x-1/6 font-bold uppercase underline">
              View this product
            </p>
          </div>
          <img src={plantImg2} className="h-[400px] rounded-lg" />
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
