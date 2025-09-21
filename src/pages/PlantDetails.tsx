import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { useLocation, useNavigate, useParams } from "react-router";
import { useState, useEffect, useRef } from "react";
import { PiMinus, PiPlus } from "react-icons/pi";
import { IoChevronUp, IoHeart, IoHeartOutline } from "react-icons/io5";
import { FiGift, FiHeadphones, FiShield, FiTruck } from "react-icons/fi";
import { Reviews } from "@/components/AllPlants/Reviews";
import { useGetSinglePlantQuery } from "@/redux/features/plant.api";
import PlantDetailsSkeleton from "@/components/PlantDetailsSkeleton";
import { Button } from "@/components/ui/button";
import { useGetMeQuery } from "@/redux/features/user.api";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { openCart } from "@/redux/features/cart/cartSlice";
import {
  useAddToWishlistMutation,
  useRemovePlantFromWishlistMutation,
} from "@/redux/features/wishlist/wishlist.api";
import { useAddToCartMutation } from "@/redux/features/cart/cart.api";
import {
  addToReduxWishlist,
  removeFromReduxWishlist,
} from "@/redux/features/wishlist/wishlistSlice";
import { getLocalWishlist } from "@/utils/wishlist";

const features = [
  {
    icon: <FiTruck className="h-6 w-6" />,
    title: "Enjoy Fast Delivery",
  },
  {
    icon: <FiShield className="h-6 w-6" />,
    title: "Quality Guarantee",
  },
  {
    icon: <FiGift className="h-6 w-6" />,
    title: "Gift Packaging For your love",
  },
  {
    icon: <FiHeadphones className="h-6 w-6" />,
    title: "Plant Experts to help you",
  },
];

export const PlantDetails = () => {
  // get params
  const { id } = useParams();
  const { data: userData } = useGetMeQuery(undefined);

  const dispatch = useAppDispatch();
  const wishlist = useAppSelector((state) => state.wishlist.items);

  //get plant from db
  const { data, isLoading } = useGetSinglePlantQuery({ id });
  const [addToWishList] = useAddToWishlistMutation();
  const [removeFromWishlist] = useRemovePlantFromWishlistMutation();
  const plant = data?.data;
  let inWishlist;
  if (userData) {
    inWishlist = wishlist.includes(plant?._id);
  } else {
    const local = getLocalWishlist();
    inWishlist = local.includes(plant?._id);
  }
  const [addToCart] = useAddToCartMutation();
  // state
  const [imgIndex, setImgIndex] = useState(0);
  const [currentVariant, setCurrentVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showControls, setShowControls] = useState(false);
  console.log(currentVariant);
  // refs
  const thumbnailsRef = useRef(null);

  // destructure plant
  const { name, _id, category, description, variants, additionalImages } =
    plant || {};

  // images = all variants + additional
  const images = [
    ...(variants?.map((item) => item?.image) || []),
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
  const handleSetImgIndex = (index) => {
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
    try {
      const res = await addToCart({
        plant: plant?._id,
        sku: currentVariant?.sku,
        img: currentVariant?.image,
        quantity: quantity,
        price: currentVariant?.price,
        stock: currentVariant?.stock,
        name: currentVariant?.variantName,
      }).unwrap();
      if (res.success) {
        toast.success("Plant added to cart");
        dispatch(openCart(true));
      }
      console.log(res);
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message);
    }
  };

  const handleAddToWishlist = async () => {
    if (!userData) {
      dispatch(addToReduxWishlist(_id));
      toast.success("Added to wishlist");
      return;
    }
    try {
      const res = await addToWishList({ plant: _id }).unwrap();
      if (res.success) {
        toast.success("Added to wishlist");
        dispatch(addToReduxWishlist(_id)); // keep redux in sync with server
      }
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  };

  const handleRemoveFromWishlist = async () => {
    if (!userData) {
      dispatch(removeFromReduxWishlist(_id));
      toast.success("Removed from wishlist");
      return;
    }
    try {
      const res = await removeFromWishlist({ plant: _id }).unwrap();
      if (res.success) {
        toast.success(res.message);
        dispatch(removeFromReduxWishlist(_id)); // keep redux in sync
      }
    } catch (error) {
      console.log(error);
    }
  };
  if (isLoading) return <PlantDetailsSkeleton />;

  return (
    <div className="pt-10 2xl:container 2xl:mx-auto">
      <div className="flex flex-col gap-4 lg:flex-row">
        {/* images + thumbnails */}
        <div className="flex w-full flex-col-reverse items-center lg:w-[50%] lg:flex-row lg:items-start lg:gap-4 2xl:justify-start">
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
                  className={`${imgIndex === index ? "border border-slate-400" : ""}`}
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
              <IoChevronUp className="h-10 w-10 rotate-180" />
            </button>
          </div>

          {/* main image slider */}
          <div
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
            className="relative flex h-[350px] w-full overflow-hidden md:h-[600px] lg:h-[700px] lg:w-full"
          >
            <button
              onClick={goToPreviousImg}
              className={`absolute left-0 z-40 h-full w-10 cursor-pointer bg-white/20 transition-all duration-300 md:w-20 ${
                showControls ? "opacity-100" : "opacity-0"
              }`}
            >
              <IoChevronUp className="h-10 w-10 -rotate-90" />
            </button>

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

            <button
              onClick={goToNextImg}
              className={`absolute right-0 z-40 h-full w-10 cursor-pointer bg-white/20 transition-all duration-300 md:w-20 ${
                showControls ? "opacity-100" : "opacity-0"
              }`}
            >
              <IoChevronUp className="h-10 w-10 rotate-90" />
            </button>
          </div>
        </div>

        {/* plant details */}
        <div className="flex w-full flex-col justify-around lg:w-[50%]">
          <div>
            <h3 className="text-3xl font-bold">{name}</h3>
            <p className="w-fit rounded-full font-bold text-gray-500">
              {category?.toLowerCase()} plants
            </p>

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
              {variants?.map((variant, index) => (
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
                {inWishlist ? (
                  <IoHeart
                    onClick={handleRemoveFromWishlist}
                    fill={"#c1121f"}
                    size={30}
                  />
                ) : (
                  <IoHeartOutline onClick={handleAddToWishlist} size={30} />
                )}
              </button>
            </div>
          </div>

          {/* features */}
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
