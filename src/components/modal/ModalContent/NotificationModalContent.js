import axios from "axios";

import IconClose from "components/icons/IconClose";
import { setIsReload, setMarkNot } from "components/redux/globalSlice";
import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import { v4 } from "uuid";
import ModalBase from "../ModalBase";

const NotificationModalContent = ({
  user,
  notifications,
  socket,
  setNotifications = () => {},
  onClose = () => {},
}) => {
  const { markNot, isReload } = useSelector((state) => state.global);
  // console.log("notifications", notifications);

  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const handleMarkAllRead = async () => {
    try {
      await axios.delete(
        `https://serversocial.vercel.app/notifications/${user.username}`
      );
      dispatch(setMarkNot(!markNot));
      setNotifications([]);
      setShowModal(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleClickNot = () => {
    onClose();
    dispatch(setIsReload(!isReload));
  };

  const displayNotification = ({
    senderName,
    type,
    postId,
    senderImg,
    senderId,
    postImg,
    createdAt,
  }) => {
    const timeCreate = format(createdAt).split(" ");

    const first = Number(timeCreate[0]);
    let result = "";
    if (first >= 10) {
      result = timeCreate.join("")?.slice(0, 3);
    }
    if (first < 10) {
      result = timeCreate.join("")?.slice(0, 2);
    }
    if (timeCreate[1] === "now") {
      result = "now";
    }
    let action = "";
    switch (type) {
      case 1:
        action = "liked your post.";
        break;
      case 2:
        action = "commented your post.";
        break;
      case 3:
        action = "started following you.";
        break;
      case 4:
        action = "sent you a message.";
        break;
      case 8:
        action = "reply your comment.";
        break;
      case 7:
        action = "liked your comment.";
        break;
      default:
        action = "";
        break;
    }

    return (
      <div className="w-full flex items-center  justify-between py-2">
        <Link to={`${senderName}`}>
          <img
            src={senderImg || "https://i.ibb.co/1dSwFqY/download-1.png"}
            className="w-[40px] h-[40px] rounded-full object-cover shrink-0"
            alt=""
          />
        </Link>
        <Link
          to={`${
            type !== 3
              ? `${type === 4 ? `/messenger/${senderId}` : `/post/${postId}`}`
              : `/${senderName}`
          }`}
          className="pl-2 flex flex-col flex-1 w-full "
        >
          <div className="text-[14px]">
            <span className="font-semibold ">{senderName?.slice(0, 15)}</span>{" "}
            {`${action}`} <p className="text-[13px] text-slate-400">{result}</p>
          </div>
        </Link>
        {type === 3 ? (
          <Link
            to={`/${senderName}`}
            className="bg-blue-500  p-1 py-2  rounded-lg text-white flex items-center justify-center"
          >
            <p className="text-[11px]"> View Profile</p>
          </Link>
        ) : (
          <>
            {type === 4 ? (
              <></>
            ) : (
              <>
                <Link to={`/post/${postId}`}>
                  <img
                    src={postImg}
                    className="w-[40px] h-[40px] object-cover shrink-0"
                    alt=""
                  />
                </Link>
              </>
            )}
          </>
        )}
      </div>
    );
  };
  return (
    <div>
      <div className="w-full dark:bg-black">
        <div className="text-xl flex items-center justify-between font-semibold mb-5 p-5 w-full border border-transparent border-b-slate-300">
          Notifications
          <p onClick={onClose} className="cursor-pointer">
            <IconClose></IconClose>
          </p>
        </div>

        <div className="w-full  flex flex-col dark:bg-black h-full max-h-[700px] overflow-y-auto">
          {notifications.length > 0 &&
            notifications.map((not) => (
              <div
                onClick={() => handleClickNot()}
                key={v4()}
                className="hover:bg-blue-100 dark:hover:bg-[#262626] transition-all cursor-pointer px-3"
              >
                {/* {setData(not)} */}
                {displayNotification(not)}
              </div>
            ))}
        </div>

        <div>
          <button
            onClick={() => setShowModal(true)}
            className="w-full mt-auto  p-3 left-0 bg-blue-500 rounded-lg text-white"
          >
            Mark all read
          </button>
        </div>
      </div>
      {showModal && (
        <ModalBase visible={showModal} onClose={() => setShowModal(false)}>
          <div className="w-full  text-center cursor-pointer">
            <p
              onClick={handleMarkAllRead}
              className="w-full p-3 text-blue-500 font-semibold border border-transparent border-b-slate-300"
            >
              Mark all read
            </p>
            <p className="w-full p-3 ">Cancel</p>
          </div>
        </ModalBase>
      )}
    </div>
  );
};

export default NotificationModalContent;
