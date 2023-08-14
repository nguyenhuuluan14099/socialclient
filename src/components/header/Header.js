import axios from "axios";
import { useAuth } from "components/context/Auth-Context";
import IconHeart from "components/icons/IconHeart";
import IconHeartNone from "components/icons/IconHeartNone";
import {
  setToastMes,
  toggleNotification,
  // toggleSideBar,
} from "components/redux/globalSlice";
import { listIcons } from "dataSideBar";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import useSound from "use-sound";
import soundNotification from "components/sounds/soundNotification.mp3";
import ImageLazy from "components/image/ImageLazy";
const Header = ({ socket }) => {
  const { notification, toastMes } = useSelector((state) => state.global);
  const [play] = useSound(soundNotification, {
    volume: 0.75,
  });
  const dispatch = useDispatch();
  const [notifications, setNotifications] = useState([]);
  const [socketNot, setSocketNot] = useState({});
  const [currentUser, setCurrentUser] = useState([]);
  const [showSideBar, setShowSideBar] = useState(false);

  const { user } = useAuth();
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/users/${user?._id}`
        );
        setCurrentUser(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [user?._id]);
  useEffect(() => {
    async function getNots() {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/notifications/${currentUser?.username}`
        );

        setNotifications(res.data.reverse());
      } catch (error) {
        console.log(error);
      }
    }
    getNots();
  }, [currentUser]);
  const handleClickSidebar = () => {
    dispatch(setShowSideBar(!showSideBar));
  };
  const handleClickNotification = () => {
    dispatch(toggleNotification(!notification));
  };
  useEffect(() => {
    socket?.on("getNotifications", (data) => {
      dispatch(setToastMes(true));

      setSocketNot(data);
    });
  }, [socket, dispatch]);
  useEffect(() => {
    if (toastMes) {
      play();
      toast.info("You have a new notification.", {
        closeOnClick: true,
        autoClose: 1500,
      });
      dispatch(setToastMes(false));
    }
  }, [play, dispatch, toastMes, currentUser?.username, socketNot.senderName]);
  useEffect(() => {
    setNotifications((prev) => [...prev, socketNot].reverse());
  }, [socketNot]);
  if (!user) return;
  return (
    <div className="fixed left-0 header-app z-50 right-0 md:px-[100px] top-0 max-w-full w-full  flex items-center justify-between h-[70px] dark:bg-black text-white md:hidden bg-white">
      <Link to="/" className={` h-full text-[20px] font-semibold `}>
        <ImageLazy
          className="w-[35px] mb-3 mt-5 h-[35px] md:-ml-1 ml-5 object-cover "
          url="/logoHome.png"
        ></ImageLazy>
      </Link>
      <div className="flex items-center justify-between  ">
        {listIcons.map((item) => {
          if (item.onClick) {
            return (
              <div key={item.id}>
                <NavLink className="flex  items-center  group h-[40px] -translate-x-[7px]">
                  <div
                    className="flex items-center gap-x-3"
                    onClick={handleClickSidebar}
                  >
                    <div
                      className={`${
                        showSideBar
                          ? "font-[900] dark:text-white text-black dark:bg-black bg-slate-200 border border-slate-300"
                          : ""
                      }   text-slate-600 group:hover:text-red-500 rounded-full p-2`}
                    >
                      {item.icon}
                    </div>
                    <p
                      className={`hidden xl:visible ${
                        showSideBar || notification ? "opacity-0" : ""
                      } text-slate-600 dark:text-white -translate-x-[8px]`}
                    >
                      {item.title}
                    </p>
                  </div>
                </NavLink>
              </div>
            );
          }
        })}
        <div className="notification   cursor-pointer md:flex items-center gap-x-3 group h-[40px] -translate-x-[7px]">
          <div
            className=" flex items-center gap-x-3"
            onClick={handleClickNotification}
          >
            <div
              className={`relative  ${
                notification
                  ? "font-[900] text-black bg-slate-200 dark:bg-black border border-slate-300"
                  : ""
              } text-slate-600 group:hover:text-red-500 rounded-full p-2`}
            >
              {notification ? (
                <>
                  <IconHeart className="!w-8 !h-8 -translate-y-[3px] dark:text-white"></IconHeart>
                </>
              ) : (
                <>
                  <IconHeartNone className="!w-8 !h-8 -translate-y-[3px] dark:text-white">
                    {" "}
                  </IconHeartNone>
                </>
              )}
              {notifications.length > 0 && (
                <div className="w-[14px] absolute top-1 right-1 bg-red-500 h-[14px] rounded-full flex items-center justify-center text-white p-1">
                  <p className="text-[9px]">{notifications.length}</p>
                </div>
              )}
            </div>
            <p
              className={` hidden xl:visible dark:text-white ${
                showSideBar || notification ? "opacity-0" : ""
              } text-slate-600 -translate-x-[8px]`}
            >
              Notifications
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
