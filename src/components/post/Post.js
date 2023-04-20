import React, { useEffect, useRef, useState } from "react";
import IconComment from "components/icons/IconComment";
import IconHeart from "components/icons/IconHeart";
import IconSave from "components/icons/IconSave";
import IconShare from "components/icons/IconShare";
import SendComment from "components/comment/SendComment";
import IconHeartNone from "components/icons/IconHeartNone";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { useAuth } from "components/context/Auth-Context";
import IconBtnDots from "components/icons/IconBtnDots";
import ModalBase from "components/modal/ModalBase";
import parse from "html-react-parser";
import PostModalContent from "components/modal/ModalContent/PostModalContent";
import { useDispatch, useSelector } from "react-redux";
import useSound from "use-sound";
import soundLike from "components/sounds/soundLike.mp3";

// import soundLike from "../";
import { v4 } from "uuid";
import IconSaved from "components/icons/IconSaved";
import { toast } from "react-toastify";
import { setIsReload } from "components/redux/globalSlice";
const Post = ({ post, socket }) => {
  const [likeTotal, setLikeTotal] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [myUser, setMyUser] = useState([]);
  const [moreTitle, setMoreTitle] = useState(false);
  const [user, setUser] = useState({});
  const { user: currentUser } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [moreButton, setMoreButton] = useState(false);
  const [saved, setSaved] = useState(false);
  const moreTitleRef = useRef();
  const [commentList, setCommentList] = useState([]);
  const [userPost, setUserPost] = useState([]);
  const { isComment } = useSelector((state) => state.global);

  const [play] = useSound(soundLike, { volume: 0.75 });

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);
  // console.log("post", post);
  const handleClickLike = async (type) => {
    try {
      await axios.put("http://localhost:5000/posts/" + post._id + "/like/", {
        userId: currentUser._id,
      });

      play();
    } catch (error) {
      console.log(error);
    }
    setIsLiked(!isLiked);
    setLikeTotal(isLiked ? likeTotal - 1 : likeTotal + 1);
    // console.log("user", user.username);

    if (type === 0) return;
    const dataNots = {
      senderName: myUser.username,
      receiverName: user?.username === myUser.username ? null : user?.username,
      type,
      postId: post._id,
      postImg: post.img?.thumb,
      senderImg: myUser.profilePicture.thumb,
    };
    if (user?.username === myUser.username) return;
    socket?.emit("sendNotification", dataNots);
    try {
      await axios.post("http://localhost:5000/notifications/", dataNots);
    } catch (error) {
      console.log(error);
    }
  };

  //get user of post
  React.useEffect(() => {
    async function getUser() {
      try {
        const res = await axios.get(
          `http://localhost:5000/users?userId=${post.userId}`
        );
        setUser(res.data);

        const userBig = await axios.get(
          `http://localhost:5000/users?userId=${currentUser._id}`
        );
        setMyUser(userBig.data);
      } catch (error) {
        console.log(error);
      }
    }
    getUser();
  }, [post.userId, currentUser._id]);

  const onClickShowModal = () => {
    setShowModal(true);
  };

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  }, [showModal]);

  useEffect(() => {
    const a = moreTitleRef.current;
    const b = a.getBoundingClientRect();
    if (b.height > 40) {
      a.classList.add("truncate-class");
      setMoreTitle(true);
    }
    if (moreButton && a.classList.contains("truncate-class")) {
      a.classList.remove("truncate-class");
      setMoreTitle(false);
    }

    // const result = a.classList.contains("truncate-class");
    // console.log("result", result);
  }, [moreButton]);

  useEffect(() => {
    async function getComments() {
      try {
        const res = await axios.get(
          `http://localhost:5000/comments/${post._id}`
        );
        setCommentList(res.data.reverse());
      } catch (error) {
        console.log(error);
      }
    }
    getComments();
  }, [post._id, isComment]);
  // const a = Number(commentList.length) - 2, Number(commentList.length)
  // console.log("resultlist", commentList);
  // console.log("user", user);
  useEffect(() => {
    setSaved(myUser?.saved?.includes(post._id));
  }, [myUser.saved, post._id]);
  // console.log("myUser", myUser);
  const handleSavedPost = async () => {
    setSaved(!saved);
    try {
      await axios.put(`http://localhost:5000/posts/saved/${post._id}`, {
        userId: myUser._id,
      });

      if (saved) {
        toast.info("You unsaved post");
      } else {
        toast.success("You saved post");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (post?.userId === undefined) return;
    async function getUser() {
      try {
        const res = await axios.get(
          `http://localhost:5000/users/${post?.userId}`
        );
        setUserPost(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getUser();
  }, [post?.userId]);
  if (!user || !commentList) return;
  return (
    <>
      <div className="post border max-w-full w-[450px] md:w-[600px] dark:bg-black flex flex-col border-slate-300 dark:border-[#363636] rounded-lg my-4">
        <div className="flex items-center justify-between p-3 dark:bg-black rounded-t-lg">
          <Link
            to={`/${user.username}`}
            className="flex items-center gap-x-3 cursor-pointer"
          >
            <img
              className="object-cover h-[35px] w-[35px] rounded-full  border-[2px] border-orange-600"
              src={
                user?.profilePicture?.thumb ||
                "https://i.ibb.co/1dSwFqY/download-1.png"
              }
              alt=""
            />
            <div className="flex flex-col">
              <div className="text-slate-700 text-[14px] flex items-center gap-x-1  font-semibold dark:text-white">
                {user.username}

                {userPost?.isAdmin && (
                  <span className="">
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-4 h-4 text-blue-500"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.516 2.17a.75.75 0 00-1.032 0 11.209 11.209 0 01-7.877 3.08.75.75 0 00-.722.515A12.74 12.74 0 002.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 00.374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 00-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08zm3.094 8.016a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </span>
                )}
              </div>
              <p className="text-[13px] text-slate-700 italic dark:text-white">
                {post.location}
              </p>
            </div>
          </Link>
          <div
            className="p-2 cursor-pointer btnDots dark:text-white"
            onClick={onClickShowModal}
          >
            <IconBtnDots></IconBtnDots>
          </div>
        </div>

        <div className="imagePost w-full h-full ">
          <img
            src={post?.img.url || post?.img}
            className="w-full max-h-[600px] object-cover"
            alt=""
          />
        </div>

        <div className="p-3 flex flex-col gap-y-1">
          <div className="flex items-center justify-between">
            <div className="threeIcons flex items-center gap-x-3">
              {isLiked ? (
                <>
                  <IconHeart
                    onClick={() => handleClickLike(0)}
                    className="text-red-500"
                  ></IconHeart>
                </>
              ) : (
                <>
                  <IconHeartNone
                    onClick={() => handleClickLike(1)}
                  ></IconHeartNone>
                </>
              )}
              {!post.hideComment && (
                <Link to={`/post/${post._id}`}>
                  <IconComment className="dark:text-white"></IconComment>
                </Link>
              )}
              <IconShare className="dark:text-white"></IconShare>
            </div>
            <div>
              {saved ? (
                <IconSaved onClick={handleSavedPost}></IconSaved>
              ) : (
                <IconSave
                  onClick={handleSavedPost}
                  className="dark:text-white"
                ></IconSave>
              )}
            </div>
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
          <div className={`${moreButton ? "" : "flex"}`}>
            <Link
              to={`/${user?.username}`}
              className="text-slate-700 dark:text-white  text-[14px font-semibold  mb-2"
            >
              {user?.username}
            </Link>{" "}
            <div
              ref={moreTitleRef}
              className="ml-1 mb-1 description-block overflow-hidden   tracking-tight truncateTitle dark:text-white"
            >
              {parse(post.desc || "")}
            </div>
          </div>
          {moreTitle ? (
            <>
              <div
                onClick={() => setMoreButton(true)}
                className="text-slate-400  cursor-pointer  text-[14px]"
              >
                <span>...</span>
                more
              </div>
            </>
          ) : (
            <></>
          )}
          {commentList.length > 1 && !post.hideComment && (
            <div className="cursor-pointer ">
              <Link
                to={`/post/${post._id}`}
                className="text-slate-400 hover:text-slate-600 text-[14px]  transition-all"
              >
                {`View all ${commentList.length} comments`}
              </Link>
            </div>
          )}
          <div className="here">
            {commentList.length > 0 &&
              commentList
                .slice(0, 2)
                .reverse()
                .map(
                  (comment) =>
                    !post.hideComment && (
                      <div
                        key={v4()}
                        className="flex items-center text-[14px] gap-x-1"
                      >
                        <Link
                          to={`/${comment?.user.username}`}
                          className="font-semibold text-slate-600 dark:text-white"
                        >
                          {comment?.user.username}
                        </Link>
                        <p>{comment?.content}</p>

                        {/* <ItemComment
                          shortDesc
                          commentData={comment}
                        ></ItemComment> */}
                      </div>
                    )
                )}
          </div>
          <div>
            <p className="text-slate-400 text-[9px] uppercase ">
              {format(post.createdAt)}
            </p>
          </div>
        </div>
        {!post.hideComment && (
          <SendComment
            socket={socket}
            myUser={myUser}
            receiverName={user}
            post={post}
          ></SendComment>
        )}
      </div>
      {showModal && (
        <ModalBase
          animationRoot="primary"
          visible={showModal}
          onClose={() => setShowModal(false)}
        >
          <PostModalContent
            postId={post?._id}
            userId={post?.userId}
            currentUserId={currentUser._id}
            onClose={() => setShowModal(false)}
          ></PostModalContent>
        </ModalBase>
      )}
    </>
  );
};

export default Post;
