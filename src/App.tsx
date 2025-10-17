import { Outlet } from "react-router";
import CommonLayout from "./components/layout/CommonLayout";
import { useAppDispatch } from "./redux/hooks";
import { useEffect } from "react";
import { setWishlist } from "./features/wishlist/slices/wishlistSlice";
import { setCart } from "./features/cart/slices/cartSlice";

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    if (savedWishlist.length > 0) {
      dispatch(setWishlist(savedWishlist));
    }
    if (savedCart.length > 0) {
      dispatch(setCart(savedCart));
    }
  }, [dispatch]);

  return (
    <CommonLayout>
      <Outlet />
    </CommonLayout>
  );
};

export default App;
