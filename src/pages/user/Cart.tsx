import { Button } from "@/components/ui/button";
import {
  useMyCartQuery,
  useUpdateCartMutation,
} from "@/redux/features/user.api";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

const Cart = () => {
  const [amount, setAmount] = useState(0);
  const { data } = useMyCartQuery(undefined);
  const [updateCart, isLoading] = useUpdateCartMutation();
  const cart = data?.data?.[0]?.cart;
  // console.log(cart);
  const currentPrice = cart?.[0]?.plantDetails?.variants?.find(
    (i) => i.sku === cart?.[0]?.sku,
  );
  console.log(cart?.[0]?.sku, cart?.[0]?.plantDetails?.variants?.[0]?.sku);
  console.log(currentPrice);

  useEffect(() => {
    if (cart?.length) {
      let total = 0;
      cart?.map((item) => {
        total += item?.plantDetails?.variants?.[0]?.price * item?.quantity;
      });
      total.toString(2);
      setAmount(total);
    }
  }, [data]);
  return (
    <div className="max-w-3xl space-y-6 p-4">
      <h1 className="text-2xl font-bold">Your Cart</h1>

      {cart?.length === 0 ? (
        <p className="text-muted-foreground">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cart?.map((item) => {
              const plant = item?.plantDetails?.variants?.find(
                (p) => p.sku === item?.sku,
              );
              console.log(plant);
              return (
                <div
                  key={item.id}
                  className="flex items-center gap-4 rounded-lg border p-4 shadow-sm"
                >
                  {/* Image */}
                  <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border">
                    <img
                      src={plant?.image}
                      alt={item?.plantDetails?.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex flex-1 flex-col">
                    <p className="font-medium">{item?.plantDetails?.name}</p>
                    <p className="text-muted-foreground text-sm">
                      Variant: {plant?.variantName}
                    </p>
                    <p className="text-sm font-semibold">${plant?.price}</p>
                  </div>

                  {/* Quantity controls */}
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        handleDecrement(item?.quantity, plant?.sku)
                      }
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-6 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        handleIncrement(
                          plant?.stock,
                          item?.quantity,
                          plant?.sku,
                        )
                      }
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Subtotal + Remove */}
                  <div className="flex flex-col items-end gap-2">
                    <p className="font-medium">
                      ${(plant?.price * item?.quantity).toFixed(2)}
                    </p>
                    <Button
                      variant="ghost"
                      size="icon"
                      // onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Cart Total */}
          <div className="flex items-center justify-between rounded-lg border p-4">
            <p className="text-lg font-semibold">Total</p>
            <p className="text-lg font-bold">${amount.toFixed(2)}</p>
          </div>

          {/* Checkout button */}
          <Button className="w-full">Proceed to Checkout</Button>
        </>
      )}
    </div>
  );
};

export default Cart;
