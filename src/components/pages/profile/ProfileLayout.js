import axios from "axios";
import { Button } from "components/button";
import { useAuth } from "components/context/Auth-Context";
import Header from "components/header/Header";
import IconDown from "components/icons/IconDown";
import IconSetting from "components/icons/IconSetting";
import Loading from "components/loading/Loading";
import ModalBase from "components/modal/ModalBase";
import FollowerModalContent from "components/modal/ModalContent/FollowerModalContent";
import FollowingModalContent from "components/modal/ModalContent/FollowingModalContent";
import ValidFollowContent from "components/modal/ModalContent/ValidFollowContent";
import ItemPost from "components/post/ItemPost";
import {
  setMarkNot,
  setShowLoading,
  setSocket,
} from "components/redux/globalSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { v4 } from "uuid";
import NotPost from "./NotPost";
import PostTag from "./PostTag";
import ProfilePosts from "./ProfilePosts";
import SavedTag from "./SavedTag";

const ProfileLayout = ({ socket }) => {
  const { slug } = useParams();
  const [user, setUser] = useState([]);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowings, setShowFollowings] = useState(false);
  const [showFollow, setShowFollow] = useState(false);
  // const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [myUser, setMyUser] = useState([]);
  const [showActive, setShowActive] = useState(false);
  const { user: currentUser, dispatch } = useAuth();
  const { isUpdate, isLoading, totalSaved } = useSelector(
    (state) => state.global
  );
  const dispatch01 = useDispatch();
  const [followed, setFollowed] = useState();
  const promise = new Promise((resolve) => {
    setTimeout(() => {
      resolve(myUser?.followings?.includes(user?._id));
    }, 200);
  });
  promise.then((data) => {
    setFollowed(data);
  });
  // console.log("user", typeof user._id);
  // console.log("currentUser", typeof currentUser.followings[1]);
  // console.log("hererUser", user);
  // console.log("user_id", user._id);
  // console.log("currentUser._id", currentUser._id);
  useEffect(() => {
    if (showFollowers || showFollowings) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  }, [showFollowers, showFollowings]);

  useEffect(() => {
    if (slug === "saved") return;
    async function getUserInfo() {
      try {
        const res = await axios.get(
          `https://serversocial.vercel.app/users?username=${slug}`
        );
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getUserInfo();
  }, [slug]);

  useEffect(() => {
    async function getUser() {
      try {
        const userBig = await axios.get(
          `https://serversocial.vercel.app/users?userId=${currentUser._id}`
        );
        setMyUser(userBig.data);
      } catch (error) {
        console.log(error);
      }
    }
    getUser();
  }, [currentUser]);

  useEffect(() => {
    async function getPostsOfUser() {
      try {
        dispatch01(setShowLoading(true));
        const res = await axios.get(
          "https://serversocial.vercel.app/posts/profile/" + slug
        );
        dispatch01(setShowLoading(false));

        setPosts(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getPostsOfUser();
    // here
  }, [dispatch01, isUpdate, slug]);
  //   console.log("followed", currentUser.followings.includes(user._id));

  // console.log("user", user);
  // console.log(posts);
  const handleFollow = async (type) => {
    try {
      dispatch01(setShowLoading(true));
      await axios.put(
        `https://serversocial.vercel.app/users/${user?._id}/follow`,
        {
          userId: currentUser?._id,
        }
      );
      dispatch01(setShowLoading(false));

      dispatch({ type: "FOLLOW", payload: user?._id });
      setFollowed(!followed);
    } catch (error) {
      console.log(error);
    }

    const dataNots = {
      senderName: myUser.username,
      receiverName: user.username === myUser.username ? null : user.username,
      type,
      senderImg: myUser.profilePicture.thumb,
    };
    // console.log("dataNots", dataNots);
    if (user.username === myUser.username) return;
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

  const handleUnFollow = async () => {
    try {
      await axios.put(
        `https://serversocial.vercel.app/users/${user?._id}/unfollow`,
        {
          userId: currentUser?._id,
        }
      );
      dispatch({ type: "UNFOLLOW", payload: user?._id });
      setFollowed(!followed);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateConversation = async () => {
    try {
      await axios.post(
        `https://serversocial.vercel.app/conversations/${myUser._id}`,
        {
          senderId: myUser?._id,
          receiveId: user._id,
        }
      );
      console.log("create new conversation");
    } catch (error) {
      console.log(error);
    }
  };

  if (!slug) return;
  return (
    <>
      <Header socket={socket}></Header>
      <div className="mt-5 border-[1px]  border-transparent border-b-slate-300  w-full py-10 p-2 max-w-[900px] ">
        <div className="p-3 max-w-[300px] mx-auto flex items-center gap-x-2 w-full  ">
          <img
            src={
              user?.profilePicture?.thumb ||
              "https://i.ibb.co/1dSwFqY/download-1.png"
            }
            alt=""
            className="w-[110px] h-[110px] rounded-full object-cover"
          />
          <div className="flex  flex-col gap-y-4 b w-full max-w-[500px]">
            <div className={` flex items-center  gap-x-3 w-full     pr-3`}>
              <p className="text-lg font-semibold">
                {user?.username || "noName"}
              </p>
              <div>
                {user.isAdmin && (
                  <span>
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6 text-blue-500"
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
            </div>
            <div className="flex flex-col items-start  gap-y-1">
              {currentUser._id !== user?._id ? (
                <>
                  <div className="flex items-start flex-col gap-y-1">
                    {followed ? (
                      <Button type="secondary">
                        <div
                          onClick={() => setShowFollow(true)}
                          className="flex items-center gap-x-2"
                        >
                          <p>Following</p>
                          <IconDown></IconDown>
                        </div>
                      </Button>
                    ) : (
                      <>
                        {" "}
                        {isLoading ? (
                          <Loading></Loading>
                        ) : (
                          <>
                            <Button
                              onClick={() => handleFollow(3)}
                              type="primary"
                            >
                              Follow
                            </Button>
                          </>
                        )}
                      </>
                    )}
                    <Link
                      to={`/messenger/${user?._id}`}
                      onClick={handleCreateConversation}
                    >
                      <Button type="secondary">Message</Button>
                    </Link>
                  </div>
                </>
              ) : (
                <Link to="/account/edit">
                  <Button className="" type="secondary">
                    Edit profile
                  </Button>
                </Link>
              )}
              {user.isAdmin && myUser.isAdmin && (
                <Link to="/manageSystem">
                  <Button type="secondary" className="">
                    <IconSetting></IconSetting>
                    Manage System
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
        <div className="desc-user max-w-[300px] mx-auto ">
          <div className="flex items-center w-full max-w-[300px] justify-between">
            <div className=" flex items-center gap-x-2">
              <p className="font-[600]">{`${posts.length || totalSaved}`}</p>
              <p>posts</p>
            </div>
            <Link
              // to={`/followers`}
              onClick={() => setShowFollowers(true)}
              className="cursor-pointer flex items-center gap-x-2"
            >
              <p className="font-[600]">{`${user.followers?.length || 0}`}</p>
              <p>followers</p>
            </Link>
            <div
              onClick={() => setShowFollowings(true)}
              className="cursor-pointer flex items-center gap-x-2"
            >
              <p className="font-[600]">{`${user.followings?.length || 0}`}</p>
              <p>following</p>
            </div>
          </div>
          <div className="descUser ">
            <p className="text-lg font-semibold italic dark:text-white text-slate-400">
              {user?.desc}
            </p>
            <p className="text-[14px] dark:text-white font-bold italic text-slate-700">
              {user?.city}
            </p>
          </div>
        </div>
      </div>
      <div className="">
        <div className="sideBarProfile  flex flex-col  container">
          <div className="flex w-full max-w-[250px] mx-auto">
            <PostTag
              setShowActive={setShowActive}
              showActive={showActive}
            ></PostTag>
            {myUser._id === user._id && (
              <SavedTag
                showActive={showActive}
                setShowActive={setShowActive}
                username={myUser.username}
              ></SavedTag>
            )}
          </div>

          <div className="">
            <Outlet></Outlet>
          </div>
        </div>

        {showFollowers && (
          <ModalBase
            visible={showFollowers}
            onClose={() => setShowFollowers(false)}
          >
            <FollowerModalContent
              slug={slug}
              onClose={() => setShowFollowers(false)}
            ></FollowerModalContent>
          </ModalBase>
        )}

        {showFollowings && (
          <ModalBase
            visible={showFollowings}
            onClose={() => setShowFollowings(false)}
          >
            <FollowingModalContent
              slug={slug}
              onClose={() => setShowFollowings(false)}
            ></FollowingModalContent>
          </ModalBase>
        )}

        {showFollow && (
          <ModalBase visible={showFollow} onClose={() => setShowFollow(false)}>
            <ValidFollowContent
              handleUnFollow={handleUnFollow}
              user={user}
              onClose={() => setShowFollow(false)}
            ></ValidFollowContent>
          </ModalBase>
        )}
      </div>
    </>
  );
};

export default ProfileLayout;
