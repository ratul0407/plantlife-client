import { Plant } from "@/types/plant";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, Pen, Trash2 } from "lucide-react";
import { Link } from "react-router";

export const columns: ColumnDef<Plant>[] = [
  {
    accessorKey: "name",
    header: "Name",

    accessorFn: (row) => ({
      name: row.name,
      image: row.variants?.[0]?.image,
      variants: row.variants.map((v) => v.variantName),
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
    accessorKey: "price",
    accessorFn: (row) => ({ price: row.variants?.[0]?.price }),
    cell: ({ getValue }) => {
      const { price } = getValue() as { price: number };
      return <p>${price}</p>;
    },
    header: "Price",
  },
  {
    accessorKey: "stock",
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
      console.log(data);
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
    accessorKey: "action",
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
