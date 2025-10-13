import { useEffect } from "react";
import { BsCart } from "react-icons/bs";
import { Minus, Plus, X } from "lucide-react";
import { Link } from "react-router";
import { toast } from "sonner";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  deleteFromCart,
  openCart,
  updatePlantQuantity,
} from "@/redux/features/cart/cartSlice";
import { useLazyMyCartQuery } from "@/redux/features/cart/cart.api";

export function Cart() {
  const dispatch = useAppDispatch();
  const open = useAppSelector((state) => state.cart.open);

  const handleSetOpen = (state: boolean) => {
    dispatch(openCart(state));
  };

  const cartStore = useAppSelector((state) => state.cart.items);

  const [getCart, { data: cartData, isLoading }] =
    useLazyMyCartQuery(undefined);

  const cart = cartData?.data;

  const handleIncrement = (sku: string, newQuantity: number) => {
    dispatch(updatePlantQuantity({ sku, newQuantity }));
  };

  const handleDecrement = (sku: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      dispatch(deleteFromCart(sku));
      return;
    }
    dispatch(updatePlantQuantity({ sku, newQuantity }));
  };

  const removeFromCart = (sku: string) => {
    dispatch(deleteFromCart(sku));
    toast.info("Plant removed from cart");
  };
  useEffect(() => {
    if (cartStore) {
      getCart(cartStore);
    }
  }, [cartStore, getCart]);

  return (
    <Sheet open={open} onOpenChange={handleSetOpen}>
      {/* Trigger button */}
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="relative h-10 w-10 rounded-full text-center"
        >
          <BsCart className="h-5 w-5 text-gray-700" />
          {cartStore?.length > 0 && (
            <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-green-700 text-xs font-semibold text-white">
              {cartStore.length}
            </span>
          )}
        </Button>
      </SheetTrigger>

      {/* Sheet content */}
      <SheetContent
        side="right"
        className="flex w-full flex-col p-0 sm:max-w-md"
      >
        <SheetHeader className="border-b p-4">
          <SheetTitle>Your Cart</SheetTitle>
        </SheetHeader>

        {/* cart items */}
        <div className="flex-1 space-y-4 overflow-y-auto px-4 py-3">
          {cart?.length ? (
            cart.map((item: any, index: number) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg border bg-white p-3 shadow-sm transition hover:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <Link
                    to={`/plants/${item?.plant}`}
                    onClick={() => handleSetOpen(false)}
                  >
                    <img
                      className="size-20 rounded-md object-cover"
                      src={item?.image}
                      alt={item?.name}
                    />
                  </Link>
                  <div className="flex flex-col space-y-1">
                    <p className="leading-tight font-medium">{item?.name}</p>
                    <p className="text-sm text-gray-500">
                      ${(item?.price * item?.quantity).toFixed(2)}
                    </p>
                    <div className="flex items-center overflow-hidden rounded-md border text-sm">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          handleDecrement(item?.sku, item?.quantity - 1)
                        }
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="px-2 text-center">{item.quantity}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          handleIncrement(item?.sku, item?.quantity + 1)
                        }
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFromCart(item?.sku)}
                >
                  <X className="h-4 w-4 text-gray-600" />
                </Button>
              </div>
            ))
          ) : (
            <div className="flex h-[70vh] items-center justify-center">
              <p className="text-lg font-medium text-gray-400">
                Your cart is empty 🪴
              </p>
            </div>
          )}
        </div>

        {/* footer */}
        {cart?.length > 0 && (
          <SheetFooter className="space-y-3 border-t p-4">
            <div className="flex items-center justify-between">
              <p className="font-medium">Subtotal</p>
              <p className="font-semibold">$29.99</p>
            </div>
            <SheetClose asChild>
              <Button className="w-full">
                <Link to="/checkout" className="w-full">
                  Proceed to Checkout
                </Link>
              </Button>
            </SheetClose>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
