import React from "react";

const ImageUser = ({
  classNameImg = "",
  story,
  smallImg = false,
  data,
  secondData,
}) => {
  return (
    <img
      className={`${classNameImg} ${
        story
          ? " p-[2px] w-[48px] h-[48px] rounded-full border-2  border-orange-500"
          : "translate-x-[4px]"
      } ${
        smallImg
          ? `rounded-full object-cover translate-x-[2px] w-[30px] h-[30px]`
          : "w-[40px] h-[40px] rounded-full object-cover"
      }`}
      src={
        data?.profilePicture?.thumb ||
        secondData?.profilePicture?.thumb ||
        "https://i.ibb.co/1dSwFqY/download-1.png"
      }
      alt=""
    />
  );
};

export default ImageUser;
