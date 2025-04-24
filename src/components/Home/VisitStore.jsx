import React from "react";
import { IoArrowForward } from "react-icons/io5";

export const VisitStore = () => {
  return (
    <div className="flex gap-10">
      <div className="flex basis-[30%] flex-col justify-between">
        <h3 className="font-lg font-semibold uppercase">
          Visit our pop-up stores for exclusive plants and offers near you
        </h3>
        <p className="flex items-center gap-4 font-semibold uppercase underline">
          view More
          <span>
            <IoArrowForward />
          </span>
        </p>
      </div>
      <div className="flex basis-[70%] flex-col gap-20">
        {/* first store */}
        <div className="flex items-start">
          <p className="pr-20 text-gray-400">01.</p>
          <div className="flex flex-grow-1">
            <h3 className="font-metal basis-1/2 text-4xl font-medium text-[#386641]">
              Green Heaven Market
            </h3>
            <p className="basis-1/2 text-left uppercase *:block">
              <span>Riverside MALL</span>
              <span>November 25-26, 2025</span>
            </p>
          </div>
        </div>
        {/* second store */}
        <div className="flex items-start">
          <p className="pr-20 text-gray-400">01.</p>
          <div className="flex flex-grow-1">
            <h3 className="font-metal basis-1/2 text-4xl font-medium text-[#386641]">
              Urban Jungle Fest
            </h3>
            <p className="basis-1/2 text-right uppercase *:block">
              <span>DownTown Garden</span>
              <span>February 14-15, 2025</span>
            </p>
          </div>
        </div>
        {/* third store */}
        <div className="flex items-start">
          <p className="pr-20 text-gray-400">01.</p>
          <div className="flex flex-grow-1">
            <h3 className="font-metal basis-1/2 text-4xl font-medium text-[#386641]">
              Botanical Bliss Pop-Up
            </h3>
            <p className="basis-1/2 text-left uppercase *:block">
              <span>Open CourtYard</span>
              <span>December 14-15, 2024</span>
            </p>
          </div>
        </div>
        {/* fourth store */}
        <div className="flex items-start">
          <p className="pr-20 text-gray-400">01.</p>
          <div className="flex flex-grow-1">
            <h3 className="font-metal basis-1/2 text-4xl font-medium text-[#386641]">
              Eco Oasis Experience
            </h3>
            <p className="basis-1/2 text-right uppercase *:block">
              <span>Green Park Pavilion</span>
              <span>January 13-14, 2025</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
