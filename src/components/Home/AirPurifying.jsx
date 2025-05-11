import img1 from "../../../assets/plant6.jpg";
import img2 from "../../../assets/plant3.jpg";
import img3 from "../../../assets/plant7.jpg";
import { IoArrowForward } from "react-icons/io5";
export const AirPurifying = () => {
  return (
    <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
      <div className="basis-1/4">
        <img className="rounded-sm object-center" src={img1} />
      </div>
      <div className="basis-1/4">
        <img className="rounded-sm object-center" src={img2} />
      </div>
      <div className="flex basis-1/4 flex-col justify-between">
        <p className="font-metal text-4xl font-medium tracking-tighter italic">
          Air-purifying plants
        </p>
        <p className="flex items-center gap-4 pl-4 font-semibold uppercase underline">
          view collection
          <span>
            <IoArrowForward />
          </span>
        </p>
      </div>
      <div className="basis-1/4 self-stretch">
        <img className="min-h-full rounded-sm object-center" src={img3} />
      </div>
    </div>
  );
};
