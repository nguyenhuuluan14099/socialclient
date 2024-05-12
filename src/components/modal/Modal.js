import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import ModalBase from "./ModalBase";

const createElementWrapper = () => {
  const element = document.createElement("div");
  element.id = "modal-wrapper";
  return element;
};

const createModelItem = createElementWrapper();
const Modal = ({
  type = "",
  visible,
  onClose = () => {},
  containerClassName = "",
  bodyStyle = {},
  children,
  bodyClassName = "",
  containerStyle = "",
}) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleClick = () => {
    setShowConfirm(true);
  };

  useEffect(() => {
    document.body.appendChild(createModelItem);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let bgOverlay = "";
  switch (type) {
    case "secondary":
      bgOverlay = "bg-transparent";
      break;
    case "sideBar":
      bgOverlay = "bg-transparent";
      break;
    default:
      bgOverlay = "bg-black bg-opacity-60";
      break;
  }
  const contentElement = (
    <div
      className={` ${containerClassName} ${
        type === "secondary"
          ? ""
          : type === "sideBar"
          ? ""
          : "flex items-center justify-center"
      }
    
      } ${containerStyle} ${visible ? "" : "invisible opacity-0"}`}
    >
      {showConfirm && (
        <ModalBase
          visible={showConfirm}
          animationRoot="secondary"
          onClose={() => setShowConfirm(false)}
        >
          <div className="flex flex-col items-center">
            <div className="flex flex-col gap-y-2 items-center py-3 px-5">
              <p className="text-xl font-semibold">Discard post?</p>
              <p className="text-[14px] text-slate-400">
                If you leave, your edits won't be saved.
              </p>
            </div>

            <div
              onClick={onClose}
              className=" cursor-pointer  border p-3 text-center  w-full border-transparent border-t-slate-300"
            >
              <p className="text-red-500 font-semibold">Discard</p>
            </div>
            <div
              onClick={() => setShowConfirm(false)}
              className="cursor-pointer  border p-3 w-full text-center border-t-slate-300  border-transparent"
            >
              <p className="">Cancel</p>
            </div>
          </div>
        </ModalBase>
      )}

      <div
        // onClick={type === "share" ? handleClick : onClose}
        onClick={type === "share" ? handleClick : onClose}
        className={`overlay absolute  inset-0 ${bgOverlay}`}
      >
        {type === "share" || type === "detailPost" ? (
          <>
            <p className="absolute top-3 right-3 p-3 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </p>
          </>
        ) : (
          <></>
        )}
      </div>

      <div
        style={bodyStyle}
        className={`${bodyClassName} absolute z-50 overflow-hidden`}
      >
        {children}
      </div>
    </div>
  );
  return ReactDOM.createPortal(contentElement, createModelItem);
};

export default Modal;
