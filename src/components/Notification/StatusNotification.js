import FormatTime from "components/time/FormatTime";
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isReadNotify } from "components/redux/actions/notifyAction";

const StatusNotification = ({ not }) => {
  const { content, image, text, url, user, createdAt, isRead } = not;
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);
  const handleIsReadNotify = (msg) => {
    dispatch(isReadNotify({ msg, auth }));
  };
  return (
    <div
      onClick={() => handleIsReadNotify(not)}
      className="flex items-center justify-between w-full py-2"
    >
      <Link to={`${user._id}`} className="">
        <img
          src={
            user.profilePicture[0].imageThumb ||
            "https://i.ibb.co/1dSwFqY/download-1.png"
          }
          className="w-[40px] h-[40px] rounded-full object-cover shrink-0"
          alt=""
        />
      </Link>
      <Link to={`${url}`} className="flex flex-col flex-1 w-full pl-2 ">
        <div className="text-[14px]">
          <span className="font-semibold ">{user.fullname?.slice(0, 15)}</span>{" "}
          {`${text}`}{" "}
        </div>
        <div className="text-[13px] truncate-class">{content}</div>
      </Link>
      <div className="flex items-center gap-x-2">
        {!isRead && (
          <div className="w-[8px] h-[8px] rounded-full bg-blue-500"></div>
        )}
        <div className="text-[13px] text-slate-400">
          <FormatTime inputTime={createdAt}></FormatTime>
        </div>
        {image && (
          <img
            src={image}
            className="w-[40px] h-[40px] rounded-lg object-cover shrink-0"
            alt=""
          />
        )}
      </div>
    </div>
  );
};

export default StatusNotification;
