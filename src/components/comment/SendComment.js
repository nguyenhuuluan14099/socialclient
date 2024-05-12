import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createComment } from "components/redux/actions/commentAction";
import { REPLY_TYPES } from "components/redux/reducer/replyCmtReducer";
import Icons from "components/icons/Icons";
import soundSend from "../../components/sounds/soundSend.mp3";

const SendComment = ({ post, dataPostProfile }) => {
  const [content, setContent] = useState("");
  const soundSendRef = useRef();
  const { auth, reply, socket, notify } = useSelector((state) => state);
  const dispatch = useDispatch();
  const tagName = useRef();
  const inputRef = useRef();

  const handleRemoveTag = () => {
    dispatch({ type: REPLY_TYPES.GET_REPLY, payload: false });
  };

  useEffect(() => {
    if (content) {
      inputRef.current && inputRef.current.focus();
    }
  }, [content]);

  const handleCreateComment = async (e) => {
    e.preventDefault();
    if (!content.trim()) {
      if (reply) dispatch({ type: REPLY_TYPES.GET_REPLY, payload: false });
      return;
    }

    if (!content) return;
    const value = {
      postId: dataPostProfile ? dataPostProfile._id : post._id,
      content,
      createdAt: new Date().toISOString(),
      reply: reply ? reply.commentId : [],
      tag: reply ? reply.user : [],
    };

    dispatch(createComment({ post, comment: value, auth, socket }));
    if (notify.sound) soundSendRef.current.play();
    setContent("");
    if (reply) dispatch({ type: REPLY_TYPES.GET_REPLY, payload: false });
  };

  return (
    <div className="mt-auto bottom flex  items-center justify-between  w-full      dark:border-t-[#363636]">
      <div className="hidden">
        <audio controls ref={soundSendRef}>
          <source src={soundSend} type="audio/mp3" />
        </audio>
      </div>

      <form className="flex items-center w-full mx-2 ">
        {reply && (
          <div
            ref={tagName}
            className={` text-blue-500 text-xs  mr-1  group cursor-pointer relative `}
          >
            <p> @{reply.user.fullname}</p>
            <p
              onClick={handleRemoveTag}
              className="absolute cursor-pointer text-[16px] -top-2 -right-1 "
            >
              &times;
            </p>
          </div>
        )}
        <input
          ref={inputRef}
          onChange={(e) => setContent(e.target.value)}
          placeholder={`Add a comment...`}
          value={`${content}`}
          className={`dark:bg-black   flex-1  py-2  dark:text-white w-full transition-all  text-[14px] pb-3  h-full max-h-[72px]  outline-none resize-none`}
          type="text"
        ></input>

        <div>
          {content.trim() ? (
            <>
              {" "}
              <button
                type="submit"
                onClick={(e) => handleCreateComment(e)}
                className={`hover:text-blue-900 transition-all interactButton cursor-pointer  text-blue-600 font-semibold mr-1`}
              >
                Post
              </button>
            </>
          ) : (
            <></>
          )}
        </div>
        <div>
          <Icons
            position="laptop:right-0"
            content={content}
            setContent={setContent}
          ></Icons>
        </div>
      </form>
    </div>
  );
};

export default SendComment;
