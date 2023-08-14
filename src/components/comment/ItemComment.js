import axios from "axios";
import { useAuth } from "components/context/Auth-Context";
import IconAdmin from "components/icons/IconAdmin";
import IconBtnDots from "components/icons/IconBtnDots";
import IconHeart from "components/icons/IconHeart";
import IconHeartNone from "components/icons/IconHeartNone";
import ImageUser from "components/image/ImageUser";
import ModalBase from "components/modal/ModalBase";
import UserLikeListModalContent from "components/modal/ModalContent/UserLikeListModalContent";
import {
  addComment,
  setReplyComment,
  toggleRemoveTag,
  toggleViewCmt,
} from "components/redux/globalSlice";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import { v4 } from "uuid";
import ItemReplyCmt from "./ItemReplyCmt";

const ItemComment = ({
  comment,
  shortDesc = false,
  replyComment,
  dataPostProfile,
  post,
  socket,
  commentData,
  setReplyData = () => {},
}) => {
  // console.log("commentData", commentData);
  const { removeTag, isComment, viewCmt } = useSelector(
    (state) => state.global
  );
  const dispatch = useDispatch();
  const { user } = useAuth();
  const [showValid, setShowValid] = useState(false);
  const [idCmt, setIdCmt] = useState("");
  const [showDelete, setShowDelete] = useState(false);
  const [commentId, setCommentId] = useState("");
  const [oneCmt, setOneCmt] = useState({});
  //like and dislike
  const [listUserLike, setListUserLike] = useState([]);
  const [showListUserLike, setShowListUserLike] = useState(false);
  const [myUser, setMyUser] = useState([]);
  const [isLikedCmt, setIsLikedCmt] = useState(false);
  const [totalLikeCmt, setTotalLikeCmt] = useState(comment?.like.length);

  useEffect(() => {
    setIsLikedCmt(comment?.like.includes(user._id));
  }, [comment?.like, user._id]);
  const handleReply = () => {
    setReplyData(comment.user.username);
    dispatch(toggleRemoveTag(!removeTag));
    dispatch(
      setReplyComment({
        cmtId: comment._id,
        friendName: comment.user.username,
      })
    );
  };

  useEffect(() => {
    if (!commentId) return;
    async function getCmt() {
      try {
        const cmt = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/comments/getOne/${commentId}`
        );
        setOneCmt(cmt.data);
      } catch (error) {
        console.log(error);
      }
    }
    getCmt();
  }, [commentId]);

  useEffect(() => {
    if (oneCmt?.user?._id === user._id) {
      setShowDelete(true);
    } else {
      setShowDelete(false);
    }
  }, [oneCmt?.user?._id, user._id]);
  const handleDeleteComment = (cmtId) => {
    setCommentId(cmtId);
    setShowValid(true);
    setIdCmt(cmtId);
  };
  const deleteCmt = async () => {
    // console.log("idCmt", idCmt);

    try {
      await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/comments/${idCmt}`
      );
      dispatch(addComment(!isComment));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function getUser() {
      try {
        const userBig = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/users?userId=${user._id}`
        );
        setMyUser(userBig.data);
      } catch (error) {
        console.log(error);
      }
    }
    getUser();
  }, [user._id]);
  const handleClickLikeCmt = async (type) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/comments/${comment._id}/like`,
        {
          userId: user._id,
        }
      );
    } catch (error) {
      console.log(error);
    }

    setTotalLikeCmt(isLikedCmt ? totalLikeCmt - 1 : totalLikeCmt + 1);
    setIsLikedCmt(!isLikedCmt);

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
    // console.log("myUser.username", myUser.username);
    if (comment.user.username === myUser.username) return;
    socket?.emit("sendNotification", dataNots);
    try {
      await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/notifications/`,
        dataNots
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickUserLike = (cmtId) => {
    setShowListUserLike(true);
    setCommentId(cmtId);
  };

  useEffect(() => {
    if (!commentId) return;
    async function getUserLikeList() {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/comments/${commentId}/listUser`
        );
        setListUserLike(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getUserLikeList();
  }, [commentId]);
  // console.log("comment.user.username", comment.user.username);
  if (!comment) return;
  const timeCreate = format(comment?.createdAt).split(" ");
  const first = Number(timeCreate[0]);
  let result = "";
  if (first >= 10) {
    result = timeCreate.join("").slice(0, 3);
  }
  if (first < 10) {
    result = timeCreate.join("").slice(0, 2);
  }
  if (timeCreate[1] === "now") {
    result = "now";
  }
  if (!user) return;
  return (
    <>
      {
        <div className={`flex  gap-x-3 justify-between  `}>
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
                    data={comment.user}
                    story
                    classNameImg="h-full w-full"
                  ></ImageUser>
                </>
              )}
            </div>
            <div className={`text-[14px] mt-1 ${shortDesc ? "" : " ml-3"}`}>
              <div className={`${shortDesc ? "shortDesc" : ""}`}>
                <Link
                  to={`/${comment.user.username || commentData.user.username}`}
                  className="hover:text-slate-500 cursor-pointer hover:underline hover:underline-offset-2 text-slate-700 dark:text-white flex items-center gap-x-1  font-[600] text-[14px] mr-2"
                >
                  {comment.user.username || commentData.user.username}
                  {comment.user.isAdmin && (
                    <IconAdmin className="!w-4 !h-4"></IconAdmin>
                  )}
                </Link>
                {comment.content || commentData.content}
              </div>
              {shortDesc ? (
                <></>
              ) : (
                <>
                  <div className="flex items-center dark:text-white -translate-y-[4px] gap-x-3  text-slate-500 text-[13px]">
                    <p className="text-[12px] ">{result}</p>
                    {totalLikeCmt > 0 && (
                      <p
                        onClick={() => handleClickUserLike(comment._id)}
                        className="cursor-pointer"
                      >{`${totalLikeCmt} like`}</p>
                    )}

                    <p
                      onClick={handleReply}
                      className="text-slate-600 dark:text-white text-[12px] cursor-pointer"
                    >
                      Reply
                    </p>

                    <p
                      className=" cursor-pointer"
                      onClick={() => handleDeleteComment(comment._id)}
                    >
                      <IconBtnDots></IconBtnDots>
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="shrink-0 mt-2">
            {isLikedCmt ? (
              <IconHeart
                onClick={() => handleClickLikeCmt(6)}
                className="!w-4 !h-4  text-red-500"
              ></IconHeart>
            ) : (
              <IconHeartNone
                onClick={() => handleClickLikeCmt(7)}
                className="!w-4 !h-4 "
              ></IconHeartNone>
            )}
          </div>
        </div>
      }

      {replyComment.some((cmt) => cmt.reply === comment._id) && (
        <div
          onClick={() => dispatch(toggleViewCmt(!viewCmt))}
          className="flex item-center  gap-x-1 py-1 cursor-pointer ml-[50px]"
        >
          <p className="-translate-y-1 text-slate-500 text-[12px]">____</p>
          <p className="text-slate-500 dark:text-white text-[11px]">{`${
            viewCmt ? "Hide" : "View"
          } replies (${replyComment.length})`}</p>
        </div>
      )}
      {replyComment.length > 0 &&
        replyComment.map((re) => (
          <div key={v4()}>
            <ItemReplyCmt
              myUser={myUser}
              dataPostProfile={dataPostProfile}
              post={post}
              socket={socket}
              comment={comment}
              setShowListUserLike={setShowListUserLike}
              setCommentId={setCommentId}
              setReplyData={setReplyData}
              handleDeleteComment={handleDeleteComment}
              commentList={re}
            ></ItemReplyCmt>
          </div>
        ))}

      {/* );
        })} */}
      {showValid && (
        <ModalBase visible={showValid} onClose={() => setShowValid(false)}>
          <div className="w-full cursor-pointer flex flex-col text-center">
            {/* <p className="text-red-500 font-semibold w-full  p-3">Report</p> */}
            {showDelete && (
              <p
                onClick={() => deleteCmt()}
                className="text-red-500 font-semibold w-full border border-transparent border-t-slate-300 border-b-slate-300 p-3"
              >
                Delete
              </p>
            )}

            <p className="p-3" onClick={() => setShowValid(false)}>
              Cancel
            </p>
          </div>
        </ModalBase>
      )}
      {showListUserLike && (
        <ModalBase
          visible={showListUserLike}
          onClose={() => setShowListUserLike(false)}
        >
          <UserLikeListModalContent
            listUserLike={listUserLike}
            onClose={() => setShowListUserLike(false)}
          ></UserLikeListModalContent>
        </ModalBase>
      )}
    </>
  );
};

export default ItemComment;
