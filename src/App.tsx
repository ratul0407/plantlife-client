import { Outlet } from "react-router";
import CommonLayout from "./components/layout/CommonLayout";
import { useAppDispatch } from "./redux/hooks";
import { useEffect } from "react";
import { setWishlist } from "./redux/features/wishlist/wishlistSlice";

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    console.log(savedWishlist);
    dispatch(setWishlist(savedWishlist));
  }, [dispatch]);
  return (
    <CommonLayout>
      <Outlet />
    </CommonLayout>
  );
};

export default App;
