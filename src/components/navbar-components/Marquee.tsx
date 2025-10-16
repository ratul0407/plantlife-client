import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

const bannerText = [
  "Talk to our plant experts +880 123456789",
  "The best time to buy plants is now!",
  "Free shipping over $79 + free happiness guaranteed",
];
const Marquee = () => {
  return (
    <div className="relative bg-green-900 py-2 text-center text-sm text-white md:text-lg">
      <div className="prev absolute left-2 z-50 cursor-pointer">
        <IoChevronBack className="size-6 text-green-600 md:size-8" />
      </div>
      <div className="next absolute right-2 z-50 cursor-pointer">
        <IoChevronForward className="size-6 text-green-600 md:size-8" />
      </div>
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation={{
          nextEl: ".prev",
          prevEl: ".next",
        }}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: true,
        }}

        // you can add other props if needed (loop, speed, etc.)
      >
        {bannerText.map((text) => (
          <SwiperSlide className="min-h-full">
            <p>{text}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Marquee;
