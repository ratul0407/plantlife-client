import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { PlantCard } from "./PlantCard";
import { BsFilterLeft } from "react-icons/bs";
import { FilterSideBar } from "./FilterSideBar";
import { useQuery } from "@tanstack/react-query";

export const AllPlantsSection = () => {
  const [overlay, setOverlay] = useState(false);
  console.log(setOverlay);
  const [openFilter, setOpenFilter] = useState(false);

  const { data: plants, isLoading } = useQuery({
    queryKey: ["plants"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/plants`,
        {
          withCredentials: true,
        },
      );
      console.log(data);
      return data;
    },
  });

  console.log(plants);
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

  if (isLoading) return <p>isLoading...........</p>;
  return (
    <>
      <div className="pt-20 2xl:mx-80">
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
              <select name="sort" id="id" className="">
                <option value>Default</option>
                <option value="asc">Price, low to high</option>
                <option value="dsc">Price, high to low</option>
              </select>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {plants?.map((plant, index) => {
            return <PlantCard key={index} plant={plant} />;
          })}
        </div>
      </div>
      <div
        className={`${overlay ? "block" : "hidden"} overlay | absolute top-0 z-10 min-h-screen w-[96.3vw] cursor-pointer bg-black/20`}
      ></div>
    </>
  );
};
