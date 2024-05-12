import IconAdmin from "components/icons/IconAdmin";
import IconBtnDots from "components/icons/IconBtnDots";
import IconHeart from "components/icons/IconHeart";
import IconHeartNone from "components/icons/IconHeartNone";
import ImageUser from "components/image/ImageUser";
import ModalBase from "components/modal/ModalBase";
import UserLikeListModalContent from "components/modal/ModalContent/UserLikeListModalContent";

import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import FormatTime from "components/time/FormatTime";
import ViewMoreCmt from "./ViewMoreCmt";
import { useDispatch, useSelector } from "react-redux";
import CommentAction from "./CommentAction";
import {
  likeComment,
  unLikeComment,
} from "components/redux/actions/commentAction";
import { REPLY_TYPES } from "components/redux/reducer/replyCmtReducer";

const ItemComment = ({ comment, shortView = false, cmtReply, post }) => {
  const dispatch = useDispatch();
  const { auth, reply, socket } = useSelector((state) => state);
  const [viewLikeList, setViewLikeList] = useState(false);
  const [isLikedCmt, setIsLikedCmt] = useState(false);
  const [readMore, setReadMore] = useState(false);
  useEffect(() => {
    if (
      comment.like &&
      comment.like.find((item) => item._id === auth.user._id)
    ) {
      setIsLikedCmt(true);
    } else {
      setIsLikedCmt(false);
    }
  }, [comment.like, auth.user._id]);

  const handleReply = () => {
    if (reply) dispatch({ type: REPLY_TYPES.GET_REPLY, payload: false });
    const dataReply = { ...comment, commentId: comment._id };
    dispatch({ type: REPLY_TYPES.GET_REPLY, payload: dataReply });
  };

  const handleLikeCmt = () => {
    dispatch(likeComment({ comment, post, auth, socket }));
  };

  const handleUnlikeCmt = () => {
    dispatch(unLikeComment({ comment, post, auth, socket }));
  };
  if (!comment.user) return;
  return (
    <>
      {
        <>
          <div className={`flex  gap-x-3 justify-between   `}>
            <div className="flex w-full gap-x-1">
              {shortView ? (
                <></>
              ) : (
                <div className="w-full flex  max-w-[35px] h-[35px]">
                  <ImageUser
                    smallImg={true}
                    data={comment.user}
                    story
                    classNameImg="w-full h-full"
                  ></ImageUser>
                </div>
              )}
              <div className={`text-[14px] mt-1 ${shortView ? "" : " ml-3"}`}>
                <div
                  className={`${
                    comment.content.length < 40 ? "flex" : ""
                  } items-center  ${shortView ? "shortView" : ""}`}
                >
                  <Link
                    to={`/${comment.user._id}`}
                    className="hover:text-slate-500 cursor-pointer hover:underline hover:underline-offset-2 text-slate-700 dark:text-white flex items-center gap-x-1  font-[600] text-[14px] mr-2"
                  >
                    {comment.user.fullname}
                    {comment.user.isAdmin && (
                      <IconAdmin className="!w-3 !h-3"></IconAdmin>
                    )}
                  </Link>
                  <div className="flex">
                    <p>
                      {comment.content.length < 29
                        ? comment.content
                        : readMore
                        ? comment.content + " "
                        : comment.content.slice(0, 29)}
                    </p>
                    {comment.content.length > 29 && (
                      <span
                        onClick={() => setReadMore(true)}
                        className={`text-[13px]  text-slate-400 pl-1  cursor-pointer `}
                      >
                        {" "}
                        {readMore ? "" : "...more"}
                      </span>
                    )}
                  </div>
                </div>
                {shortView ? (
                  <></>
                ) : (
                  <>
                    <div className="flex items-center dark:text-white -translate-y-[4px] gap-x-3  text-slate-500 text-[13px]">
                      <div className="text-[12px] ">
                        <FormatTime inputTime={comment.createdAt}></FormatTime>
                        {/* {format(comment.createdAt)} */}
                      </div>
                      {comment.like.length > 0 && (
                        <p
                          onClick={() => setViewLikeList(true)}
                          className="cursor-pointer"
                        >{`${comment.like.length} like`}</p>
                      )}

                      <p
                        onClick={handleReply}
                        className="text-slate-600 dark:text-white text-[12px] cursor-pointer"
                      >
                        Reply
                      </p>
                      <CommentAction
                        post={post}
                        comment={comment}
                      ></CommentAction>
                      {/* action cmt */}
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="mt-2 text-xs shrink-0 ">
              {isLikedCmt ? (
                <IconHeart
                  onClick={handleUnlikeCmt}
                  className="!w-4 !h-4 text-[#FD117E]"
                ></IconHeart>
              ) : (
                <IconHeartNone
                  onClick={handleLikeCmt}
                  className="!w-4 !h-4 "
                ></IconHeartNone>
              )}
            </div>
          </div>
          {cmtReply && (
            <div className=" w-[86%] ml-auto">
              <ViewMoreCmt
                post={post}
                comment={comment}
                cmtReply={cmtReply}
              ></ViewMoreCmt>
            </div>
          )}

          {viewLikeList && (
            <ModalBase
              visible={viewLikeList}
              onClose={() => setViewLikeList(false)}
            >
              <UserLikeListModalContent
                listUserLike={comment.like}
                onClose={() => setViewLikeList(false)}
              ></UserLikeListModalContent>
            </ModalBase>
          )}
        </>
      }
    </>
  );
};

export default ItemComment;
