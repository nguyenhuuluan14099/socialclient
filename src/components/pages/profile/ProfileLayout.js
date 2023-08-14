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

import { setShowLoading } from "components/redux/globalSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useParams } from "react-router-dom";

import PostTag from "./PostTag";
import SavedTag from "./SavedTag";
import ImageLazy from "components/image/ImageLazy";
import FollowBlock from "components/friend/FollowBlock";
import IconAdmin from "components/icons/IconAdmin";
import ViewFollowers from "./ViewFollowers";
import ViewFollowings from "./ViewFollowings";

const ProfileLayout = ({ socket }) => {
  const { slug } = useParams();
  const [user, setUser] = useState([]);
  const [showFollow, setShowFollow] = useState(false);
  const [posts, setPosts] = useState([]);
  const [showActive, setShowActive] = useState(false);
  const { user: currentUser } = useAuth();

  useEffect(() => {
    if (slug === "saved") return;
    async function getUserInfo() {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/users?username=${slug}`
        );
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getUserInfo();
  }, [slug]);

  useEffect(() => {
    async function getPostsOfUser() {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/posts/profile/` + slug
        );

        setPosts(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getPostsOfUser();
  }, [slug]);
  const handleCreateConversation = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/conversations/${currentUser._id}`,
        {
          senderId: currentUser?._id,
          receiveId: user._id,
        }
      );
      console.log("create new conversation");
    } catch (error) {
      console.log(error);
    }
  };
  if (!slug || !user) return;
  return (
    <div className="ml-[130px]">
      <Header socket={socket}></Header>
      <div className=" border-[1px]  border-transparent border-b-slate-300  w-full py-10 p-2 max-w-[900px] ">
        <div className="   mx-auto flex items-center justify-around gap-x-2 w-full  max-w-[700px]">
          <ImageLazy
            url={
              user?.profilePicture?.url ||
              "https://i.ibb.co/1dSwFqY/download-1.png"
            }
            alt=""
            className="mt-auto w-[180px] h-[180px]  rounded-full object-cover"
          />
          <div className="flex gap-y-4 max-w-[400px] flex-col  w-full ">
            <div className="flex items-center gap-x-3 w-full ">
              <div className={` flex items-center  gap-x-3 w-full`}>
                <p className="text-lg font-semibold">
                  {user?.username || "noName"}
                </p>
                <div>
                  {user.isAdmin && (
                    <span>
                      <IconAdmin></IconAdmin>
                    </span>
                  )}
                </div>
              </div>
              <div className="flex  items-start  gap-y-1">
                {currentUser._id !== user?._id ? (
                  <>
                    <div className="flex items-start  gap-2 ">
                      <FollowBlock styleBtn data={user}></FollowBlock>
                      <Link
                        className="p-2 rounded-lg px-5 dark:bg-[#363636] dark:text-white dark:hover:bg-[#262626] font-bold bg-[#DBDBDB] hover:bg-[#EFEFEF]"
                        to={`/messenger/${user?._id}`}
                        onClick={handleCreateConversation}
                      >
                        Message
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
                {user.isAdmin && currentUser.isAdmin && (
                  <Link to="/manageSystem">
                    <Button type="secondary" className="">
                      <IconSetting></IconSetting>
                      Manage System
                    </Button>
                  </Link>
                )}
              </div>
            </div>
            <div className="flex items-center w-full max-w-[300px]  justify-between">
              <div className=" flex items-center gap-x-2">
                <p className="font-[600]">{`${posts.length}`}</p>
                <p>posts</p>
              </div>
              <ViewFollowers user={user} slug={slug}></ViewFollowers>
              <ViewFollowings slug={slug}></ViewFollowings>
            </div>
            <div className="desc-user ">
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
        </div>
      </div>
      <div className="">
        <div className="sideBarProfile  flex flex-col  container">
          <div className="flex w-full max-w-[250px] mx-auto">
            <PostTag
              setShowActive={setShowActive}
              showActive={showActive}
            ></PostTag>
            {currentUser._id === user._id && (
              <SavedTag
                showActive={showActive}
                setShowActive={setShowActive}
                username={currentUser.username}
              ></SavedTag>
            )}
          </div>

          <div className="">
            <Outlet></Outlet>
          </div>
        </div>

        {showFollow && (
          <ModalBase visible={showFollow} onClose={() => setShowFollow(false)}>
            <ValidFollowContent
              // handleUnFollow={handleUnFollow}
              user={user}
              onClose={() => setShowFollow(false)}
            ></ValidFollowContent>
          </ModalBase>
        )}
      </div>
    </div>
  );
};

export default ProfileLayout;
