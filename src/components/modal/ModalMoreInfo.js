import useClickOutSide from "components/hooks/useClickOutSide";
import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import ModalBase from "./ModalBase";
import MoreModalContent from "./ModalContent/MoreModalContent";
const ModalMoreInfo = () => {
  const [showModal, setShowModal] = useState(false);
  // const { show, setShow, showRef } = useClickOutSide();
  const showRef = useRef();
  const [coords, setCoords] = useState({});
  //   useEffect(() => {
  //     // setCoords(colRef.current.getBoundingClientRect());
  //   }, []);
  //   console.log("coords", coords);

  const handleClickMore = () => {
    setCoords(showRef.current.getBoundingClientRect());
    setShowModal(!showModal);
  };

  useEffect(() => {
    //showRef.current &&
    //  !showRef.current.contains(e.target) &&
    // !e.target.matches(showRef.current) &&
    const handleClick = (e) => {
      if (
        showRef.current &&
        !showRef.current.contains(e.target) &&
        !e.target.matches("div .hideEle")
      ) {
        setShowModal(!showModal);
      }
    };
    document.addEventListener("click", handleClick);

    return () => document.removeEventListener("click", handleClick);
  }, []);
  // if (typeof document === "undefined") return <div className="modal"></div>;
  return (
    <div>
      <div
        ref={showRef}
        onClick={handleClickMore}
        className="cursor-pointer  hideEle  w-full   flex items-center gap-x-2 mb-10"
      >
        <div className=" flex items-center gap-x-2">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={`${showModal ? 1.8 : 1}`}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </span>
          <p
            className={`${showModal ? "text-[16px] font-bold" : "text-[15px]"}`}
          >
            More
          </p>
        </div>

        {showModal && (
          <ModalInfo onClick={() => setShowModal(false)} coords={coords}>
            <MoreModalContent
              onClose={() => setShowModal(true)}
            ></MoreModalContent>
          </ModalInfo>
        )}
      </div>
    </div>
  );
};

const ModalInfo = ({ onClick = () => {}, coords, children }) => {
  if (typeof document === "undefined") return <div className="modal"></div>;
  return ReactDOM.createPortal(
    <div
      onClick={onClick}
      className="fixed domEle -translate-y-full z-10 w-full max-w-[220px] bg-white shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,rgba(0,_0,_0,_0.05)0px_1px_1px_0px]   rounded-lg inline-block "
      style={{
        top: coords.top - coords.height / 2,
        left: coords.left,
      }}
    >
      {children}
    </div>,

    document.querySelector("body")
  );
};

export default ModalMoreInfo;
