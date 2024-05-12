import HomeIcon from "components/icons/HomeIcon";
import IconExplore from "components/icons/IconExplore";
import IconExploreFill from "components/icons/IconExploreFill";
import IconHomeFill from "components/icons/IconHomeFill";
import IconMes from "components/icons/IconMes";
import IconMesFill from "components/icons/IconMesFill";
import React, { useEffect } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import Search from "./Search";
import Notifications from "./Notifications";
import CreatePost from "./CreatePost";
import Profile from "./Profile";
import Setting from "./Setting";
import { useSelector } from "react-redux";
import Header from "components/feed/Header";

const NavBar = () => {
  const { auth } = useSelector((state) => state);
  const navigate = useNavigate();
  const data = [
    {
      id: 1,
      icon: <HomeIcon></HomeIcon>,

      iconFill: <IconHomeFill></IconHomeFill>,
      url: "/",
      title: "Home",
    },
    {
      id: 2,
      icon: <IconExplore></IconExplore>,

      iconFill: <IconExploreFill></IconExploreFill>,
      url: "/explore",
      title: "Explore",
    },
    {
      id: 3,
      icon: <IconMes></IconMes>,
      iconFill: <IconMesFill></IconMesFill>,
      url: "/messenger",
      title: "Messages",
    },
  ];

  useEffect(() => {
    if (!auth) {
      navigate("/login");
    }
  }, [auth, navigate]);
  return (
    <div className="top-0  flex justify-between w-full gap-x-20">
      <div className="navbar pt-4 fixed  bottom-0 left-0 laptop:top-0 border border-transparent border-r-slate-300 dark:border-r-[#363636] dark:bg-black   flex  laptop:flex-col p-3 laptop:h-full h-[50px] w-full laptop:w-auto z-[9999]">
        <Link
          to="/"
          className={` h-[60px] shrink-0 pl-4 w-[200px] hidden laptop:block`}
        >
          <div className="flex items-center gap-x-2 ">
            <img
              src="/logoHome.png"
              className="w-[35px] m-0! h-[35px] object-cover "
              alt="/logoHome.png"
            ></img>
            <p className="hidden text-xl font-bold  laptop:block">HLSOCIAL</p>
          </div>
        </Link>
        <div className="flex w-full  justify-between laptop:justify-normal laptop:flex-col items-center z-50  laptop:items-start flex-1 gap-y-3  ">
          {data.map((item) => (
            <NavLink key={item.id} to={item.url}>
              {({ isActive }) => (
                <div className="flex dark:hover:bg-[#111]  hover:font-bold hover:bg-[#ccc]  group transition-all rounded-lg p-2 laptop:pl-4 items-center gap-x-3">
                  <p className={` ${isActive ? "font-semibold" : ""} `}>
                    {isActive ? item.iconFill : item.icon}
                  </p>
                  <p
                    className={`hidden laptop:block ${
                      isActive ? "font-semibold " : ""
                    }`}
                  >
                    {item.title}
                  </p>
                </div>
              )}
            </NavLink>
          ))}
          <div className=" flex-col gap-y-3 hidden laptop:flex">
            <Search></Search>
            <Notifications></Notifications>
          </div>
          <CreatePost></CreatePost>
          <Profile></Profile>
          <Setting></Setting>
        </div>
      </div>
      <div className="content flex-1    ">
        <Header></Header>
        <div className="mt-[40px] laptop:mt-0">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
