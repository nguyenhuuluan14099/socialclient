import IconHeart from "components/icons/IconHeart";
import IconHeartNone from "components/icons/IconHeartNone";
import IconMes from "components/icons/IconMes";
import Icons from "components/icons/Icons";
import { imageUpload } from "components/image/imageUploadMes";
import Loading from "components/loading/Loading";
import { addMessage } from "components/redux/actions/messageAction";
import { createNotify } from "components/redux/actions/notifyAction";
import { toastContent } from "components/toast/toast";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { v4 } from "uuid";

const SendMes = ({ id, handleScroll = () => {} }) => {
  const [newMessage, setNewMessage] = useState("");
  const [loadingMedia, setLoadingMedia] = useState(false);
  const inputRef = useRef();
  const { auth, socket } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [media, setMedia] = useState([]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [handleScroll, id]);
  const handleSubmit = async (e, icon) => {
    e.preventDefault();
    // if (!newMessage.trim() && media.length === 0) return;
    setNewMessage("");
    setMedia([]);
    setLoadingMedia(true);
    let imageMes = [];
    if (media.length > 0) imageMes = await imageUpload(media);

    const msg = {
      sender: auth.user._id,
      recipient: id,
      text: newMessage || icon,
      media: imageMes,

      createdAt: new Date().toISOString(),
    };
    setLoadingMedia(false);

    dispatch(addMessage({ msg, auth, socket, id }));

    handleScroll && handleScroll();
  };

  const handleImageMess = (e) => {
    const files = [...e.target.files];
    let err = "";
    let newMedia = [];
    files.imageReview = [];
    files.forEach((file) => {
      if (!file) return (err = "File does not exist.");
      if (file.size > 1024 * 1024 * 5)
        return (err = "File does not larger 5mb.");
      return newMedia.push(file);
    });
    if (err) toast.error(err, toastContent());

    setMedia([...media, ...newMedia]);
  };

  const handleDeleteImageReview = (index) => {
    const newArr = [...media];
    newArr.splice(index, 1);
    setMedia(newArr);
  };

  return (
    <>
      <form className=" mt-auto   justify-between px-2 py-1 rounded-[40px] flex-col  flex items-center mb-3    border border-b-slate-300 dark:border-[#262626] relative">
        {media.length > 0 && (
          <div className="flex items-center gap-x-2   w-full  p-2">
            {media.map((img, index) => {
              console.log(URL.createObjectURL(img));
              return (
                <div key={v4()} className="relative  imgReview">
                  <img
                    src={URL.createObjectURL(img)}
                    className="w-[50px] h-[50px] object-cover rounded-xs"
                    alt=""
                  />
                  <p
                    onClick={() => handleDeleteImageReview(index)}
                    className="absolute cursor-pointer -top-2 -right-2 w-[5px] h-[5px]  rounded-full flex items-center  border justify-center p-2 text-white"
                  >
                    &times;
                  </p>
                </div>
              );
            })}
            <label className="cursor-pointer w-[60px]  ">
              <p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>
              </p>
              <input
                type="file"
                id="file"
                name="imageMes"
                hidden
                multiple
                accept="image/*,video/*"
                onChange={(e) => handleImageMess(e)}
              />
            </label>
          </div>
        )}

        <div className="flex w-full items-center">
          <Icons
            position="left-0"
            content={newMessage}
            setContent={setNewMessage}
          ></Icons>
          <input
            ref={inputRef}
            type="text"
            onChange={(e) => setNewMessage(e.target.value)}
            value={newMessage}
            placeholder="Message"
            className={`w-full  px-2 text-[14px] dark:bg-transparent dark:text-white   h-[40px] max-h-[80px]  outline-none resize-none      mx-2 `}
          ></input>

          <>
            {newMessage || media.length > 0 ? (
              <div className="">
                <button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={newMessage || media.length > 0 ? false : true}
                  className={`p-3 px-2  text-[15px] font-semibold text-blue-500 }`}
                >
                  Send
                </button>
              </div>
            ) : (
              <>
                <label className="cursor-pointer w-[40px] shrink-0 ml-auto">
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
                        d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                      />
                    </svg>
                  </p>
                  <input
                    type="file"
                    id="file"
                    name="imageMes"
                    hidden
                    multiple
                    accept="image/*,video/*"
                    onChange={(e) => handleImageMess(e)}
                  />
                </label>
                {loadingMedia ? (
                  <div>
                    <img
                      className="w-7 h-7 mx-2 animate-spin"
                      src="/logoHome.png"
                      alt="loading"
                    />
                  </div>
                ) : (
                  <div onClick={(e) => handleSubmit(e, "❤️")}>
                    <IconHeart className="text-red-500"></IconHeart>
                  </div>
                )}
              </>
            )}
          </>
        </div>
      </form>
    </>
  );
};

export default SendMes;
