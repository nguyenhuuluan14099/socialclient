import IconBtnDots from "components/icons/IconBtnDots";
import ModalBase from "components/modal/ModalBase";
import React, { useState } from "react";
import { format } from "date-fns";
import ImageLazy from "components/image/ImageLazy";
import { useDispatch, useSelector } from "react-redux";
import { deleteMessage } from "components/redux/actions/messageAction";

const Message = ({ message, data, id, user }) => {
  const { auth, socket } = useSelector((state) => state);
  const [showValid, setShowValid] = useState(false);
  const dispatch = useDispatch();
  const handleDeleteMessage = () => {
    if (data) {
      dispatch(deleteMessage({ data, msg: message, auth, socket, id }));
      setShowValid(false);
    }
  };
  return (
    <div className="dark:text-white">
      <div
        className={` flex mx-3 message-text    gap-x-2 my-3 ${
          message.sender === auth.user._id ? " flex-row-reverse" : ""
        }`}
      >
        <img
          alt="user"
          src={
            message.sender === auth.user._id
              ? auth.user.profilePicture[0].imageThumb
              : user[0]?.profilePicture[0].imageThumb
          }
          className="w-[30px] h-[30px] rounded-full object-cover"
        />
        <div
          className={`h-full flex dark:text-white   flex-col ${
            message.sender === auth.user._id ? "items-end" : ""
          } -z-6`}
        >
          <div
            className={`dark:text-white h-full  border dark:border-[#262626]  relative   group px-3  py-2 rounded-lg flex flex-col gap-3 ${
              message.sender === auth.user._id
                ? "bg-[#EFEFEF] dark:bg-[#262626]   text-[#262626] "
                : " text-[#262626] dark:bg-black   bg-white"
            }`}
          >
            {message.media &&
              message.media.map((media) => (
                <div key={media.imageId}>
                  <img
                    src={media.imageThumb}
                    alt="imageMess"
                    className=" w-[250px] rounded-lg"
                  />
                </div>
              ))}
            <div
              className={` ${
                message.sender === auth.user._id ? "ml-auto" : "mr-auto"
              } `}
            >
              <div className="flex flex-col dark:text-white">
                <p>{message.text}</p>
              </div>
            </div>

            <div
              className={`absolute invisible   right-full  cursor-pointer top-2/4 flex items-center justify-between -translate-y-2/4 p-1 w-[200px] h-full ${
                message.sender === auth.user._id ? "group-hover:visible" : ""
              }`}
            >
              <div></div>
              <div
                onClick={() => setShowValid(true)}
                className="w-[35px] h-[35px] my-auto rounded-full border border-slate-300 flex items-center justify-center"
              >
                <IconBtnDots></IconBtnDots>
              </div>
            </div>
          </div>

          <div
            className={`text-slate-400  dark:text-slate-500 ${
              message.sender === auth.user._id ? "ml-auto" : "mr-auto"
            }   text-[9px] italic`}
          >
            {format(new Date(message.createdAt), "dd/MM/yyyy") +
              "   " +
              format(new Date(message.createdAt), "HH:mm")}
          </div>
        </div>

        {showValid && (
          <ModalBase visible={showValid} onClose={() => setShowValid(false)}>
            <div className="flex flex-col w-full text-center cursor-pointer">
              <p
                onClick={handleDeleteMessage}
                className="w-full p-3 font-semibold text-red-500 border border-transparent border-b-slate-300"
              >
                Delete
              </p>

              <p className="p-3" onClick={() => setShowValid(false)}>
                Cancel
              </p>
            </div>
          </ModalBase>
        )}
      </div>
    </div>
  );
};

export default Message;
