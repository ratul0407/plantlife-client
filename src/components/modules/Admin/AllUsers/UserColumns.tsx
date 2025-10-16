import { User } from "@/types/user.types";
import { ColumnDef } from "@tanstack/react-table";
import { Pen, Trash2 } from "lucide-react";

export const userColumns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    accessorFn: (row) => ({ img: row?.picture || null, name: row?.name }),
    cell: ({ getValue }) => {
      const { img, name } = getValue() as { img: string | null; name: string };
      return (
        <div>
          {img ? (
            <img
              className="size-10 rounded-full"
              src={img}
              referrerPolicy="no-referrer"
            />
          ) : (
            <p className="flex size-10 items-center justify-center rounded-full bg-gray-400 text-lg text-black">
              {name[0]}
            </p>
          )}
          <p className="text-gray-700">{name}</p>
        </div>
      );
    },
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "isVerified",
    header: "isVerified",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "action",
    header: "Action",
    accessorFn: (row) => ({ id: row._id }),
    cell: ({ getValue }) => {
      const { id } = getValue() as { id: string };
      return (
        <div className="flex items-center">
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
