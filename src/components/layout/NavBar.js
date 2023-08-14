import HomeIcon from "components/icons/HomeIcon";
import IconExplore from "components/icons/IconExplore";
import IconExploreFill from "components/icons/IconExploreFill";
import IconHomeFill from "components/icons/IconHomeFill";
import IconMes from "components/icons/IconMes";
import IconMesFill from "components/icons/IconMesFill";
import ImageLazy from "components/image/ImageLazy";
import React, { useEffect } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import Search from "./Search";
import Notifications from "./Notifications";
import CreatePost from "./CreatePost";
import Profile from "./Profile";
import Setting from "./Setting";
import { useAuth } from "components/context/Auth-Context";

const NavBar = ({ socket }) => {
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

  return (
    <div className="flex w-full top-0 gap-x-20  justify-between">
      <div className=" w-[250px] pt-16   fixed  top-0 left-0 border border-t-transparent  border-l-transparent border-b-transparent dark:border-r-[#363636] dark:bg-black  flex flex-col p-3 h-full">
        <Link to="/" className={`block h-[60px] shrink-0 pl-4 w-[200px] `}>
          <div className="flex items-center gap-x-2 ">
            <ImageLazy
              className="w-[35px] m-0! h-[35px] object-cover "
              url="/logoHome.png"
            ></ImageLazy>
            <p className="invisible md:visible xl:visible font-bold text-xl">
              HLSOCIAL
            </p>
          </div>
        </Link>
        <div className="flex flex-col gap-y-3 flex-1 ">
          {data.map((item) => (
            <NavLink key={item.id} to={item.url}>
              {({ isActive }) => (
                <div className="flex dark:hover:bg-[#111]  hover:font-bold hover:bg-[#ccc]  group transition-all rounded-lg p-2 pl-4 items-center gap-x-3">
                  <p className={` ${isActive ? "font-semibold" : ""} `}>
                    {isActive ? item.iconFill : item.icon}
                  </p>
                  <p className={` ${isActive ? "font-semibold " : ""}`}>
                    {item.title}
                  </p>
                </div>
              )}
            </NavLink>
          ))}
          <Search></Search>
          <Notifications socket={socket}></Notifications>
          <CreatePost></CreatePost>
          <Profile></Profile>
          <Setting></Setting>
        </div>
      </div>
      <div className="  flex-1 ml-[300px] ">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default NavBar;
