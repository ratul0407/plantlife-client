import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { PlantCard } from "./PlantCard";

export const AllPlantsSection = () => {
  const [allPlants, setAllPlants] = useState([{}]);
  useEffect(() => {
    const getAllPlants = async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/all-plants`,
      );
      console.log(data);
      return setAllPlants(data);
    };

    getAllPlants();
  }, []);
  //   console.log(allPlants);
  return (
    <div>
      {allPlants &&
        allPlants.map((plant, index) => {
          return <PlantCard key={index} plant={plant} />;
        })}
    </div>
  );
};
