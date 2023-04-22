import axios from "axios";
import { useAuth } from "components/context/Auth-Context";
import IconHeart from "components/icons/IconHeart";
import IconHeartNone from "components/icons/IconHeartNone";
import ModalBase from "components/modal/ModalBase";
import MoreModalContent from "components/modal/ModalContent/MoreModalContent";
import NotificationModalContent from "components/modal/ModalContent/NotificationModalContent";
import SearchModalContent from "components/modal/ModalContent/SearchModalContent";
import ShareModalContent from "components/modal/ModalContent/ShareModalContent";

import {
  setToastMes,
  toggleNotification,
  toggleSideBar,
} from "components/redux/globalSlice";
import { listIcons } from "dataSideBar";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, Outlet } from "react-router-dom";

const HomeLayOut = ({ socket }) => {
  // const path = "sound/soundNotification.mp3";
  // const [play1] = useSound(path, { volume: 0.75 });
  const [showModal, setShowModal] = useState(false);
  const [modalShare, setModalShare] = useState(false);
  const [coords, setCoords] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [socketNot, setSocketNot] = useState({});
  const moreRef = useRef();
  const { user } = useAuth();
  const { sideBar, notification, markNot } = useSelector(
    (state) => state.global
  );

  const dispatch = useDispatch();
  const [currentUser, setCurrentUser] = useState([]);
  const handleClickShow = () => {
    setCoords(moreRef.current.getBoundingClientRect());
    setShowModal(true);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          `https://serversocial.vercel.app/users/${user?._id}`
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
  useEffect(() => {
    socket?.on("getNotifications", (data) => {
      dispatch(setToastMes(true));

      setSocketNot(data);
    });
    return () => {
      socket?.disconnect();
    };
  }, [socket, dispatch]);

  useEffect(() => {
    setNotifications((prev) => [...prev, socketNot].reverse());
  }, [currentUser?.username, socketNot]);
  // console.log("notification", notifications);
  useEffect(() => {
    if (modalShare) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  }, [modalShare]);

  useEffect(() => {
    async function getNots() {
      try {
        const res = await axios.get(
          `https://serversocial.vercel.app/notifications/${currentUser?.username}`
        );

        setNotifications(res.data.reverse());
      } catch (error) {
        console.log(error);
      }
    }
    getNots();
  }, [currentUser, markNot]);

  // console.log("hello");

  //xl: min-h-[100vh], max-w-[220px] ,h-full,flex-col
  //w-[65px],
  //flex-col
  return (
    <div className="flex dark:text-white">
      <div className="  sideBard bg-white dark:bg-black flex-3     fixed left-0  xl:w-full bottom-0 max-w-full right-0 h-[65px] z-10  border border-r-slate-300 dark:border-[#363636]  flex  justify-between md:top-0 md:left-0 md:min-h-[100vh] md:max-w-[80px] md:h-full md:flex-col">
        <div className="flex  h-[65px] md:h-full max-w-full w-[450px] md:w-[80px] md:flex-col transition-all ">
          <div className="flex md:flex-col md:mt-5 items-center justify-between  md:gap-y-5 px-5   max-w-full w-[450px] md:justify-center md:mb-auto md:items-center">
            <Link
              to="/"
              className={`hidden md:block h-full md:h-[70px] md:w-[70px] text-[20px] font-semibold `}
            >
              <img
                src="/logoHome.png"
                className="w-[35px]  mt-5 h-[35px] md:ml-4 ml-5 object-cover "
                alt=""
              />
            </Link>
            {listIcons.map((item) => {
              if (item.onClick)
                return (
                  <div key={item.id} className="hidden md:block">
                    <NavLink className="hidden md:block   items-center  group h-[40px] ">
                      <div
                        className="flex items-center gap-x-3"
                        onClick={handleClickSidebar}
                      >
                        <div
                          className={`${
                            sideBar
                              ? "font-[900] dark:text-white text-black dark:bg-black bg-slate-200 border border-slate-300"
                              : ""
                          }   text-slate-600 group:hover:text-red-500 rounded-full p-2`}
                        >
                          {item.icon}
                        </div>
                        <p
                          className={`hidden xl:visible ${
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
                <div key={item.id}>
                  <NavLink
                    // onClick={item?.onClick && handleClickSidebar()}

                    to={item.url}
                    className="flex items-center gap-x-4 group h-[50px] "
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
                          className={`hidden  dark:text-white
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

            <div className="notification hidden cursor-pointer md:flex items-center gap-x-3 group h-[40px] ">
              <div
                className="flex items-center  gap-x-3"
                onClick={handleClickNotification}
              >
                <div
                  className={`relative ${
                    notification
                      ? "font-[900] text-black bg-slate-200 dark:bg-black border border-slate-300"
                      : ""
                  } text-slate-600 group:hover:text-red-500 rounded-full p-2`}
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
                  {notifications.length > 0 && (
                    <div className="w-[14px] absolute top-1 right-1 bg-red-500 h-[14px] rounded-full flex items-center justify-center text-white p-1">
                      <p className="text-[9px]">{notifications.length}</p>
                    </div>
                  )}
                </div>
                <p
                  className={`hidden  dark:text-white ${
                    sideBar || notification ? "opacity-0" : ""
                  } text-slate-600 -translate-x-[8px]`}
                >
                  Notifications
                </p>
              </div>
            </div>

            <div
              onClick={() => setModalShare(true)}
              className="flex  cursor-pointer items-center gap-x-4 group h-[50px]  "
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </span>
              <p
                className={`text-slate-900 hidden xl:visible  dark:text-white ${
                  sideBar || notification ? "opacity-0" : ""
                }`}
              >
                Create
              </p>
            </div>
            <Link
              to={currentUser?.username}
              className=" flex items-center gap-x-4 group h-[50px] "
            >
              <img
                src={
                  currentUser?.profilePicture?.thumb ||
                  "https://i.ibb.co/1dSwFqY/download-1.png"
                }
                alt=""
                className=" w-[30px] h-[30px] rounded-full object-cover"
              />
              <p
                className={`text-slate-900 hidden xl:visible  dark:text-white ${
                  sideBar || notification ? "opacity-0" : ""
                }`}
              >
                Profile
              </p>
            </Link>

            <div
              ref={moreRef}
              onClick={handleClickShow}
              className="flex items-center cursor-pointer  gap-x-2"
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={`${showModal ? 1.8 : 1}`}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </span>
              <p
                className={`hidden xl:visible ${
                  showModal ? "text-[16px] font-bold" : "text-[15px]"
                } ${sideBar || notification ? "opacity-0" : ""}`}
              >
                More
              </p>
            </div>
          </div>
        </div>

        {/* more info */}
        {/* <ModalMoreInfo></ModalMoreInfo> */}
      </div>
      {/* ml-[400px], ml-[150px] */}
      <div className=" flex-7 mx-[20px] md:ml-[150px] xl:ml-[400px] overflow-hidden   min-h-[100vh]">
        <Outlet></Outlet>
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
      {showModal && (
        <ModalBase
          type="secondary"
          coords={coords}
          animationRoot="primary"
          visible={showModal}
          onClose={() => setShowModal(false)}
        >
          <MoreModalContent
            onClose={() => setShowModal(true)}
          ></MoreModalContent>
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

      {notification && (
        <ModalBase
          type="sideBar"
          animationRoot="primary"
          visible={notification}
          onClose={handleClickNotification}
        >
          <NotificationModalContent
            socket={socket}
            setNotifications={setNotifications}
            onClose={handleClickNotification}
            notifications={notifications}
            user={currentUser}
          ></NotificationModalContent>
        </ModalBase>
      )}
    </div>
  );
};

export default HomeLayOut;
