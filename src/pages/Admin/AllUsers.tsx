import { DataTable } from "@/components/modules/Admin/AllPlants/DataTable";
import { userColumns } from "@/components/modules/Admin/AllUsers/UserColumns";
import { Spinner } from "@/components/ui/spinner";
import { useGetAllUsersQuery } from "@/redux/features/user.api";

const AllUsers = () => {
  const { data, isLoading } = useGetAllUsersQuery(undefined);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner className="size-8" />;
      </div>
    );
  }
  return (
    <div className="rounded-xl bg-white py-4">
      <h1 className="py-4 pl-8 text-xl font-medium">All Users List</h1>

      <DataTable columns={userColumns} data={data?.data} />
    </div>
  );
};

export default AllUsers;
