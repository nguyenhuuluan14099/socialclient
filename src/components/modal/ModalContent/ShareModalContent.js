import Dropdown from "components/dropdown/Dropdown";
import SettingContentDropdown from "components/dropdown/SettingContentDropdown";
import SettingPost from "components/dropdown/SettingPost";
import ImageUpload from "components/image/ImageUpload";
import React, { useEffect, useMemo, useState } from "react";
import { useController, useForm } from "react-hook-form";
import { Accordion, AccordionItem } from "@szhsin/react-accordion";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Toggle from "components/toggle/Toggle";
import TextArea from "components/textarea/TextArea";
import Input from "components/input";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "components/context/Auth-Context";
import { useDispatch, useSelector } from "react-redux";
import { toggleUpdate } from "components/redux/globalSlice";

import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import IconClose from "components/icons/IconClose";
import ModalBase from "../ModalBase";
const ShareModalContent = ({ onClose = () => {} }) => {
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [user, setUser] = useState([]);
  const [content, setContent] = useState("");
  const { isUpdate } = useSelector((state) => state.global);
  const dispatch = useDispatch();
  const handleClick = () => {
    setShow(!show);
  };
  const { user: currentUser } = useAuth();

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
  // console.log("currentUser", currentUser);
  const watchHideLike = watch("hideLike");
  const watchHideComment = watch("hideComment");
  const handleSharePost = async (values) => {
    if (values.hasOwnProperty("img_post") === false) {
      toast.error("Please choose a picture!");
      return;
    }
    //values.desc

    const valueUser = {
      userImg: currentUser.profilePicture.thumb
        ? currentUser.profilePicture.thumb
        : currentUser.profilePicture,
      userName: currentUser.username,
    };
    const post = {
      userId: currentUser._id,
      user: valueUser,
      desc: content,
      img: values.img_post,
      location: values.location,
      hideLike: values.hideLike,
      hideComment: values.hideComment,
    };
    console.log("values", post);
    // console.log("content", content);
    try {
      await axios.post("http://localhost:5000/posts/", post);
      reset({
        desc: "",
        location: "",
        hideLike: false,
        hideComment: false,
        img_post: "",
      });

      toast.success("Create post successfully!");
      dispatch(toggleUpdate(!isUpdate));
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const modules = useMemo(
    () => ({
      toolbar: [
        ["bold", "italic", "underline", "strike"],
        ["blockquote"],
        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: "ordered" }, { list: "bullet" }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["link", "image"],
      ],
    }),
    []
  );

  useEffect(() => {
    async function getUser() {
      try {
        const res = await axios.get(
          `http://localhost:5000/users?userId=${currentUser._id}`
        );
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getUser();
  }, [currentUser._id]);

  const header = (
    <div
      style={{
        width: "335px",
      }}
      onClick={handleClick}
      className="flex items-center  justify-between w-full  px-4 py-2 "
    >
      <p>Advanced settings</p>
      <p>
        {show ? (
          <>
            <span>
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
                  d="M4.5 15.75l7.5-7.5 7.5 7.5"
                />
              </svg>
            </span>
          </>
        ) : (
          <>
            <span>
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
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </span>
          </>
        )}
      </p>
    </div>
  );
  return (
    <div className="flex flex-col  w-full overflow-hidden dark:bg-black">
      <form onSubmit={handleSubmit(handleSharePost)}>
        <div className="flex items-center justify-between p-3 border border-transparent border-b-slate-300">
          <div className="cursor-pointer" onClick={() => setShowConfirm(true)}>
            <IconClose></IconClose>
          </div>
          <p className="text-lg ">Create new post</p>
          {isSubmitting ? (
            <>
              <img
                src="/logoHome.png"
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
        {/* h-[500px] */}
        <div className="flex flex-col xl:flex-row top-0  w-full  items-center ">
          <div className="flex items-center justify-center w-full max-w-[80%] h-full max-h-[300px]">
            <ImageUpload onChange={setValue} name="img_post"></ImageUpload>
          </div>

          <div className="  h-[400px] max-h-full overflow-x-hidden overflow-y-scroll flex flex-col justify-between gap-y-2   w-full max-w-[350px]">
            <div className="p-4 h-[200px] shrink-0 flex flex-col gap-y-3">
              <div className="flex items-center gap-x-2">
                <img
                  src={
                    user?.profilePicture?.thumb ||
                    "https://i.ibb.co/1dSwFqY/download-1.png"
                  }
                  alt=""
                  className="w-[30px] h-[30px] object-cover rounded-full"
                />
                <p className="font-[500]">{user?.username}</p>
              </div>
              <div className="entry-content dark:text-white dark:bg-black text-black bg-white mt-2 h-[260px] overflow-y-auto   ">
                {
                  <ReactQuill
                    placeholder="Write a caption..."
                    modules={modules}
                    theme="snow"
                    value={content}
                    onChange={setContent}
                  />
                }
              </div>
              {/* <TextArea control={control} name="desc"></TextArea> */}
              {/* textarea here */}
            </div>
            <div className="w-full mt-auto flex flex-col   ">
              <div className="px-3 p-1 border border-b-transparent border-slate-300 flex items-center justify-between">
                <Input
                  control={control}
                  name="location"
                  type="text"
                  className="border-none dark:bg-black  outline-none p-2 "
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
                        <div className="flex flex-col  gap-y-2 p-4">
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
                        <div className="flex flex-col  gap-y-2 p-4">
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
                <div className="flex flex-col gap-y-2 items-center py-3 px-5">
                  <p className="text-xl font-semibold">Discard post?</p>
                  <p className="text-[14px] text-slate-400">
                    If you leave, your edits won't be saved.
                  </p>
                </div>

                <div
                  onClick={onClose}
                  className=" cursor-pointer  border p-3 text-center  w-full border-transparent border-t-slate-300"
                >
                  <p className="text-red-500 font-semibold">Discard</p>
                </div>
                <div
                  onClick={() => setShowConfirm(false)}
                  className="cursor-pointer  border p-3 w-full text-center border-t-slate-300  border-transparent"
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
