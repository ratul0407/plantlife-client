import fiddleLeaf from "../assets/plant4.jpg";
import monster from "../assets/plant5.jpg";
import african from "../assets/plant7.jpg";
import snake from "../assets/plant2.jpg";
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
      <div className="lg:px-8">
        <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
          <span className="block">
            Choose from our{" "}
            <span className="font-charm text-3xl font-thin text-[#386641] sm:text-4xl md:text-5xl lg:text-6xl">
              curated plant
            </span>
          </span>
          <span>collections, designed to fit every lifestyle.</span>
        </h3>
      </div>

      {/* plants  */}
      <div className="flex flex-col items-stretch gap-4 rounded-sm px-2 lg:flex-row lg:items-stretch lg:justify-center">
        {plants.map((plant) => {
          return <PlantCard key={plant.id} plant={plant} />;
        })}
      </div>
    </div>
  );
};
