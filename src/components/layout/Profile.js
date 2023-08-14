import { useAuth } from "components/context/Auth-Context";
import ImageLazy from "components/image/ImageLazy";
import React from "react";
import { NavLink } from "react-router-dom";

const Profile = () => {
  const { user } = useAuth();
  return (
    <NavLink
      to={user?.username}
      className="flex cursor-pointer dark:hover:bg-[#111] hover:bg-[#ccc] hover:font-bold  group transition-all rounded-lg p-2 pl-4 items-center gap-x-3"
    >
      {({ isActive }) => (
        <>
          <ImageLazy
            url={
              user?.profilePicture?.thumb ||
              "https://i.ibb.co/1dSwFqY/download-1.png"
            }
            className=" w-[30px] h-[30px]  rounded-full object-cover"
          />
          <p className={`${isActive ? "font-bold" : ""}`}>Profile</p>
        </>
      )}
    </NavLink>
  );
};

export default Profile;
