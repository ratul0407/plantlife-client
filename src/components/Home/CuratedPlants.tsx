import img1 from "../../assets/curated/img-1.jpg";
import img2 from "../../assets/curated/img-2.jpg";
import img3 from "../../assets/curated/img-3.jpg";
import img4 from "../../assets/curated/img-4.png";
import { PlantCard } from "./PlantCard";

const plants = [
  {
    id: 1,
    name: "String of Pearls",
    img: img1,
    price: 39.99,
    new: false,
    link: "/plants/68bd7524047fe570a31a1ba9",
  },
  {
    id: 2,
    name: "Ponytail Palm",
    img: img2,
    price: 24.99,
    new: true,
    link: "/plants/68d2d25a6f8926a6ac7ed364",
  },
  {
    id: 3,
    name: "Pothos",
    img: img3,
    price: 28.99,
    link: "/plants/68bd77a631480498d0f261f8",
  },
  {
    id: 4,
    name: "Anthurium",
    img: img4,
    price: 39.99,
    new: true,
    link: "/plants/68d2d410a2fd5553c911df64",
  },
];

export const CuratedPlants = () => {
  return (
    <div className="space-y-10 lg:space-y-20">
      <div>
        <h3 className="heading overflow-hidden">
          <span className="block">
            Choose from our <span className="plant-text">curated plant</span>
          </span>
          <span>collections, designed to fit every lifestyle.</span>
        </h3>
      </div>

      {/* plants  */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-1">
        {plants.map((plant) => {
          return <PlantCard key={plant.id} plant={plant} />;
        })}
      </div>
    </div>
  );
};
