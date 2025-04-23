import { IoArrowForward } from "react-icons/io5";

export const PlantsGrid = ({ img1, img2, img3, title, order }) => {
  return (
    <div className={`grid grid-cols-2 gap-8 md:grid-cols-4 order-${order[0]}`}>
      <div className="max-h-[400px] basis-1/4">
        <img className="min-h-[400px] rounded-sm object-center" src={img1} />
      </div>
      <div className={`max-h-[400px] basis-1/4 order-${order[1]}`}>
        <img className="min-h-[400px] rounded-sm object-cover" src={img2} />
      </div>

      <div
        className={` order-${order[2]} max-h-[400px] basis-1/4 self-stretch`}
      >
        <img className="min-h-[400px] rounded-sm object-center" src={img3} />
      </div>
      <div
        className={`order-${order[3]} flex max-h-[400px] basis-1/4 flex-col justify-between`}
      >
        <p className="font-metal text-4xl font-medium tracking-tighter italic">
          {title}
        </p>
        <p className="flex items-center gap-4 pl-4 font-semibold uppercase underline">
          view collection
          <span>
            <IoArrowForward />
          </span>
        </p>
      </div>
    </div>
  );
};
