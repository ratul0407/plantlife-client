import { columns } from "@/components/modules/Admin/AllPlants/Columns";
import { DataTable } from "@/components/modules/Admin/AllPlants/DataTable";
import { Spinner } from "@/components/ui/spinner";
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
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useDebounce } from "use-debounce";
const AllPlants = () => {
  const [category, setCategory] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [sort, setSort] = useState<string>("");
  const [debouncedSearch] = useDebounce(search, 500);
  const { data, isLoading, isError } = useGetAllPlantsQuery(
    {
      category: category || undefined,
      sort: sort || undefined,
      searchTerm: debouncedSearch || undefined,
    },
    { queryKey: ["plants", { category, sort, searchTerm: debouncedSearch }] },
  );

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner className="size-8" />
      </div>
    );
  }
  const plants = data?.data?.data || [];
  console.log(debouncedSearch);
  return (
    <div className="rounded-xl border border-gray-200 bg-white py-4 shadow-sm">
      <h1 className="py-4 pl-8 text-xl font-medium">All Plants </h1>
      <div className="flex items-center justify-between px-12">
        <div>
          <Input
            onChange={(e) => setSearch(e.target.value)}
            placeholder="search"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-1">
            <Select value={sort} onValueChange={setSort}>
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
          </div>

          <div className="col-span-1">
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Stock" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="no" className="text-gray-400">
                    Stock
                  </SelectItem>
                  <SelectItem value="variants.0.price">In Stock</SelectItem>
                  <SelectItem value="variants.0.price">Out of Stock</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="col-span-2">
            <Select value={category} onValueChange={setCategory}>
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
            key={category + sort + search}
            columns={columns}
            data={plants}
          />
        )}
      </div>
    </div>
  );
};

export default AllPlants;
