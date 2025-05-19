import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router";
import "../css/plantDetails.css";
import { useState } from "react";
import { PiMinus, PiPlus } from "react-icons/pi";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
export const PlantDetails = () => {
  const [imgIndex, setImgIndex] = useState(0);
  const [currentVariant, setCurrentVariant] = useState(null);
  const [addStock, setAddStock] = useState(1);
  const [addToWhishList, setAddToWishList] = useState(true);
  const { id } = useParams();
  console.log(id);
  const { data: plant = {}, isLoading } = useQuery({
    queryKey: ["plant", id],
    queryFn: async () => {
      const { data } = await axios(
        `${import.meta.env.VITE_API_URL}/plant/${id}`,
      );
      return data;
    },
  });
  const { name, category, basePrice, description, variants, more_images } =
    plant || {};
  const images = [
    ...(variants?.map((item) => item?.img) || []),
    ...(more_images || []),
  ];
  console.log(plant);

  const handleSetImgIndex = (index) => {
    setImgIndex(index);
  };
  const handleIncrementStock = () => {
    if (addStock >= currentVariant.stock) return;
    setAddStock(addStock + 1);
  };

  const handleDecrementStock = () => {
    if (addStock <= 1) return;
    setAddStock(addStock - 1);
  };
  return (
    <div className="pt-10">
      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="flex w-full flex-col-reverse items-center justify-between lg:w-[50%] lg:flex-row lg:items-start">
          {/* slider buttons */}
          <div className="flex flex-row gap-2 *:cursor-pointer lg:flex-col lg:px-2">
            {images?.map((img, index) => (
              <button
                key={index}
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
        <div className="w-full space-y-8 lg:w-[50%]">
          <p className="w-fit rounded-full bg-green-700 px-4 text-white">
            {category}
          </p>
          <h3 className="text-7xl font-bold">{name}</h3>

          {/* review section */}
          <div>⭐⭐⭐⭐⭐ 0 Reviews</div>
          {/* price and stock */}
          <p className="text-3xl font-bold text-green-950">
            <span> ${currentVariant ? currentVariant.price : basePrice}</span>
            <span className="text-base">
              (
              {currentVariant
                ? currentVariant.stock
                : variants?.find((item) => (item.id = plant.defaultVariant))
                    .stock}
              ) in stock
            </span>
          </p>
          {/* description */}
          <p className="text-gray-700">{description}</p>
          {/* variants */}
          <div className="space-y-4">
            <h4 className="text-xl font-bold text-gray-800">Variants:</h4>
            <div className="flex gap-2">
              {variants?.map((variant, index) => (
                <div key={index} className="w-full">
                  <input
                    type="radio"
                    id={`variant-${index}`}
                    defaultChecked={index == 0}
                    name="variant"
                    className="peer hidden"
                  />
                  <label
                    onClick={() => {
                      handleSetImgIndex(index);
                      setCurrentVariant(variant);
                    }}
                    for={`variant-${index}`}
                    className="inline-block w-full cursor-pointer rounded-full border-2 border-slate-200 bg-slate-200 py-2 text-center font-bold peer-checked:border-2 peer-checked:border-green-300 peer-checked:bg-green-300 peer-checked:text-green-950"
                  >
                    {variant.name}
                  </label>
                </div>
              ))}
            </div>
            {/* add to cart or whishlist */}
            <div className="flex items-center gap-2">
              <div className="flex w-1/4 items-center justify-between rounded-full border border-slate-300 text-center *:text-xl">
                <button
                  onClick={handleIncrementStock}
                  className="cursor-pointer rounded-l-full py-2 pr-4 pl-4 hover:bg-slate-200"
                >
                  <PiPlus />
                </button>
                <span className="text-gray-800">{addStock}</span>
                <button
                  onClick={handleDecrementStock}
                  className="cursor-pointer rounded-r-full py-2 pr-4 pl-4 hover:bg-slate-200"
                >
                  <PiMinus />
                </button>
              </div>
              <div className="w-[65%] text-center">
                <button className="w-full cursor-pointer rounded-full bg-green-700 py-2 font-medium text-white uppercase transition-all duration-300 hover:bg-green-600">
                  Add to cart
                </button>
              </div>
              <button
                onClick={() => setAddToWishList(!addToWhishList)}
                className="cursor-pointer rounded-full border border-slate-200 p-1"
              >
                {addToWhishList ? (
                  <IoHeart fill={"#c1121f"} size={30} />
                ) : (
                  <IoHeartOutline size={30} />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
