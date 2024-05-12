import ImageLazy from "components/image/ImageLazy";
import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Profile = () => {
  const { auth } = useSelector((state) => state);
  return (
    <NavLink
      to={auth.user._id}
      className="flex cursor-pointer dark:hover:bg-[#111] hover:bg-[#ccc] hover:font-bold  group transition-all rounded-lg p-2 pl-4 items-center gap-x-3"
    >
      {({ isActive }) => (
        <>
          <ImageLazy
            url={
              auth.user.profilePicture[0].imageThumb ||
              "https://i.ibb.co/1dSwFqY/download-1.png"
            }
            className=" w-[30px] h-[30px]  rounded-full object-cover"
          />
          <p className={`hidden laptop:block ${isActive ? "font-bold" : ""}`}>
            Profile
          </p>
        </>
      )}
    </NavLink>
  );
};

export default Profile;
