import AddToCartModal from "@/features/cart/components/AddToCartModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { WishlistSkeleton } from "@/features/wishlist/components/WishlistSkeleton";
import { useAuth } from "@/hooks/useAuth";
import { useAddToCartMutation } from "@/features/cart/api/cart.api";
import {
  useDeleteWishlistMutation,
  useLazyGetLocalWishlistQuery,
} from "@/features/wishlist/api/wishlist.api";
import { deleteFromWishlist } from "@/features/wishlist/slices/wishlistSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { X } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router";
import { toast } from "sonner";

const Wishlist = () => {
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const wishlist = useAppSelector((state) => state.wishlist.items);

  const [addToCart, { isLoading: addToCartLoading }] = useAddToCartMutation();
  const [getWishlist, { data: wishlistData, isLoading }] =
    useLazyGetLocalWishlistQuery();
  const [deleteWishlist] = useDeleteWishlistMutation();

  // ✅ Optimistic remove
  const handleRemoveFromWishlist = async (plantId: string) => {
    dispatch(deleteFromWishlist(plantId));
    toast.success("Removed from wishlist");

    if (user) {
      try {
        const res = await deleteWishlist({ plantId }).unwrap();
        if (res.success) {
          // ✅ refetch UI data
          getWishlist(
            wishlist.filter((i) => i.plantId !== plantId).map((i) => i.plantId),
          );
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to remove from wishlist");
      }
    }
  };

  const handleAddToCart = async (plantId: string) => {
    try {
      const res = await addToCart({ plant: plantId, quantity: 1 }).unwrap();
      if (res.success) {
        toast.success("Product added to cart!");
        await handleRemoveFromWishlist(plantId);
      }
    } catch (error) {
      toast.error("Failed to add to cart");
    }
  };

  // ✅ Only fetch wishlist data when:
  //    - page first loads OR
  //    - wishlistData is not yet loaded
  useEffect(() => {
    if (wishlist) {
      getWishlist(wishlist.map((item) => item.plantId));
    }
  }, [wishlistData, wishlist, getWishlist]);

  const showSkeleton = isLoading && !wishlistData;

  return (
    <div className="font-roboto min-h-screen space-y-12 bg-gray-100 md:bg-white">
      <h1 className="bg-green-700 py-6 text-center text-2xl font-bold text-white lg:text-5xl">
        Your Wishlist
      </h1>

      <div>
        {showSkeleton ? (
          <WishlistSkeleton />
        ) : wishlistData?.data?.length ? (
          <div className="mx-auto max-w-4xl">
            <div className="hidden md:block">
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
                  {wishlistData?.data?.map((item) => (
                    <TableRow key={item._id}>
                      <TableCell>
                        <Button
                          variant="ghost"
                          onClick={() => handleRemoveFromWishlist(item._id)}
                        >
                          <X />
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Link to={`/plants/${item._id}`}>
                          <img
                            className="size-32 object-cover"
                            src={item?.variants?.[0]?.image}
                            alt={item?.name}
                          />
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
                        <h3 className="sm:text-lg lg:text-xl">
                          ${item?.variants?.[0]?.price}
                        </h3>
                      </TableCell>
                      <TableCell>
                        <AddToCartModal plant={item}>
                          <Button disabled={addToCartLoading}>
                            Add to cart
                          </Button>
                        </AddToCartModal>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="space-y-4 md:hidden">
              {wishlistData?.data?.map((item) => (
                <div className="px-4" key={item?._id}>
                  <div className="flex gap-6 rounded-lg border border-gray-200 bg-gray-50 px-4 py-4">
                    <Link
                      to={`/plants/${item?._id}`}
                      className="border border-gray-200"
                    >
                      <img
                        src={item?.variants?.[0]?.image}
                        className="size-40 rounded-sm object-cover object-center"
                      />
                    </Link>
                    <div className="flex flex-col justify-around">
                      <h3 className="font-metal text-lg text-green-800 italic">
                        {item?.name}
                      </h3>
                      <p className="text-lg font-bold">
                        ${item?.variants?.[0]?.price}
                      </p>
                      <AddToCartModal plant={item}>
                        <Button disabled={addToCartLoading}>Add to cart</Button>
                      </AddToCartModal>
                    </div>
                    <div>
                      <Button
                        variant="ghost"
                        onClick={() => handleRemoveFromWishlist(item._id)}
                      >
                        <X />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-12 pt-40">
            <h3 className="font-metal text-gray-800 italic sm:text-xl md:text-2xl lg:text-4xl xl:text-6xl">
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
