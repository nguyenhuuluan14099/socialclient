import Notifications from "components/layout/Notifications";
import Search from "components/layout/Search";
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="w-full h-[50px] fixed   top-0 left-0 dark:bg-black bg-white flex items-center justify-between laptop:hidden z-50">
      <Link to="/" className={`block  pl-4 w-[200px] `}>
        <img
          src="/logoHome.png"
          className="w-[35px]  h-[35px] object-cover "
          alt="/logoHome.png"
        ></img>
      </Link>
      <div className="flex items-center ">
        <Search></Search>
        <Notifications></Notifications>
      </div>
    </div>
  );
};

export default Header;
