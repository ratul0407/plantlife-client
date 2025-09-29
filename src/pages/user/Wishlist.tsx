import AddToCartModal from "@/components/AddToCartModal";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAddToCartMutation } from "@/redux/features/cart/cart.api";
import { useGetMeQuery } from "@/redux/features/user.api";
import { deleteFromWishlist } from "@/redux/features/wishlist/wishlistSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { X } from "lucide-react";
import { Link } from "react-router";

import { toast } from "sonner";

const Wishlist = () => {
  // const { data } = useMyWishlistQuery(undefined);
  const { data: userData } = useGetMeQuery(undefined);
  const [addToCart, { isLoading: addToCartLoading }] = useAddToCartMutation();
  const wishlist = useAppSelector((state) => state.wishlist.items);
  console.log(wishlist);
  const dispatch = useAppDispatch();

  // const [removeFromWishlist, { isLoading }] =
  // useRemovePlantFromWishlistMutation();

  const handleRemoveFromWishlist = async (id: string) => {
    if (!userData) {
      dispatch(deleteFromWishlist(id));
      toast.success("Removed from wishlist");
      return;
    }
    // try {
    //   const res = await removeFromWishlist({ plant: _id }).unwrap();/
    //   if (res.success) {
    //     toast.success(res.message);
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
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
  // const wishlist = data?.data?.[0]?.wishlist;
  // console.log(data?.data?.[0]?.wishlist);
  // console.log(data?.data ? "what" : "the hell");
  return (
    <div className="font-roboto min-h-screen space-y-12">
      <h1 className="bg-green-700 py-6 text-center text-2xl font-bold text-white lg:text-5xl">
        Your Wishlist
      </h1>
      <div>
        {wishlist.length ? (
          <div className="mx-auto max-w-4xl">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead></TableHead>
                  <TableHead>Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {wishlist?.map((item) => (
                  <TableRow>
                    <TableCell>
                      <Button
                        variant={"ghost"}
                        onClick={() => handleRemoveFromWishlist(item.plantId)}
                      >
                        <X />
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Link to={`/plants/${item.plantId}`}>
                        <img className="size-32 object-cover" src={item?.img} />
                      </Link>
                    </TableCell>
                    <TableCell>
                      <h3 className="font-metal text-3xl">{item?.name}</h3>
                    </TableCell>
                    <TableCell>
                      <h3 className="font-metal text-xl italic">
                        {item?.category.split("_").join(" ")}
                      </h3>
                    </TableCell>
                    <TableCell>
                      <h3 className="sm:text-lg lg:text-xl">${item?.price}</h3>
                    </TableCell>
                    <TableCell>
                      <AddToCartModal plant={item}>
                        <Button>Add to cart</Button>
                      </AddToCartModal>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-12">
            <h3 className="font-metal text-gray-300 italic sm:text-xl md:text-2xl lg:text-4xl xl:text-6xl">
              Your Wishlist is Empty
            </h3>
            <Link to="/plants">
              <Button>Add plants to wishlist</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
