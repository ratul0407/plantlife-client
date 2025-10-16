import { IoMdClose } from "react-icons/io";
import FilterDesktop from "../FilterDesktop";
import { SetURLSearchParams } from "react-router";

const plantCategories = [
  {
    name: "Easy Care Plants",
    value: "easy-care",
  },
  {
    name: "Hanging Plants",
    value: "hanging",
  },
  {
    name: "Air-purifying Plants",
    value: "air-purifying",
  },
  {
    name: "Sun Loving Plants",
    value: "sun-loving",
  },

  {
    name: "Low-Light Plants",
    value: "low-light",
  },
  {
    name: "Flowering Indoor Plants",
    value: "flowering",
  },
];
export const FilterSideBar = ({
  openFilter,
  closeFilterSideBar,
  searchParams,
  setSearchParams,
}: {
  openFilter: boolean;
  closeFilterSideBar: () => void;
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
}) => {
  return (
    <div
      className={`${openFilter ? "translate-x-0" : "-translate-x-100"} absolute top-0 left-0 z-100 min-h-screen w-84 bg-slate-50 transition-all duration-300 ease-linear`}
    >
      <button
        className="absolute top-4 right-4 cursor-pointer"
        onClick={closeFilterSideBar}
      >
        <span>
          <IoMdClose className="h-12 w-12 rounded-full border p-1" />
        </span>
      </button>
      {/* <div className="space-y-4 px-4 pt-28">
        <p className="text-2xl font-semibold">Categories</p>
        <form>
          <div className="space-y-2.5">
            {plantCategories.map((item, index) => {
              return (
                <label
                  key={index}
                  className="flex cursor-pointer items-center space-x-2"
                >
                  <input
                    type="checkbox"
                    value={item.value}
                    className="peer hidden"
                  />
                  <span className="h-4 w-4 rounded-sm border border-slate-300 bg-white"></span>
                  <FaCheck className="absolute hidden h-3 w-3 translate-x-0.5 text-green-900 peer-checked:block" />
                  <span>{item.name}</span>
                </label>
              );
            })}
          </div>
        </form>
      </div> */}
      <div className="space-y-4 px-4 pt-28">
        <p className="font-metal text-3xl text-green-900">Categories</p>
        <FilterDesktop
          setSearchParams={setSearchParams}
          searchParams={searchParams}
        />
      </div>
    </div>
  );
};
