import { Link } from "react-router";

export const PlantCard = ({ plant }) => {
  const { name, img, price, _id, second_img } = plant;
  return (
    <Link
      to={`/plants/${_id}`}
      className="max-w-3xs overflow-hidden bg-white p-4 xl:max-w-xs"
    >
      <div className="group relative h-72 w-full cursor-pointer overflow-hidden rounded-xl">
        <img
          src={img}
          alt="ZZ Plant"
          className="h-full w-full object-cover transition-opacity duration-500 group-hover:opacity-0"
        />

        <img
          src={second_img}
          alt="ZZ Plant Alternate"
          className="absolute inset-0 h-full w-full object-cover opacity-0 transition-all duration-500 group-hover:scale-110 group-hover:opacity-100"
        />
      </div>

      <div className="mt-4 mb-2 flex flex-col justify-between">
        <span className="text-base font-bold text-green-900">${price}</span>
        <h2 className="text-base font-semibold text-gray-800">{name}</h2>
      </div>
    </Link>
  );
};
