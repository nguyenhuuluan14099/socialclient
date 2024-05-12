import IconAdmin from "components/icons/IconAdmin";
import ImageUser from "components/image/ImageUser";
import FormatTime from "components/time/FormatTime";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CommentAction from "./CommentAction";
import IconHeart from "components/icons/IconHeart";
import IconHeartNone from "components/icons/IconHeartNone";
import {
  likeComment,
  unLikeComment,
} from "components/redux/actions/commentAction";
import { useDispatch, useSelector } from "react-redux";
import { REPLY_TYPES } from "components/redux/reducer/replyCmtReducer";
import ModalBase from "components/modal/ModalBase";
import UserLikeListModalContent from "components/modal/ModalContent/UserLikeListModalContent";

const ItemReplyCmt = ({ rep, cmtReply, post, comment }) => {
  const dispatch = useDispatch();
  const { auth, socket, reply } = useSelector((state) => state);
  const [isLikedCmt, setIsLikedCmt] = useState(false);
  const [viewLikeList, setViewLikeList] = useState(false);

  useEffect(() => {
    if (rep.like?.some((item) => item._id === auth.user._id)) {
      setIsLikedCmt(true);
    } else {
      setIsLikedCmt(false);
    }
  }, [auth.user._id, rep.like]);
  const handleLikeCmt = (comment) => {
    dispatch(likeComment({ comment, post, auth, socket }));
  };

  const handleUnlikeCmt = (comment) => {
    dispatch(unLikeComment({ comment, post, auth, socket }));
  };

  const handleReply = (cmtReply) => {
    if (reply) dispatch({ type: REPLY_TYPES.GET_REPLY, payload: false });
    const dataReply = { ...cmtReply, commentId: comment._id };
    dispatch({ type: REPLY_TYPES.GET_REPLY, payload: dataReply });
  };
  return (
    <>
      <div className="flex w-full gap-x-3">
        <div className={`w-full flex  max-w-[35px] h-[35px]`}>
          <ImageUser
            smallImg={true}
            data={rep.user}
            story
            classNameImg="w-full h-full"
          ></ImageUser>
        </div>
        <div className={`text-[14px] mt-1}`}>
          <div className={`flex`}>
            <Link
              to={`/`}
              className="hover:text-slate-500 cursor-pointer hover:underline hover:underline-offset-2 text-slate-700 dark:text-white flex items-center gap-x-1  font-[600] text-[14px] mr-2"
            >
              {rep?.user?.fullname}
              {rep?.user?.isAdmin && (
                <IconAdmin className="!w-4 !h-4"></IconAdmin>
              )}
            </Link>
            {/* {comment.content || commentData.content} */}
            {/* <FormatComment text={rep.content}></FormatComment> */}
            <p className={``}> {rep.content}</p>
          </div>

          <>
            <div className="flex items-center dark:text-white -translate-y-[4px] gap-x-3  text-slate-500 text-[13px]">
              <div className="text-[12px] ">
                <FormatTime inputTime={rep.createdAt}></FormatTime>
              </div>
              {rep.like?.length > 0 && (
                <p
                  onClick={() => setViewLikeList(true)}
                  className="cursor-pointer"
                >{`${rep.like?.length} like`}</p>
              )}

              <p
                onClick={() => handleReply(rep)}
                className="text-slate-600 dark:text-white text-[12px] cursor-pointer"
              >
                Reply
              </p>
              <CommentAction
                idCmtParent={cmtReply._id}
                comment={rep}
                post={post}
              ></CommentAction>
            </div>
          </>
        </div>
      </div>

      <div className="mt-2 shrink-0">
        {isLikedCmt ? (
          <IconHeart
            onClick={() => handleUnlikeCmt(rep)}
            className="!w-4 !h-4 text-[#FD117E]"
          ></IconHeart>
        ) : (
          <IconHeartNone
            onClick={() => handleLikeCmt(rep)}
            className="!w-4 !h-4 "
          ></IconHeartNone>
        )}
      </div>
      {viewLikeList && (
        <ModalBase
          visible={viewLikeList}
          onClose={() => setViewLikeList(false)}
        >
          <UserLikeListModalContent
            listUserLike={rep.like}
            onClose={() => setViewLikeList(false)}
          ></UserLikeListModalContent>
        </ModalBase>
      )}
    </>
  );
};

export default ItemReplyCmt;
