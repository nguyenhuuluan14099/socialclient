import React from "react";

const ImageUser = ({ classNameImg = "", story, smallImg = false, data }) => {
  return (
    <img
      alt=""
      src={
        data?.profilePicture[0].imageThumb ||
        "https://i.ibb.co/1dSwFqY/download-1.png"
      }
      className={`border-2  border-orange-500 ${classNameImg} ${
        story ? " p-[2px] w-[48px] h-[48px] rounded-full " : "translate-x-[4px]"
      } ${
        smallImg
          ? `rounded-full object-cover translate-x-[2px] w-[30px] h-[30px]`
          : "w-[40px] h-[40px] rounded-full object-cover"
      }`}
    />
  );
};

export default ImageUser;
