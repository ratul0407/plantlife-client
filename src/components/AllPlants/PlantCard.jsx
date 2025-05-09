export const PlantCard = ({ plant }) => {
  console.log(plant);
  const { name, img, price, second_img } = plant;
  return (
    <div className="max-w-3xs overflow-hidden bg-white p-4">
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

      <div className="mt-4 mb-2 flex flex-col items-center justify-between md:flex-row">
        <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
        <span className="text-lg font-bold text-green-600">${price}</span>
      </div>
    </div>
  );
};
