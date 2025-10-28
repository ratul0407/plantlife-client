import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Link, useParams } from "react-router";
import { useState, useEffect, useRef, useLayoutEffect, memo } from "react";
import { PiMinus, PiPlus } from "react-icons/pi";
import { IoChevronUp } from "react-icons/io5";
import { FiGift, FiHeadphones, FiShield, FiTruck } from "react-icons/fi";
import { useGetSinglePlantQuery } from "@/redux/features/plant.api";
import PlantDetailsSkeleton from "@/components/PlantDetailsSkeleton";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAppDispatch } from "@/redux/hooks";

import MobileSlider from "@/components/MobileSlider";
import WishlistHeart from "@/features/wishlist/components/WishlistHeart";

import RecentlyViewed from "@/components/RecentlyViewed";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { useAuth } from "@/hooks/useAuth";
import { addToCart } from "@/features/cart/slices/cartSlice";
import { useAddToCartMutation } from "@/features/cart/api/cart.api";
import YouMayAlsoLike from "@/components/YouMayAlsoLike";
import { Variant } from "@/types/plant";

const features = [
  {
    icon: <FiTruck className="mt-1.5 h-6 w-6 text-green-900" />,
    title: "Enjoy Fast Delivery",
    description:
      "Your plants will arrive in happy, healthy condition—guaranteed. If not, we replace them for free. Learn more about our guarantee.",
  },
  {
    icon: <FiShield className="mt-1.5 h-6 w-6 text-green-900" />,
    title: "Quality Guarantee",
    description:
      "We offer free standard shipping on all orders $79+. Orders under $79 ship for a flat $15 fee. View our full shipping policy.",
  },
  {
    icon: <FiGift className="mt-1.5 h-6 w-6 text-green-900" />,
    title: "Gift Packaging For your love",
    description:
      "The Sill offers a variety of plant care workshops for beginners, experts, & everyone in between! No questions too small or too silly! View upcoming schedule.",
  },
  {
    icon: <FiHeadphones className="mt-1.5 h-6 w-6 text-green-900" />,
    title: "Plant Experts to help you",
    description:
      "Chat directly via video with a knowledgeable houseplant expert from The Sill team about plant-specific care, reporting tips and tricks, pest identification, and more. Schedule an appointment today.",
  },
];

const PlantDetails = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { user } = useAuth();
  const { data, isSuccess, isLoading } = useGetSinglePlantQuery({ id });
  const [addToDatabaseCart] = useAddToCartMutation();
  const plant = data?.data;

  const containerRef = useRef(null);
  const leftRef = useRef(null);
  const scrollAbleInfo = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    if (!isSuccess || !containerRef.current || !leftRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const st = ScrollTrigger.create({
      trigger: leftRef.current,
      start: "top 134px",
      end: "bottom bottom",
      pinSpacing: false,
      pin: leftRef.current,
    });

    return () => st.kill();
  }, [isSuccess, plant]);

  // state
  const [imgIndex, setImgIndex] = useState(0);
  const [currentVariant, setCurrentVariant] = useState<Variant | null>(null);
  const [quantity, setQuantity] = useState(1);

  // refs
  const thumbnailsRef = useRef(null);

  // destructure plant
  const { name, _id, category, description, variants, additionalImages } =
    plant || {};

  // images = all variants + additional
  const images = [
    ...(variants?.map((item: Variant) => item?.image) || []),
    ...(additionalImages || []),
  ];

  // set default variant
  useEffect(() => {
    if (plant?.variants?.length) {
      setCurrentVariant(plant.variants[0]);
    }
  }, [plant]);

  // prevent stock > currentVariant.stock
  useEffect(() => {
    if (quantity > (currentVariant?.stock ?? 0)) {
      setQuantity(currentVariant?.stock ?? 1);
    }
  }, [currentVariant]);

  // scroll thumbnail into view
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

  // handlers
  const handleSetImgIndex = (index: number) => {
    setImgIndex(index);
  };

  const goToPreviousImg = () => {
    setImgIndex((index) => (index > 0 ? index - 1 : images.length - 1));
  };

  const goToNextImg = () => {
    setImgIndex((index) => (index === images.length - 1 ? 0 : index + 1));
  };

  const handleIncrementStock = () => {
    if (quantity >= (currentVariant?.stock ?? 0)) return;
    setQuantity(quantity + 1);
  };

  const handleDecrementStock = () => {
    if (quantity <= 1) return;
    setQuantity(quantity - 1);
  };

  //handle add to cart

  const handleAddToCart = async () => {
    const item = {
      plantId: plant?._id,
      quantity,
      sku: currentVariant?.sku as string,
    };
    dispatch(addToCart(item));
    toast.success("Plant added to cart");
    if (user) {
      try {
        const res = await addToDatabaseCart(item).unwrap();
        if (res?.success) {
        }
      } catch (error: any) {
        if (error?.data) {
          toast.error(error?.data?.message || "Failed to add");
        }
      }
    }
  };
  if (isLoading) return <PlantDetailsSkeleton />;
  return (
    <div className="p-4 2xl:container 2xl:mx-auto">
      <div ref={containerRef} className="flex flex-col gap-4 lg:flex-row">
        {/* images + thumbnails */}
        <div
          ref={leftRef}
          className="hidden w-full flex-col-reverse items-center md:flex lg:w-[50%] lg:flex-row lg:items-start lg:gap-4 2xl:justify-start"
        >
          {/* thumbnails */}
          <div className="relative min-w-full lg:flex lg:min-w-auto lg:flex-col">
            <button
              onClick={goToPreviousImg}
              className="absolute top-2 -left-4 flex cursor-pointer justify-center transition-all duration-300 hover:bg-slate-100 active:scale-90 sm:top-10 sm:bg-slate-50 lg:static"
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
                  onMouseEnter={() => handleSetImgIndex(index)}
                  className={`${imgIndex === index ? "brightness-80" : ""}`}
                >
                  <img
                    className="object-cover lg:size-20"
                    src={img}
                    height={100}
                    width={100}
                  />
                </button>
              ))}
            </div>
            <button
              onClick={goToNextImg}
              className="absolute top-2 -right-4 flex cursor-pointer justify-center transition-all duration-300 hover:bg-slate-100 active:scale-90 sm:top-10 sm:bg-slate-50 lg:static"
            >
              <IoChevronUp className="h-10 w-10 -rotate-270 lg:rotate-180" />
            </button>
          </div>

          {/* main image slider */}
          <div className="relative flex h-[350px] w-full overflow-hidden md:h-[600px] lg:h-[700px] lg:w-full">
            {images?.map((img, index) => (
              <div
                style={{ translate: `${-100 * imgIndex}%` }}
                key={index}
                className="min-h-full min-w-full bg-white pl-0.5 transition-all duration-300 lg:min-w-full"
              >
                <img
                  src={img}
                  className="h-full w-full object-cover sm:object-contain lg:object-cover"
                />
              </div>
            ))}

            <div className="absolute right-5 bottom-5 z-50 flex h-10 w-20 rounded-full bg-white">
              <Button
                onClick={goToPreviousImg}
                variant={"outline"}
                className="h-10 rounded-full border-none"
              >
                <IoChevronUp className="h-10 w-10 rotate-270" />
              </Button>
              <Button
                onClick={goToNextImg}
                variant={"outline"}
                className="h-10 rounded-full border-none"
              >
                <IoChevronUp className="h-10 w-10 rotate-90" />
              </Button>
            </div>
          </div>
        </div>
        <div className="block md:hidden">
          <MobileSlider images={images} />
        </div>

        {/* plant details */}
        <div className="space-y-12 lg:w-[50%]">
          <div className="flex w-full flex-col justify-between gap-12">
            <div className="space-y-4">
              <div>
                <h3 className="text-3xl font-bold">{name}</h3>
                <Link
                  to={`/plants?category=${category}`}
                  className="w-fit cursor-pointer rounded-full font-bold text-gray-600"
                >
                  {category
                    ?.toLowerCase()
                    .split("_")
                    .map(
                      (word: string) =>
                        word.charAt(0).toUpperCase() + word.slice(1),
                    )
                    .join(" ")}{" "}
                  plants
                </Link>
              </div>

              {/* price  */}
              <p className="text-3xl font-bold text-green-950">
                <span>${currentVariant?.price}</span>
              </p>
            </div>

            {/* description */}
            <p className="text-lg leading-7 text-gray-700">{description}</p>

            {/* variants */}
            <div className="space-y-4">
              <h4 className="text-xl font-bold text-gray-800">Variants:</h4>
              <div className="flex gap-2">
                {variants?.map((variant: Variant, index: number) => (
                  <div key={index} className="w-full">
                    <input
                      type="radio"
                      id={`variant-${index}`}
                      name="variant"
                      defaultChecked={index === 0}
                      className="peer hidden"
                      onChange={() => {
                        handleSetImgIndex(index);
                        setCurrentVariant(variant);
                        setQuantity(1); // reset quantity
                      }}
                    />
                    <label
                      htmlFor={`variant-${index}`}
                      className="inline-block w-full cursor-pointer rounded-full border-2 border-slate-200 bg-slate-200 py-2 text-center font-bold select-none peer-checked:border-green-300 peer-checked:bg-green-300 peer-checked:text-green-950"
                    >
                      {variant.variantName}
                    </label>
                  </div>
                ))}
              </div>

              {/* cart & wishlist */}
              <div className="flex items-center gap-2">
                <div className="flex w-1/3 items-center justify-between rounded-full border border-slate-300 text-center text-sm sm:*:text-xl lg:w-1/4">
                  <Button
                    variant={"ghost"}
                    onClick={handleDecrementStock}
                    className="cursor-pointer rounded-r-full py-2.5 pr-4 pl-4 hover:bg-slate-200"
                  >
                    <PiMinus />
                  </Button>

                  <span className="text-gray-800">{quantity}</span>
                  <Button
                    variant={"ghost"}
                    onClick={handleIncrementStock}
                    className="cursor-pointer rounded-l-full py-2.5 pr-4 pl-4 hover:bg-slate-200"
                  >
                    <PiPlus />
                  </Button>
                </div>
                <div className="w-[65%] text-center">
                  <Button
                    onClick={handleAddToCart}
                    variant={"ghost"}
                    className="w-full cursor-pointer rounded-full bg-green-700 py-2.5 font-medium text-white uppercase transition-all duration-300 hover:bg-green-600"
                  >
                    Add to cart
                  </Button>
                </div>
                <button className="cursor-pointer rounded-full border border-slate-200 p-1">
                  <WishlistHeart plant={plant} />
                </button>
              </div>
            </div>
          </div>
          <div ref={scrollAbleInfo}>
            <div className="space-y-12">
              <h3 className="font-metal text-2xl text-green-900 italic md:text-3xl lg:text-4xl">
                Why choose PlantLife?
              </h3>
              <div className="space-y-12">
                {features.map((feature, index) => (
                  <div key={index} className="flex flex-row items-start gap-3">
                    <div>{feature.icon}</div>
                    <div className="">
                      <h3 className="font-metal text-xl text-green-900 italic sm:text-2xl">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-12 py-12">
        <YouMayAlsoLike />
        {/* <RecentlyViewed /> */}
      </div>
    </div>
  );
};

export default memo(PlantDetails);
