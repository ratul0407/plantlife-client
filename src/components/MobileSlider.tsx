import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const MobileSlider = ({ images }) => {
  console.log(images);
  return (
    <div className="">
      <Swiper
        modules={[Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        // you can add other props if needed (loop, speed, etc.)
      >
        {images.map((img) => (
          <SwiperSlide className="min-h-full">
            <img className="h-full" src={img} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MobileSlider;
