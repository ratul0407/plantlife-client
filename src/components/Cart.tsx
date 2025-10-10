import { useState } from "react";
import { BsCart } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { Button } from "./ui/button";

import { Link } from "react-router";
import { Minus, Plus, X } from "lucide-react";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { openCart } from "@/redux/features/cart/cartSlice";
import {
  useMyCartQuery,
  useRemoveFromCartMutation,
  useUpdateCartMutation,
} from "@/redux/features/cart/cart.api";

export function Cart() {
  const dispatch = useAppDispatch();
  const open = useAppSelector((state) => state.cart.open);

  const handleSetOpen = (cartState: boolean) => {
    dispatch(openCart(cartState));
  };

  const [amount, setAmount] = useState(0);
  const { data } = useMyCartQuery(undefined);

  const [removeFromCart, { isLoading: removeFromCartLoading }] =
    useRemoveFromCartMutation();
  const [updateCart, { isLoading: updateCartLoading }] =
    useUpdateCartMutation();

  let cart;
  cart = data?.data;

  const handleRemoveFromCart = async (sku: string) => {
    try {
      const res = await removeFromCart({ sku: sku }).unwrap();

      if (res.success) {
        toast.success(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleIncrement = (max: number, current: number, sku: string) => {
    if (current >= max) return;
    updateCart({ quantity: current + 1, sku });
  };
  const handleDecrement = async (current: number, sku: string) => {
    if (current <= 1) {
      handleRemoveFromCart(sku);
      return;
    }
    updateCart({ quantity: current - 1, sku });
  };

  return (
    <>
      {/* Cart button */}
      <Button
        variant="outline"
        onClick={() => handleSetOpen(!open)}
        className="relative h-8 w-8 rounded-full text-center"
      >
        <BsCart
          className={`relative h-5 w-5 text-gray-600 ${cart?.length ? "left-0" : "left-1"}`}
        />
        {/* badge */}
        <span
          className={`${cart?.length && "absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-green-800 text-xs text-white"}`}
        >
          {cart?.length > 0 ? cart?.length : ""}
        </span>
      </Button>

      {/* overlay */}
      <div
        className={`fixed inset-0 z-90 bg-black transition-opacity duration-300 ${
          open
            ? "pointer-events-auto opacity-50"
            : "pointer-events-none opacity-0"
        }`}
        onClick={() => handleSetOpen(false)}
      />

      {/* drawer */}
      <aside
        className={`fixed top-0 right-0 z-[90] h-full w-full max-w-md transform bg-gray-50 shadow-xl transition-transform duration-300 ease-in-out ${open ? "translate-x-0" : "translate-x-full"}`}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-lg font-semibold">Your Cart</h2>
          <Button variant="ghost" onClick={() => handleSetOpen(false)}>
            <IoClose className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* cart items */}
          <div className="space-y-4">
            {cart?.length ? (
              cart?.map((item, index: number) => {
                return (
                  <div
                    key={index}
                    className="flex items-center justify-between border-b p-4 pb-3 hover:bg-gray-100"
                  >
                    <div className="flex items-center gap-3">
                      <Link
                        to={`/plants/${item?.plant}`}
                        onClick={() => handleSetOpen(false)}
                      >
                        <img className="size-24" src={item?.img} />
                      </Link>
                      <div className="space-y-2">
                        <p className="font-medium">{item?.name}</p>
                        <p className="text-sm text-gray-500">
                          Qty: {item?.quantity}
                        </p>
                        <div className="flex items-center border text-sm *:border-r">
                          <Button
                            disabled={updateCartLoading}
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              handleDecrement(item?.quantity, item?.sku)
                            }
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-6 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            disabled={updateCartLoading}
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              handleIncrement(
                                item?.stock,
                                item?.quantity,
                                item?.sku,
                              )
                            }
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end justify-end gap-3">
                      <button
                        onClick={() => handleRemoveFromCart(item?.sku)}
                        disabled={removeFromCartLoading}
                        className="cursor-pointer"
                      >
                        <X className="size-4 text-gray-700" />
                      </button>
                      <p className="font-semibold">
                        ${(item?.price * item?.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <>
                <div className="flex min-h-[80vh] items-center justify-center">
                  <h3 className="text-[3.5vw] text-gray-400">
                    Your Cart Is Empty
                  </h3>
                </div>
              </>
            )}
          </div>
        </div>
        {data?.data?.[0]?.cart && (
          <div className="border-t p-4">
            <div className="mb-4 flex items-center justify-between">
              <p className="font-medium">Subtotal</p>
              <p className="font-semibold">${amount.toFixed(2)}</p>
            </div>
            <Button className="w-full">
              <Link className="w-full" to="/checkout">
                Checkout
              </Link>
            </Button>
          </div>
        )}
      </aside>
    </>
  );
}
