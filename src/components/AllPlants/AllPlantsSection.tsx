import { useState } from "react";
import { useEffect } from "react";
import { PlantCard } from "./PlantCard";
import { BsFilterLeft } from "react-icons/bs";
import { FilterSideBar } from "./FilterSideBar";

// import { useLenis } from "../../hooks/useLenis";
import { useGetAllPlantsQuery } from "@/redux/features/plant.api";

import { PlantCardSkeleton } from "../PlantCardSkeleton";
import FilterDesktop from "../FilterDesktop";
import { useAppDispatch } from "@/redux/hooks";
// import { setReduxWishlist } from "@/redux/features/wishlist/wishlistSlice";
import { useLoaderData, useParams, useSearchParams } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export const AllPlantsSection = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParams = searchParams.getAll("category");
  const sort = searchParams.get("sort") || undefined;
  const { user } = useAuth();

  const dispatch = useAppDispatch();

  const category =
    categoryParams.length === 1
      ? categoryParams[0]
      : categoryParams.length > 1
        ? [...categoryParams]
        : undefined;

  useEffect(() => {
    if (user?.data?.wishlist) {
      const ids = user?.data?.wishlist?.map((w) => w.plant);
      // dispatch(setReduxWishlist(ids));
    }
  }, [user, dispatch]);

  const [overlay, setOverlay] = useState(false);

  const [openFilter, setOpenFilter] = useState(false);

  const loaderData = useLoaderData();
  console.log(loaderData);
  const { data, isLoading, isFetching } = useGetAllPlantsQuery({
    category,
    sort: sort,
    skip: !!loaderData,
  });

  const plants = loaderData?.data?.data || data?.data?.data;
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
      <div className="bg-plants-banner flex h-60 items-center justify-center bg-cover bg-center bg-no-repeat">
        <h1 className="font-metal text-center text-5xl font-bold text-white italic">
          Connect with nature
        </h1>
      </div>
      <div className="container mx-auto space-y-10 px-8 py-12 sm:p-8 sm:py-8 md:space-y-20 2xl:mx-auto">
        <div className="flex items-start justify-between lg:justify-end">
          {/* filter */}
          <button
            onClick={openFilterSideBar}
            className="flex w-fit cursor-pointer items-center gap-4 rounded-sm border border-gray-300 px-2 py-1 lg:hidden"
          >
            <BsFilterLeft className="h-7 w-7" />
            <span>Filter</span>
          </button>

          {/* filter sidebar */}

          <FilterSideBar
            openFilter={openFilter}
            closeFilterSideBar={closeFilterSideBar}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />

          {/* sort by */}
          <div className="flex items-center gap-4">
            <span className="hidden sm:block">Sort By:</span>
            <Select onValueChange={(value) => setSearchParams({ sort: value })}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Default" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="no-value">Default</SelectItem>
                <SelectItem value="variants.0.price">
                  Price, Low to high
                </SelectItem>
                <SelectItem value="-variants.0.price">
                  Price, High to low
                </SelectItem>
                <SelectItem value="name">Alphabetically A-Z</SelectItem>
                <SelectItem value="-name">Alphabetically Z-A</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        {/* <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4"> */}

        {
          <div className="lg:flex lg:items-start">
            <div className="hidden min-h-screen basis-1/4 rounded-xl bg-white p-4 shadow-sm lg:block">
              <div className="space-y-4 rounded-xl border py-4 *:px-6">
                <h3 className="font-metal pb-2 text-center text-3xl text-green-900 italic">
                  Categories
                </h3>
                <FilterDesktop
                  setSearchParams={setSearchParams}
                  searchParams={searchParams}
                />
              </div>
            </div>
            <div className="grid basis-3/4 grid-cols-1 gap-12 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 lg:pl-6 2xl:grid-cols-4">
              {isLoading || isFetching
                ? Array.from({ length: 6 }).map((_, i) => (
                    <PlantCardSkeleton key={i} />
                  ))
                : plants?.map((plant, index: number) => {
                    return (
                      <PlantCard
                        key={index}
                        plant={plant}
                        variantImages={variantImages[index]}
                        // wishSet={wishSet}
                      />
                    );
                  })}
            </div>
          </div>
        }
        {/* </div> */}
      </div>
      <div
        className={`${overlay ? "block" : "hidden"} overlay | absolute top-0 z-[90] min-h-screen w-[96.3vw] cursor-pointer bg-black/20`}
      ></div>
    </>
  );
};
