import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router";
import { useState } from "react";
import { PiMinus, PiPlus } from "react-icons/pi";
import { IoChevronUp, IoHeart, IoHeartOutline } from "react-icons/io5";
import { FiGift, FiHeadphones, FiShield, FiTruck } from "react-icons/fi";
import { useEffect } from "react";
import { useRef } from "react";
import { Reviews } from "@/components/AllPlants/Reviews";

const features = [
  {
    icon: <FiTruck className="h-6 w-6" />,
    title: "Enjoy Fast Delivery",
    // description: "Get your plants within 2-3 business days",
  },
  {
    icon: <FiShield className="h-6 w-6" />,
    title: "Quality Guarantee",
    // description: "30-day health guarantee for all plants",
  },
  {
    icon: <FiGift className="h-6 w-6" />,
    title: "Gift Packaging For your love",
    // description: "Perfectly packaged for special occasions",
  },
  {
    icon: <FiHeadphones className="h-6 w-6" />,
    title: "Plant Experts to help you",
    // description: "24/7 support from our botanists",
  },
];
export const PlantDetails = () => {
  const [imgIndex, setImgIndex] = useState(0);
  const [currentVariant, setCurrentVariant] = useState(null);
  const [addStock, setAddStock] = useState(1);
  const [addToWhishList, setAddToWishList] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const { id } = useParams();
  const { data: plant = {}, isLoading } = useQuery({
    queryKey: ["plant", id],
    queryFn: async () => {
      const { data } = await axios(
        `${import.meta.env.VITE_API_URL}/plant/${id}`,
      );
      if (data) {
        setCurrentVariant(
          data.variants.find((item) => item.id === data.defaultVariant),
        );
        setImgIndex(+data.defaultVariant - 1);
      }
      return data;
    },
  });

  useEffect(() => {
    if (addStock > currentVariant?.stock) {
      setAddStock(currentVariant?.stock);
    }
  }, [currentVariant]);
  const thumbnailsRef = useRef(null);

  const { name, category, basePrice, description, variants, more_images } =
    plant || {};
  const images = [
    ...(variants?.map((item) => item?.img) || []),
    ...(more_images || []),
  ];

  useEffect(() => {
    if (thumbnailsRef.current && images?.length) {
      const activeThumb = thumbnailsRef.current.children[imgIndex];
      if (activeThumb) {
        const container = thumbnailsRef.current;
        const thumbPos = activeThumb.offsetTop;
        const thumbHeight = activeThumb.offsetHeight;
        const containerHeight = container.offsetHeight;

        container.scrollTo({
          top: thumbPos - containerHeight / 2 + thumbHeight / 2,
          behavior: "smooth",
        });
      }
    }
  }, [imgIndex, images]);

  const handleSetImgIndex = (index) => {
    setImgIndex(index);
  };

  const goToPreviousImg = () => {
    setImgIndex((index) => {
      console.log(index);
      if (index > 0) {
        return (index -= 1);
      } else {
        setImgIndex(images.length - 1);
      }
    });
  };

  const goToNextImg = () => {
    setImgIndex((index) => {
      if (index == images.length - 1) {
        return 0;
      } else {
        return (index += 1);
      }
    });
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
    <div className="pt-10 2xl:container 2xl:mx-auto">
      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="flex w-full flex-col-reverse items-center lg:w-[50%] lg:flex-row lg:items-start 2xl:justify-start">
          {/* slider buttons */}
          <div className="relative min-w-full lg:flex lg:min-w-auto lg:flex-col">
            <button
              onClick={goToPreviousImg}
              className="absolute top-2 -left-4 flex rotate-0 cursor-pointer justify-center transition-all duration-300 hover:bg-slate-100 active:scale-90 sm:top-10 sm:bg-slate-50 lg:static lg:rotate-0"
            >
              <IoChevronUp className="h-10 w-10 -rotate-90 lg:rotate-0" />
            </button>
            <div
              ref={thumbnailsRef}
              className="flex min-w-full flex-row justify-center gap-2 *:cursor-pointer lg:max-h-[700px] lg:min-w-auto lg:flex-col lg:justify-start lg:overflow-y-auto lg:py-2"
              style={{ scrollbarWidth: "none" }}
            >
              {images?.map((img, index) => (
                <button
                  key={index}
                  onClick={() => handleSetImgIndex(index)}
                  className={`${imgIndex === index ? "border-2 border-slate-600" : ""}`}
                >
                  <img
                    className="object-cover lg:h-[180px]"
                    src={img}
                    height={100}
                    width={100}
                  />
                </button>
              ))}
            </div>
            <button
              onClick={goToNextImg}
              className="absolute top-2 -right-4 flex -rotate-90 cursor-pointer justify-center transition-all duration-300 hover:bg-slate-100 active:scale-90 sm:top-10 sm:bg-slate-50 lg:static lg:rotate-0"
            >
              <IoChevronUp className="h-10 w-10 rotate-180" />
            </button>
          </div>
          {/* img slider */}

          <div
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
            className="relative flex h-[350px] w-full overflow-hidden md:h-[600px] lg:h-[700px] lg:w-full"
          >
            <button
              onClick={goToPreviousImg}
              className={`absolute left-0 z-40 h-full w-10 cursor-pointer bg-white/20 transition-all duration-300 md:w-20 ${showControls ? "opacity-100" : "opacity-0"}`}
            >
              <IoChevronUp className="h-10 w-10 -rotate-90" />
            </button>

            {images?.map((img, index) => (
              <div
                style={{ translate: `${-100 * imgIndex}%` }}
                key={index}
                className={`min-h-full min-w-full bg-white pl-0.5 transition-all duration-300 lg:min-w-full`}
              >
                <img
                  src={img}
                  className="h-full w-full translate-x-0 object-cover sm:object-contain lg:object-cover 2xl:object-cover"
                />
              </div>
            ))}
            <button
              onClick={goToNextImg}
              className={`absolute right-0 z-40 h-full w-10 cursor-pointer bg-white/20 transition-all duration-300 md:w-20 ${showControls ? "opacity-100" : "opacity-0"}`}
            >
              <IoChevronUp className="h-10 w-10 rotate-90" />
            </button>
          </div>
        </div>
        {/* plant text details */}
        <div className="flex w-full flex-col justify-around gap-7 lg:w-[50%]">
          <p className="w-fit rounded-full bg-green-700 px-4 text-white">
            {category} plants
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
                : variants?.find((item) => item.id === plant.defaultVariant)
                    .stock}
              ) in stock
            </span>
          </p>
          {/* description */}
          <p className="text-gray-700">{description}</p>
          <div className="space-y-4">
            {/* variants */}
            <h4 className="text-xl font-bold text-gray-800">Variants:</h4>
            <div className="flex gap-2">
              {variants?.map((variant, index) => (
                <div key={index} className="w-full">
                  <input
                    type="radio"
                    id={`variant-${index}`}
                    name="variant"
                    defaultChecked={+plant.defaultVariant - 1 === index}
                    className="peer hidden"
                    onChange={() => {
                      handleSetImgIndex(index);
                      setCurrentVariant(variant);
                    }}
                  />
                  <label
                    tabIndex={0}
                    htmlFor={`variant-${index}`}
                    onClick={() => handleSetImgIndex(index)}
                    className="inline-block w-full cursor-pointer rounded-full border-2 border-slate-200 bg-slate-200 py-2 text-center font-bold select-none peer-checked:border-2 peer-checked:border-green-300 peer-checked:bg-green-300 peer-checked:text-green-950"
                  >
                    {variant.name}
                  </label>
                </div>
              ))}
            </div>
            {/* add to cart or whishlist */}
            <div className="flex items-center gap-2">
              <div className="flex w-1/3 items-center justify-between rounded-full border border-slate-300 text-center text-sm sm:*:text-xl lg:w-1/4">
                <button
                  onClick={handleIncrementStock}
                  className="cursor-pointer rounded-l-full py-2.5 pr-4 pl-4 hover:bg-slate-200"
                >
                  <PiPlus />
                </button>
                <span className="text-gray-800">{addStock}</span>
                <button
                  onClick={handleDecrementStock}
                  className="cursor-pointer rounded-r-full py-2.5 pr-4 pl-4 hover:bg-slate-200"
                >
                  <PiMinus />
                </button>
              </div>
              <div className="w-[65%] text-center">
                <button className="w-full cursor-pointer rounded-full bg-green-700 py-2.5 font-medium text-white uppercase transition-all duration-300 hover:bg-green-600">
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
          {/* features section */}
          <div className="grid grid-cols-2 gap-6 rounded-xl bg-green-50/70 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center transition-all hover:bg-green-50"
              >
                <div className="rounded-full bg-green-100 p-3 text-green-600">
                  {feature.icon}
                </div>
                <h3 className="mb-1 font-semibold text-gray-800">
                  {feature.title}
                </h3>
              </div>
            ))}
          </div>
          <Reviews />
        </div>
      </div>
    </div>
  );
};
