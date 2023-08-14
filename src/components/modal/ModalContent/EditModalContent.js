import { Accordion, AccordionItem } from "@szhsin/react-accordion";
import axios from "axios";
import { useAuth } from "components/context/Auth-Context";
import IconDown from "components/icons/IconDown";
import IconUp from "components/icons/IconUp";
import ImageUpload from "components/image/ImageUpload";
import Input from "components/input";
import { toggleUpdate } from "components/redux/globalSlice";
import Toggle from "components/toggle/Toggle";
import React, { useMemo, useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import IconBack from "components/icons/IconBack";
import ImageLazy from "components/image/ImageLazy";

const EditModalContent = ({
  postId,
  showModal,
  hideModalEdit = () => {},
  onClose = () => {},
}) => {
  const [show, setShow] = useState(false);
  const [user, setUser] = useState([]);
  const [post, setPost] = useState([]);
  const [content, setContent] = useState("");

  const { user: currentUser } = useAuth();

  const { isUpdate } = useSelector((state) => state.global);
  const dispatch = useDispatch();
  useEffect(() => {
    async function getUser() {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/users/${currentUser._id}`
        );
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getUser();
  }, [currentUser._id]);
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
  });
  const watchHideLike = watch("hideLike");
  const watchHideComment = watch("hideComment");
  const handleUpdatePost = async (values) => {
    const data = {
      userId: currentUser._id,
      desc: content,
      location: values.location,
      hideComment: values.hideComment,
      hideLike: values.hideLike,
    };
    try {
      await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/posts/${postId}`,
        data
      );
      toast.success("Updated post successfully!");
      hideModalEdit();
      dispatch(toggleUpdate(!isUpdate));
    } catch (error) {
      console.log(error);
    }
  };

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
            <IconUp></IconUp>
          </>
        ) : (
          <>
            <IconDown></IconDown>
          </>
        )}
      </p>
    </div>
  );
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
    async function getPost() {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/posts/${postId}`
        );
        setPost(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getPost();
  }, [postId]);

  useEffect(() => {
    reset(post);
    setContent(post.desc);
  }, [showModal, post, reset]);
  if (!postId) return;
  return (
    <>
      <div className="flex flex-col w-full  dark:bg-black">
        <form onSubmit={handleSubmit(handleUpdatePost)}>
          <div className="flex items-center  justify-between p-3 border border-transparent border-b-slate-300">
            <p onClick={onClose} className="cursor-pointer">
              <IconBack></IconBack>
            </p>
            <p className="text-lg font-semibold">Update post</p>
            {isSubmitting ? (
              <div className="w-[30px] h-[30px] border-[3px] rounded-full border-blue-500 border-t-transparent animate-spin"></div>
            ) : (
              <>
                <button
                  type="submit"
                  className="text-blue-400 text-[14px] font-semibold"
                >
                  Update
                </button>
              </>
            )}
          </div>
          <div className="flex items-center  flex-col xl:flex-row h-[750px] xl:h-[500px]">
            <div className="flex items-center justify-center w-full  h-full max-h-[299px] xl:max-h-[500px]">
              <ImageUpload
                imageViewEdit={post?.img?.url}
                onChange={setValue}
                name="img_post"
              ></ImageUpload>
            </div>

            <div className=" h-[490px] max-h-full  overflow-y-auto flex flex-col justify-between gap-y-2   w-full max-w-[350px]">
              <div className="p-4 h-[180px] xl:h-[300px] overflow-y-auto shrink-0 flex flex-col gap-y-3">
                <div className="flex items-center gap-x-2">
                  <ImageLazy
                    url={
                      user?.profilePicture?.thumb ||
                      "https://i.ibb.co/1dSwFqY/download-1.png"
                    }
                    alt=""
                    className="w-[30px] h-[30px] object-cover rounded-full"
                  />
                  <p className="font-[600]">{user?.username}</p>
                </div>
                <div className="entry-content   h-full ">
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
              </div>
              <div className="w-full  flex flex-col  mb-[100px] ">
                <div className="px-3 p-2 border border-b-transparent border-slate-300 flex items-center justify-between">
                  <Input
                    control={control}
                    name="location"
                    type="text"
                    className="border-none outline-none p-2 dark:bg-black"
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
