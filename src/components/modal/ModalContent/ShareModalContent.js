import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Accordion, AccordionItem } from "@szhsin/react-accordion";
import Toggle from "components/toggle/Toggle";
import Input from "components/input";
import { toast } from "react-toastify";
import "react-quill/dist/quill.snow.css";
import IconClose from "components/icons/IconClose";
import ModalBase from "../ModalBase";
import ImageLazy from "components/image/ImageLazy";
import { toastContent } from "components/toast/toast";
import IconUp from "components/icons/IconUp";
import IconDown from "components/icons/IconDown";
import IconPhoto from "components/icons/IconPhoto";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import { imageUpload } from "components/image/imageUploadMes";
import { postDataApi } from "utils/fetchData";
import { useDispatch, useSelector } from "react-redux";
import { POST_TYPES } from "components/redux/actions/postAction";
import { createNotify } from "components/redux/actions/notifyAction";
import Icons from "components/icons/Icons";

const ShareModalContent = ({ onClose = () => {} }) => {
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [content, setContent] = useState("");
  const [media, setMedia] = useState([]);
  const dispatch = useDispatch();
  const [imageReview, setImageReview] = useState([]);
  const { auth, socket } = useSelector((state) => state);
  const handleClick = () => {
    setShow(!show);
  };

  const {
    control,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      desc: "",
      location: "",
      hideLike: false,
      hideComment: false,
    },
  });
  const watchHideLike = watch("hideLike");
  const watchHideComment = watch("hideComment");

  const handleChooseImage = (e) => {
    const files = [...e.target.files];

    let arrImage = [];
    files.imageReview = [];
    let err = "";
    files.forEach((file) => {
      if (!file) return (err = "Image does not exist!");
      if (file.size > 5 * 1024 * 1024)
        return (err = "Image/video largest is 5mb");
      if (
        file.type !== "image/jpeg" &&
        file.type !== "image/png" &&
        file.type !== "video"
      ) {
        return (err = "file format is incorrect");
      }
      files.imageReview.push(window.URL.createObjectURL(file));
      return arrImage.push(file);
    });
    if (err) toast.error(err, toastContent());
    setImageReview([...imageReview, ...files.imageReview]);
    setMedia([...media, ...arrImage]);
  };

  const handleSharePost = async (values) => {
    if (media.length === 0) {
      toast.error("Please select a picture!", toastContent());
      return;
    } else if (content.length > 200) {
      toast.error("Caption is maximum 200 characters!", toastContent());
      return;
    }
    let arrayImage = [];
    try {
      if (media) arrayImage = await imageUpload(media);

      const post = {
        userId: auth.user._id,
        desc: content,
        img: arrayImage,
        location: values.location,
        hideLike: values.hideLike,
        hideComment: values.hideComment,
      };
      const res = await postDataApi("posts", post, auth.token);
      dispatch({
        type: POST_TYPES.CREATE_POST,
        payload: { ...res.data.newPost, user: auth.user },
      });
      toast.success(res.data.msg, toastContent());

      const msg = {
        id: res.data.newPost._id,
        recipients: res.data.newPost.user.followers,
        url: `/post/${res.data.newPost._id}`,
        text: "Add a new post.",
        content,
        image: res.data.newPost.img[0].imageThumb,
      };
      dispatch(createNotify({ msg, auth, socket }));
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const header = (
    <div
      onClick={handleClick}
      style={{ width: "400px" }}
      className="flex items-center laptop:w-[335px] justify-between w-full px-4 py-2 "
    >
      <p>Advanced settings</p>
      <p>{show ? <IconUp></IconUp> : <IconDown></IconDown>}</p>
    </div>
  );

  return (
    <div className="flex flex-col  w-full dark:bg-black ">
      <form
        onSubmit={handleSubmit(handleSharePost)}
        className="h-[500px] flex flex-col "
      >
        <div className="flex shrink-0 h-[50px] items-center justify-between p-3 border border-transparent dark:border-b-[#262626]">
          <div
            className="cursor-pointer laptop:hidden"
            onClick={() => setShowConfirm(true)}
          >
            <IconClose></IconClose>
          </div>
          <div></div>
          <p className="text-lg ">Create new post</p>
          {isSubmitting ? (
            <>
              <ImageLazy
                url="/logoHome.png"
                className="w-[23px] object-cover animate-spin h-[23px]"
                alt=""
              />
            </>
          ) : (
            <>
              <button type="submit" className="text-blue-400 text-[14px]">
                Share
              </button>
            </>
          )}
        </div>
        <div className="flex flex-1 laptop:h-full laptop:max-h-[450px] flex-col laptop:flex-row top-0  w-full  ">
          <div className="h-[400px] flex items-center justify-center w-full laptop:max-w-[80%] laptop:h-full overflow-hidden">
            {imageReview.length > 0 ? (
              <>
                <Swiper
                  cssMode={true}
                  navigation={true}
                  pagination={true}
                  mousewheel={true}
                  keyboard={true}
                  modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                  className="mySwiper"
                >
                  {imageReview.map((i, index) => (
                    <SwiperSlide key={index}>
                      <ImageLazy
                        width="100%"
                        height="100%"
                        className="object-cover w-full h-[400px]"
                        url={i}
                      ></ImageLazy>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </>
            ) : (
              <>
                <div
                  className={`w-full  max-w-[200px] flex items-center  flex-col gap-y-3`}
                >
                  <IconPhoto></IconPhoto>
                  <p className="text-xl font-semibold">Choose your photo</p>
                  <label
                    htmlFor="image-input"
                    className="px-3 py-2 text-white transition-all bg-blue-500 rounded-lg cursor-pointer hover:bg-blue-800"
                  >
                    Select from computer
                    <input
                      accept="image/png, image/gif, image/jpeg"
                      id="image-input"
                      type="file"
                      multiple
                      onChange={handleChooseImage}
                      hidden
                    />
                  </label>
                </div>
              </>
            )}
          </div>

          <div className="  h-[400px] max-h-full overflow-x-hidden overflow-y-scroll flex flex-col justify-between gap-y-2   w-full laptop:max-w-[350px]">
            <div className="p-4 h-[155px] laptop:h-[200px] shrink-0 flex flex-col gap-y-3 ">
              <div className="flex items-center gap-x-2">
                <img
                  src={
                    auth.user.profilePicture[0].imageThumb ||
                    "https://i.ibb.co/1dSwFqY/download-1.png"
                  }
                  alt=""
                  className="w-[30px] h-[30px] object-cover rounded-full"
                />
                <p className="font-[500]">{auth.user.fullname}</p>
              </div>
              <div className=" dark:text-white dark:bg-black text-black bg-white mt-2 h-[260px] ">
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
                position="left-0"
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
            <div className="flex flex-col w-full  ">
              <div className="flex items-center justify-between p-1 border border-b-transparent dark:border-[#262626]">
                <Input
                  control={control}
                  name="location"
                  type="text"
                  className="p-2 border-none outline-none dark:bg-black "
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
                  <Accordion className="w-full ">
                    <AccordionItem
                      header={header}
                      className="w-full cursor-pointer   border dark:border-[#262626]"
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
                              You can change this later by going to the ··· menu
                              at the top of your post.
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

          {showConfirm && (
            <ModalBase
              visible={showConfirm}
              animationRoot="secondary"
              onClose={() => setShowConfirm(false)}
            >
              <div className="flex flex-col items-center">
                <div className="flex flex-col items-center px-5 py-3 gap-y-2">
                  <p className="text-xl font-semibold">Discard post?</p>
                  <p className="text-[14px] text-slate-400">
                    If you leave, your edits won't be saved.
                  </p>
                </div>

                <div
                  onClick={onClose}
                  className="w-full p-3 text-center border border-transparent cursor-pointer border-t-slate-300"
                >
                  <p className="font-semibold text-red-500">Discard</p>
                </div>
                <div
                  onClick={() => setShowConfirm(false)}
                  className="w-full p-3 text-center border border-transparent cursor-pointer border-t-slate-300"
                >
                  <p className="">Cancel</p>
                </div>
              </div>
            </ModalBase>
          )}
        </div>
      </form>
    </div>
  );
};

export default ShareModalContent;
