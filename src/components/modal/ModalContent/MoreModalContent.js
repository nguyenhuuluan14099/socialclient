import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalBase from "../ModalBase";
import ToggleDarkMode from "components/darkMode/ToggleDarkMode";
import { useAuth } from "components/context/Auth-Context";
const data = [
  {
    id: 1,
    title: "Settings",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 5.785l-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864l-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495"
        />
      </svg>
    ),
    onClick: () => {},
  },
  {
    id: 2,

    title: "Your activity",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    onClick: () => {},
  },
  {
    id: 3,

    title: "Saved",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
        />
      </svg>
    ),

    onClick: () => {},
  },
];
const MoreModalContent = ({ onClose = () => {} }) => {
  const navigate = useNavigate();
  const { user, dispatch } = useAuth();
  const handleLogOut = () => {
    dispatch({
      type: "LOGOUT",
      payload: "",
    });
  };
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div onClick={onClose} className="flex flex-col domEle in cursor-pointer">
      {showConfirm && (
        <ModalBase
          styleModalContent="w-full max-w-[200px]"
          visible={showConfirm}
          onClose={() => setShowConfirm(false)}
        >
          <div className="text-center cursor-pointer">
            <p
              onClick={handleLogOut}
              className="p-3 text-red-500 font-semibold w-full"
            >
              LogOut
            </p>
            <p
              onClick={() => setShowConfirm(false)}
              className="p-3 border border-transparent border-t-slate-300 w-full"
            >
              Cancel
            </p>
          </div>
        </ModalBase>
      )}
      {data.map((item) => (
        <div
          onClick={item?.onClick}
          key={item.id}
          className="flex items-center dark:bg-black dark:hover:bg-[#262626] hover:bg-slate-100 transition-all last:border-none justify-between p-3 border border-transparent dark:border-[#262626] border-b-slate-300"
        >
          <p className="text-[14px]">{item.title}</p>
          <span>{item.icon}</span>
        </div>
      ))}

      <ToggleDarkMode></ToggleDarkMode>
      <div
        onClick={() => setShowConfirm(true)}
        className="flex items-center hover:bg-slate-100 transition-all justify-between p-3 border dark:hover:bg-[#262626] border-transparent dark:bg-black border-b-slate-300 dark:border-[#262626]"
      >
        <p className="text-[14px]">Log out</p>
        <span></span>
      </div>
    </div>
  );
};

export default MoreModalContent;
