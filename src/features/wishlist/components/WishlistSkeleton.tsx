import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function WishlistSkeleton() {
  return (
    <div className="mx-auto max-w-4xl">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...Array(4)].map((_, i) => (
            <TableRow key={i}>
              <TableCell>
                <Skeleton className="h-6 w-6 rounded" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-32 w-32 rounded-xl" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-6 w-32" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-6 w-24" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-6 w-16" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-10 w-24 rounded-xl" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
