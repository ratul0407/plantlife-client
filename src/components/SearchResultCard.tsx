import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router";

interface SearchResultCardProps {
  image: string;
  name: string;
  price: number;
  id: string;
  onClick: any;
}

const SearchResultCard = ({
  image,
  name,
  price,
  id,
  onClick,
}: SearchResultCardProps) => {
  return (
    <Card className="w-full max-w-sm cursor-pointer rounded-none shadow-md transition-all lg:max-w-xl">
      <Link to={`/plants/${id}`} onClick={onClick}>
        <CardContent className="flex items-center justify-between gap-4 p-4">
          {/* image */}
          <div className="h-20 w-20 flex-shrink-0 overflow-hidden">
            <img
              src={image}
              alt={name}
              className="h-full w-full object-cover"
            />
          </div>

          {/* info */}
          <div className="flex flex-col items-end">
            <h3 className="font-metal text-2xl font-semibold text-green-800">
              {name}
            </h3>
            <span className="text-lg font-bold">${price}</span>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};

export default SearchResultCard;
