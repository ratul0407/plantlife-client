import { Button } from "@/components/ui/button";
import {
  useGetMyWishlistQuery,
  useRemovePlantFromWishlistMutation,
} from "@/redux/features/plant.api";
import { Delete, Trash, Trash2 } from "lucide-react";

const Wishlist = () => {
  const { data } = useGetMyWishlistQuery(undefined);
  const [removeFromWishlist, { isLoading }] =
    useRemovePlantFromWishlistMutation();
  const handleRemoveFromWishlist = async (id) => {
    console.log(id);
    try {
      const res = await removeFromWishlist({ id: id }).unwrap();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  const wishlist = data?.data?.[0]?.wishlist;
  console.log(data?.data?.[0]?.wishlist);
  return (
    <div className="font-roboto space-y-12">
      <h1 className="text-2xl font-bold">My Wishlist</h1>
      <div className="flex flex-col gap-8">
        {wishlist?.map((item, index: number) => (
          // console.log(item?.plantDetails?.variants?.[0]?.image),
          <div key={index} className="relative flex items-start gap-8">
            <div>
              <img
                className="size-60 rounded-xl border border-gray-50 object-center"
                src={item?.plantDetails?.variants?.[0]?.image}
              />
            </div>

            <div className="min-h-full">
              <div className="font-metal min-h-full">
                <h3 className="text-3xl font-bold text-green-800 italic">
                  {item?.plantDetails?.name}
                </h3>
                <h3 className="font-metal text-2xl">
                  ${item?.plantDetails?.variants?.[0]?.price}
                </h3>
              </div>
              <Button className="mt-34">Add To Cart</Button>
            </div>
            <Button
              disabled={isLoading}
              onClick={() => handleRemoveFromWishlist(item?.plantDetails?._id)}
              className="absolute right-10"
            >
              <Trash2 className="text-red-500" size={20} />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
