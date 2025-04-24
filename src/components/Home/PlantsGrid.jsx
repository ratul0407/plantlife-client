import { IoArrowForward } from "react-icons/io5";

export const PlantsGrid = ({ img1, img2, img3, title, order }) => {
  return (
    <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
      <div className="max-h-[400px] basis-1/4" style={{ order: order[0] }}>
        <img className="min-h-[400px] rounded-sm object-center" src={img1} />
      </div>
      <div className="max-h-[400px] basis-1/4" style={{ order: order[1] }}>
        <img className="min-h-[400px] rounded-sm object-cover" src={img2} />
      </div>

      <div
        className="max-h-[400px] basis-1/4 self-stretch"
        style={{ order: order[2] }}
      >
        <img className="min-h-[400px] rounded-sm object-center" src={img3} />
      </div>
      <div
        className="flex max-h-[400px] basis-1/4 flex-col justify-between"
        style={{ order: order[3] }}
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
