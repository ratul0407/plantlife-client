import { columns } from "@/components/modules/Admin/AllPlants/Columnts";
import { PlantsTable } from "@/components/modules/Admin/AllPlants/PlantsTable";

const data = [
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
];
const AllPlants = () => {
  return (
    <div>
      <h1>AllPlants Section</h1>
      <PlantsTable columns={columns} data={data} />
    </div>
  );
};

export default AllPlants;
