import { Outlet } from "react-router";
import CommonLayout from "./components/layout/CommonLayout";
import { useAppDispatch } from "./redux/hooks";
import { useEffect } from "react";
import { setWishlist } from "./redux/features/wishlist/wishlistSlice";
import { useGetUserWishlistQuery } from "./redux/features/wishlist/wishlist.api";

const App = () => {
  const { data: wishlist } = useGetUserWishlistQuery(undefined);
  console.log(wishlist);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!wishlist?.data) return;
    let savedWishlist: any[] = [];

    try {
      savedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    } catch {}

    const merged = [
      ...wishlist.data,
      ...savedWishlist.filter(
        (item) => !wishlist.data.some((b) => b.plantId === item.plantId),
      ),
    ];

    dispatch(setWishlist(merged));
  }, [wishlist?.data, dispatch]);

  return (
    <CommonLayout>
      <Outlet />
    </CommonLayout>
  );
};

export default App;
