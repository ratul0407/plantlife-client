import fiddleLeaf from "../../assets/plant4.jpg";
import monster from "../../assets/plant5.jpg";
import african from "../../assets/plant7.jpg";
import snake from "../../assets/plant2.jpg";
import { PlantCard } from "./PlantCard";

const plants = [
  {
    id: 1,
    name: "Monster Deliciosa",
    img: monster,
    price: 45,
    new: true,
  },
  {
    id: 2,
    name: "Snake Plant",
    img: snake,
    price: 30,
  },
  {
    id: 3,
    name: "Fiddle LeafFlag",
    img: fiddleLeaf,
    price: 55,
  },
  {
    id: 4,
    name: "African Mask",
    img: african,
    price: 20,
    new: true,
  },
];

export const CuratedPlants = () => {
  return (
    <div className="space-y-10 lg:space-y-20">
      <div className="md:px-4 lg:px-8">
        <h3 className="heading overflow-hidden">
          <span className="block">
            Choose from our <span className="plant-text">curated plant</span>
          </span>
          <span>collections, designed to fit every lifestyle.</span>
        </h3>
      </div>

      {/* plants  */}
      <div className="grid gap-4 sm:grid-cols-2 md:px-4 lg:grid-cols-4 lg:gap-1 lg:px-8">
        {plants.map((plant) => {
          return <PlantCard key={plant.id} plant={plant} />;
        })}
      </div>
    </div>
  );
};
