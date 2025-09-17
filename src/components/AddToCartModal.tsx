import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "./ui/button";
import { Check, Minus, Plus } from "lucide-react";
import { useState } from "react";

import { toast } from "sonner";
import { useAddToCartMutation } from "@/redux/features/cart/cart.api";

import { addToLocalCart } from "@/utils/cartLocal";
import { useAddToCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";

const addToCartVariants = {
  initial: { bottom: "-2.5rem", opacity: 0 },
  hover: { bottom: 0, opacity: 1 },
};

const AddToCartModal = ({ plant, children }) => {
  const { isAuthenticated } = useAuth();
  const [open, setOpen] = useState(false);
  const [addToCart, { isLoading }] = useAddToCartMutation();
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  console.log(quantity, "from add to cart modal");
  const handleSelectVariant = (id: string) => {
    // toggle selection: if clicking the same, unselect
    setSelectedVariant((prev) => (prev === id ? null : id));
    const currentVariant = plant?.variants?.find((p) => p.sku === id);
    if (quantity > currentVariant?.stock) {
      setQuantity(currentVariant?.stock);
    }
  };

  const handleAddToCart = async () => {
    const variant = plant?.variants?.find((v) => v.sku === selectedVariant);

    const item = {
      plant: plant?._id,
      sku: variant?.sku,
      quantity: quantity,
      img: variant?.image,
    };

    if (!isAuthenticated) {
      return addToLocalCart(item);
    }
    console.log(item);
    try {
      const res = await addToCart(item).unwrap();
      if (res?.success) {
        toast.success("Plant added to cart");
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || "Failed to add");
    }
  };
  const handleIncrementStock = () => {
    console.log(selectedVariant, "I was clicked");
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
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Select a Variant</DialogTitle>
          <DialogDescription>
            Choose your preferred size and quantity.
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center justify-center gap-3">
          {plant?.variants?.map((variant, index) => {
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
                  <p className="font-medium">{variant.name}</p>
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
            onClick={handleAddToCart}
            disabled={!selectedVariant || isLoading}
          >
            Add to Cart
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddToCartModal;
