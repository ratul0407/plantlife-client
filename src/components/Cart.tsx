import { useState } from "react";
import { BsCart } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { Button } from "./ui/button";
import { useMyCartQuery } from "@/redux/features/user.api";

export function Cart() {
  const [isOpen, setIsOpen] = useState(false);

  const { data } = useMyCartQuery(undefined);
  console.log(data);

  return (
    <>
      {/* Cart button */}
      <Button
        variant="outline"
        onClick={() => setIsOpen((s) => !s)}
        className="relative"
      >
        <BsCart className="h-6 w-6 text-gray-600" />
        {/* badge */}
        <span className="absolute -top-2 -right-2 rounded-full bg-green-800 px-2 text-xs text-white">
          {data?.data?.[0]?.cart?.length}
        </span>
      </Button>

      {/* overlay */}
      <div
        className={`fixed inset-0 z-90 bg-black transition-opacity duration-300 ${
          isOpen
            ? "pointer-events-auto opacity-50"
            : "pointer-events-none opacity-0"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* drawer */}
      <aside
        className={`fixed top-0 right-0 z-[90] h-full w-full max-w-md transform bg-gray-50 shadow-xl transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        aria-hidden={!isOpen}
      >
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-lg font-semibold">Your Cart</h2>
          <Button variant="ghost" onClick={() => setIsOpen(false)}>
            <IoClose className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {/* cart items */}
          <div className="space-y-4">
            {data?.data?.[0]?.cart?.map((item, index: number) => (
              <div
                key={index}
                className="flex items-center justify-between border-b pb-3"
              >
                <div className="flex items-center gap-3">
                  <img
                    className="size-20"
                    src={item?.plantDetails?.variants?.[0]?.image}
                  />
                  <div>
                    <p className="font-medium">{item?.plantDetails?.name}</p>
                    <p className="text-sm text-gray-500">
                      Qty: {item?.quantity}
                    </p>
                  </div>
                </div>
                <p className="font-semibold">
                  ${item?.plantDetails?.variants?.[0]?.price * item?.quantity}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t p-4">
          <div className="mb-4 flex items-center justify-between">
            <p className="font-medium">Subtotal</p>
            <p className="font-semibold">$48</p>
          </div>
          <Button className="w-full">Checkout</Button>
        </div>
      </aside>
    </>
  );
}
