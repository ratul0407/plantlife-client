import { Button } from "@/components/ui/button";
import {
  useRemoveFromCartMutation,
  useUpdateCartMutation,
} from "@/redux/features/cart/cart.api";
import { useAppSelector } from "@/redux/hooks";

import { Minus, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";

const Cart = () => {
  const [amount, setAmount] = useState(0);
  const [updateCart] = useUpdateCartMutation();
  const [removeFromCart] = useRemoveFromCartMutation();
  const cart = useAppSelector((state) => state.cart.items);

  // useEffect(() => {
  //   if (cart?.length) {
  //     const variants = cart?.map((cartItem) =>
  //       cartItem?.plantDetails?.variants?.find((v) => v.sku === cartItem.sku),
  //     );

  //     let total = 0;
  //     cart?.map((item, index: number) => {
  //       total += variants?.[index]?.price * item?.quantity;
  //     });

  //     total.toString(2);
  //     setAmount(total);
  //   }
  // }, [data]);

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
    <div>
      <h1 className="bg-green-700 py-6 text-center text-2xl font-bold text-white lg:text-5xl">
        Your Cart
      </h1>
      <main className="grid min-h-[calc(100vh-200px)] items-center justify-center">
        <h3 className="px-12 text-center text-3xl font-bold">
          Cart page is in Development...
        </h3>
      </main>
    </div>
    // <div className="space-y-6">
    //   <h1 className="bg-green-700 py-6 text-center text-2xl font-bold text-white lg:text-5xl">
    //     Your Cart
    //   </h1>

    //   {!data?.data?.length ? (
    //     <div className="font-roboto flex min-h-[70vh] items-center justify-center text-5xl text-gray-300">
    //       <p>Your Cart is Empty</p>
    //     </div>
    //   ) : (
    //     <>
    //       <div className="space-y-4">
    //         {cart?.map((item) => {
    //           const plant = item?.plantDetails?.variants?.find(
    //             (p) => p.sku === item?.sku,
    //           );

    //           return (
    //             <div
    //               key={item.id}
    //               className="flex items-center gap-4 rounded-lg border p-4 shadow-sm"
    //             >
    //               {/* Image */}
    //               <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border">
    //                 <img
    //                   src={plant?.image}
    //                   alt={item?.plantDetails?.name}
    //                   className="h-full w-full object-cover"
    //                 />
    //               </div>

    //               {/* Info */}
    //               <div className="flex flex-1 flex-col">
    //                 <p className="font-medium">{item?.plantDetails?.name}</p>
    //                 <p className="text-muted-foreground text-sm">
    //                   Variant: {plant?.variantName}
    //                 </p>
    //                 <p className="text-sm font-semibold">${plant?.price}</p>
    //               </div>

    //               {/* Quantity controls */}
    //               <div className="flex items-center gap-2">
    //                 <Button
    //                   variant="outline"
    //                   size="icon"
    //                   onClick={() =>
    //                     handleDecrement(item?.quantity, plant?.sku)
    //                   }
    //                 >
    //                   <Minus className="h-4 w-4" />
    //                 </Button>
    //                 <span className="w-6 text-center">{item.quantity}</span>
    //                 <Button
    //                   variant="outline"
    //                   size="icon"
    //                   onClick={() =>
    //                     handleIncrement(
    //                       plant?.stock,
    //                       item?.quantity,
    //                       plant?.sku,
    //                     )
    //                   }
    //                 >
    //                   <Plus className="h-4 w-4" />
    //                 </Button>
    //               </div>

    //               {/* Subtotal + Remove */}
    //               <div className="flex flex-col items-end gap-2">
    //                 <p className="font-medium">
    //                   ${(plant?.price * item?.quantity).toFixed(2)}
    //                 </p>
    //                 <Button
    //                   onClick={() => handleRemoveFromCart(plant?.sku)}
    //                   variant="ghost"
    //                   size="icon"
    //                   // onClick={() => removeItem(item.id)}
    //                 >
    //                   <Trash2 className="h-4 w-4 text-red-500" />
    //                 </Button>
    //               </div>
    //             </div>
    //           );
    //         })}
    //       </div>

    //       {/* Cart Total */}
    //       <div className="flex items-center justify-between rounded-lg border p-4">
    //         <p className="text-lg font-semibold">Total</p>
    //         <p className="text-lg font-bold">${amount.toFixed(2)}</p>
    //       </div>

    //       {/* Checkout button */}
    //       <Link to="/checkout">
    //         <Button className="w-full">Proceed to Checkout</Button>
    //       </Link>
    //     </>
    //   )}
    // </div>
  );
};

export default Cart;
