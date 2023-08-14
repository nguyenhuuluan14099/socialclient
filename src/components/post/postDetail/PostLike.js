import axios from "axios";
import { useAuth } from "components/context/Auth-Context";
import IconComment from "components/icons/IconComment";
import IconHeart from "components/icons/IconHeart";
import IconHeartNone from "components/icons/IconHeartNone";
import IconShare from "components/icons/IconShare";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PostLike = ({ socket, post, user }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [loadingLike, setLoadingLike] = useState(false);
  const [likeTotal, setLikeTotal] = useState(post.likes.length);
  const { user: currentUser } = useAuth();

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);
  const handleClickLike = async (type) => {
    try {
      setLoadingLike(true);
      await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/posts/` + post._id + "/like/",
        {
          userId: currentUser._id,
        }
      );
      setLoadingLike(false);

      //   play();
    } catch (error) {
      console.log(error);
    }
    setIsLiked(!isLiked);
    setLikeTotal(isLiked ? likeTotal - 1 : likeTotal + 1);
    // console.log("user", user.username);

    if (type === 0) return;
    const dataNots = {
      senderName: currentUser.username,
      receiverName:
        user?.userName === currentUser.username ? null : user?.userName,
      type,
      postId: post._id,
      postImg: post.img?.thumb,
      senderImg: currentUser.profilePicture.thumb,
    };
    if (user?.userName === currentUser.username) return;
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
  return (
    <div className="flex flex-col">
      <div className="threeIcons flex items-center gap-x-3">
        {loadingLike === true && (
          <IconHeart className="text-red-500"></IconHeart>
        )}

        {isLiked ? (
          <>
            {loadingLike === false && (
              <IconHeart
                onClick={() => handleClickLike(0)}
                className="text-red-500 "
              ></IconHeart>
            )}
          </>
        ) : (
          <>
            {loadingLike === false && (
              <IconHeartNone onClick={() => handleClickLike(1)}></IconHeartNone>
            )}
          </>
        )}

        {!post.hideComment && (
          <Link className="" to={`/post/${post._id}`}>
            <IconComment className="dark:text-white"></IconComment>
          </Link>
        )}

        <IconShare className="dark:text-white "></IconShare>
      </div>
      <div>
        {!post.hideLike && (
          <p className="font-semibold text-[14px] text-slate-700 dark:text-white">
            {`${
              likeTotal > 0
                ? `${likeTotal} like${likeTotal > 1 ? "s" : ""}`
                : ""
            }`}
          </p>
        )}
      </div>
    </div>
  );
};

export default PostLike;
