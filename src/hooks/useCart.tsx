// hooks/useCart.ts (clean + unified)
import {
  useAddToCartMutation,
  useMyCartQuery,
  useUpdateCartMutation,
  useRemoveFromCartMutation,
} from "@/redux/features/cart/cart.api";
import { useAuth } from "./useAuth";
import { useMemo } from "react";
import {
  addToLocalCart,
  getLocalCart,
  removeFromLocalCart,
  updateLocalCartQuantity,
} from "@/utils/cartLocal";

export const useCart = () => {
  const { isAuthenticated } = useAuth();
  const { data: serverData, isLoading: serverLoading } = useMyCartQuery(
    undefined,
    { skip: !isAuthenticated },
  );

  const localCart = getLocalCart();
  const serverCart = serverData?.data?.cart || []; // ✅ assume backend returns { data: { cart: [...] } }

  // Normalize cart so both local + server items have `plantDetails`
  const cart = useMemo(() => {
    const baseCart = isAuthenticated ? serverCart : localCart;
    return baseCart.map((item: any) => ({
      ...item,
      plantDetails: item.plantDetails || item.variantDetails || null,
    }));
  }, [isAuthenticated, serverCart, localCart]);

  const isLoading = isAuthenticated ? serverLoading : false;

  // Calculate total
  const totalAmount = useMemo(() => {
    return cart.reduce((sum: number, item: any) => {
      const variant = item.plantDetails?.variants?.find(
        (v: any) => v.sku === item.sku,
      );
      const price = variant?.price ?? item.price ?? 0;
      return sum + price * item.quantity;
    }, 0);
  }, [cart]);

  return { cart, isLoading, totalAmount };
};

export const useAddToCart = () => {
  const { isAuthenticated } = useAuth();
  const [addToCartMutation] = useAddToCartMutation();

  return async (item: {
    plant: string;
    sku: string;
    quantity: number;
    variantDetails?: any;
  }) => {
    if (isAuthenticated) {
      return await addToCartMutation({
        plant: item.plant,
        sku: item.sku,
        quantity: item.quantity, // ✅ keep as number
      }).unwrap();
    } else {
      return addToLocalCart(item, item.variantDetails);
    }
  };
};

export const useUpdateCartQuantity = () => {
  const { isAuthenticated, user } = useAuth(); // ✅ single call
  const [updateCartMutation] = useUpdateCartMutation();

  return async (sku: string, newQuantity: number) => {
    if (isAuthenticated) {
      return await updateCartMutation({
        id: user?._id,
        sku,
        quantity: newQuantity,
      }).unwrap();
    } else {
      return updateLocalCartQuantity(sku, newQuantity);
    }
  };
};

export const useRemoveFromCart = () => {
  const { isAuthenticated, user } = useAuth(); // ✅ single call
  const [removeFromCartMutation] = useRemoveFromCartMutation();

  return async (sku: string) => {
    if (isAuthenticated) {
      return await removeFromCartMutation({
        id: user?._id,
        sku,
      }).unwrap();
    } else {
      return removeFromLocalCart(sku);
    }
  };
};
