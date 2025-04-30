import { IoArrowForward } from "react-icons/io5";

export const PlantsGrid = ({ img1, img2, img3, title, order }) => {
  const orderClasses = {
    1: "order-1",
    2: "order-2",
    3: "order-3",
    4: "order-4",
  };
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
      {/* Item 1 */}
      <div className="h-full" style={{ order: order[0] }}>
        <img className="h-full w-full rounded-sm object-cover" src={img1} />
      </div>

      {/* Item 2 */}
      <div className="h-full" style={{ order: order[1] }}>
        <img className="h-full w-full rounded-sm object-cover" src={img2} />
      </div>

      {/* Item 3 */}
      <div className="h-full" style={{ order: order[2] }}>
        <img className="h-full w-full rounded-sm object-cover" src={img3} />
      </div>

      {/* Text Item */}
      <div
        className="flex h-full flex-col justify-between pt-6 lg:pt-0"
        style={{ order: order[3] }}
      >
        <p className="font-metal text-3xl font-medium tracking-tighter italic sm:text-4xl">
          {title}
        </p>
        <p className="flex items-center gap-4 pl-4 font-semibold uppercase underline">
          view collection
          <IoArrowForward />
        </p>
      </div>
    </div>
  );
};
