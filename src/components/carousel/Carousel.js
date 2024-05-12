import React from "react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import ImageLazy from "components/image/ImageLazy";
const Carousel = ({ imageList }) => {
  if (imageList.length === 0) return;
  return (
    <div>
      <Swiper
        cssMode={true}
        navigation={true}
        pagination={true}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        className="mySwiper"
      >
        {imageList.map((i, index) => (
          <SwiperSlide key={index}>
            <ImageLazy
              width="100%"
              height="100%"
              className="w-full h-full object-cover"
              url={i}
            ></ImageLazy>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
