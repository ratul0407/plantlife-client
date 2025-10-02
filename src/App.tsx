import { Outlet } from "react-router";
import CommonLayout from "./components/layout/CommonLayout";
import { useAppDispatch } from "./redux/hooks";
import { useEffect, useMemo } from "react";
import { setWishlist } from "./redux/features/wishlist/wishlistSlice";
import { useGetUserWishlistQuery } from "./redux/features/wishlist/wishlist.api";

const App = () => {
  const { data: wishlist, isLoading } = useGetUserWishlistQuery(undefined);
  console.log(wishlist);
  const dispatch = useAppDispatch();
  const mergedWishlist = useMemo(() => {
    if (!wishlist?.data) return [];
    let savedWishlist = [];
    try {
      savedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    } catch {}
    return [
      ...wishlist.data,
      ...savedWishlist.filter(
        (item) => !wishlist.data.some((b) => b.plantId === item.plantId),
      ),
    ];
  }, [wishlist?.data]);

  dispatch(setWishlist(mergedWishlist));
  return (
    <CommonLayout>
      <Outlet />
    </CommonLayout>
  );
};

export default App;
