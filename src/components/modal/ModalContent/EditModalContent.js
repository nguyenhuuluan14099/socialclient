import { Accordion, AccordionItem } from "@szhsin/react-accordion";

import IconDown from "components/icons/IconDown";
import IconUp from "components/icons/IconUp";
import Toggle from "components/toggle/Toggle";
import React, { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import IconBack from "components/icons/IconBack";
import ImageLazy from "components/image/ImageLazy";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import { getPost, updatePost } from "components/redux/actions/postAction";
import Quill from "components/input/Quill";
import IconDelete from "components/icons/IconDelete";
import Icons from "components/icons/Icons";
import { toast } from "react-toastify";
import { toastContent } from "components/toast/toast";

const EditModalContent = ({
  postId,
  showModal,
  hideModalEdit = () => {},
  onClose = () => {},
}) => {
  const [show, setShow] = useState(false);
  const [valueChange, setValueChange] = useState(false);
  const [location, setLocation] = useState("");
  const [images, setImages] = useState([]);
  const [post, setPost] = useState([]);
  const [content, setContent] = useState("");
  const { detailPost, auth } = useSelector((state) => state);

  const dispatch = useDispatch();
  const handleClick = () => {
    setShow(!show);
  };
  const {
    control,
    handleSubmit,
    watch,
    reset,
    register,
    setValue,
    getValues,
    formState: { isSubmitting, errors },
  } = useForm({
    mode: "onBlur",
  });
  const watchHideLike = watch("hideLike") || false;
  const watchHideComment = watch("hideComment") || false;

  useEffect(() => {
    let values = [];
    values = getValues();
    const newValues = { ...values, desc: content, img: images, location };
    const currentValue = post[0];
    if (newValues && currentValue) {
      const checkChange =
        newValues.hideComment !== currentValue.hideComment ||
        newValues.hideLike !== currentValue.hideLike ||
        newValues.desc !== currentValue.desc ||
        newValues.img !== currentValue.img ||
        newValues.location !== currentValue.location;
      checkChange ? setValueChange(true) : setValueChange(false);
    }
  }, [
    content,
    getValues,
    images,
    post,
    watchHideComment,
    watchHideLike,
    location,
  ]);

  const handleUpdatePost = async (values) => {
    if (content.length > 200) {
      toast.error("Caption is maximum 200 characters!", toastContent());
      return;
    }
    const newValues = { ...values, desc: content, img: images, location };

    dispatch(updatePost({ newValues, postId, token: auth.token }));
    onClose();
    hideModalEdit();
  };
  const header = (
    <div
      style={{
        width: "335px",
      }}
      onClick={handleClick}
      className="flex items-center justify-between w-full px-4 py-2 "
    >
      <p>Advanced settings</p>
      <p>{show ? <IconUp></IconUp> : <IconDown></IconDown>}</p>
    </div>
  );

  useEffect(() => {
    async function getData() {
      try {
        dispatch(getPost(detailPost, postId, auth.token));
        if (detailPost.length > 0) {
          const newPost = detailPost.filter((post) => post._id === postId);
          setPost(newPost);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, [detailPost, dispatch, postId, auth.token]);

  useEffect(() => {
    if (post.length > 0) {
      reset(post[0]);
      setImages(post[0].img);
      setContent(post[0].desc);
      setLocation(post[0].location);
    }
  }, [showModal, post, reset]);

  const handleDeleteImage = (id) => {
    if (post.length > 0) {
      const newImg = [...images];
      newImg.splice(id, 1);
      setImages(newImg);
    }
  };
  // console.log("valueChange", valueChange);
  if (!postId) return;
  return (
    <>
      <div className="flex flex-col w-full dark:bg-black">
        <form onSubmit={handleSubmit(handleUpdatePost)}>
          <div className="flex items-center justify-between p-3 border border-transparent border-b-slate-300">
            <p onClick={onClose} className="cursor-pointer xl:hidden ">
              <IconBack></IconBack>
            </p>
            <p className="text-lg font-semibold mx-auto">Update post</p>
            {isSubmitting ? (
              <div className="w-[30px] h-[30px] border-[3px] rounded-full border-blue-500 border-t-transparent animate-spin"></div>
            ) : (
              <>
                <button
                  type="submit"
                  disabled={!valueChange}
                  className={`font-semibold text-[14px]  ${
                    valueChange ? "text-blue-700" : "text-blue-200"
                  }`}
                >
                  Update
                </button>
              </>
            )}
          </div>
          <div className="flex items-center  flex-col xl:flex-row h-[750px] xl:h-[450px]">
            <div className="flex items-center justify-center w-full max-w-[80%] h-full overflow-hidden">
              {/* <Carousel imageList={post.img}></Carousel> */}
              {post.length > 0 && (
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
                  {images &&
                    images.map((i, index) => (
                      <SwiperSlide key={index}>
                        <ImageLazy
                          width="100%"
                          height="100%"
                          className="w-full h-full object-cover relative"
                          url={i}
                        ></ImageLazy>
                        {images.length > 1 && (
                          <div
                            onClick={() => handleDeleteImage(index)}
                            className=" h-10 w-10 rounded-full flex items-center justify-center bg-[#020001] absolute top-1 left-1 text-white border border-slate-800 hover:bg-opacity-1 transition-all"
                          >
                            <IconDelete></IconDelete>
                          </div>
                        )}
                      </SwiperSlide>
                    ))}
                </Swiper>
              )}
            </div>

            <div className=" h-[490px] max-h-full  overflow-y-auto flex flex-col justify-between gap-y-2   w-full max-w-[365px]">
              <div className="p-4 h-[180px] xl:h-[300px] overflow-y-auto shrink-0 flex flex-col gap-y-3">
                <div className="flex items-center gap-x-2">
                  <ImageLazy
                    url={
                      auth.user.profilePicture[0].imageThumb ||
                      "https://i.ibb.co/1dSwFqY/download-1.png"
                    }
                    alt=""
                    className="w-[30px] h-[30px] object-cover rounded-full"
                  />
                  <p className="font-[600]">{auth.user.fullname}</p>
                </div>
                <div className="h-full ">
                  {/* <Quill content={content} setContent={setContent}></Quill> */}
                  <textarea
                    className="h-full resize-none outline-none rounded-lg w-full mx-auto dark:bg-black"
                    value={content}
                    resize="none"
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write a caption..."
                  ></textarea>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Icons
                  className="px-3"
                  content={content}
                  setContent={setContent}
                ></Icons>
                <div className="flex px-3 text-[12px]">
                  <p>
                    {content.length < 200 ? (
                      content.length
                    ) : (
                      <p className="text-red-500">{content.length}</p>
                    )}
                  </p>
                  <p> /200</p>
                </div>
              </div>
              <div className="w-full  flex flex-col  mb-[100px] ">
                <div className="flex items-center justify-between p-2 px-3 border border-b-transparent border-slate-300">
                  {/* <Input
                    control={control}
                    name="location"
                    type="text"
                    className="p-2 border-none outline-none dark:bg-black"
                    placeholder="Add location"
                  /> */}
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    // {...register("location")}
                    className="p-2 border-none outline-none dark:bg-black"
                    placeholder="Add location"
                  />
                  <p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                      />
                    </svg>
                  </p>
                </div>

                <div className="mb-10">
                  <div>
                    <Accordion className="w-full max-w-[400px]">
                      <AccordionItem
                        header={header}
                        className="w-full cursor-pointer max-w-[400px]  border border-slate-300"
                      >
                        <div className="flex flex-col justify-around">
                          <div className="flex flex-col p-4 gap-y-2">
                            <div className="flex items-center justify-between">
                              <p>Hide like and view counts on this post</p>
                              <Toggle
                                on={watchHideLike === true}
                                onClick={() =>
                                  setValue("hideLike", !watchHideLike)
                                }
                              ></Toggle>
                            </div>
                            <div>
                              <p className="text-[13px] text-slate-400 ">
                                Only you will see the total number of likes and
                                views on this post. You can change this later by
                                going to the ··· menu at the top of the post. To
                                hide like counts on other people's posts, go to
                                your account settings
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-col p-4 gap-y-2">
                            <div className="flex items-center justify-between">
                              <p>Turn off commenting</p>
                              <Toggle
                                on={watchHideComment === true}
                                onClick={() =>
                                  setValue("hideComment", !watchHideComment)
                                }
                              ></Toggle>
                            </div>
                            <div>
                              <p className="text-[13px] text-slate-400 ">
                                You can change this later by going to the ···
                                menu at the top of your post.
                              </p>
                            </div>
                          </div>
                        </div>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditModalContent;
