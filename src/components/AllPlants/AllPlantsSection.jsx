import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { PlantCard } from "./PlantCard";
import filterIcon from "../../assets/icons/filter.png";
import { BsFilterLeft } from "react-icons/bs";

export const AllPlantsSection = () => {
  const [allPlants, setAllPlants] = useState([{}]);
  const [openFilter, setOpenFilter] = useState(false);
  const [filter, setFilter] = useState();
  useEffect(() => {
    const getAllPlants = async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/all-plants`,
      );
      console.log(data);
      return setAllPlants(data);
    };

    getAllPlants();
  }, [filter]);
  console.log(openFilter);
  return (
    <div>
      <div className="flex items-center justify-between">
        {/* filter */}
        <button
          onClick={() => setOpenFilter(true)}
          className="flex w-fit cursor-pointer items-center gap-4 rounded-sm border border-gray-300 px-2 py-1"
        >
          <BsFilterLeft className="h-7 w-7" />
          <span>Filter</span>
        </button>

        {/* filter sidebar */}

        <div
          className={`${openFilter ? "translate-x-0" : "-translate-x-100"} absolute top-0 left-0 z-50 min-h-screen w-72 bg-blue-500/10 transition-all duration-300`}
        >
          <p onClick={() => setOpenFilter(false)}>cross icon</p>
          <p>Side bar</p>
        </div>

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
        {allPlants &&
          allPlants.map((plant, index) => {
            return <PlantCard key={index} plant={plant} />;
          })}
      </div>
    </div>
  );
};
