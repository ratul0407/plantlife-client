import { DataTable } from "@/components/modules/Admin/AllPlants/DataTable";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  useLazyMyCartQuery,
  useUpdateCartMutation,
} from "@/features/cart/api/cart.api";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { X } from "lucide-react";
import { useEffect } from "react";
import { cartColumns } from "../../../pages/user/cartColumns";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useCartActions } from "../actions/cartAction";
import { updatePlantQuantity } from "../slices/cartSlice";

const Cart = () => {
  const cartStore = useAppSelector((state) => state.cart.items);
  const { handleDecrement } = useCartActions();
  const [getCart, { data, isLoading }] = useLazyMyCartQuery();
  const [updateCart] = useUpdateCartMutation();
  const dispatch = useAppDispatch();

  const handleIncrement = async (sku: string, newQuantity: number) => {
    dispatch(updatePlantQuantity({ sku, newQuantity }));
    try {
      await updateCart({ newQuantity, sku });
      getCart(cartStore); // refetch fresh data
    } catch (error) {
      dispatch(updatePlantQuantity({ sku, newQuantity: newQuantity - 1 }));
    }
  };

  useEffect(() => {
    if (cartStore) {
      getCart(cartStore);
    }
    console.log("I was used");
  }, [cartStore, getCart]);

  const cart = data?.data;

  if (isLoading) return <Spinner />;
  return (
    <div>
      <h1 className="bg-green-700 py-6 text-center text-2xl font-bold text-white lg:text-5xl">
        Your Cart
      </h1>
      <main className="flex min-h-screen items-start gap-6 p-12">
        <div className="basis-2/3 rounded-xl border border-gray-200 px-12 py-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-3xl font-bold">
              Cart
              <span className="pl-4 text-base font-medium text-gray-400">
                ({cart?.length} products)
              </span>
            </h3>
            <Button variant={"ghost"} className="text-red-500">
              <X />
              Clear cart
            </Button>
          </div>
          {cart && (
            <DataTable
              onIncrement={handleIncrement}
              onDecrement={handleDecrement}
              columns={cartColumns}
              data={cart}
            />
          )}
        </div>
        <div className="basis-1/3 rounded-xl bg-gray-100 p-4">
          <h3 className="font-xl py-4 font-bold">Promo Code</h3>
          <div className="flex items-center rounded-full border border-gray-300">
            <Input className="" placeholder="Type Here" />
            <Button className="rounded-full">Apply</Button>
          </div>
          <div className="py-4">
            <Separator />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Cart;
