import axios from "axios";
import { useAuth } from "components/context/Auth-Context";
import IconBtnDots from "components/icons/IconBtnDots";
import ModalBase from "components/modal/ModalBase";
import { setMessage, setReloadMes } from "components/redux/globalSlice";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { format } from "timeago.js";
import { format } from "date-fns";

const Message = ({ own = false, message, yourFriend, myUser }) => {
  const [showValid, setShowValid] = useState(false);
  const [showDate, setShowDate] = useState(false);
  const { reloadMes } = useSelector((state) => state.global);
  const dispatch = useDispatch();
  const handleDeleteMessage = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/messages/${id}`);
      dispatch(setReloadMes(!reloadMes));
    } catch (error) {
      console.log(error);
    }
  };
  const { user } = useAuth();

  return (
    <div className="dark:text-white">
      <div
        className={` flex mx-3     gap-x-2 my-3 ${
          own ? " flex-row-reverse" : ""
        }`}
      >
        <img
          src={
            (own
              ? myUser?.profilePicture?.thumb
              : yourFriend?.profilePicture?.thumb) ||
            "https://i.ibb.co/1dSwFqY/download-1.png"
          }
          alt=""
          className="w-[30px] h-[30px] rounded-full object-cover"
        />
        <div
          className={` flex dark:text-white   flex-col ${
            own ? "items-end" : ""
          } -z-6`}
        >
          <div
            className={`dark:text-white max-w-[300px] border dark:border-[#262626]  relative   group px-3  py-2 rounded-lg flex flex-col ${
              own
                ? "bg-[#EFEFEF] dark:bg-[#262626]   text-[#262626] "
                : " text-[#262626] dark:bg-black   bg-white"
            }`}
          >
            {message.imageMes && (
              <img
                src={message.imageMes.url}
                className="object-contain rounded-lg w-full h-full"
                alt=""
              />
            )}
            <div className={` ${own ? "ml-auto" : "mr-auto"} `}>
              <div className="dark:text-white flex flex-col">
                <p>{message?.text}</p>
                <div
                  className={`text-slate-400  dark:text-slate-500 ${
                    own ? "ml-auto" : "mr-auto"
                  }   text-[10px] italic`}
                >
                  {/* {format(message?.createdAt)} */}

                  <div
                    onClick={() => setShowDate(!showDate)}
                    title={format(new Date(message?.createdAt), "dd/MM/yyyy")}
                  >
                    {format(new Date(message?.createdAt), "HH:mm")}
                    {showDate &&
                      format(new Date(message?.createdAt), "--dd/MM/yyyy")}
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`absolute invisible   right-full  cursor-pointer top-2/4 flex items-center justify-between -translate-y-2/4 p-1 w-[200px] h-full ${
                message.sender === user._id ? "group-hover:visible" : ""
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
        </div>

        {showValid && (
          <ModalBase visible={showValid} onClose={() => setShowValid(false)}>
            <div className="w-full cursor-pointer flex flex-col text-center">
              <p
                onClick={() => handleDeleteMessage(message._id)}
                className="text-red-500 font-semibold w-full border border-transparent  border-b-slate-300 p-3"
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
