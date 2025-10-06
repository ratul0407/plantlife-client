import { SearchIcon } from "lucide-react";
import { Input } from "../ui/input";
import { useEffect, useRef, useState } from "react";
import { useDebounce } from "use-debounce";
import { useGetAllPlantsQuery } from "@/redux/features/plant.api";
import SearchResultCard from "../SearchResultCard";
import { ScrollArea } from "../ui/scroll-area";
const SearchBar = ({
  openSearchBar,
  setOpenSearchBar,
}: {
  openSearchBar: boolean;
  setOpenSearchBar: any;
}) => {
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

  console.log(data);

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
  const inputRef = useRef(null);
  console.log(inputRef.current?.value);

  const handleInputClear = () => {
    if (inputRef?.current?.value) {
      inputRef.current.value = "";
    }
  };
  return (
    <div ref={wrapperRef}>
      <div className="font-robot relative mx-auto hidden w-full max-w-xl sm:block">
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
      {/* mobile searchbar */}
      <div className={`${openSearchBar ? "block" : "hidden"}`}>
        <div className="font-robot absolute top-20 -left-4 mx-auto w-screen border border-slate-200 bg-white shadow-xs">
          <Input
            ref={inputRef}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="peer h-8 min-w-full border-none ps-8 pe-10"
            placeholder="Search..."
            type="text"
          />
          <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-2 peer-disabled:opacity-50">
            <SearchIcon
              onClick={() => setSearch(inputRef?.current?.value)}
              size={16}
            />
          </div>
          <div className="text-muted-foreground pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-2"></div>
        </div>
      </div>
      <div
        onClick={() => {
          setOpenSearchBar(false);
          handleInputClear();
        }}
        className={`absolute top-28 left-1/2 min-w-screen -translate-x-1/2 md:top-14 md:w-xl md:min-w-auto`}
      >
        <ScrollArea
          className={` ${showResults && !isLoading && data?.data?.data && "h-screen lg:h-[70vh]"}`}
        >
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
        </ScrollArea>
      </div>
    </div>
  );
};

export default SearchBar;
