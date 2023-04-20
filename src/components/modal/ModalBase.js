import React, { useRef } from "react";
import { useSelector } from "react-redux";
import Modal from "./Modal";
const ModalBase = ({
  coords,
  type = "",
  visible,
  animationRoot = "",
  children,
  onClose = () => {},
  styleModalContent = "",
}) => {
  const { sideBar } = useSelector((state) => state.global);
  let animate = "";
  let bodyClassNameStyle = "";
  switch (type) {
    case "sideBar":
      bodyClassNameStyle =
        "fixed  transition duration-150 sideBar md:w-[400px] mx-auto  border border-slate-300 dark:border-[#262626] dark:bg-black  top-0 bg-white rounded-r-xl h-full max-w-full w-full";
      break;
    case "share":
      bodyClassNameStyle =
        "w-full max-w-[850px] xl:h-[500px] inset-0   top-0 xl:top-2/4 xl:-translate-y-2/4 xl:left-2/4 xl:-translate-x-2/4 fixed xl:block dark:bg-black  bg-white z-50 rounded-lg shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,rgba(0,_0,_0,_0.05)0px_1px_1px_0px] transition-all";
      break;
    case "detailPost":
      bodyClassNameStyle =
        "w-full dark:border-[#262626] max-w-[950px] h-full xl:h-[700px]  xl:top-2/4 xl:-translate-y-2/4 xl:left-2/4 xl:-translate-x-2/4 inset-0 md:block md:h-[700px]  md:top-2/4 md:-translate-y-2/4 md:left-2/4 md:-translate-x-2/4 fixed max-h-[1500px] xl:block  overflow-y-auto dark:bg-black";
      break;

    default:
      bodyClassNameStyle = " w-full  max-w-[400px] ";
      break;
  }
  let animationModal = "";
  switch (animationRoot) {
    case "primary":
      animationModal = "animateModal";
      break;
    case "secondary":
      animationModal = "secondaryAnimate";
      break;
    default:
      animationModal = "";
      break;
  }
  return (
    <>
      <Modal
        type={type}
        visible={visible}
        onClose={onClose}
        containerClassName="fixed transition-all inset-0  z-[9999] "
        bodyStyle={
          coords && {
            left: coords.left / 5,
            // right: coords.right,
            top: coords.top - 250,
            // width: coords.width + coords.height,
            width: "300px",
          }
        }
        bodyClassName={`${bodyClassNameStyle} ${styleModalContent} ${animationModal}  z-50 rounded-[6px] content border dark:border-[#262626]  bg-white shadowModal dark:text-white dark:bg-[#262626]  transition-all `}
      >
        {children}
      </Modal>
    </>
  );
};

export default ModalBase;
