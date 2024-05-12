import React from "react";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

const UserStore = ({ friendsOnline }) => {
  return (
    <>
      <Swiper
        slidesPerView={8}
        spaceBetween={10}
        pagination={{
          type: "fraction",
        }}
        // lazyPreloadPrevNext={8}
        // slidesOffsetAfter={8}
        slidesPerGroup={4}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper border border-slate-300 !py-2 !px-6 laptop:!px-2 dark:border-[#262626] rounded-lg"
        speed={400}
      >
        {friendsOnline.length > 0 &&
          friendsOnline.map((item, index) => (
            <SwiperSlide key={index}>
              <Link to={`/${item._id}`} className="">
                <div className="flex flex-col w-full items-center  max-w-[100px]    justify-center  ">
                  <div className="w-[45px] h-[45px] relative ">
                    <img
                      src={
                        item.profilePicture[0].imageThumb ||
                        "https://i.ibb.co/1dSwFqY/download-1.png"
                      }
                      alt=""
                      className="w-full border-2  border-orange-500 h-full object-cover rounded-full      "
                    />
                    <p className="absolute border-2 dark:border-black border-white right-0 bottom-0 w-3 h-3 rounded-full bg-green-500"></p>
                  </div>
                  <p className="text-xs text-slate-600  dark:text-white">
                    {item.fullname.slice(0, 10) + "..."}
                  </p>
                </div>
              </Link>
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
};

export default UserStore;
