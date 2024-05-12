import IconComment from "components/icons/IconComment";
import IconHeart from "components/icons/IconHeart";
import IconHeartNone from "components/icons/IconHeartNone";
import IconShare from "components/icons/IconShare";
import { likePost, unLikePost } from "components/redux/actions/postAction";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import soundLike from "../../sounds/soundLike.mp3";
import ModalBase from "components/modal/ModalBase";
import UserLikeListModalContent from "components/modal/ModalContent/UserLikeListModalContent";
import ImageUser from "components/image/ImageUser";
import CommentBlock from "components/comment/CommentBlock";
import IconBack from "components/icons/IconBack";
import DetailPostModalContent from "components/modal/ModalContent/DetailPostModalContent";

const PostLike = ({ post }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [viewLikeList, setViewLikeList] = useState(false);
  const [isViewCmt, setIsViewCmt] = useState(false);
  const dispatch = useDispatch();
  const { auth, socket, notify } = useSelector((state) => state);
  const soundLikeRef = useRef();
  const { slug } = useParams();

  useEffect(() => {
    if (post.likes.find((item) => item._id === auth.user._id)) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [auth.user._id, post.likes]);

  const handleClickLikePost = () => {
    dispatch(likePost({ post, auth, socket }));

    if (notify.sound) soundLikeRef.current.play();
  };

  const handleUnlikePost = () => {
    dispatch(unLikePost({ post, auth, socket }));
  };

  return (
    <div className="flex flex-col">
      <div className="hidden">
        <audio controls ref={soundLikeRef}>
          <source src={soundLike} type="audio/mp3" />
        </audio>
      </div>
      <div className="flex items-center threeIcons gap-x-3">
        {isLiked ? (
          <>
            <IconHeart
              onClick={() => handleUnlikePost()}
              className="text-[#FD117E] "
            ></IconHeart>
          </>
        ) : (
          <>
            <IconHeartNone
              onClick={() => handleClickLikePost()}
            ></IconHeartNone>
          </>
        )}

        {!post.hideComment && (
          <div onClick={() => setIsViewCmt(true)}>
            <IconComment className="dark:text-white"></IconComment>
          </div>
        )}

        <IconShare className="dark:text-white "></IconShare>
      </div>
      <div>
        {!post.hideLike && (
          <p
            onClick={() => setViewLikeList(true)}
            className="cursor-pointer font-semibold hover:underline text-[14px] text-slate-700 dark:text-white"
          >
            {`${
              post.likes.length > 0
                ? `${post.likes.length} like${post.likes.length > 1 ? "s" : ""}`
                : ""
            }`}
          </p>
        )}
      </div>

      {viewLikeList && (
        <ModalBase
          visible={viewLikeList}
          onClose={() => setViewLikeList(false)}
        >
          <UserLikeListModalContent
            listUserLike={post.likes}
            onClose={() => setViewLikeList(false)}
          ></UserLikeListModalContent>
        </ModalBase>
      )}

      {isViewCmt && (
        <ModalBase
          type="detailPost"
          visible={isViewCmt}
          onClose={() => setIsViewCmt(false)}
        >
          <div className="mt-0 h-full">
            <div className="hidden laptop:block">
              <DetailPostModalContent
                onClose={() => setIsViewCmt(false)}
                dataPostProfile={post}
              ></DetailPostModalContent>
            </div>

            <div className="top-0 h-[700px] laptop:hidden">
              <div
                className={` commentBlock w-full px-4 py-2 pt-4  h-full     laptop:flex flex-col   overflow-hidden overflow-y-scroll  absolute top-0 z-10 left-0 dark:bg-black bg-white  `}
              >
                <div className=" flex items-center justify-between py-2">
                  <p onClick={() => setIsViewCmt(false)}>
                    <IconBack></IconBack>
                  </p>
                  <p>Comment</p>
                  <p></p>
                </div>
                <div className=" sticky left-0 z-10 flex mb-2 bg-white -top-5 dark:bg-black gap-x-3">
                  <div className="w-full  max-w-[35px] h-[35px]">
                    <ImageUser
                      smallImg
                      data={post.user}
                      story
                      classNameImg="w-full h-full"
                    ></ImageUser>
                  </div>
                  <div className=" text-[14px] mt-1 bg-white dark:bg-black">
                    <Link to={`/${post.user._id}`} className="">
                      <span className="hover:text-slate-500 cursor-pointer hover:underline hover:underline-offset-2 text-slate-700 dark:text-white font-[600] text-[14px] mr-2">
                        {post.user.fullname}
                      </span>
                    </Link>
                    <div className="w-full font-semibold ">{post.desc}</div>
                  </div>
                </div>
                <div className=" mt-auto">
                  <CommentBlock post={post}></CommentBlock>
                </div>
              </div>
            </div>
          </div>
        </ModalBase>
      )}
    </div>
  );
};

export default PostLike;
