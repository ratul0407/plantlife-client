import { useMemo, useState } from "react";
import { useEffect } from "react";
import { PlantCard } from "./PlantCard";
import { BsFilterLeft } from "react-icons/bs";
import { FilterSideBar } from "./FilterSideBar";

import { useLenis } from "../../hooks/useLenis";
import { useGetAllPlantsQuery } from "@/redux/features/plant.api";
import { useGetMeQuery } from "@/redux/features/user.api";
import { PlantCardSkeleton } from "../PlantCardSkeleton";

export const AllPlantsSection = () => {
  const { data: userData } = useGetMeQuery(undefined);
  const wishlist = userData?.data?.wishlist ?? [];

  const wishSet = useMemo(
    () => new Set(wishlist.map((w: any) => w.plant)),
    [wishlist],
  );

  const [overlay, setOverlay] = useState(false);
  const { lenisRef } = useLenis();
  const [openFilter, setOpenFilter] = useState(false);
  useEffect(() => {
    if (openFilter) {
      lenisRef?.current?.stop();
    } else {
      lenisRef?.current?.start();
    }
  }, [openFilter]);

  const { data, isLoading } = useGetAllPlantsQuery(undefined);
  const plants = data?.data;
  const variantImages = plants?.map((item) =>
    item.variants.map((v) => v.image),
  );

  const openFilterSideBar = () => {
    setOpenFilter(true);
    setOverlay(true);
  };

  const closeFilterSideBar = () => {
    setOpenFilter(false);
    setOverlay(false);
  };

  // close filter sidebar with keyboard or by clicking on the overlay
  useEffect(() => {
    const closeWithKeyboard = (e) => {
      if (e.key === "Escape") {
        closeFilterSideBar();
      }
    };

    const overlay = document.querySelector(".overlay");
    if (overlay) {
      overlay.addEventListener("click", closeFilterSideBar);
      document.addEventListener("keydown", closeWithKeyboard);
    }

    return () => {
      if (overlay) {
        overlay.removeEventListener("click", closeFilterSideBar);
      }
      document.removeEventListener("keydown", closeWithKeyboard);
    };
  }, [closeFilterSideBar]);

  return (
    <>
      <div className="space-y-10 md:space-y-20 2xl:mx-80">
        <div className="flex items-center justify-between">
          {/* filter */}
          <button
            onClick={openFilterSideBar}
            className="flex w-fit cursor-pointer items-center gap-4 rounded-sm border border-gray-300 px-2 py-1"
          >
            <BsFilterLeft className="h-7 w-7" />
            <span>Filter</span>
          </button>

          {/* filter sidebar */}

          <FilterSideBar
            openFilter={openFilter}
            closeFilterSideBar={closeFilterSideBar}
            setOverlay={setOverlay}
          />

          {/* sort by */}
          <div className="flex items-center gap-4">
            <span>Sort By:</span>
            <div className="rounded-sm border border-gray-300 py-1">
              <select name="sort" id="id" className="cursor-pointer">
                <option value="all">Default</option>
                <option value="asc">Price, low to high</option>
                <option value="dsc">Price, high to low</option>
              </select>
            </div>
          </div>
        </div>
        {/* <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4"> */}
        {
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {isLoading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <PlantCardSkeleton key={i} />
                ))
              : plants?.map((plant, index: number) => {
                  return (
                    <PlantCard
                      key={index}
                      plant={plant}
                      variantImages={variantImages[index]}
                      wishSet={wishSet}
                    />
                  );
                })}
          </div>
        }
        {/* </div> */}
      </div>
      <div
        className={`${overlay ? "block" : "hidden"} overlay | absolute top-0 z-10 min-h-screen w-[96.3vw] cursor-pointer bg-black/20`}
      ></div>
    </>
  );
};
