import React from "react";
import { IoArrowForward } from "react-icons/io5";

export const VisitStore = () => {
  return (
    <section>
      <div>
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
    </section>
  );
};
