import axios from "axios";
import { useAuth } from "components/context/Auth-Context";
import IconAdmin from "components/icons/IconAdmin";
import IconBtnDots from "components/icons/IconBtnDots";
import ModalBase from "components/modal/ModalBase";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { format } from "timeago.js";

const Conversation = ({
  conversations,
  currentUser,
  setSlugId,
  onlineFriends,
}) => {
  const [user, setUser] = useState(null);
  const { user: myUser } = useAuth();
  // console.log("cov", conversations._id);
  // const { message } = useSelector((state) => state.global);
  // console.log("message", message);

  const [lastMess, setLastMess] = useState([]);
  const [onLine, setOnline] = useState();
  const { reloadMes } = useSelector((state) => state.global);
  useEffect(() => {
    async function getMessage() {
      try {
        const res = await axios.get(
          `http://localhost:5000/messages/${conversations._id}`
        );
        setLastMess(res.data.slice(-1));
      } catch (error) {
        console.log(error);
      }
    }
    getMessage();
  }, [conversations._id]);

  useEffect(() => {
    onlineFriends.forEach((i) => {
      setOnline(i);
    });
  }, [onlineFriends]);
  // console.log("online", onLine);
  // console.log("lastMes", lastMess);
  useEffect(() => {
    async function getUser() {
      const friendId = conversations.members.find((m) => m !== currentUser._id);
      try {
        const res = await axios(
          "http://localhost:5000/users?userId=" + friendId
        );
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getUser();
  }, [reloadMes, conversations.members, currentUser._id]);

  // console.log("userid", currentUser._id);
  // console.log("lastMess.sender", lastMess.sender);
  // console.log("myUser._id", myUser._id);
  // console.log("lastMess.sender === myUser._id", lastMess.sender === myUser._id);

  return (
    <div className="flex group items-center gap-x-3 p-3 dark:hover:bg-[#262626]  cursor-pointer hover:bg-slate-100 transition-all">
      <div className="w-[50px] h-[50px]  shrink-0 relative">
        <img
          src={
            user?.profilePicture?.thumb ||
            "https://i.ibb.co/1dSwFqY/download-1.png"
          }
          alt=""
          className="w-[50px] h-[50px] rounded-full object-cover "
        />
        {user?._id === onLine?._id && (
          <div className="w-[13px] h-[13px] rounded-full bg-green-500 absolute bottom-0 right-0"></div>
        )}
      </div>

      <div className="flex flex-col flex-1">
        <div className="font-semibold text-[16px] flex items-center gap-x-1">
          {user?.username}
          <div>
            {user?.isAdmin && (
              <div>
                <IconAdmin className="!w-4 !h-4"></IconAdmin>
              </div>
            )}
          </div>
        </div>
        <div className=" text-[14px]">
          {lastMess.length > 0 &&
            lastMess.map((mes) => (
              <div
                key={mes._id}
                className="flex items-center gap-x-2 w-full  h-[20px]"
              >
                <p className="shortDesc text-slate-500 font-semibold dark:text-slate-200">
                  {mes.sender === myUser._id
                    ? `You: ${mes.imageMes ? "Sent a picture." : mes.text}`
                    : mes.imageMes
                    ? "Sent you a picture."
                    : mes.text}
                </p>
                <p className="mb-2">.</p>
                <div className="text-slate-500 dark:text-slate-200">
                  {Number(format(mes?.createdAt).split(" ")[0]) >= 10
                    ? format(mes?.createdAt).split(" ").join("").slice(0, 3)
                    : Number(format(mes?.createdAt).split(" ")[0]) < 10
                    ? format(mes?.createdAt).split(" ").join("").slice(0, 2)
                    : format(mes?.createdAt).split(" ")[1] === "now"
                    ? "now"
                    : ""}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Conversation;
