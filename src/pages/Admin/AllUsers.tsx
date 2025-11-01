import { DataTable } from "@/components/modules/Admin/AllPlants/DataTable";
import { userColumns } from "@/components/modules/Admin/AllUsers/UserColumns";
import Loader from "@/components/shared/Loader";
import { useGetAllUsersQuery } from "@/redux/features/user.api";

const AllUsers = () => {
  const { data, isLoading } = useGetAllUsersQuery(undefined);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="container mx-auto rounded-xl border border-gray-200 bg-white py-4 shadow-sm">
      <h1 className="py-4 pl-8 text-xl font-medium">All Users</h1>
      <div className="px-8 py-12">
        <DataTable columns={userColumns} data={data?.data} />
      </div>
    </div>
  );
};

export default AllUsers;
