import axios from "axios";
import { useAuth } from "components/context/Auth-Context";
import IconHeartNone from "components/icons/IconHeartNone";
import ModalBase from "components/modal/ModalBase";
import NotificationModalContent from "components/modal/ModalContent/NotificationModalContent";
import { setToastMes } from "components/redux/globalSlice";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const Notifications = ({ socket }) => {
  const { user } = useAuth();
  const [socketNot, setSocketNot] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [showNot, setShowNot] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    async function getNots() {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/notifications/${user.username}`
        );

        setNotifications(res.data.reverse());
      } catch (error) {
        console.log(error);
      }
    }
    getNots();
  }, [user]);
  useEffect(() => {
    socket?.on("getNotifications", (data) => {
      dispatch(setToastMes(true));

      setSocketNot(data);
    });
    return () => {
      socket?.disconnect();
    };
  }, [dispatch, socket]);

  useEffect(() => {
    setNotifications((prev) => [...prev, socketNot].reverse());
  }, [user?.username, socketNot]);

  const handleShowNotifications = () => {
    setShowNot(!showNot);
  };
  if (!user) return;
  return (
    <>
      {showNot && (
        <ModalBase
          type="sideBar"
          animationRoot="primary"
          visible={showNot}
          onClose={handleShowNotifications}
        >
          <NotificationModalContent
            socket={socket}
            setNotifications={setNotifications}
            onClose={handleShowNotifications}
            notifications={notifications}
            user={user}
          ></NotificationModalContent>
        </ModalBase>
      )}

      <div
        onClick={handleShowNotifications}
        className="flex cursor-pointer  dark:hover:bg-[#111] hover:bg-[#ccc]  hover:font-bold  group transition-all rounded-lg p-2 pl-4 items-center gap-x-3"
      >
        <div className="relative ">
          <IconHeartNone></IconHeartNone>
          {notifications && notifications.length > 0 && (
            <p className="absolute top-0 right-0 border rounded-full bg-red-500 text-white w-3 h-3 flex items-center justify-center text-[8px] p-[3px]">
              {notifications.length}
            </p>
          )}
        </div>
        <p className={` `}>Notifications</p>
      </div>
    </>
  );
};

export default Notifications;
