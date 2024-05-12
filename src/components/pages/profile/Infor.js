import FollowBlock from "components/friend/FollowBlock";
import Header from "components/header/Header";
import IconAdmin from "components/icons/IconAdmin";
import IconSetting from "components/icons/IconSetting";
import ImageLazy from "components/image/ImageLazy";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ViewFollowers from "./ViewFollowers";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "components/redux/actions/messageAction";

const Infor = ({ id, profile }) => {
  const { auth, message } = useSelector((state) => state);
  const [userData, setUserData] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    if (auth.user._id === id) {
      setUserData([auth.user]);
    } else {
      const newUser = profile.users.filter((item) => item._id === id);
      setUserData(newUser);
    }
  }, [id, profile.users, auth.user]);

  const handleCreateConversation = () => {
    let item;
    userData.forEach((user) => {
      item = {
        username: user.username,
        fullname: user.fullname,
        profilePicture: user.profilePicture,
        _id: user._id,
      };
    });

    dispatch(addUser({ user: item, message }));
  };
  return (
    <>
      {userData.map((user) => (
        <div
          key={user._id}
          className=" border-[1px]  border-transparent border-b-slate-300  w-full py-4 laptop:py-10 p-2 max-w-[900px] "
        >
          <div className=" mx-auto flex  laptop:items-center justify-around gap-x-2 w-full   max-w-[700px]">
            <img
              src={
                user?.profilePicture[0]?.imageUrl ||
                "https://i.ibb.co/1dSwFqY/download-1.png"
              }
              alt=""
              className="laptop:mt-auto shrink-0 w-[80px] h-[80px] laptop:w-[180px] laptop:h-[180px]  rounded-full object-cover"
            />
            <div className="flex gap-y-4 max-w-[400px] flex-col  w-full ">
              <div className="flex laptop:items-center gap-2 laptop:flex-row flex-col w-full gap-x-3 ">
                <div className={` flex items-center  gap-x-3 `}>
                  <p className="text-lg font-semibold">
                    {user?.fullname || "noName"}
                  </p>
                  <div>
                    {user.isAdmin && (
                      <span>
                        <IconAdmin></IconAdmin>
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-start ">
                  {auth.user._id !== user._id ? (
                    <>
                      <div className="flex items-start gap-2 ">
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
                    <Link
                      to="/account/edit"
                      className="p-2 rounded-lg block px-5 dark:bg-[#363636] dark:text-white dark:hover:bg-[#262626] text-[13px] font-bold bg-[#DBDBDB] hover:bg-[#EFEFEF]"
                    >
                      Edit profile
                    </Link>
                  )}
                  {user.isAdmin && auth.user.isAdmin && (
                    <Link
                      to="/manageSystem"
                      className="py-1 ml-1 flex rounded-lg  px-2 items-center dark:bg-[#363636] dark:text-white dark:hover:bg-[#262626] text-xs font-bold bg-[#DBDBDB] hover:bg-[#EFEFEF]"
                    >
                      <IconSetting></IconSetting>
                      Manage System
                    </Link>
                  )}
                </div>
              </div>
              <div className="flex items-center w-full max-w-[300px]  justify-between">
                <div className="flex items-center gap-x-2">
                  <p className="font-[600]">
                    {profile.posts.map((post) => {
                      if (post._id !== id) return null;
                      return <span key={post._id}>{post.result}</span>;
                    })}
                  </p>
                  <p>posts</p>
                </div>
                <ViewFollowers follower user={user} slug={id}></ViewFollowers>
                <ViewFollowers user={user} slug={id}></ViewFollowers>
                {/* <ViewFollowings user={user} slug={slug}></ViewFollowings> */}
              </div>
              <div className="desc-user ">
                <div className="descUser ">
                  <p className="text-lg italic font-semibold dark:text-white text-slate-400">
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
      ))}
    </>
  );
};

export default Infor;
