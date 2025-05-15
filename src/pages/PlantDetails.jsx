import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import { useParams } from "react-router";
import "../css/plantDetails.css";
export const PlantDetails = () => {
  const { id } = useParams();
  console.log(id);
  const { data: plant = {}, isLoading } = useQuery({
    queryKey: ["session", id],
    queryFn: async () => {
      const { data } = await axios(
        `${import.meta.env.VITE_API_URL}/plant/${id}`,
      );
      return data;
    },
  });
  console.log(plant);
  const { name, category, description, variants, more_images } = plant || {};
  const images = [
    ...(variants?.map((item) => item?.img) || []),
    ...(more_images || []),
  ];
  console.log(images);
  return (
    <div className="p-8">
      <div className="flex">
        {/* slider buttons */}
        <div className="flex flex-col gap-2 *:cursor-pointer">
          {images?.map((img) => (
            <img src={img} height={100} width={100} />
          ))}
        </div>
        {/* img slider */}
        <div>
          <div className="relative">
            {images?.map((img) => (
              <div className="absolute min-w-[400px] border border-red-500 bg-white">
                <img
                  src={img}
                  width={400}
                  height={900}
                  className="translate-x-0 object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
