"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2, Minus, Plus } from "lucide-react";
import NavbarUi from "@/components/NavbarUi";
import {
  useMyCartQuery,
  useUpdateCartMutation,
} from "@/redux/features/cart/cart.api";

type CartItem = {
  id: string;
  plant: string;
  quantity: number;
  sku: string;
  plantDetails: {
    name: string;
    variants: {
      variantName: string;
      price: number;
      image: string;
      sku: string;
    }[];
  };
};

const initialCart: CartItem[] = [
  {
    id: "1",
    plant: "68bf20b41724fb2fd7b758a9",
    quantity: 2,
    sku: "PLANT-Small-Pot-JXTJO8-1",
    plantDetails: {
      name: "Snake Plant",
      variants: [
        {
          variantName: "Small Pot",
          price: 20,
          image:
            "https://res.cloudinary.com/dytwdaqzu/image/upload/v1757179561/8vgwknxwcrx-1757179559662-variant-2.jpg.webp",
          sku: "PLANT-Small-Pot-JXTJO8-1",
        },
      ],
    },
  },
  {
    id: "2",
    plant: "68bf20b41724fb2fd7b758b0",
    quantity: 1,
    sku: "PLANT-Big-Pot--ZG873C-0",
    plantDetails: {
      name: "Monstera",
      variants: [
        {
          variantName: "Big Pot",
          price: 30,
          image:
            "https://res.cloudinary.com/dytwdaqzu/image/upload/v1757179562/vklxsh71j7i-1757179559651-brasil-varaint-1.jpg.webp",
          sku: "PLANT-Big-Pot--ZG873C-0",
        },
      ],
    },
  },
];

export default function Checkout() {
  const [cart, setCart] = useState<CartItem[]>(initialCart);
  const [amount, setAmount] = useState(0);
  const [updateCart, { isLoading }] = useUpdateCartMutation();
  const { data } = useMyCartQuery(undefined);

  const myCart = data?.data?.[0]?.cart;

  const updateQuantity = (id: string, qty: number) => {
    if (qty < 1) return;
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: qty } : item)),
    );
  };

  const removeItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const total = cart.reduce((sum, item) => {
    const variant = item.plantDetails.variants.find((v) => v.sku === item.sku);
    return sum + (variant?.price || 0) * item.quantity;
  }, 0);

  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    country: "",
    zip: "",
  });

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const placeOrder = () => {
    alert("Order placed successfully!");
  };
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

  const handleIncrement = (max: number, current: number, sku: string) => {
    if (current >= max) return;
    updateCart({ quantity: current + 1, sku });
  };
  const handleDecrement = (current: number, sku: string) => {
    if (current <= 1) return;
    updateCart({ quantity: current - 1, sku });
  };

  return (
    <>
      <NavbarUi />

      <div className="mx-auto max-w-4xl space-y-6 p-6">
        <h1 className="text-3xl font-bold">Checkout</h1>

        {/* Cart Items */}
        <div className="space-y-4">
          {myCart?.map((item) => {
            const variant = item.plantDetails.variants.find(
              (v) => v.sku === item.sku,
            );
            // const variant = item?.plantDetails?.variants/
            return (
              <div
                key={item.id}
                className="flex items-center gap-4 rounded-lg border p-4 shadow-sm"
              >
                <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border">
                  <img
                    src={variant?.image}
                    alt={item.plantDetails.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="flex flex-1 flex-col">
                  <p className="font-medium">{item.plantDetails.name}</p>
                  <p className="text-muted-foreground text-sm">
                    Variant: {variant?.variantName}
                  </p>
                  <p className="text-sm font-semibold">${variant?.price}</p>
                </div>

                {/* Quantity */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      handleDecrement(item?.quantity, variant?.sku)
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
                        variant?.stock,
                        item?.quantity,
                        variant?.sku,
                      )
                    }
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                {/* Subtotal + Remove */}
                <div className="flex flex-col items-end gap-2">
                  <p className="font-medium">
                    ${(variant?.price * item.quantity).toFixed(2)}
                  </p>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Total */}
        <div className="flex items-center justify-between rounded-lg border p-4">
          <p className="text-lg font-semibold">Total</p>
          <p className="text-lg font-bold">${amount}</p>
        </div>

        {/* Shipping Info */}
        <div className="space-y-4 rounded-lg border p-4">
          <h2 className="text-xl font-semibold">Shipping Information</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={shippingInfo.name}
              onChange={handleShippingChange}
              className="input input-bordered w-full"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={shippingInfo.email}
              onChange={handleShippingChange}
              className="input input-bordered w-full"
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={shippingInfo.address}
              onChange={handleShippingChange}
              className="input input-bordered col-span-2 w-full"
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={shippingInfo.city}
              onChange={handleShippingChange}
              className="input input-bordered w-full"
            />
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={shippingInfo.country}
              onChange={handleShippingChange}
              className="input input-bordered w-full"
            />
            <input
              type="text"
              name="zip"
              placeholder="ZIP / Postal Code"
              value={shippingInfo.zip}
              onChange={handleShippingChange}
              className="input input-bordered w-full"
            />
          </div>
        </div>

        {/* Payment */}
        <div className="space-y-4 rounded-lg border p-4">
          <h2 className="text-xl font-semibold">Payment Method</h2>
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="payment"
                className="radio"
                defaultChecked
              />
              Credit / Debit Card
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="payment" className="radio" />
              PayPal
            </label>
          </div>
        </div>

        <Button className="w-full" onClick={placeOrder}>
          Place Order
        </Button>
      </div>
    </>
  );
}
