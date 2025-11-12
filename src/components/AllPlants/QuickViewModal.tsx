import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { PiMinus, PiPlus } from "react-icons/pi";
import { Plant, Variant } from "@/types/plant";
import { Link } from "react-router";
import WishlistHeart from "@/features/wishlist/components/WishlistHeart";
import { FiGift, FiHeadphones, FiShield, FiTruck } from "react-icons/fi";
import { IoChevronUp } from "react-icons/io5";
import { useCartActions } from "@/features/cart/actions/cartAction";
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
const QuickViewModal = ({
  children,
  plant,
}: {
  children: React.ReactNode;
  plant: Plant;
}) => {
  const { handleAddToCart } = useCartActions();
  const [imgIndex, setImgIndex] = useState(0);
  const [currentVariant, setCurrentVariant] = useState<Variant | null>(null);
  const [quantity, setQuantity] = useState(1);
  const images = [
    ...(plant?.variants?.map((item: Variant) => item?.image) || []),
  ];

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
  useEffect(() => {
    if (plant?.variants?.length) {
      setCurrentVariant(plant.variants[0]);
    }
  }, [plant]);
  const containerRef = useRef(null);
  const leftRef = useRef(null);
  const scrollAbleInfo = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    if (!plant || !containerRef.current || !leftRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const st = ScrollTrigger.create({
      trigger: leftRef.current,
      start: "top top",
      end: "bottom bottom",
      pinSpacing: false,
      pin: leftRef.current,
      markers: true,
      scroller: containerRef.current,
    });

    return () => st.kill();
  }, [plant]);

  return (
    <div>
      <Dialog>
        <DialogTrigger>{children}</DialogTrigger>
        <DialogContent
          ref={containerRef}
          className="scrollbar-hide h-[500px] min-w-4xl overflow-y-scroll p-6"
        >
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold">
              {plant?.name}
            </DialogTitle>
            <div className="flex gap-10">
              <div
                ref={leftRef}
                className="sticky top-0 hidden h-fit md:flex lg:w-[50%] lg:flex-row lg:items-start lg:gap-4 2xl:justify-start"
              >
                {/* main image slider */}
                <div className="relative flex w-full overflow-hidden object-contain lg:w-full">
                  {images?.map((img, index) => (
                    <div
                      style={{ translate: `${-100 * imgIndex}%` }}
                      key={index}
                      className="min-h-full min-w-full bg-white transition-all duration-300 lg:min-w-full"
                    >
                      <img
                        src={img}
                        className="size-96 w-full object-cover object-center"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-1/2 space-y-12">
                <div className="flex w-full flex-col justify-between gap-12">
                  <div className="space-y-4">
                    <div>
                      <Link
                        to={`/plants?category=${plant?.category}`}
                        className="w-fit cursor-pointer rounded-full font-bold text-gray-600"
                      >
                        {plant?.category
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
                  <p className="text-lg leading-7 text-gray-700">
                    {plant?.description}
                  </p>

                  {/* variants */}
                  <div className="space-y-4">
                    <h4 className="text-xl font-bold text-gray-800">
                      Variants:
                    </h4>
                    <div className="flex gap-2">
                      {plant?.variants?.map(
                        (variant: Variant, index: number) => (
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
                        ),
                      )}
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
                          onClick={() =>
                            handleAddToCart(
                              plant,
                              quantity,
                              currentVariant?.sku as string,
                            )
                          }
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
                <div>
                  <div ref={scrollAbleInfo} className="space-y-12">
                    <h3 className="font-metal text-2xl text-green-900 italic md:text-3xl lg:text-4xl">
                      Why choose PlantLife?
                    </h3>
                    <div className="space-y-12">
                      {features.map((feature, index) => (
                        <div
                          key={index}
                          className="flex flex-row items-start gap-3"
                        >
                          <div>{feature.icon}</div>
                          <div className="">
                            <h3 className="font-metal text-xl text-green-900 italic sm:text-2xl">
                              {feature.title}
                            </h3>
                            <p className="text-gray-600">
                              {feature.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default QuickViewModal;
