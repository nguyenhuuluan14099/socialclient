import React from "react";
import SendComment from "components/comment/SendComment";
import ImageLazy from "components/image/ImageLazy";
import PostInfo from "./postDetail/PostInfo";
import PostLike from "./postDetail/PostLike";
import PostSave from "./postDetail/PostSave";
import PostDescView from "./postDetail/PostDescView";
import PostComment from "./postDetail/PostComment";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
const Post = ({ post }) => {
  const user = post.user;

  return (
    <>
      <div className="post border max-w-full w-full laptop:w-[600px] dark:bg-black flex flex-col border-slate-300 dark:border-[#363636] rounded-lg my-4 tablet:w-[500px]">
        <PostInfo
          user={user}
          postLocation={post.location}
          isAdmin={user.isAdmin}
          post={post}
        ></PostInfo>
        <div className="w-full imagePost ">
          <Swiper
            cssMode={true}
            navigation={true}
            pagination={true}
            mousewheel={true}
            keyboard={true}
            modules={[Navigation, Pagination, Mousewheel, Keyboard]}
            className="mySwiper"
          >
            {post.img.map((item, index) => (
              <SwiperSlide key={index}>
                <ImageLazy
                  // height="100%"
                  width="100%"
                  className="object-cover h-auto "
                  url={item.imageUrl}
                ></ImageLazy>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="flex flex-col p-1 ">
          <div className="flex justify-between ">
            {/* like block */}
            <PostLike post={post} user={user}></PostLike>
            {/* save */}
            <PostSave post={post}></PostSave>
          </div>

          {/* more */}
          <PostDescView
            username={user.username}
            postDesc={post.desc}
          ></PostDescView>
          {/* comment block */}
          <PostComment post={post}></PostComment>
        </div>

        {!post.hideComment && (
          <SendComment receiverName={user} post={post}></SendComment>
        )}
      </div>
    </>
  );
};

export default Post;
