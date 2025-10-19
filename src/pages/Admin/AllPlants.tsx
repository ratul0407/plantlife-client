import { columns } from "@/components/modules/Admin/AllPlants/Columns";
import { DataTable } from "@/components/modules/Admin/AllPlants/DataTable";
import { Spinner } from "@/components/ui/spinner";
import { useGetAllPlantsQuery } from "@/redux/features/plant.api";

const AllPlants = () => {
  const { data, isLoading } = useGetAllPlantsQuery(undefined);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner className="size-8" />;
      </div>
    );
  }
  return (
    <div className="rounded-xl bg-white py-4">
      <h1 className="py-4 pl-8 text-xl font-medium">All Plants List</h1>

      <DataTable columns={columns} data={data?.data?.data} />
    </div>
  );
};

export default AllPlants;
