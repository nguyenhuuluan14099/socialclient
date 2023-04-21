import axios from "axios";
import { useAuth } from "components/context/Auth-Context";
import IconSmile from "components/icons/IconSmile";
import useSound from "use-sound";
import soundSend from "components/sounds/soundSend.mp3";

import {
  addComment,
  setMarkNot,
  setReplyComment,
  toggleRemoveTag,
  toggleViewCmt,
} from "components/redux/globalSlice";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const SendComment = ({
  post,
  dataPostProfile,
  myUser,
  receiverName,
  socket,
  replyData = "",
  setReplyData = () => {},
}) => {
  // console.log("myUser", myUser);
  // console.log("receiverName", receiverName);
  // console.log("replydata", replyData);
  const [text, setText] = useState("");

  const [show, setShow] = useState(false);
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState([]);
  const textRef = useRef();
  const [textHeight, setTextHeight] = useState("");
  const { user: currentUser } = useAuth();
  const tagName = useRef();
  const { isComment, replyComment, removeTag } = useSelector(
    (state) => state.global
  );
  const dispatch = useDispatch();
  const [play] = useSound(soundSend, { volume: 0.75 });
  // useEffect(() => {
  //   if (!tagName) return;
  //   const widthTag = tagName?.current?.getBoundingClientRect();
  //   setWidthTagName(widthTag?.width);
  // }, [replyData, removeTag]);
  useEffect(() => {
    async function getUser() {
      try {
        const res = await axios.get(
          `https://serversocial.vercel.app/users/${currentUser?._id}`
        );
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getUser();
  }, [currentUser?._id]);
  const handleChangeBlock = (e) => {
    setText(e.target.value);
    setTextHeight();
    setContent(e.target.value);
  };
  useLayoutEffect(() => {
    setTextHeight(`${textRef?.current?.scrollHeight}px`);

    if (textRef?.current?.scrollHeight >= 82) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [text]);
  // console.log("myUser.username", myUser.username);
  // console.log("receiverName.username", receiverName.username);
  const handleCreateComment = async (type) => {
    // console.log(dataPostProfile);

    if (!content) return;
    const value = {
      content,
      likes: [],
      postId: dataPostProfile ? dataPostProfile._id : post._id,
      user: user,
      reply: replyComment.cmtId,
      friendName: replyComment.friendName,
      createdAt: new Date().toISOString(),
    };
    // console.log("type", type);
    try {
      setLoading(true);
      await axios.post("https://serversocial.vercel.app/comments/", value);
      play();
      setLoading(false);
      setContent("");
      setReplyData(null);
      dispatch(toggleRemoveTag(true));
      dispatch(toggleViewCmt(true));
      dispatch(setReplyComment({}));
      dispatch(addComment(!isComment));

      const dataNots = {
        senderName: myUser.username,
        receiverName:
          replyData !== null &&
          replyData !== myUser.username &&
          receiverName.username === myUser.username
            ? replyData
            : receiverName.username === myUser.username
            ? null
            : receiverName.username,

        type,
        postImg: dataPostProfile ? dataPostProfile.img.thumb : post.img.thumb,
        postId: dataPostProfile ? dataPostProfile._id : post._id,
        senderImg: myUser.profilePicture.thumb,
      };
      console.log("type", type);
      console.log("dataNots", dataNots);
      if (
        (receiverName.username === myUser.username &&
          replyData === myUser.username) ||
        dataNots.receiverName === null
      )
        return;

      // console.log("dataNots", dataNots);
      socket?.emit("sendNotification", dataNots);
      try {
        await axios.post(
          "https://serversocial.vercel.app/notifications/",
          dataNots
        );
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleValue = () => {
    dispatch(toggleRemoveTag(!removeTag));
    setReplyData(null);
    dispatch(setReplyComment({}));
  };
  // console.log("replyData", replyData);
  // console.log("receiverName", receiverName.username);
  // console.log("receiverName.username", receiverName.username);
  // console.log("myUser.username", myUser.username);
  return (
    <div className="bottom flex px-2 pt-1 items-center justify-between w-full border-transparent    border border-t-slate-200 dark:border-[#363636]">
      <div>
        <IconSmile className="dark:text-white"></IconSmile>
      </div>
      <div className="w-full  mx-2  relative flex flex-col">
        <div>
          <textarea
            ref={textRef}
            onChange={handleChangeBlock}
            placeholder={`Add a comment...`}
            value={`${content}`}
            // style={{
            //   height: textHeight,
            //   paddingLeft: removeTag ? 0 : widthTagName + 10 + "px",
            // }}
            className={`dark:bg-black  dark:text-white w-full ${
              replyData ? "pt-[20px]" : "pt-[15px]"
            } transition-all  text-[14px]   h-full max-h-[72px]  outline-none resize-none ${
              show ? "overflow-y-scroll pt-[20px]" : "overflow-hidden"
            }`}
            type="text"
          />
        </div>

        <div
          ref={tagName}
          className={`absolute dark:bg-black dark:text-white  bg-white z-10 inline-block left-0 top-0 group cursor-pointer `}
        >
          <p
            className={`text-[14px] text-blue-900 ${
              replyData ? "" : "opacity-0 visibility hidden"
            }`}
          >{`@${replyData} `}</p>
          <p
            onClick={handleValue}
            className={`absolute bg-slate-400 rounded-full   flex items-center justify-center p-2 text-white dark:bg-black dark:text-white w-[10px] h-[10px] -top-2 cursor-pointer -right-2 ${
              replyData ? "visible" : " hidden"
            }`}
          >
            <span>&times;</span>
          </p>
        </div>
      </div>
      <div className="mb-1">
        {text ? (
          loading ? (
            <div className="w-[13px] h-[13px] rounded-full border-[3px] border-blue-500 border-t-transparent animate-spin"></div>
          ) : (
            <>
              <span
                onClick={() =>
                  handleCreateComment(
                    replyData && replyData !== myUser.username ? 8 : 2
                  )
                }
                className={`hover:text-blue-900 transition-all interactButton cursor-pointer  text-blue-600 font-semibold`}
              >
                Post
              </span>
            </>
          )
        ) : (
          <span
            className={`transition-all font-semibold postButton text-blue-200 cursor-default`}
          >
            Post
          </span>
        )}
      </div>
    </div>
  );
};

export default SendComment;
