import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router";

export const PlantDetails = () => {
  const { id } = useParams();
  console.log(id);
  const { data: plant, isLoading } = useQuery({
    queryKey: ["session", id],
    queryFn: async () => {
      const { data } = await axios(
        `${import.meta.env.VITE_API_URL}/plant/${id}`,
      );
      return data;
    },
  });
  console.log(plant);
  return <div>PlantDetails</div>;
};
