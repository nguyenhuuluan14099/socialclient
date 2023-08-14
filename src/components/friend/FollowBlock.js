import React, { useState } from "react";
import ModalBase from "components/modal/ModalBase";
import ValidFollowContent from "components/modal/ModalContent/ValidFollowContent";
import axios from "axios";
import { useAuth } from "components/context/Auth-Context";
import IconDown from "components/icons/IconDown";
const FollowBlock = ({ data, styleBtn = false }) => {
  const [loading, setLoading] = useState(false);
  const { user, dispatch } = useAuth();
  const [followed, setFollowed] = useState(user.followings.includes(data._id));
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleFollow = async () => {
    try {
      setLoading(true);
      await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/users/${data._id}/follow`,
        {
          userId: user._id,
        }
      );
      dispatch({
        type: "FOLLOW",
        payload: data._id,
      });
      setLoading(false);
      setFollowed(!followed);

      // const dataNots = {
      //     senderName: currentUser.username,
      //     receiverName:
      //     data.username === currentUser.username ? null : user.username,
      //     type,
      //     senderImg: currentUser.profilePicture.thumb,
      //   };
      //   // console.log("dataNots", dataNots);
      //   if (user.username === currentUser.username) return;
      //   socket?.emit("sendNotification", dataNots);
      //   try {
      //     await axios.post(
      //       `${process.env.REACT_APP_SERVER_URL}/notifications/`,
      //       dataNots
      //     );
      //   } catch (error) {
      //     console.log(error);
      //   }
    } catch (error) {
      console.log(error);
    }
  };
  const handleUnFollow = async () => {
    try {
      await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/users/${data._id}/unfollow`,
        {
          userId: user._id,
        }
      );
      dispatch({
        type: "UNFOLLOW",
        payload: data._id,
      });

      setFollowed(!followed);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {followed ? (
        <>
          {/* <p
            onClick={() => setConfirmDelete(true)}
            className="text-white  hover:text-slate-400 cursor-pointer text-[13px]"
          >
            Following
          </p> */}
          {loading ? (
            <div className="w-[10px] h-[10px] animate-spin border-t-transparent rounded-full  border-blue-500 border-2"></div>
          ) : (
            <>
              <div
                onClick={() => setConfirmDelete(true)}
                className={`dark:text-white  hover:text-slate-400 cursor-pointer text-[13px] ${
                  styleBtn
                    ? "p-2 px-5 rounded-lg dark:bg-[#363636] bg-[#DBDBDB] hover:bg-[#EFEFEF] text-[15px] font-bold  flex items-center justify-center dark:hover:bg-[#262626]"
                    : ""
                }`}
              >
                Following
                {styleBtn && <IconDown></IconDown>}
              </div>
            </>
          )}
        </>
      ) : (
        <>
          <div
            onClick={handleFollow}
            className={` hover:text-white cursor-pointer text-[13px]  ${
              styleBtn
                ? "p-2 rounded-lg bg-blue-500 px-5  font-bold text-[15px] hover:bg-blue-700 transition-all"
                : "text-blue-500 "
            }`}
          >
            Follow
          </div>
        </>
      )}

      <ModalBase
        visible={confirmDelete}
        onClose={() => setConfirmDelete(false)}
      >
        <ValidFollowContent
          handleUnFollow={handleUnFollow}
          user={data}
          onClose={() => setConfirmDelete(false)}
        ></ValidFollowContent>
      </ModalBase>
    </div>
  );
};

export default FollowBlock;
