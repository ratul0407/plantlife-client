import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import { useParams } from "react-router";
import "../css/plantDetails.css";
import { useState } from "react";
export const PlantDetails = () => {
  const [imgIndex, setImgIndex] = useState(0);
  const [currentVariant, setCurrentVariant] = useState(null);
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
  const { name, category, basePrice, description, variants, more_images } =
    plant || {};
  const images = [
    ...(variants?.map((item) => item?.img) || []),
    ...(more_images || []),
  ];
  console.log(imgIndex);

  const handleSetImgIndex = (index) => {
    setImgIndex(index);
  };

  return (
    <div className="bg-slate-50 p-8">
      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="flex w-[50%] flex-col-reverse items-center justify-between lg:flex-row lg:items-start">
          {/* slider buttons */}
          <div className="flex flex-row gap-2 *:cursor-pointer lg:flex-col lg:px-2">
            {images?.map((img, index) => (
              <button
                onClick={() => handleSetImgIndex(index)}
                className="focus:border focus:border-green-900"
              >
                <img
                  className="object-cover lg:h-[170px]"
                  src={img}
                  height={100}
                  width={100}
                />
              </button>
            ))}
          </div>
          {/* img slider */}
          <div>
            <div className="relative flex h-[600px] w-full overflow-hidden md:h-[700px] lg:w-[400px]">
              {images?.map((img, index) => (
                <div
                  style={{ translate: `${-100 * imgIndex}%` }}
                  key={index}
                  className={`min-h-full min-w-full bg-white transition-all duration-300 lg:min-w-[400px]`}
                >
                  <img
                    src={img}
                    className="h-full w-full translate-x-0 object-cover sm:object-contain lg:object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-[50%] space-y-8">
          <p className="w-fit rounded-full bg-green-700 px-4 text-white">
            {category}
          </p>
          <h3 className="text-7xl font-bold">{name}</h3>

          {/* review section */}
          <div>⭐⭐⭐⭐⭐ 0 Reviews</div>
          <p className="text-3xl font-bold">${basePrice}</p>
          <p className="text-gray-700">{description}</p>
          <div className="space-y-3">
            <h4 className="text-xl font-bold text-gray-800">Variants:</h4>
            <div className="flex gap-2">
              {variants.map((variant, index) => (
                <button
                  className="w-full rounded-full bg-green-900 py-3 text-white active:bg-transparent"
                  key={index}
                >
                  {variant.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
