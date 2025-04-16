import React from "react";
import plantImg from "../../assets/powerofplant.jpg";
import plantImg2 from "../../assets/powerofplant2.jpg";
export const PowerOfPlant = () => {
  return (
    <div>
      <div className="flex flex-col-reverse gap-12 lg:flex-row lg:items-stretch lg:gap-20">
        <div className="relative text-white lg:basis-1/2">
          <img src={plantImg} className="max-h-[900px] lg:max-h-full" />
          <p className="absolute inset-0 translate-y-1/2 text-center uppercase sm:text-lg">
            Plant improve air quality, reduces stress and brings a sense of calm
            and to your environment. discover all the ways our plants can
            enhance your well-being.
          </p>
        </div>

        <div className="flex basis-1/2 flex-col justify-between">
          <h3 className="heading">
            The power of <span className="plant-text">plant</span> in your home
          </h3>
          <img
            src={plantImg2}
            className="basis-1/2 object-contain object-left lg:max-h-[450px]"
          />
          <div className="uppercase">
            <p className="before:h-1 before:w-1 before:bg-red-500">
              -- Natural Air purifiers
            </p>
            <p>-- Boosts relaxation and focus</p>
            <p>-- Elevate any interior decorator</p>
          </div>
        </div>
      </div>
    </div>
  );
};
