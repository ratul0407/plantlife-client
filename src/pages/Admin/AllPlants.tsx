import { columns } from "@/components/modules/Admin/AllPlants/Columns";
import { DataTable } from "@/components/modules/Admin/AllPlants/DataTable";
import { useGetAllPlantsQuery } from "@/redux/features/plant.api";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { plantCategories } from "@/constants/plantCategories";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { useDebounce } from "use-debounce";
import Loader from "@/components/shared/Loader";
import { SortingState } from "@tanstack/react-table";
const AllPlants = () => {
  const [category, setCategory] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [apiSort, setApiSort] = useState<string>("");
  const [debouncedSearch] = useDebounce(search, 500);
  useEffect(() => {
    if (sorting.length > 0) {
      const { id, desc } = sorting[0]; // Get the first sort descriptor
      // Assuming 'price' is the ID for your price column
      if (id === "price") {
        setApiSort(desc ? "-variants.0.price" : "variants.0.price");
      } else if (id === "name") {
        // You'll need to update your 'name' column def to have id: 'name'
        setApiSort(desc ? "-name" : "name");
      }
    } else {
      setApiSort(""); // No sorting
    }
  }, [sorting]);
  const { data, isLoading, isError } = useGetAllPlantsQuery(
    {
      searchTerm: debouncedSearch || undefined,
      sort: apiSort || undefined,
      category: category || undefined,
    },
    {
      skip: false,
    },
  );

  if (isLoading) {
    return <Loader />;
  }

  console.log(data?.data?.data);
  return (
    <div className="container mx-auto rounded-xl border border-gray-200 bg-white py-4 shadow-sm">
      <h1 className="py-4 pl-8 text-xl font-medium">All Plants </h1>
      <div className="flex flex-col items-start justify-between px-12">
        <div className="py-4">
          <Input
            onChange={(e) => setSearch(e.target.value)}
            placeholder="search"
          />
        </div>
        <div className="ml-auto flex w-fit flex-col gap-4">
          {/* <div className="col-span-1">
            <Select
              value={sort}
              onValueChange={(v) => setSort(v === "no" ? "" : v)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="no" className="text-gray-400">
                    Sort By
                  </SelectItem>

                  <SelectItem value="variants.0.price">
                    Price Low to High
                  </SelectItem>
                  <SelectItem value="-variants.0.price">
                    Price high to Low
                  </SelectItem>
                  <SelectItem value="name">Alphabetically A-Z</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div> */}
          <div>
            <Select
              value={category}
              onValueChange={(v) => setCategory(v === "no" ? "" : v)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="no" className="text-gray-400">
                    Categories
                  </SelectItem>
                  {Object.entries(plantCategories).map(
                    ([category, value], index) => (
                      <SelectItem key={index} value={value}>
                        {category}
                      </SelectItem>
                    ),
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <div className="px-8 py-12">
        {!isLoading && !isError && (
          <DataTable
            sorting={sorting}
            setSorting={setSorting}
            columns={columns}
            data={data?.data?.data}
          />
        )}
      </div>
    </div>
  );
};

export default AllPlants;
