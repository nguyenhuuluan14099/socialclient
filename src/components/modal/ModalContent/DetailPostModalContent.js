import SendComment from "components/comment/SendComment";
import ImageUser from "components/image/ImageUser";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { format } from "timeago.js";
import IconBack from "components/icons/IconBack";
import IconAdmin from "components/icons/IconAdmin";
import PostLike from "components/post/postDetail/PostLike";
import PostSave from "components/post/postDetail/PostSave";
import PostAction from "components/post/postDetail/PostAction";
import CommentBlock from "components/comment/CommentBlock";
import { getPost } from "components/redux/actions/postAction";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import Loading from "components/loading/Loading";
import { PROFILE_TYPES } from "components/redux/actions/profileAction";

const DetailPostModalContent = ({
  dataPostProfile,
  morePost,
  hiddenIcon = false,
  onClose = () => {},
}) => {
  const { slug } = useParams();
  const [post, setPost] = useState([]);
  const { auth, detailPost, profile } = useSelector((state) => state);
  const dispatch = useDispatch();

  //get post
  useEffect(() => {
    const id = dataPostProfile ? dataPostProfile._id : slug;

    async function getData() {
      try {
        dispatch({ type: PROFILE_TYPES.SET_LOADING, payload: true });
        dispatch(getPost(detailPost, id, auth.token));
        if (detailPost.length > 0) {
          const newPost = detailPost.filter((post) => post._id === id);
          setPost(newPost);
        }
        dispatch({ type: PROFILE_TYPES.SET_LOADING, payload: false });
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, [dataPostProfile, detailPost, dispatch, slug, auth.token]);
  return (
    <>
      {profile.loading && <Loading className="w-12 h-12"></Loading>}
      {post.length > 0 &&
        post.map((item) => {
          return (
            <div
              key={item._id}
              className="dark:bg-black relative -top-[2px] h-[700px] "
            >
              {!profile.loading && (
                <div className="overflow-y-auto overflow-hidden mt-[15px] laptop:mt-0 laptop:h-full w-full  dark:bg-black dark:border-[#262626] flex-col tablet:flex-row flex h-full border border-slate-300 rounded-[4px] tablet:h-[600px]">
                  <div className="flex flex-col laptop:flex-1 dark:border-[#262626] border border-r-slate-300 border-transparent laptop:w-[60%] laptop:h-full  bg-white dark:bg-black">
                    <div className="flex border   items-center justify-between border-transparent border-b-slate-300 dark:border-b-[#262626] my-2 p-2  laptop:hidden">
                      <div className="flex items-center gap-x-3 ">
                        {
                          <div
                            onClick={onClose}
                            className={`cursor-pointer block laptop:hidden ${
                              hiddenIcon ? "hidden" : "block"
                            }`}
                          >
                            <IconBack></IconBack>
                          </div>
                        }

                        <ImageUser story data={item.user}></ImageUser>
                        <Link
                          to={`/${item.user._id} `}
                          className="hover:text-slate-500 cursor-pointer hover:underline hover:underline-offset-2 text-slate-700 dark:text-white font-[600] text-[14px] flex items-center gap-x-1"
                        >
                          {item.user.fullname}

                          {item.user.isAdmin && <IconAdmin></IconAdmin>}
                        </Link>
                      </div>

                      <PostAction user={auth.user} post={item}></PostAction>
                    </div>

                    <div className="w-full laptop:h-full">
                      <Swiper
                        cssMode={true}
                        navigation={true}
                        pagination={true}
                        mousewheel={true}
                        keyboard={true}
                        speed={300}
                        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                        className="mySwiper"
                      >
                        {item.img.map((item, index) => (
                          <SwiperSlide key={index}>
                            <img
                              className="object-contain w-full laptop:h-full"
                              src={item.imageUrl}
                              alt="postImage"
                            />
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>
                  </div>

                  <div className="w-full flex flex-col shrink-0 laptop:max-w-[350px]  justify-between   dark:text-white ">
                    <div className="hidden laptop:flex p-4 border   tablet:flex items-center justify-between border-transparent border-b-slate-300 dark:border-b-[#262626]">
                      <div className="flex items-center gap-x-3">
                        <ImageUser story data={item.user}></ImageUser>

                        <Link
                          to={`/${item.user._id}`}
                          className="hover:text-slate-500 cursor-pointer hover:underline hover:underline-offset-2 text-slate-700 dark:text-white font-[600] text-[14px] flex items-center gap-x-1"
                        >
                          {item.user.fullname}

                          {item.user.isAdmin && (
                            <IconAdmin className=""></IconAdmin>
                          )}
                        </Link>
                      </div>
                      <PostAction post={item} user={auth.user}></PostAction>
                    </div>
                    {/*  */}
                    {/* absolute top-0 z-10 left-0 dark:bg-black bg-white h-full */}
                    <div
                      className={`  commentBlock w-full px-4 py-2   h-full flex flex-col   overflow-hidden overflow-y-scroll   bg-white dark:bg-black   ${
                        dataPostProfile ? "laptop:h-full" : ""
                      }  ${morePost ? " laptop:flex" : ""}  `}
                    >
                      <div className="sticky left-0 z-10 flex mb-2 laptop:py-3 bg-white -top-5 dark:bg-black gap-x-3">
                        <div className="w-full  max-w-[35px] h-[35px]">
                          <ImageUser
                            smallImg
                            data={item.user}
                            story
                            classNameImg="w-full h-full"
                          ></ImageUser>
                        </div>
                        <div className=" text-[14px] mt-1 bg-white dark:bg-black">
                          <Link to={`/${item.user._id}`} className="">
                            <span className="hover:text-slate-500 cursor-pointer hover:underline hover:underline-offset-2 text-slate-700 dark:text-white font-[600] text-[14px] mr-2">
                              {item.user.fullname}
                            </span>
                          </Link>
                          <div className="w-full font-semibold ">
                            {item.desc}
                          </div>
                        </div>
                      </div>
                      <div className="hidden  laptop:block">
                        <CommentBlock
                          dataPostProfile={dataPostProfile}
                          post={item}
                        ></CommentBlock>
                      </div>
                    </div>

                    <div
                      className={`  border border-transparent dark:border-t-[#262626] border-t-slate-300 flex flex-col`}
                    >
                      <div className="flex flex-col p-4 ">
                        <div className="flex justify-between ">
                          <PostLike post={item} user={item?.user}></PostLike>
                          <PostSave post={item}></PostSave>
                        </div>
                        <p className="uppercase mt-2 text-[9px] text-slate-400">
                          {format(item.createdAt)}
                        </p>
                      </div>
                      <div className={`mt-2 hidden  laptop:block z-10`}>
                        {item.hideComment === false && (
                          <SendComment
                            dataPostProfile={dataPostProfile}
                            post={item}
                          ></SendComment>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
    </>
  );
};

export default DetailPostModalContent;
