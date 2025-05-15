import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { PlantCard } from "./PlantCard";
import { BsFilterLeft } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import { FilterSideBar } from "./FilterSideBar";

export const AllPlantsSection = ({ setOverlay }) => {
  const [allPlants, setAllPlants] = useState([{}]);
  const [openFilter, setOpenFilter] = useState(false);
  useEffect(() => {
    const getAllPlants = async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/all-plants`,
      );
      return setAllPlants(data);
    };

    getAllPlants();
  }, []);
  const openFilterSideBar = () => {
    setOpenFilter(true);
    setOverlay(true);
  };

  const closeFilterSideBar = () => {
    setOpenFilter(false);
    setOverlay(false);
  };

  return (
    <div>
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
        {allPlants?.map((plant, index) => {
          return <PlantCard key={index} plant={plant} />;
        })}
      </div>
    </div>
  );
};
