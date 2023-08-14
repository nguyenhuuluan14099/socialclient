import axios from "axios";
import { useAuth } from "components/context/Auth-Context";
import IconHeart from "components/icons/IconHeart";
import IconHeartNone from "components/icons/IconHeartNone";
import ImageLazy from "components/image/ImageLazy";
import ModalBase from "components/modal/ModalBase";
import SearchModalContent from "components/modal/ModalContent/SearchModalContent";
import ShareModalContent from "components/modal/ModalContent/ShareModalContent";

import {
  toggleNotification,
  toggleSideBar,
} from "components/redux/globalSlice";
import { listIcons } from "dataSideBar";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, Outlet } from "react-router-dom";

const HomeLayOut = ({ socket }) => {
  // const path = "sound/soundNotification.mp3";
  // const [play1] = useSound(path, { volume: 0.75 });
  // const [showModal, setShowModal] = useState(false);
  const [modalShare, setModalShare] = useState(false);
  // const [coords, setCoords] = useState({});
  // const [notifications, setNotifications] = useState([]);
  // const [socketNot, setSocketNot] = useState({});
  // const moreRef = useRef();
  const { user } = useAuth();
  const { sideBar, notification } = useSelector((state) => state.global);

  const dispatch = useDispatch();
  const [currentUser, setCurrentUser] = useState([]);
  // const handleClickShow = () => {
  //   setCoords(moreRef.current.getBoundingClientRect());
  //   setShowModal(true);
  // };

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

  const handleClickSidebar = () => {
    dispatch(toggleSideBar(!sideBar));
  };
  const handleClickNotification = () => {
    dispatch(toggleNotification(!notification));
  };
  // useEffect(() => {
  //   socket?.on("getNotifications", (data) => {
  //     dispatch(setToastMes(true));

  //     setSocketNot(data);
  //   });
  //   return () => {
  //     socket?.disconnect();
  //   };
  // }, [socket, dispatch]);

  // useEffect(() => {
  //   setNotifications((prev) => [...prev, socketNot].reverse());
  // }, [currentUser?.username, socketNot]);
  // console.log("notification", notifications);

  // useEffect(() => {
  //   async function getNots() {
  //     try {
  //       const res = await axios.get(
  //         `https://serversocial.vercel.app/notifications/${currentUser?.username}`
  //       );

  //       setNotifications(res.data.reverse());
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   getNots();
  // }, [currentUser, markNot]);

  // console.log("hello");

  //xl: min-h-[100vh], max-w-[220px] ,h-full,flex-col
  //w-[65px],
  //flex-col
  if (!user) return;
  return (
    <div className="flex dark:text-white">
      <div className="  sideBard bg-white dark:bg-black flex-3 xl:w-[230px]    fixed left-0   bottom-0 max-w-full right-0 h-[65px] z-10  border border-r-slate-300 dark:border-[#363636]  flex  justify-between md:top-0 md:left-0  md:min-h-[100vh] md:w-[80px] md:h-full md:flex-col">
        <div className="flex flex-col xl:w-[230px] md:w-[80px]   h-[65px] md:h-full  w-[450px]  md:flex-col transition-all ">
          <div className="flex border border-red-500 items-center gap-x-3 flex-col     justify-between  px-5   max-w-full w-[450px] xl:w-[450px]   md:w-[90px] ">
            <Link to="/" className={`  w-[200px] md:w-[70px] pl-3 `}>
              <div className="flex items-center gap-x-2">
                <ImageLazy
                  className="w-[35px] m-0! h-[35px] object-cover "
                  url="/logoHome.png"
                ></ImageLazy>
                <p className="invisible xl:visible font-bold text-xl">
                  HLSOCIAL
                </p>
              </div>
            </Link>

            {listIcons.map((item) => {
              if (item.onClick)
                return (
                  <div
                    key={item.id}
                    className="  rounded-3xl transition-all hover:bg-[#111111] pl-3 md:block w-[200px] md:w-[80px] md:pl-6  h-[50px]"
                  >
                    <NavLink className=" md:block  md:w-[50px]    group h-[50px]  ">
                      <div
                        className="flex items-center gap-x-5 w-[200px] h-[50px]"
                        onClick={handleClickSidebar}
                      >
                        <div
                          className={` ${
                            sideBar
                              ? "font-[900] dark:text-white text-black dark:bg-black bg-slate-200 border border-slate-300"
                              : ""
                          }   text-slate-600 group:hover:text-red-500 rounded-full `}
                        >
                          {item.icon}
                        </div>
                        <p
                          className={`invisible xl:visible ${
                            sideBar || notification ? "opacity-0" : ""
                          } text-slate-600 dark:text-white -translate-x-[8px]`}
                        >
                          {item.title}
                        </p>
                      </div>
                    </NavLink>
                  </div>
                );
              return (
                <div key={item.id} className="md:w-[80px] md:pl-3">
                  <NavLink
                    // onClick={item?.onClick && handleClickSidebar()}

                    to={item.url}
                    className="flex items-center gap-x-4 pl-3 rounded-3xl transition-all hover:bg-[#111111] w-[200px] md:w-[80px]  group h-[50px] md:hover:bg-transparent"
                  >
                    {({ isActive, isPending }) => (
                      <div className="flex items-center text-slate-600 gap-x-3">
                        <div
                          className={` ${
                            item.title === "Messages" ? " relative" : ""
                          } ${
                            isActive
                              ? "font-semibold text-text-slate-900"
                              : "text-slate-600 group:hover:text-red-500"
                          }`}
                        >
                          {item.icon}
                        </div>
                        <p
                          className={`invisible xl:visible  dark:text-white
                          ${
                            isActive
                              ? `${
                                  sideBar || notification ? "opacity-0" : ""
                                } font-semibold text-text-slate-900 `
                              : `${sideBar || notification ? "opacity-0" : ""}`
                          }
                          `}
                        >
                          {item.title}
                        </p>
                      </div>
                    )}
                  </NavLink>
                </div>
              );
            })}

            <div className="notification md:w-[80px] md:pl-6 pl-3 rounded-3xl transition-all hover:bg-[#111111]   w-[200px] hidden  cursor-pointer md:flex items-center gap-x-3 group h-[50px] ">
              <div
                className="flex items-center gap-x-5"
                onClick={handleClickNotification}
              >
                <div
                  className={` relative ${
                    notification
                      ? "font-[900] text-black bg-slate-200 dark:bg-black border border-slate-300"
                      : ""
                  } text-slate-600 group:hover:text-red-500 rounded-full `}
                >
                  {notification ? (
                    <>
                      <IconHeart className="!w-8 !h-8 dark:text-white"></IconHeart>
                    </>
                  ) : (
                    <>
                      <IconHeartNone className="!w-8 !h-8 dark:text-white">
                        {" "}
                      </IconHeartNone>
                    </>
                  )}
                  {/* {notifications.length > 0 && (
                    <div className="w-[14px] absolute top-0 right-0 bg-red-500 h-[14px] rounded-full flex items-center justify-center text-white p-1">
                      <p className="text-[9px]">{notifications.length}</p>
                    </div>
                  )} */}
                </div>
                <p
                  className={`invisible xl:visible dark:text-white ${
                    sideBar || notification ? "opacity-0" : ""
                  } text-slate-600 -translate-x-[8px]`}
                >
                  Notifications
                </p>
              </div>
            </div>

            <div
              onClick={() => setModalShare(true)}
              className="flex pl-3 md:w-[80px] md:pl-6 rounded-3xl transition-all hover:bg-[#111111] cursor-pointer  w-[200px] items-center gap-x-3 group h-[50px]  "
            >
              <span></span>
              <p
                className={`text-slate-900 invisible xl:visible  dark:text-white ${
                  sideBar || notification ? "opacity-0" : ""
                }`}
              >
                Create
              </p>
            </div>
            <div className="gap-x-3  rounded-3xl  md:ml-12 transition-all hover:bg-[#111111] w-[200px]  flex  h-[50px] md:w-[80px] ">
              <Link
                to={currentUser?.username}
                className="flex items-center my-auto  md:w-[80px]   group"
              >
                <ImageLazy
                  url={
                    currentUser?.profilePicture?.thumb ||
                    "https://i.ibb.co/1dSwFqY/download-1.png"
                  }
                  className=" w-[30px] h-[30px]  rounded-full object-cover"
                />
                <p
                  className={`text-slate-900  invisible xl:visible  dark:text-white ${
                    sideBar || notification ? "opacity-0" : ""
                  }`}
                >
                  Profile
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* ml-[400px], ml-[150px] xl:ml-[400px] */}
      {/* mx-[20px] md:ml-[150px] */}
      <div className="   overflow-hidden   min-h-[100vh]">
        <Outlet className=""></Outlet>
      </div>
      {modalShare && (
        <ModalBase
          type="share"
          visible={modalShare}
          onClose={() => setModalShare(false)}
        >
          <ShareModalContent
            onClose={() => setModalShare(false)}
          ></ShareModalContent>
        </ModalBase>
      )}

      {sideBar && (
        <ModalBase
          type="sideBar"
          animationRoot="primary"
          visible={sideBar}
          onClose={handleClickSidebar}
        >
          <SearchModalContent onClose={handleClickSidebar}></SearchModalContent>
        </ModalBase>
      )}
    </div>
  );
};

export default HomeLayOut;
