import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Minus, Plus } from "lucide-react";
import { Link } from "react-router";

interface Cart {
  plantId: string;
  name: string;
  sku: string;
  price: number;
  image: string;
  quantity: number;
  variant: string;
}
export const cartColumns: ColumnDef<Cart>[] = [
  {
    accessorKey: "name",
    header: "Product",
    cell: ({ row }) => {
      const { name, image, variant, plantId } = row.original;
      console.log(plantId);
      return (
        <Link to={`/plants/${plantId}`} className="flex items-center gap-3">
          <img
            src={image}
            alt={name}
            className="size-20 rounded-xl object-cover"
          />
          <div>
            <p className="font-medium">{name}</p>
            <p className="text-sm text-gray-500">{variant}</p>
          </div>
        </Link>
      );
    },
  },

  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row, table }) => {
      const { quantity, sku } = row.original;
      const { onIncrement, onDecrement } = table.options.meta ?? {};
      return (
        <div className="flex items-center gap-4">
          <Button
            onClick={() => onIncrement(sku, quantity + 1)}
            variant={"ghost"}
            className="rounded-full border border-gray-300"
            size={"icon"}
          >
            <Plus />
          </Button>
          <p>{quantity}</p>
          <Button
            onClick={() => onDecrement(sku, quantity - 1)}
            variant={"ghost"}
            className="rounded-full border border-gray-300"
            size={"icon"}
          >
            <Minus />
          </Button>
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const { price } = row.original;

      return (
        <div>
          <p className="text-xl font-bold">${price}</p>
        </div>
      );
    },
  },
];
