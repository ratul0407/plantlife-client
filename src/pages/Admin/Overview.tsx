import {
  useGetPlantAnalyticsQuery,
  useGetUserAnalyticsQuery,
} from "@/redux/features/analytics";
import { ArrowUp, Heart, Leaf, ShoppingCart, User } from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);
import { Line } from "react-chartjs-2";
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: [1000, 1000, 3409, 340934, 3403, 343, 756, 3434, 23, 12],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: [1000, 1000, 3409, 340934, 3403, 343, 756, 3434, 23, 12],
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};
const Overview = () => {
  const { data: userRes } = useGetUserAnalyticsQuery(undefined);
  const { data: plantRes } = useGetPlantAnalyticsQuery(undefined);
  const plantData = plantRes?.data;
  const userData = userRes?.data;
  return (
    <div className="container mx-auto rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <h1 className="py-4 pl-8 text-xl font-medium">Analytics</h1>{" "}
      <div className="grid grid-cols-2 items-center gap-4">
        <div className="col-span-1 flex items-start justify-start gap-6 rounded-sm border border-l-2 border-gray-200 border-l-purple-700 p-4">
          <div className="w-fit rounded-sm bg-purple-700 p-2">
            <User className="size-8 text-white" />
          </div>
          <div>
            <p className="text-sm text-gray-700">Total Users</p>
            <p className="block text-2xl text-gray-900">
              {userData?.totalUsers}
            </p>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <span className="flex items-center text-green-500">
                <ArrowUp className="size-4" />
                50%
              </span>
              This year
            </div>
          </div>
        </div>
        <div className="col-span-1 flex items-start justify-start gap-6 rounded-sm border border-l-2 border-gray-200 border-l-green-700 p-4">
          <div className="w-fit rounded-sm bg-green-700 p-2">
            <Leaf className="size-8 text-white" />
          </div>
          <div>
            <p className="text-sm text-gray-700">Total Plants</p>
            <p className="block text-2xl text-gray-900">
              {plantData?.totalPlants}
            </p>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <span className="flex items-center text-green-500">
                <ArrowUp className="size-4" />
                27%
              </span>
              This Month
            </div>
          </div>
        </div>
        <div className="col-span-1 flex items-start justify-start gap-6 rounded-sm border border-l-2 border-gray-200 border-l-pink-700 p-4">
          <div className="w-fit rounded-sm bg-pink-700 p-2">
            <Heart className="size-8 text-white" />
          </div>
          <div>
            <p className="text-sm text-gray-700">Plants in Wishlist</p>
            <p className="block text-2xl text-gray-900">
              {plantData?.totalPlantsInWishlist}
            </p>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <span className="flex items-center text-green-500">
                <ArrowUp className="size-4" />
                10%
              </span>
              this month
            </div>
          </div>
        </div>
        <div className="col-span-1 flex items-start justify-start gap-6 rounded-sm border border-l-2 border-gray-200 border-l-orange-700 p-4">
          <div className="w-fit rounded-sm bg-orange-700 p-2">
            <ShoppingCart className="size-8 text-white" />
          </div>
          <div>
            <p className="text-sm text-gray-700">Plants in Cart</p>
            <p className="block text-2xl text-gray-900">
              {plantData?.totalPlantsInCart}
            </p>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <span className="flex items-center text-green-500">
                <ArrowUp className="size-4" />
                100%
              </span>
              this month
            </div>
          </div>
        </div>
      </div>
      {/* <div className="w-full">
        <Line options={options} data={data} />;
      </div> */}
    </div>
  );
};

export default Overview;
