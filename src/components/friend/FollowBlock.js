import React, { useEffect, useState } from "react";
import ModalBase from "components/modal/ModalBase";
import ValidFollowContent from "components/modal/ModalContent/ValidFollowContent";
import IconDown from "components/icons/IconDown";
import { follow, unFollow } from "components/redux/actions/profileAction";
import { useDispatch, useSelector } from "react-redux";
const FollowBlock = ({ data: user, styleBtn = false }) => {
  const [followed, setFollowed] = useState(false);
  const dispatch = useDispatch();
  const { profile, auth, socket } = useSelector((state) => state);
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    if (auth.user.followings.find((item) => item._id === user._id)) {
      setFollowed(true);
    }
    return () => setFollowed(false);
  }, [user._id, auth.user.followings]);

  const handleFollow = async () => {
    setFollowed(true);
    dispatch(follow({ users: profile.users, user, auth, socket }));
  };
  const handleUnFollow = async () => {
    setFollowed(false);
    dispatch(unFollow({ users: profile.users, user, auth, socket }));
  };
  return (
    <>
      <div className="">
        {followed ? (
          <>
            <>
              <div
                onClick={() => setConfirmDelete(true)}
                className={`p-1 px-2 text-white bg-[#363636] rounded-lg dark:text-white  hover:text-slate-400 cursor-pointer text-[13px] ${
                  styleBtn
                    ? "p-2 px-5 rounded-lg dark:bg-[#363636] bg-[#DBDBDB] hover:bg-[#EFEFEF] text-[15px] font-bold  flex items-center justify-center dark:hover:bg-[#262626]"
                    : ""
                }`}
              >
                Following
                {styleBtn && <IconDown></IconDown>}
              </div>
            </>
          </>
        ) : (
          <>
            <div
              onClick={() => handleFollow(3)}
              className={`p-1 px-2 text-white bg-blue-500 rounded-lg hover:text-white cursor-pointer text-[13px]  ${
                styleBtn
                  ? "p-2 rounded-lg bg-blue-500 px-5 text-white  font-bold text-[15px] hover:bg-blue-700 transition-all"
                  : "text-blue-500 "
              }`}
            >
              Follow
            </div>
          </>
        )}
      </div>
      <ModalBase
        visible={confirmDelete}
        onClose={() => setConfirmDelete(false)}
      >
        <ValidFollowContent
          handleUnFollow={handleUnFollow}
          user={user}
          onClose={() => setConfirmDelete(false)}
        ></ValidFollowContent>
      </ModalBase>
    </>
  );
};

export default FollowBlock;
