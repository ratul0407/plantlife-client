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
import { WishlistSkeleton } from "@/components/WishlistSkeleton";
import { useAddToCartMutation } from "@/redux/features/cart/cart.api";
import { useGetMeQuery } from "@/redux/features/user.api";
import {
  useDeleteWishlistMutation,
  useLazyGetLocalWishlistQuery,
} from "@/redux/features/wishlist/wishlist.api";
import { deleteFromWishlist } from "@/redux/features/wishlist/wishlistSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { X } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router";
import { toast } from "sonner";

const Wishlist = () => {
  const { data: userData } = useGetMeQuery(undefined);
  const dispatch = useAppDispatch();
  const wishlist = useAppSelector((state) => state.wishlist.items);

  const [addToCart, { isLoading: addToCartLoading }] = useAddToCartMutation();
  const [getWishlist, { data: wishlistData, isFetching, isLoading }] =
    useLazyGetLocalWishlistQuery();
  const [deleteWishlist] = useDeleteWishlistMutation();

  // ✅ Optimistic remove
  const handleRemoveFromWishlist = async (plantId: string) => {
    dispatch(deleteFromWishlist(plantId));
    toast.success("Removed from wishlist");

    if (userData) {
      try {
        const res = await deleteWishlist({ plantId }).unwrap();
        if (res.success) {
          toast.success(res.message);
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
    if (!wishlistData && wishlist.length) {
      getWishlist(wishlist.map((item) => item.plantId));
    }
  }, [wishlistData, wishlist, getWishlist]);

  const showSkeleton = isLoading && !wishlistData;

  return (
    <div className="font-roboto min-h-screen space-y-12">
      <h1 className="bg-green-700 py-6 text-center text-2xl font-bold text-white lg:text-5xl">
        Your Wishlist
      </h1>

      <div>
        {showSkeleton ? (
          <WishlistSkeleton />
        ) : wishlistData?.data?.length ? (
          <div className="mx-auto max-w-4xl">
            {isFetching && (
              <p className="mb-2 text-center text-gray-400 italic">
                Updating...
              </p>
            )}
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
                {wishlistData.data.map((item) => (
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
                        <Button disabled={addToCartLoading}>Add to cart</Button>
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
