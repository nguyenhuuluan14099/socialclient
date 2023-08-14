import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import useSound from "use-sound";
import soundSend from "components/sounds/soundSend.mp3";
import { imageUpload } from "components/image/imageUploadMes";
import { toast } from "react-toastify";
import axios from "axios";
import { io } from "socket.io-client";

const SendMessage = ({
  socketMes,
  socket,
  currentChat,
  user,
  myUser,
  friendCurrent,
  setMessages = () => {},
  setArrivalMessages = () => {},
  messages,
}) => {
  const [newMessage, setNewMessage] = useState("");
  const [textHeight, setTextHeight] = useState("");
  const [show, setShow] = useState(false);
  const [play] = useSound(soundSend, { volume: 0.75 });
  const [media, setMedia] = useState([]);
  const [arrImage, setArrImage] = useState({});
  const [reviewImage, setReviewImage] = useState({});

  const inputClickKey = useRef();
  // get value sendMess
  const handleChangeBlock = (e) => {
    setNewMessage(e.target.value);

    setTextHeight("");
  };

  //change height sendMess block
  useLayoutEffect(() => {
    setTextHeight(`${inputClickKey?.current?.scrollHeight}px`);
    if (inputClickKey?.current?.scrollHeight >= 85) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [newMessage]);

  //sendmessage
  const handleSendMessage = async (type) => {
    play();
    let newArr = {};
    if (media.length > 0) newArr = await imageUpload(media);
    setArrImage(newArr);
    // console.log("newArr", newArr);
    const message = {
      conversationId: currentChat._id,
      sender: user._id,
      text: newMessage,
      imageMes: newArr,
    };
    const receiverId = currentChat?.members.find(
      (member) => member !== user._id
    );

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
      imageMes: newArr,
    });

    try {
      // dispatch(setShowLoading(true));
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/messages/`,
        message
      );
      // dispatch(setShowLoading(false));

      setMessages([...messages, res.data]);
      setNewMessage("");
      setArrImage({});
      setMedia([]);
    } catch (error) {
      console.log(error);
    }

    const dataNots = {
      senderName: myUser.username,
      receiverName:
        friendCurrent.username === myUser.username
          ? null
          : friendCurrent.username,
      type,
      senderImg: myUser.profilePicture.thumb,
      senderId: myUser._id,
      imageMes: newArr,
    };
    socketMes?.emit("sendNotification", dataNots);
    try {
      await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/notifications/`,
        dataNots
      );
      // dispatch(setReloadMes(!reloadMes));
      setReviewImage({});
      setMedia([]);
    } catch (error) {
      console.log(error);
    }
  };

  //send mess with image
  const handleImageMess = (e) => {
    setReviewImage({ [e.target.name]: URL.createObjectURL(e.target.files[0]) });

    const files = [...e.target.files];

    const arrImg = [];
    files.forEach((file) => {
      if (!file) return toast.error("File does not exist.");
      if (file.size > 1024 * 1024 * 5)
        return toast.error("Image/video largest is 5mb.");

      arrImg.push(file);
    });
    setMedia([...media, ...arrImg]);
  };

  const handleDeleteImageReview = () => {
    setMedia([]);
    setReviewImage({});
  };

  //
  useEffect(() => {
    //     socket.current = io("ws://localhost:8900");
    socket.current = io("https://endsocketne1.onrender.com");
    socket.current.on("getMessages", (data) => {
      setArrivalMessages({
        sender: data.senderId,
        text: data.text,
        imageMes: arrImage,
        createdAt: Date.now(),
      });
    });
    return () => {
      socket.current.disconnect();
    };
  }, [arrImage, setArrivalMessages, socket]);
  return (
    <>
      <textarea
        ref={inputClickKey}
        onChange={handleChangeBlock}
        value={newMessage}
        style={{
          height: textHeight,
        }}
        placeholder="Message"
        className={`w-full px-2 pt-3 text-[14px] dark:bg-black dark:text-white   h-[40px] max-h-[80px]  outline-none resize-none    b   mx-2 ${
          show ? "overflow-y-scroll" : "overflow-hidden"
        }`}
      ></textarea>
      <div className="flex items-center gap-x-2  w-full max-w-[80px] justify-between ">
        {reviewImage.imageMes && (
          <div className="imgReview relative flex-1">
            <img
              src={reviewImage.imageMes}
              className="w-[35px] h-[35px] object-cover rounded-xs"
              alt=""
            />
            <p
              onClick={handleDeleteImageReview}
              className="absolute cursor-pointer -top-2 -right-2 w-[5px] h-[5px] bg-slate-400  rounded-full flex items-center justify-center p-2 text-white"
            >
              &times;
            </p>
          </div>
        )}
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
            onChange={handleImageMess}
          />
        </label>
      </div>
      {/* <ImageUpload onChange={setValue} name="imageMes"></ImageUpload> */}
      {newMessage || reviewImage.imageMes ? (
        <>
          <button
            onClick={() => handleSendMessage(4)}
            className={`  p-3 px-2  text-[15px] ${
              newMessage || reviewImage.imageMes
                ? "font-semibold text-blue-500"
                : "text-blue-300"
            }`}
          >
            Send
          </button>
        </>
      ) : (
        <>
          <p className="none-focus cursor-pointer px-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-7 h-7 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
          </p>
        </>
      )}
    </>
  );
};

export default SendMessage;
