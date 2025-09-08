import { SearchIcon } from "lucide-react";
import { Input } from "../ui/input";
import { useEffect, useRef, useState } from "react";
import { useDebounce } from "use-debounce";
import { useGetAllPlantsQuery } from "@/redux/features/plant.api";
import SearchResultCard from "../SearchResultCard";
const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);
  const [showResults, setShowResults] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { data, isLoading } = useGetAllPlantsQuery(
    {
      searchTerm: debouncedSearch || undefined,
    },
    { skip: !debouncedSearch },
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [wrapperRef]);

  useEffect(() => {
    if (debouncedSearch) setShowResults(true);
  }, [debouncedSearch]);
  return (
    <div ref={wrapperRef}>
      <div className="relative mx-auto w-full max-w-xs">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="peer h-8 ps-8 pe-10"
          placeholder="Search..."
          type="text"
        />
        <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-2 peer-disabled:opacity-50">
          <SearchIcon size={16} />
        </div>

        <div className="text-muted-foreground pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-2"></div>
      </div>
      <div className="absolute top-14 left-1/2 w-96 -translate-x-1/2 md:w-2xl">
        {showResults &&
          !isLoading &&
          data?.data?.data?.map((item) => (
            <SearchResultCard
              image={item?.variants?.[0].image}
              name={item?.name}
              price={item?.variants?.[0]?.price}
              id={item?._id}
              onClick={() => setShowResults(false)}
            />
          ))}
      </div>
    </div>
  );
};

export default SearchBar;
