import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "../../../components/ui/button";
import { Check, Minus, Plus } from "lucide-react";
import React, { useState } from "react";
import { DialogOverlay } from "@radix-ui/react-dialog";
import { Plant, Variant } from "@/types/plant";
import { useCartActions } from "../actions/cartAction";

const AddToCartModal = ({
  plant,
  children,
}: {
  plant: Plant;
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  const { handleAddToCart } = useCartActions();
  const handleSelectVariant = (id: string) => {
    setSelectedVariant((prev) => (prev === id ? null : id));
  };

  const handleIncrementStock = () => {
    const currentVariant = plant?.variants?.find(
      (p) => p.sku === selectedVariant,
    );
    if (quantity >= (currentVariant?.stock ?? 0)) return;
    setQuantity(quantity + 1);
  };

  const handleDecrementStock = () => {
    if (quantity === 1) return;
    setQuantity(quantity - 1);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogOverlay className="fixed inset-0 z-[90] bg-black/50" />
      <DialogContent className="z-90 sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Select a Variant</DialogTitle>
          <DialogDescription>
            Choose your preferred size and quantity.
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center justify-center gap-3">
          {plant?.variants?.map((variant: Variant, index: number) => {
            const isSelected = selectedVariant === variant.sku;

            return (
              <div
                key={index}
                className={`relative cursor-pointer rounded-lg border p-2 transition hover:shadow-md ${
                  isSelected ? "border-green-500 ring-2 ring-green-400" : ""
                }`}
                onClick={() => handleSelectVariant(variant.sku)}
              >
                <p>{variant?.variantName}</p>
                <div className="relative h-24 w-full min-w-[120px] overflow-hidden rounded-md">
                  <img
                    src={variant.image}
                    alt={variant.variantName}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="mt-2 text-center">
                  <p className="font-medium">{variant.variantName}</p>
                  <p className="text-muted-foreground text-sm">
                    ${variant.price}
                  </p>
                </div>
                {isSelected && (
                  <div className="absolute top-2 right-2 rounded-full bg-green-500 p-1 text-white">
                    <Check className="h-4 w-4" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Quantity */}
        <div className="mt-4 flex items-center justify-between rounded-lg border p-3">
          <span className="font-medium">Quantity</span>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handleDecrementStock}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-6 text-center">{quantity}</span>
            <Button
              variant="outline"
              size="icon"
              onClick={handleIncrementStock}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <DialogFooter>
          <Button
            className="w-full"
            onClick={() => {
              handleAddToCart(plant, quantity, selectedVariant as string);
              setOpen(false);
            }}
            disabled={!selectedVariant}
          >
            Add to Cart
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddToCartModal;
