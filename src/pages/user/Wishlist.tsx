import AddToCartModal from "@/components/AddToCartModal";
import { Button } from "@/components/ui/button";
import {
  useGetMyWishlistQuery,
  useRemovePlantFromWishlistMutation,
} from "@/redux/features/plant.api";
import { useAddToCartMutation } from "@/redux/features/user.api";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

const Wishlist = () => {
  const { data } = useGetMyWishlistQuery(undefined);
  const [addToCart, { isLoading: addToCartLoading }] = useAddToCartMutation();
  const [removeFromWishlist, { isLoading }] =
    useRemovePlantFromWishlistMutation();
  const handleRemoveFromWishlist = async (id: string) => {
    console.log(id);
    try {
      const res = await removeFromWishlist({ id: id }).unwrap();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToCart = async (plant: string) => {
    try {
      const res = await addToCart({ plant: plant, quantity: 1 }).unwrap();
      if (res.success) {
        toast.success("Product added to cart!");
        await handleRemoveFromWishlist(plant);
      }
    } catch (error) {}
  };
  const wishlist = data?.data?.[0]?.wishlist;
  console.log(data?.data?.[0]?.wishlist);
  console.log(data?.data ? "what" : "the hell");
  return (
    <div className="font-roboto space-y-12">
      <h1 className="text-2xl font-bold">My Wishlist</h1>
      {data?.data?.length ? (
        <div className="flex flex-col gap-8">
          {wishlist?.map((item: any, index: number) => (
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
                <AddToCartModal plant={item?.plantDetails}>
                  <Button
                    disabled={addToCartLoading}
                    onClick={() => handleAddToCart(item?.plantDetails?._id)}
                    className="mt-34 max-w-fit"
                  >
                    Add To Cart
                  </Button>
                </AddToCartModal>
              </div>
              <Button
                disabled={isLoading}
                variant={"outline"}
                onClick={() =>
                  handleRemoveFromWishlist(item?.plantDetails?._id)
                }
                className="absolute right-10"
              >
                <Trash2 className="text-red-500" size={20} />
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <div className="font-roboto flex min-h-[70vh] items-center justify-center text-5xl text-gray-300">
          <p>Your Wishlist is Empty</p>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
