import axios from "axios";
import { useAuth } from "components/context/Auth-Context";
import IconBtnDots from "components/icons/IconBtnDots";
import IconHeart from "components/icons/IconHeart";
import IconHeartNone from "components/icons/IconHeartNone";
import ImageUser from "components/image/ImageUser";
import { setReplyComment, toggleViewCmt } from "components/redux/globalSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { format } from "timeago.js";

const ItemReplyCmt = ({
  commentList,
  socket,
  shortDesc = false,
  dataPostProfile,
  post,
  myUser,
  // toggleViewCmt = false,
  setShowListUserLike = () => {},
  setCommentId = () => {},
  comment,
  handleDeleteComment = () => {},
  setReplyData = () => {},
  // setToggleViewCmt = () => {},
}) => {
  //   console.log("commentList", commentList);
  const { user } = useAuth();
  const [totalLikeReply, setTotalLikeReply] = useState(
    commentList?.like?.length
  );
  const { viewCmt } = useSelector((state) => state.global);
  const dispatch = useDispatch();
  const [isLikedReplyCmt, setIsLikedReplyCmt] = useState(false);

  const handleClickReplyCmt = async (type, cmtId) => {
    try {
      await axios.put(
        `https://serversocial.vercel.app/comments/${cmtId}/like`,
        {
          userId: user._id,
        }
      );
    } catch (error) {
      console.log(error);
    }

    setTotalLikeReply(
      isLikedReplyCmt ? totalLikeReply - 1 : totalLikeReply + 1
    );
    setIsLikedReplyCmt(!isLikedReplyCmt);

    if (type === 6) return;
    const dataNots = {
      senderName: myUser.username,
      receiverName:
        comment.user.username === myUser.username
          ? null
          : comment.user.username,
      type,
      postId: dataPostProfile ? dataPostProfile._id : post._id,
      postImg: dataPostProfile ? dataPostProfile.img.thumb : post.img.thumb,
      senderImg: myUser?.profilePicture?.thumb,
    };
    // console.log("dataNots", dataNots);
    // console.log("comment.user.username", comment.user.username);
    console.log("myUser.username", myUser.username);
    console.log("comment", comment);
    console.log("commentList", commentList);
    if (
      commentList.user.username === myUser.username &&
      comment.user.username === myUser.username
    )
      return;
    socket?.emit("sendNotification", dataNots);
    try {
      await axios.post(
        "https://serversocial.vercel.app/notifications/",
        dataNots
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setIsLikedReplyCmt(commentList?.like.includes(user._id));
  }, [commentList?.like, user._id]);

  const handleReply = () => {
    setReplyData(commentList.user.username);
    // dispatch(toggleRemoveTag(!removeTag));
    dispatch(toggleViewCmt(true));
    dispatch(
      setReplyComment({
        cmtId: comment._id,
        friendName: commentList.user.username,
      })
    );
  };
  const handleClickUserLike = (cmtId) => {
    setShowListUserLike(true);
    setCommentId(cmtId);
  };
  if (!commentList) return;

  return (
    <>
      {viewCmt && (
        <>
          <div key={commentList._id} className="ml-[50px] ">
            <div className="reply">
              <div className="flex  gap-x-3 justify-between  ">
                <div className=" flex gap-x-1 w-full ">
                  <div
                    className={`${
                      shortDesc ? "" : "w-full flex  max-w-[35px] h-[35px]"
                    }`}
                  >
                    {shortDesc ? (
                      <></>
                    ) : (
                      <>
                        <ImageUser
                          smallImg={true}
                          data={commentList?.user}
                          story
                          classNameImg="h-full w-full"
                        ></ImageUser>
                      </>
                    )}
                  </div>
                  <div
                    className={`text-[14px] mt-1 ${shortDesc ? "" : " ml-3"}`}
                  >
                    <div className={`${shortDesc ? "shortDesc" : ""}`}>
                      <Link
                        to={`/${commentList?.user?.username}`}
                        className="hover:text-slate-500 cursor-pointer hover:underline hover:underline-offset-2 text-slate-700 dark:text-white font-[600] text-[14px] mr-1"
                      >
                        {commentList?.user?.username}
                      </Link>
                      <Link
                        to={`/${commentList?.friendName}`}
                        className="text-blue-900 dark:text-blue-500"
                      >{`@${commentList?.friendName} `}</Link>
                      {commentList?.content}
                    </div>
                    {shortDesc ? (
                      <></>
                    ) : (
                      <>
                        <div className="flex items-center -translate-y-[4px] gap-x-3  text-slate-500 text-[13px] dark:text-white">
                          <p className="text-[12px]">
                            {Number(
                              format(commentList?.createdAt).split(" ")[0]
                            ) >= 10
                              ? format(commentList?.createdAt)
                                  .split(" ")
                                  .join("")
                                  .slice(0, 3)
                              : Number(
                                  format(commentList?.createdAt).split(" ")[0]
                                ) < 10
                              ? format(commentList?.createdAt)
                                  .split(" ")
                                  .join("")
                                  .slice(0, 2)
                              : format(commentList?.createdAt).split(" ")[1] ===
                                "now"
                              ? "now"
                              : ""}
                          </p>
                          {totalLikeReply > 0 && (
                            <p
                              onClick={() =>
                                handleClickUserLike(commentList._id)
                              }
                              className="cursor-pointer"
                            >{`${totalLikeReply} like`}</p>
                          )}
                          <p
                            onClick={handleReply}
                            className="text-slate-600 dark:text-white text-[12px] cursor-pointer"
                          >
                            Reply
                          </p>
                          <p
                            className=" cursor-pointer"
                            onClick={() => handleDeleteComment(commentList._id)}
                          >
                            <IconBtnDots></IconBtnDots>
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="shrink-0 mt-2">
                  {isLikedReplyCmt ? (
                    <IconHeart
                      onClick={() => handleClickReplyCmt(6, commentList._id)}
                      className="!w-4 !h-4  text-red-500"
                    ></IconHeart>
                  ) : (
                    <IconHeartNone
                      onClick={() => handleClickReplyCmt(7, commentList._id)}
                      className="!w-4 !h-4 "
                    ></IconHeartNone>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ItemReplyCmt;
