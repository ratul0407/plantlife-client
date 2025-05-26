import plantImg from "../../assets/static/powerofplant.jpg";
import plantImg2 from "../../assets/static/powerofplant2.jpg";
import "./powerofplant.css";
export const PowerOfPlant = () => {
  return (
    <div>
      <div className="flex flex-col-reverse gap-12 lg:flex-row lg:items-stretch lg:gap-20">
        <div className="relative space-y-4 text-white lg:basis-1/2 lg:space-y-0">
          <img src={plantImg} className="lg:max-h-[900px] 2xl:max-h-[1000px]" />
          <p className="absolute inset-0 translate-y-1/2 text-center uppercase sm:text-lg 2xl:text-3xl">
            Plant improve air quality, reduces stress and brings a sense of calm
            and to your environment. discover all the ways our plants can
            enhance your well-being.
          </p>
        </div>

        <div className="flex basis-1/2 flex-col justify-between gap-8 lg:gap-0">
          <h3 className="heading">
            The power of <span className="plant-text">plant </span> in your home
          </h3>
          <img
            src={plantImg2}
            className="basis-1/2 object-contain object-left lg:max-h-[450px] 2xl:max-h-[700px]"
          />
          <div className="ml-20 space-y-2 text-gray-900 uppercase 2xl:text-2xl">
            <p className="text">Natural Air purifiers</p>
            <p className="text">Boosts relaxation and focus</p>
            <p className="text">Elevate any interior decorator</p>
          </div>
        </div>
      </div>
    </div>
  );
};
