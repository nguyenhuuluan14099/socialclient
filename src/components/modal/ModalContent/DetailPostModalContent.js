import axios from "axios";
import ItemComment from "components/comment/ItemComment";
import SendComment from "components/comment/SendComment";
import { useAuth } from "components/context/Auth-Context";
import IconBtnDots from "components/icons/IconBtnDots";
import IconComment from "components/icons/IconComment";
import IconHeart from "components/icons/IconHeart";
import IconHeartNone from "components/icons/IconHeartNone";
import IconSave from "components/icons/IconSave";
import IconShare from "components/icons/IconShare";
import ImageUser from "components/image/ImageUser";
import {
  setIsReload,
  setShowLoading,
  toggleUpdate,
} from "components/redux/globalSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { format } from "timeago.js";
import ModalBase from "../ModalBase";
import PostModalContent from "./PostModalContent";
import { v4 } from "uuid";
import IconCommentFill from "components/icons/IconCommentFill";
import parse from "html-react-parser";
import Loading from "components/loading/Loading";
import soundLike from "components/sounds/soundLike.mp3";

import useSound from "use-sound";
import { toast } from "react-toastify";
import IconSaved from "components/icons/IconSaved";
import IconBack from "components/icons/IconBack";
import IconAdmin from "components/icons/IconAdmin";
import IconPlus from "components/icons/IconPlus";

const DetailPostModalContent = ({
  dataPostProfile,
  morePost,
  socket,
  onClose = () => {},
}) => {
  const { slug } = useParams();

  const [post, setPost] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [user, setUser] = useState([]);
  const [modalUser, setModalUser] = useState([]);
  const [postOfUser, setPostOfUser] = useState([]);
  const [commentList, setCommentList] = useState([]);
  const [myUser, setMyUser] = useState([]);
  const [saved, setSaved] = useState(false);

  //sound

  const [play] = useSound(soundLike, { volume: 0.75 });
  //reply comment
  const [replyData, setReplyData] = useState(null);
  const [childCmt, setChildCmt] = useState([]);
  const [parentCmt, setParentCmt] = useState([]);
  const [likeTotal, setLikeTotal] = useState(dataPostProfile?.likes?.length);
  const [commentPerPage, setCommentPerPage] = useState(5);
  const { user: currentUser } = useAuth();

  const { isUpdate, isComment, isReload, isLoading } = useSelector(
    (state) => state.global
  );
  const dispatch = useDispatch();
  const handleLoadMoreComment = () => {
    setCommentPerPage(commentPerPage + 6);
  };
  useEffect(() => {
    setIsLiked(post?.likes?.includes(currentUser._id));
  }, [currentUser._id, post?.likes]);

  useEffect(() => {
    setIsLiked(dataPostProfile?.likes?.includes(currentUser._id));
  }, [currentUser._id, dataPostProfile?.likes]);

  useEffect(() => {
    if (dataPostProfile) return;
    async function getData() {
      try {
        const res = await axios.get(`https://serversocial.vercel.app/posts/${slug}`);
        setPost(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, [isLiked, slug, dataPostProfile, isUpdate]);

  //"https://serversocial.vercel.app/posts/" + dataPostProfile?._id + "/like/",
  //`https://serversocial.vercel.app/posts/${dataPostProfile?._id ? dataPostProfile?._id : post?._id}/like/`
  //handleClick for profile Item post

  const handleClickLike = async (type) => {
    try {
      await axios.put(
        `https://serversocial.vercel.app/posts/${
          dataPostProfile?._id ? dataPostProfile?._id : post?._id
        }/like/`,
        {
          userId: currentUser._id,
        }
      );
      play();
    } catch (error) {
      console.log(error);
    }
    dispatch(toggleUpdate(!isUpdate));
    setIsLiked(!isLiked);
    setLikeTotal(isLiked ? likeTotal - 1 : likeTotal + 1);
    // console.log("myUser", myUser);
    // console.log("user", user);
    // console.log("modalUser", modalUser);
    if (type === 0) return;
    const dataNots = {
      senderName: myUser.username,
      receiverName:
        (user.length === 0 ? modalUser.username : user.username) ===
        myUser.username
          ? null
          : user.length === 0
          ? modalUser.username
          : user.username,
      type,
      postImg: dataPostProfile ? dataPostProfile.img.thumb : post.img.thumb,
      postId: dataPostProfile ? dataPostProfile._id : post._id,
      senderImg: myUser.profilePicture.thumb,
    };
    // console.log("dataNot", dataNots);

    if (
      user.username === myUser.username ||
      modalUser.username === myUser.username
    )
      return;
    socket?.emit("sendNotification", dataNots);
    try {
      await axios.post("https://serversocial.vercel.app/notifications/", dataNots);
    } catch (error) {
      console.log(error);
    }
  };
  //handle click for detail page post

  useEffect(() => {
    if (dataPostProfile?.userId === undefined) return;
    async function getUser() {
      try {
        const res = await axios.get(
          `https://serversocial.vercel.app/users/${dataPostProfile?.userId}`
        );
        setModalUser(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getUser();
  }, [dataPostProfile?.userId]);

  useEffect(() => {
    async function getUser() {
      try {
        const userBig = await axios.get(
          `https://serversocial.vercel.app/users?userId=${currentUser?._id}`
        );
        setMyUser(userBig.data);
      } catch (error) {
        console.log(error);
      }
    }
    getUser();
  }, [currentUser?._id]);
  useEffect(() => {
    if (post?.userId === undefined) return;
    async function getUser() {
      try {
        const res = await axios.get(
          `https://serversocial.vercel.app/users/${post?.userId}`
        );
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getUser();
  }, [post?.userId, currentUser._id]);

  useEffect(() => {
    async function getPostsOfUser() {
      try {
        dispatch(setShowLoading(true));

        const res = await axios.get(
          "https://serversocial.vercel.app/posts/profile/" + user?.username
        );
        dispatch(setShowLoading(false));

        setPostOfUser(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getPostsOfUser();
  }, [dispatch, user?.username]);
  const listPost = postOfUser.filter((p) => p._id !== post._id);

  // console.log("post", post);

  useEffect(() => {
    if (!dataPostProfile && !post._id) return;
    async function getComments() {
      try {
        dispatch(setShowLoading(true));

        const res = await axios.get(
          `https://serversocial.vercel.app/comments/${
            dataPostProfile ? dataPostProfile?._id : post._id
          }`
        );
        dispatch(setShowLoading(false));

        setCommentList(res.data.reverse());
      } catch (error) {
        console.log(error);
      }
    }
    getComments();
  }, [post._id, isComment, isReload, dataPostProfile, dispatch]);
  // console.log("dataPostProfile", dataPostProfile);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  }, [showModal]);

  useEffect(() => {
    const parentCmt = commentList.filter((comment) => !comment?.reply);
    setParentCmt(parentCmt);
    const childCmt = commentList.filter((comment) => comment?.reply);
    setChildCmt(
      childCmt.sort((p1, p2) => {
        return format(p2.createdAt) - format(p1.createdAt);
      })
    );
  }, [commentList, isReload]);

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    setSaved(
      myUser?.saved?.includes(dataPostProfile ? dataPostProfile._id : post._id)
    );
  }, [dataPostProfile, myUser?.saved, post._id]);
  const handleSavedPost = async () => {
    setSaved(!saved);
    try {
      await axios.put(
        `https://serversocial.vercel.app/posts/saved/${
          dataPostProfile ? dataPostProfile._id : post._id
        }`,
        {
          userId: myUser._id,
        }
      );
      dispatch(setIsReload(!isReload));
      if (saved) {
        toast.info("You unsaved post");
      } else {
        toast.success("You saved post");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // console.log("dataPostProfile?.desc", parse(dataPostProfile?.desc));
  return (
    // max-w-[50%]
    <div className="dark:bg-black h-full">
      <div className=" xl:mt-0 xl:h-[680px] w-full dark:bg-black dark:border-[#262626] flex-col md:flex-row flex h-full border border-slate-300 rounded-[4px] md:h-[600px]">
        <div className="w-full flex flex-col   max-w-[100%] bg-white  dark:bg-black">
          <div className=" p-4 border flex items-center justify-between border-transparent border-b-slate-300 dark:border-b-[#262626] md:hidden h-full ">
            <div className="flex items-center gap-x-3">
              {dataPostProfile && (
                <div onClick={onClose} className="cursor-pointer">
                  <IconBack></IconBack>
                </div>
              )}

              <ImageUser story data={user} secondData={modalUser}></ImageUser>
              <Link
                to={`/${user?.username || modalUser?.username}`}
                className="hover:text-slate-500 cursor-pointer hover:underline hover:underline-offset-2 text-slate-700 dark:text-white font-[600] text-[14px] flex items-center gap-x-1"
              >
                {user?.username || modalUser?.username}

                {(user?.isAdmin || modalUser?.isAdmin) && (
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
              </Link>
            </div>

            <div
              onClick={() => setShowModal(true)}
              className="p-2 none-focus cursor-pointer"
            >
              <IconBtnDots></IconBtnDots>
            </div>
          </div>
          <img
            src={post?.img?.url || dataPostProfile?.img.url}
            alt=""
            className={`object-cover w-full md:my-auto   max-h-[450px] md:max-h-[500px]`}
          />
        </div>
        <div className="w-full  max-w-[100%] dark:text-white ">
          <div className="hidden p-4 border  md:flex items-center justify-between border-transparent border-b-slate-300 dark:border-b-[#262626]">
            <div className="flex items-center gap-x-3">
              <ImageUser story data={user} secondData={modalUser}></ImageUser>

              <Link
                to={`/${user?.username || modalUser?.username}`}
                className="hover:text-slate-500 cursor-pointer hover:underline hover:underline-offset-2 text-slate-700 dark:text-white font-[600] text-[14px] flex items-center gap-x-1"
              >
                {user?.username || modalUser?.username}

                {(user?.isAdmin || modalUser?.isAdmin) && (
                  <IconAdmin></IconAdmin>
                )}
              </Link>
            </div>
            <div
              onClick={() => setShowModal(true)}
              className="p-2 none-focus cursor-pointer"
            >
              <IconBtnDots></IconBtnDots>
            </div>
          </div>

          <div
            className={`commentBlock w-full p-4 h-full  max-h-[250px] md:max-h-[330px]  flex flex-col   overflow-hidden overflow-y-scroll ${
              dataPostProfile ? "h-[300px]" : ""
            }`}
          >
            <div className="flex sticky left-0 -top-5 bg-white dark:bg-black z-10 gap-x-3 mb-2 items-center">
              <div className="w-full max-w-[40px] h-[40px]">
                <ImageUser
                  data={user}
                  secondData={modalUser}
                  story
                  classNameImg="h-full"
                ></ImageUser>
              </div>
              <div className=" text-[14px] mt-1 bg-white dark:bg-black">
                <Link
                  to={`/${user.username || modalUser?.username}`}
                  className=""
                >
                  <span className="hover:text-slate-500 cursor-pointer hover:underline hover:underline-offset-2 text-slate-700 dark:text-white font-[600] text-[14px] mr-2">
                    {user?.username || modalUser?.username}
                  </span>
                </Link>

                {/* {dataPostProfile && parse(String(dataPostProfile?.desc))} */}
                <div className=" w-full overflow-hidden">
                  {!dataPostProfile && parse(String(post?.desc))}
                  {dataPostProfile && parse(String(dataPostProfile?.desc))}
                  {/* {parse(String(post?.desc))} */}
                </div>
                {/* parse(String(dataPostProfile?.desc)) */}
              </div>
            </div>
            {isLoading && (
              <div className="mt-[50px]">
                <Loading></Loading>
              </div>
            )}
            {(post?.hideComment === false ||
              dataPostProfile?.hideComment === false) && (
              <>
                {parentCmt?.length > 0 &&
                  parentCmt.slice(0, commentPerPage).map((comment) => (
                    <div key={v4()}>
                      <ItemComment
                        socket={socket}
                        commentList={commentList}
                        setReplyData={setReplyData}
                        length={comment?.length}
                        comment={comment}
                        dataPostProfile={dataPostProfile}
                        post={post}
                        replyComment={childCmt
                          .filter((cmt) => cmt.reply === comment?._id)
                          .reverse()}
                        // childCmt={childCmt}
                      ></ItemComment>
                    </div>
                  ))}
                {parentCmt.length > commentPerPage && (
                  <div className=" w-full flex  ">
                    <p onClick={handleLoadMoreComment} className="mx-auto">
                      <IconPlus></IconPlus>
                    </p>
                  </div>
                )}
              </>
            )}

            {/* //childCmt.filter((cmt) => cmt.reply === comment?._id) */}

            {/* {(post?.hideComment === false ||
              dataPostProfile?.hideComment === false) && (
              <>
                {replyCmt.length > 0 &&
                  replyCmt.map((reCmt) => (
                    <ItemReplyCmt commentList={reCmt}></ItemReplyCmt>
                  ))}
              </>
            )} */}

            <>
              {(post?.hideComment === true ||
                dataPostProfile?.hideComment === true) && (
                <div className="h-full flex items-center justify-center">
                  <p className="text-xl font-semibold text-slate-400">
                    This creator have been turn off comment.
                  </p>
                </div>
              )}
            </>
          </div>

          <div
            className={`${
              dataPostProfile ? "" : ""
            }  mt-auto p-4  border border-transparent dark:border-t-[#262626] border-t-slate-300 flex flex-col gap-y-3`}
          >
            <div className="flex  items-center justify-between">
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
                <IconComment className="dark:text-white"></IconComment>
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

            <div className="flex flex-col  ">
              {(post?.hideLike === false ||
                dataPostProfile?.hideLike === false) && (
                <p className="font-semibold text-[14px]">
                  {/* {`${
                  post?.likes?.length || dataPostProfile?.likes.length || 0
                } likes`} */}
                  {`${
                    post?.likes?.length > 0 || dataPostProfile?.likes.length > 0
                      ? `${
                          post?.likes?.length || dataPostProfile?.likes.length
                        } like${
                          post?.likes?.length > 1 ||
                          dataPostProfile?.likes.length > 1
                            ? "s"
                            : ""
                        }`
                      : ""
                  }`}
                </p>
              )}

              <p className="uppercase text-[9px] text-slate-400">
                {format(post?.createdAt || dataPostProfile?.createdAt)}
              </p>
            </div>
            <div className="mt-2 ">
              {(post?.hideComment === false ||
                dataPostProfile?.hideComment === false) && (
                <SendComment
                  setReplyData={setReplyData}
                  replyData={replyData}
                  socket={socket}
                  myUser={myUser}
                  receiverName={user?.length === 0 ? modalUser : user}
                  dataPostProfile={dataPostProfile}
                  post={post}
                ></SendComment>
              )}
            </div>
          </div>
        </div>
      </div>

      {morePost && (
        <div className="w-full border  border-transparent border-t-slate-300 my-10  p-4">
          <div className="flex items-center gap-x-1 my-5">
            <p className="text-slate-500 dark:text-white">More posts from</p>
            <p className="hover:text-slate-500 dark:text-white mt-1 cursor-pointer hover:underline hover:underline-offset-2 text-slate-700 font-[600] text-[14px]">
              {user?.username}
            </p>
          </div>
          <div className="grid grid-cols-3 gap-6 ">
            {listPost.length > 0 &&
              listPost.map((p) => (
                <div
                  key={p._id}
                  className="w-full  relative group  top-0  h-[100px] md:h-[200px]  xl:h-[250px]"
                >
                  <img
                    src={
                      p?.img?.url ||
                      "https://media.istockphoto.com/id/1455943818/fr/photo/larchitecte-prend-des-notes-sur-le-plan-puis-les-saisit-dans-lordinateur-portable-pour.jpg?b=1&s=170667a&w=0&k=20&c=_h8_mP3IanFwD84ya25XFzC4hq3MI2sXRY6hMIyCSvg="
                    }
                    alt=""
                    className="w-full top-0 absolute  h-[100px] md:h-[200px]  xl:h-[250px] object-cover z-5 "
                  />
                  <Link
                    onClick={handleScrollTop}
                    to={`/post/${p._id}`}
                    className="sticky top-0 h-[200px] xl:h-[250px] flex items-center justify-center z-10 overlay w-full max-h-[250px]  bg-white dark:bg-black invisible bg-opacity-20  group-hover:visible   transition duration-75 cursor-pointer"
                  >
                    <div className="flex items-center gap-x-2">
                      <IconCommentFill></IconCommentFill>
                    </div>
                    <p className="font-bold text-white text-lg">2</p>
                  </Link>
                </div>
              ))}
          </div>
        </div>
      )}

      {showModal && (
        <ModalBase
          animationRoot="primary"
          visible={showModal}
          onClose={() => setShowModal(false)}
        >
          <PostModalContent
            postId={dataPostProfile?._id ? dataPostProfile?._id : post?._id}
            userId={
              dataPostProfile?.userId ? dataPostProfile?.userId : post?.userId
            }
            currentUserId={currentUser._id}
            onClose={() => setShowModal(false)}
          ></PostModalContent>
        </ModalBase>
      )}
    </div>
  );
};

export default DetailPostModalContent;
