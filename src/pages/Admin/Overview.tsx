import { useGetUserAnalyticsQuery } from "@/redux/features/analytics";

const Overview = () => {
  const { data } = useGetUserAnalyticsQuery(undefined);
  console.log(data);
  return (
    <div>
      <h1>Overview</h1>
    </div>
  );
};

export default Overview;
