import { Button } from "@/components/ui/button";
import { Plant } from "@/types/plant";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Eye, Pen, Trash2 } from "lucide-react";
import { Link } from "react-router";

export const columns: ColumnDef<Plant>[] = [
  {
    header: "Name",

    accessorFn: (row) => ({
      name: row.name,
      image: row.variants?.[0]?.image,
      variants: [...row.variants.map((v) => v.variantName)],
    }),
    cell: ({ getValue }) => {
      const { name, image, variants } = getValue() as {
        name: string;
        image: string;
        variants: string[];
      };

      return (
        <div className="flex gap-6 py-4">
          <img
            className="size-16 rounded-xl object-cover object-center"
            src={image}
          />
          <div>
            <h3 className="font-metal text-xl text-green-900">{name}</h3>
            <p className="text-gray-600">Variants: {variants.join(", ")}</p>
          </div>
        </div>
      );
    },
  },
  {
    id: "price",
    accessorFn: (row) => row.variants?.[0]?.price,
    enableSorting: true,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ getValue }) => {
      const price = getValue() as number;
      return <p>${price}</p>;
    },
  },
  {
    accessorFn: (row) => ({
      stock: row.variants?.[0]?.stock,
    }),
    cell: ({ getValue }) => {
      const { stock } = getValue() as { stock: number };
      return <p>{stock}</p>;
    },
    header: "Stock",
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ getValue }) => {
      const data = getValue();
      if (typeof data === "string")
        return (
          <p>
            {data
              ?.toLowerCase()
              .split("_")
              .map(
                (word: string) => word.charAt(0).toUpperCase() + word.slice(1),
              )
              .join(" ")}{" "}
          </p>
        );
    },
  },
  {
    header: "Action",
    accessorFn: (row) => ({ id: row._id }),
    cell: ({ getValue }) => {
      const { id } = getValue() as { id: string };
      return (
        <div className="flex items-center">
          <Link
            to={`/plants/${id}`}
            className="mx-auto rounded-lg border bg-green-300/50 p-2.5 text-center"
          >
            <Eye className="mx-auto size-4" />
          </Link>
          <div className="mx-auto rounded-lg border bg-yellow-300/50 p-2.5 text-center">
            <Pen className="mx-auto size-4" />
          </div>
          <div className="mx-auto rounded-lg border bg-red-300/50 p-2.5 text-center">
            <Trash2 className="mx-auto size-4" />
          </div>
        </div>
      );
    },
  },
];
